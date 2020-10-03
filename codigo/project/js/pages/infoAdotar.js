//#region Controllers

var postRatingController;
var postController;

//#endregion

function setTopPost(post) {
    postController.createPostCard(
        post,
        userController,
        postRatingController,
        function (card) {
            document.getElementById("postRelevante").innerHTML = card;
        }
    );
}

function setPosts(posts) {
    posts.forEach(
        function (item) {
            postController.createPostCard(item, userController, postRatingController,
                function (card) {
                    let html = document.getElementById("postList").innerHTML;
                    document.getElementById("postList").innerHTML = html +
                        `<li>${card}</li>`;
                }
            )
        }
    )
}

function listarPosts() {
    postController.readAll(
        function (list) {
            if (Array.isArray(list)) {
                let posts, topPost;

                //Get top post
                let topRate = 0, topPostIndex;
                list.forEach(function (e, i) {
                    postRatingController.averageRate(e.id,
                        function (tmpRate) {
                            if (tmpRate > topRate) {
                                topPost = e;
                                topRate = tmpRate;
                                topPostIndex = i;
                            }
                        });
                });

                //Get posts
                list.splice(topPostIndex, 1);

                //Set posts
                if (typeof topPost == "object")
                    setTopPost(topPost);

                if (list.length > 0)
                    setPosts(list);
            }
        },
        function (msg) {
            alert("Erro ao listar posts: " + msg);
        }
    )
}

function createPost(event) {
    event.preventDefault();

    let titulo = $("#postTituloInput").val();
    let texto = $("#postTextoInput").val();
    let limpar = function () {
        $("#postTituloInput").val("");
        $("#postTextoInput").val("");
        $("#escreverPostModal").modal("hide");
    }

    postController.create(
        new Post(loggedUser.id, titulo, texto),
        function () { alert("Post cadastrado com sucesso! Recarregue a página para vê-lo"); limpar(); },
        function (msg) { alert("Erro ao cadastrar post: " + msg); }
    )
}

//Espaço que é chamado quando o susário é verificado
$(document).on("userLogged", function () {
    //#region Setting Controllers

    postController = new PostController(postTable);
    postRatingController = new PostRatingController(postRatingTable);

    //#endregion

    listarPosts();

    $("#postForm").submit(function (e) { createPost(e) });
});