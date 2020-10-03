//<summary>
//Create a new model instance
//</summary>
function PostRating(idPost, idUser, rate) {
    this.idPost = idPost;
    this.idUser = idUser;
    this.rate = rate;
}

class PostRatingController {

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
                model.idPost && typeof model.idPost == 'number' &&
                model.idUser && typeof model.idUser == 'number' &&
                model.rate && typeof model.rate == 'string';

        //Business Logic
        if (result) {
            if (model.rate > 5 || model.rate < 1) {
                falseCallback("A nota não pode ser maior que 5 ou menor que 1");
            } else {
                trueCallback();
            }
        } else falseCallback("Modelo de dados não é compativel");
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

    averageRate(idPost, callback) {
        if (typeof callback == "function") {
            this.filter(
                function (e) { return e.idPost == idPost },
                function (list) {
                    if (Array.isArray(list)) {
                        if (list.length > 0) {
                            callback(Math.round(
                                list.map(function (val) { return val.rate; })
                                    .reduce(function (a, b) { return a + b; })
                                /
                                list.length
                            ));
                        } else {
                            callback(5);
                        }
                    } else {
                        callback(0);
                    }
                },
                function () {
                    callback(0);
                }
            )
        }
    }

    //#endregion
}