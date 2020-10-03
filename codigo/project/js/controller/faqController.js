//<summary>
//Create a new model instance
//</summary>
function Faq(titulo, texto) {
    this.titulo = titulo;
    this.texto = texto;
}

class FaqController {

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
            if (model.titulo.length < 6)
                falseCallback("\"Título\" não pode ser menor que 6 caracteres");
            else if (model.texto.length < 10)
                falseCallback("\"Texto\" não pode ser menor que 10 caracteres");
            else trueCallback();
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

    createFaqQuestionCard(model) {
        let result =
            ('<div class="card">' +
                '<div class="card-header" id="headingOne">' +
                '<button class="btn btn-link" data-toggle="collapse" data-target="#faqItem{id}Body">' +
                '{titulo}' +
                '</button>' +
                '</div>' +
                '<div id="faqItem{id}Body" class="card-body collapse">' +
                '{texto}' +
                '</div>' +
                '</div>')
                .replace(/{id}/g, model.id)
                .replace(/{titulo}/g, model.titulo)
                .replace(/{texto}/g, model.texto);

        return result;
    }

    //#endregion
}