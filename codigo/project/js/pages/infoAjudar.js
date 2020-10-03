//#region Controllers

var faqController;
var passoController;
var userPassoController;

//#endregion

$(document).on("userLogged", function () {
    //#region Setting Controllers

    faqController = new FaqController(faqTable);
    passoController = new PassoController(passosTable);
    userPassoController = new UserPassoController(userPassosTable);

    //#endregion

    faqController.readAll(
        function (list) {
            list.forEach(function (val) {
                $("#faqCard > .card-body").append(faqController.createFaqQuestionCard(val));
            });
        },
        function (msg) {
            alert("Erro ao buscar items da FAQ: " + msg);
        });

    //#region Passos Implementation

    //Update Passos
    function GetPassos(callback) {
        if (typeof callback == 'function') {
            passoController.readAll(
                function (fullList) {
                    userPassoController.filter(
                        function (e) { return e.idUser == loggedUser.id; },
                        function (userList) {
                            if (Array.isArray(userList) && Array.isArray(fullList)) {
                                callback(fullList, userList);
                            }
                            else { alert("Erro ao buscar passos concluídos"); }
                        },
                        function (msg) { alert("Erro ao buscar passos concluídos: " + msg); }
                    );
                },
                function (msg) {
                    alert("Erro ao buscar passos: " + msg);
                }
            );
        }
    }

    GetPassos(function (fullList, userList) {

        //Write passos inside carousel
        fullList.forEach(function (val, i) {
            $("#stepsCarousel > .carousel-indicators")
                .append(`<li data-target="#stepsCarousel" data-slide-to="${i}"></li>`);
            $("#stepsCarousel > .carousel-inner")
                .append(
                    '<div class="carousel-item">' +
                    passoController.createCarouselStepCard(val, i + 1) +
                    '</div>');
            $("#progressSummary .progress-labels")
                .append(`<span class="progress-label-item">Passo ${i + 1}</span>`);
        });

        $("#stepsCarousel > .carousel-indicators > *:first-child").addClass('active');
        $("#stepsCarousel > .carousel-inner > *:first-child").addClass('active');

        //Set progress width
        let size = (userList.length / fullList.length) * 100;
        $("#passosProgress").attr("aria-valuenow", size);
        $("#passosProgress").css("width", `${size}%`);

        $(".step-checkbox").each(function () {
            let chkBox = $(this);
            if(userList.find(function(e) {return e.idPasso == chkBox.val();})) {
                chkBox.prop('checked', true);
            }
        })
    });

    function UpdateProgress() {
        GetPassos(function (fullList, userList) {
            let size = (userList.length / fullList.length) * 100;
            $("#passosProgress").attr("aria-valuenow", size);
            $("#passosProgress").animate({ width: `${size}%`});
        });
    }

    //Passos checkboxes Controller
    $(".step-checkbox").click(function (e) {
        let chkBox = e.target;

        if (!chkBox.checked) {

            //create new userPasso if the checkbos wasn't checked
            userPassoController.filter(
                //find the userPasso with the idPasso equals to the checkbox value
                //and idUser equals to the logged user id
                function (e) { return e.idPasso == Number(chkBox.value) && e.idUser == loggedUser.id; },
                //if it was foud
                function (list) {
                    if (Array.isArray(list) ? list.length > 0 : false) {
                        //delete that userPasso
                        userPassoController.delete(list[0].id,
                            //update the page
                            function () {
                                UpdateProgress();
                            },
                            function (msg) { alert("Erro ao retirar passo: " + msg); }
                        );
                    }
                    else { alert("Erro ao buscar passo retirado"); }
                },
                //if occurs an error
                function (msg) { alert("Erro ao buscar passo retirado: " + msg); }
            );

        } else {
            //create new userPasso if the checkbos wasn't checked
            userPassoController.create(
                new UserPasso(loggedUser.id, Number(chkBox.value)),
                //update the page
                function () {
                    UpdateProgress();
                },
                function (msg) { alert(msg); });
        }
    });

    //#endregion

    $("#faqPesquisaDiv button").click(function () {
        $("#faqCard > .card-body")
            .children()
            .hide()
            .toArray()
            .forEach(function (v) {
                let jv = $(v);
                if (jv.text().toLowerCase().includes(
                    $("#faqPesquisaDiv input").val()
                ))
                    jv.show();
            });
    });
});