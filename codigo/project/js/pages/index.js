//#region Controllers

var faqController;
var passoController;
var comunidadeController;

//#endregion

//Verifica se o usuário com o nome e senha informados existe e 
//se sim retorna-o pela funçao success
function ValidarUsuario(nome, email, success, error) {
    userController.filter(
        function (item) { return item.nome == nome && item.email == email.toLowerCase(); },
        function (userList) {
            if (userList.length > 0) {
                success(userList[0]);
            } else {
                error("Nome e/ou Email incorreto(s), tente novamente");
            }
        },
        function () { error("Nome e/ou Email incorreto(s), tente novamente") }
    );
}

//Altera a senha do usuário do modelo informado
function AlteraSenha(userModel, novaSenha, confirmaSenha, success, error) {
    if(novaSenha !== confirmaSenha) {
        error("Senhas não batem, tente novamente")
    } else {
        let userNovaSenha = userModel;
        userNovaSenha.senha = novaSenha;
        userController.update(
            userNovaSenha,
            function () { success(); },
            function (msg) { error("Erro ao alterar a senha: " + msg); }
        );
    }
}

//Fecha o modal e limpa os campos
function FecharEsqueciMinhaSenhaModal() {
    $("#esqueciMinhaSenhaEmailInput").val("");
    $("#esqueciMinhaSenhaNomeInput").val("");
    $("#esqueciMinhaSenhaSenhaInput").val("");
    $("#esqueciMinhaSenhaConfirmsenhaInput").val("");

    $("#esqueciMinhaSenhaModal").modal("hide");
}

$(document).on("userNotLogged", function () {
    //Gatilho para altear a senha
    $("#esqueciMinhaSenhaForm").submit(function (e) {
        e.preventDefault();
        ValidarUsuario(
            $("#esqueciMinhaSenhaNomeInput").val(),
            $("#esqueciMinhaSenhaEmailInput").val(),
            function (user) {
                AlteraSenha(
                    user,
                    $("#esqueciMinhaSenhaSenhaInput").val(),
                    $("#esqueciMinhaSenhaConfirmsenhaInput").val(),
                    function () { alert("Senha alterada com sucesso!"); FecharEsqueciMinhaSenhaModal(); },
                    function (msg) { alert(msg); }
                );
            },
            function (msg) { alert(msg); }
        );
    });
});

$(document).ready(function () {
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        userController.login(
            $("#loginFormEmail").val().toLowerCase(),
            $("#loginFormPassword").val(),
            function () {
                window.location.href = "home.html"
            },
            function (msg) {
                alert(msg);
            }
        )
    });
});

$(document).on("setDevDataBase", function () {
    //#region Setting Controllers

    faqController = new FaqController(faqTable);
    passoController = new PassoController(passosTable);
    comunidadeController = new ComunidadeController(comunidadeTable);

    //#endregion

    let countError = 0;

    $.getJSON("../js/devDataBase.json", function (data) {

        //Criando Usuários
        let createUsers = function () {
            data.TbUser.forEach(function (val) {
                userController.create(val, function () { }, function () { countError++; })
            });
        }

        userController.readAll(
            function (list) {
                if (list.length == 0) {
                    createUsers();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });


        //Criando Itens da FAQ
        let createFaq = function () {
            data.TbFaq.forEach(function (val) {
                faqController.create(val, function () { }, function () { countError++; })
            });
        }

        faqController.readAll(
            function (list) {
                if (list.length == 0) {
                    createFaq();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });

        //Criando Passos
        let createPassos = function () {
            data.TbPasso.forEach(function (val) {
                passoController.create(val, function () { }, function () { countError++; })
            });
        }

        passoController.readAll(
            function (list) {
                if (list.length == 0) {
                    createPassos();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });

        //Criando Comunidades
        let createComunidade = function () {
            data.TbComunidade.forEach(function (val) {
                comunidadeController.create(val, function () { }, function () { countError++; })
            });
        }

        comunidadeController.readAll(
            function (list) {
                if (list.length == 0) {
                    createComunidade();
                }
            },
            function (msg) {
                alert("Erro na criação do banco de dados de teste: " + msg)
            });
    }
    ).done(function () {
        if (countError > 0) {
            alert("Ocorreram " + countError + " erro(s) na criação do banco de dados de teste");
        }
    });
});