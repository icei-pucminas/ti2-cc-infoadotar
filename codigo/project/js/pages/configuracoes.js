//#region Controllers
//Aqui é onde se é adicionado as variaveis 
//para acessar os dados do localstorage
//Obs: a variavel userController já está definida
//então não é necessário ser declarada
function newName(){

  let nomenew = $("#alteracaoNome").val();

  
  
  userController.read(loggedUser.id,
   function (usuarioLogado) {
        let novoNome = usuarioLogado;
         novoNome.nome = nomenew;
        
    
   userController.update(novoNome,
    function(){
        alert("Sucesso ao mudar o nome!Por favor saia e entre em sua conta novamente.")
    },
    function(msg){
        alert("Erro ao mudar o nome:"+msg)

    }
   )
    },
    
    function (msg) {
        alert("Erro ao mudar o nome:" + msg);
    }
        )

}
function newSenha(){

    let senha = $("#senha1").val();
    let confirmsenha=$("#senhaconfirm").val();
  
    
  if(senha==confirmsenha){
    userController.read(loggedUser.id,
     function (usuarioLogado) {
          let novasenha = usuarioLogado;
           novasenha.senha = senha;
          
      
     userController.update(novasenha,
      function(){
          alert("Sucesso ao mudar senha!Por favor saia e entre em sua conta novamente.")
      },
      function(msg){
          alert("Erro ao mudar senha:"+msg)
  
      }
     )
      },
      
      function (msg) {
          alert("Erro ao mudar senha:" + msg);
      }
          )
    }else{
        alert("Senhas diferentes.")
    }
  
  }
//#endregion

//Espaço que é chamado quando o susário é verificado
$(document).on("userLogged", function () {
    //#region Setting Controllers

        //Variavel userController permite o acesso aos dados dos usuários
        //Obs: olhar js/controller/userController.js
        //Variavel loggedUser permite o acesso aos dados do usuário logado
        //Obs: olhar js/main.js

    //#endregion
    $("#btnConfirm").click(newName);
    $("#btnconfirmsenha").click(newSenha);

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

        //Pegando os dados do usuário logado
        console.log(`O nome do usuário logado é ${loggedUser.nome}`);
});