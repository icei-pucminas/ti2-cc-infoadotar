//#region Tables Keys

const userTable = "TbUser";
const faqTable = "TbFaq";
const passosTable = "TbPasso";
const userPassosTable = "TbUserPasso";
const postTable = "TbPost";
const postRatingTable = "TbPostRating";
const comunidadeTable = "TbComunidade";

//#endregion

const userSessionKey = "UserSession";

//#region PublicVariables

var loggedUser;

//#region Controllers

var userController;

//#endregion

//#endregion

$(document).ready(function () {

    //#region Setting Controllers

    userController = new UserController(userTable, userSessionKey);

    //#endregion

    //Verify if the current page is not the login page or the cadastro page
    if (!window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("cadastro.html")) {

        if (userController.isLoggedIn()) {
            userLoggedEnvironment();
        } else {
            window.location.href = "index.html";
        }
    }
    else {
        userController.logout();
        $(document).trigger("setDevDataBase");
        $(document).trigger("userNotLogged");
    }
});

function userLoggedEnvironment() {

    loggedUser = userController.getLoggedUser();

    $("#pageHeader > .menu-toggle").click(function () {
        if($("#menu").css("display")=="none")
        {
         $("#mainContent").animate({marginLeft: '136'});
         } else $("#mainContent").animate({marginLeft: '0'});
        $('#menu').animate({ width: 'toggle' });
    });

    $("#profileName").text(loggedUser.nome.split(" ")[0]);

    $(document).trigger("userLogged");
}