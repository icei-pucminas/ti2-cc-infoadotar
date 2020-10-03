//#region Controllers
//Aqui é onde se é adicionado as variaveis 
//para acessar os dados do localstorage
//Obs: a variavel userController já está definida
//então não é necessário ser declarada

//#endregion

function NovoUsuario() {
    let nome = $("#cadastroNome").val();
    let email = $("#cadastroEmail").val();
    let senha = $("#cadastroPassword").val();
    let verificasenha = $("#cadastroConfirmPassword").val();
    if (senha == verificasenha) {
      let cadastraUsuario = new User(nome,email,senha,1);

        userController.create(cadastraUsuario,
            function () {
                alert("Cadastro realizado com sucesso!");
                event.preventDefault('#loginForm');
                window.location.href = "/project/pages/index.html"
            
            },
            function (msg) {
                alert("Erro ao cadastrar no sistema:" + msg);
            }
    

    )
        }else{
            alert("Senhas diferentes.Tente novamente.")
        }
           
}



//Espaço que é chamado quando o usário é verificado
$(document).on("userNotLogged", function () {
    //#region Setting Controllers

    //Variavel userController permite o acesso aos dados dos usuários
    //Obs: olhar js/controller/userController.js

    //#endregion

    $("#btncadastrar").click(NovoUsuario);
    


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