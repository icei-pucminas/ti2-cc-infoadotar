//#region Controllers
//Aqui é onde se é adicionado as variaveis 
//para acessar os dados do localstorage
//Obs: a variavel userController já está definida
//então não é necessário ser declarada

//#endregion

//Espaço que é chamado quando o susário é verificado
$(document).on("userNotLogged", function () {
    //#region Setting Controllers

        //Variavel userController permite o acesso aos dados dos usuários
        //Obs: olhar js/controller/userController.js

    //#endregion

    //Exemplos:
        
        //Usando o userController
        userController.readAll(
            function (list) {
                for (let i = 0; i < list.length; i++) {
                    console.log(`${i + 1}º usuário: ${list[i].nome}`);
                }
            },
            function () {
                console.log("Ocorreu um erro ao listar os usuários");
            }
        );
});