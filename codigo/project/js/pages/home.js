//João Marcos

var faqController;
var postRatingController;
var postController;

function setTopPost() {
    postController.readAll(
        function (list) {
            if (Array.isArray(list)) {
                let topPost;

                //Get top post
                let topRate = 0;
                list.forEach(function (e, i) {
                    postRatingController.averageRate(e.id,
                        function (tmpRate) {
                            if (tmpRate > topRate) {
                                topPost = e;
                                topRate = tmpRate;
                            }
                        });
                });

                //Set post
                if (typeof topPost == "object") {
                    postController.createPostCard(
                        topPost,
                        userController,
                        postRatingController,
                        function (card) {
                            document.getElementById("postRelevante").innerHTML = card;
                        }
                    );
                } 
            }
        },
        function (msg) {
            alert("Erro ao obter post mais relevante: " + msg);
        }
    )
}

$(document).on("userLogged", function () {

    faqController = new FaqController(faqTable);
    postController = new PostController(postTable);
    postRatingController = new PostRatingController(postRatingTable);

    setTopPost();

    let tela = document.getElementById("fArea");
    let content="";
    faqController.readAll(function(data){
        for(let i=0;i<3;i++) // popula os FAQs com as 3 primeiras perguntas do local storage
        { 
            content += `
            <li>
                <div class="collapsible-header"><i class="material-icons">info_outline</i>${data[i].titulo}</div>
                <div class="collapsible-body"><span>${data[i].texto}</span></div>
            </li>
            `;
            // <div style="margin:30px 30px" class="card">
            //     <div class="card-header" id="heading${i}">
            //         <h2 class="mb-0">
            //             <button class="btn  btn-block text-left" type="button" data-toggle="collapse"
            //                 data-target="#C${i}" aria-expanded="true" aria-controls="C1">
            //                 ${data[i].titulo}
            //             </button>
            //         </h2>
            //     </div>
            //     <div id="C${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#fArea">
            //         <div class="card-body fbody">
            //         ${data[i].texto}
            //             </div>
            //         </div>
            //     </div>
        }
        tela.innerHTML=content;
        console.log("Sucesso");    
    },
    function() {
        console.log("Algo de errado ocorreu");
    });
});
    
    