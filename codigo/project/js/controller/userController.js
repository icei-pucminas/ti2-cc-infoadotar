//<summary>
//Create a new model instance
//</summary>
function User(nome, email, senha, tipo) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
}

class UserController {

    constructor(table, sessionKey) {
        this.table = table;
        this.sessionKey = sessionKey;

        DAL.readAll(
            table, 
            function (data) {
                if (!Array.isArray(data))
                    DAL.setTable(table);
            },
            function () {
                DAL.setTable(table);
            }
        );
    }

    isValid(model, trueCallback, falseCallback) {
        let result =
            typeof model.id == 'undefined' ? true : (typeof model.id == 'number' && model.id > 0) &&
                model.nome && typeof model.nome == 'string' &&
                model.email && typeof model.email == 'string' &&
                model.senha && typeof model.senha == 'string' &&
                model.tipo && typeof model.tipo == 'number';

        //Business Logic
        if (result) {
            if (!validEmail(model.email)) {
                falseCallback("Email inválido");
            }
            else {
                DAL.filter(
                    this.table,
                    function (e) { return e.email == model.email && e.id != model.id },
                    function (list) {
                        if (list.length > 0)
                            falseCallback("Email já existente");
                        else
                            trueCallback();
                    },
                    function () {
                        falseCallback("Erro ao buscar dados pela DAL");
                    }
                );
            }
        }
        else falseCallback("Modelo de dados não é compativel");
    }

    create(model, success, error) {
        let table = this.table;
        this.isValid(
            model,
            function () {
                DAL.create(table, model, success, error);
            },
            error);
    }

    update(model, success, error) {
        let table = this.table;
        this.isValid(
            model,
            function () {
                DAL.update(table, model, success, error);
            },
            error);
    }

    read(id, success, error) {
        DAL.read(this.table, id, success, error);
    }

    readAll(success, error) {
        DAL.readAll(this.table, success, error);
    }

    filter(func, success, error) {
        DAL.filter(this.table, func, success, error);
    }

    delete(id, success, error) {
        DAL.delete(this.table, id, success, error);
    }

    //#region Special methods

    createUserSession(sessionKey, user) {
        sessionStorage.setItem(sessionKey, JSON.stringify({
            id: user.id,
            nome: user.nome,
            email: user.email,
            tipo: user.tipo
        }));
    }

    login(email, senha, success, error) {
        
        let sessionKey = this.sessionKey;
        let loginFunc = this.createUserSession;

        //Verify input types
        if (typeof email == 'string' && typeof senha == 'string') {

            //Get all users with the email and senha equals to the input values
            this.filter(
                function (model) {
                    return model.email.toLowerCase() == email && model.senha == senha;
                },
                //DAL success
                function (user) {
                    //Verify result type
                    if (Array.isArray(user)) {

                        //Verify if the array have values
                        if (user.length > 0) {
                            //set the first item as sessionKey value
                            loginFunc(sessionKey, user[0]);
                            success();
                        } else error("Email ou senha incorretos");

                    } else if (typeof user == 'object') {
                        //set the object as sessionKey value
                        loginFunc(sessionKey, user);
                        success();
                    } else error("Email ou senha incorretos");
                },
                //DAL error
                function (msg) { error("Erro ao buscar dados: " + msg) }
            );
        //Type error
        } else error("Campo \"Email\" ou \"Senha\" não é do tipo string");
    }

    getLoggedUser() {
        return JSON.parse(sessionStorage.getItem(this.sessionKey));
    }

    isLoggedIn() {
        let user = this.getLoggedUser();
        return user != null;
    }

    logout() {
        sessionStorage.removeItem(this.sessionKey);
    }

    //#endregion
}