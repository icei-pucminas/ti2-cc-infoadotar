//<summary>
//Create a new model instance
//</summary>
function Passo(titulo, texto) {
    this.titulo = titulo;
    this.texto = texto;
}

class PassoController {

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
                model.titulo && typeof model.titulo == 'string' &&
                model.texto && typeof model.texto == 'string';

        //Business Logic
        if (result) {
            DAL.filter(
                this.table,
                function (e) { return e.titulo == model.titulo && e.id != model.id },
                function (list) {
                    if (list.length > 0)
                        falseCallback("Passo já existente");
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

    //#region Special methods

    createCarouselStepCard(model) {
        let result =
            ('<div class="carousel-step card">' +
                '<div class="card-header d-flex justify-content-between">' +
                '<h3>{titulo}</h3>' +
                '<span>' +
                'Feito?' +
                '<input class="step-checkbox mt-auto mb-auto" type="checkbox" value="{id}"/>' +
                '</span>' +
                '</div>' +
                '<div class="card-body">' +
                '{texto}' +
                '</div>' +
                '</div>')
                .replace(/{id}/g, model.id)
                .replace(/{titulo}/g, model.titulo)
                .replace(/{texto}/g, model.texto);

        return result;
    }

    createCarouselStepCard(model, num) {
        let result =
            ('<div class="carousel-step card">' +
                '<div class="card-header d-flex justify-content-between">' +
                '<h3>{titulo}</h3>' +
                '<span>' +
                'Feito?' +
                '<input class="step-checkbox mt-auto mb-auto" type="checkbox" value="{id}"/>' +
                '</span>' +
                '</div>' +
                '<div class="card-body">' +
                '<h4>Passo {num}</h4>' +
                '{texto}' +
                '</div>' +
                '</div>')
                .replace(/{id}/g, model.id)
                .replace(/{titulo}/g, model.titulo)
                .replace(/{texto}/g, model.texto)
                .replace(/{num}/g, num);

        return result;
    }

    //#endregion
}