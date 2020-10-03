//<summary>
//Create a new model instance
//</summary>
function Post(idUser, titulo, texto) {
    this.idUser = idUser;
    this.titulo = titulo;
    this.texto = texto;
}

class PostController {

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
                model.titulo && typeof model.titulo == 'string' &&
                model.texto && typeof model.texto == 'string';

        //Business Logic
        if (result) {
            if (model.texto.lengtn > 255) {
                falseCallback("campo \"texto\" não pode ter mais que 255 caracteres");
            } else if (model.titulo.lengtn < 6 || model.titulo.lengtn > 20) {
                falseCallback("campo \"titulo\" não pode ter mais que 20 ou menos de 6 caracteres");
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

    createPostCard(model, userController, postRatingController, callback) {
        userController.read(
            model.idUser,
            function (user) {
                postRatingController.averageRate(model.id, function (rate) {
                    let htmlRate =
                        [
                            '<li class="{rate}"></li>',
                            '<li class="{rate}"></li>',
                            '<li class="{rate}"></li>',
                            '<li class="{rate}"></li>',
                            '<li class="{rate}"></li>'
                        ]
                            .map(function (val, i) {
                                return val.replace(/{rate}/g, (i + 1) == rate ? "rate-post-ok" : "");
                            })
                            .join("");

                    callback(
                        ('<div class="card">' +
                            '<div class="card-header d-flex justify-content-between align-items-center">' +
                            '<div class="d-flex align-items-center">' +
                            '<img src="../img/profile.png" class="profile-pic mr-3">' +
                            '<h3>{user.nome}</h3>' +
                            '</div>' +
                            '<div class="d-none d-lg-block">' +
                            '<small>Minha Nota:</small>' +
                            '<ul class="rate-post-list">' +
                            '<li></li>' +
                            '<li></li>' +
                            '<li></li>' +
                            '<li></li>' +
                            '<li></li>' +
                            '</ul>' +
                            '<small>Nota Geral:</small>' +
                            '<ul id="ratePost{id}" class="rate-post-list rated">' +
                            '{postRating.averageRate}' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '<div class="card-body text-left">' +
                            '<h3>{titulo}</h3>' +
                            '<p>{texto}</p>' +
                            '</div>' +
                            '</div>'
                        )
                        .replace(/{id}/g, model.id)
                        .replace(/{titulo}/g, model.titulo)
                        .replace(/{texto}/g, model.texto)
                        .replace(/{user.nome}/g, user.nome)
                        .replace(/{postRating.averageRate}/g, htmlRate)
                    );
                });
            },
            function () {
                return "";
            }
        )

    }

    //#endregion
}