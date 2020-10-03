//<summary>
//Create a new model instance
//</summary>
function UserPasso(idUser, idPasso) {
    this.idUser = idUser;
    this.idPasso = idPasso;
}

class UserPassoController {

    constructor(table) {
        this.table = table;

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
                model.idUser && typeof model.idUser == 'number' &&
                model.idPasso && typeof model.idPasso == 'number';

        //Business Logic
        if (result) {
            DAL.filter(
                this.table,
                function (e) { return e.idUser == model.idUser && e.idPasso == model.idPasso && e.id != model.id },
                function (list) {
                    if (list.length > 0)
                        falseCallback("Passo já concluído");
                    else
                        trueCallback();
                },
                function () {
                    falseCallback("Erro ao buscar dados pela DAL");
                }
            );
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
}