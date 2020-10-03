//#region Controllers
//Aqui é onde se é adicionado as variaveis 
//para acessar os dados do localstorage

var comunidadeController;

//#endregion

function closeModal() {
    $("#addComunidadeModal").modal("hide");
    $("#comunidadeTituloInput").val();
    $("#comunidadeDescricaoInput").val();
    $("#comunidadeUrlInput").val();
}

//Espaço que é chamado quando o susário é verificado
$(document).on("userLogged", function () {
    //#region Setting Controllers

        //Variavel comunidadeController permite o acesso aos dados da Comunidade
        //Obs: olhar js/controller/comunidadeController.js
        comunidadeController = new ComunidadeController(comunidadeTable);

    //#endregion

    comunidadeController.readAll(
        function (list) {
            for (let i = 0; i < list.length; i++) {
                comunidadeController.createComunidadeCard(
                    list[i], 
                    userController,
                    function (card) {
                        $("#mainContent").append(card);
                    }
                );
            }
        },
        function () {
            console.log("Ocorreu um erro ao listar as comunidades");
        }
    );

    $("#comunidadeForm").submit(function (e) {
        e.preventDefault();
        comunidadeController.create(
            new Comunidade(
                loggedUser.id,
                $("#comunidadeTituloInput").val(),
                $("#comunidadeDescricaoInput").val(),
                $("#comunidadeUrlInput").val()
            ),
            function () {
                alert("Comunidade criada com sucesso! Recarregue a página para vê-la");
                closeModal();
            },
            function (msg) {
                alert("Erro ao cadastrar comunidade: " + msg);
            }
        );
    })
});