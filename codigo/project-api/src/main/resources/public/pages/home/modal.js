var modalpost
var modalcriarpost

let conteudo_comunidade

responder = (e) => {
	fetch("/postar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "id": JSON.parse(sessionStorage.getItem("last_post")) + 1,
            "texto": document.getElementById("text-resposta").value,
            "usuario_email": document.getElementById("email_crarpost").value,
            "answer_to": document.getElementById("avaliarpost_id").value
		}),
		redirect: "manual"
	})  .then(res => res.json())
	    .then(data => {
			if(data.status == 200) {
				alert("Postagem realizada com sucesso!")
			} else {
				alert("Algum erro ocorreu durante a criação da postagem.")
			}
			loadComunidade()	// recarrega a comunidade
			preencherRespostas()
			document.getElementById("text-resposta").value = ""		// limpa a caixa de texto
	  })
}

postar = (e) => {
	fetch("/postar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "id": JSON.parse(sessionStorage.getItem("last_post")) + 1,
            "texto": document.getElementById("text-post").value,
            "usuario_email": document.getElementById("email_crarpost").value,
            "answer_to": null
		}),
		redirect: "manual"
	})  .then(res => res.json())
	    .then(data => {
			modalcriarpost.close() // fecha o modal
			if(data.status == 200) {
				alert("Postagem realizada com sucesso!")
			} else {
				alert("Algum erro ocorreu durante a criação da postagem.")
			}
			loadComunidade()	// recarrega a comunidade
			document.getElementById("text-post").value = ""		// limpa a caixa de texto
	  })
}

avaliar = (e) => {
	fetch("/avaliar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "usuario_email": document.getElementById("avaliarusuario_email").value, //email,
            "post_id": document.getElementById("avaliarpost_id").value,
            "nota": document.getElementById("nota").value
		}),
		redirect: "manual"
	})  .then(res => res.json())
	    .then(data => {
			modalpost.close()
			if(data.status == 200) {
				alert("Postagem avaliada com sucesso!")
			} else {
				alert("Algum erro ocorreu durante a avaliação da postagem.")
			}
	  })
}

loadComunidade = () => {
	let xhr = new XMLHttpRequest()
	xhr.open("GET", "/comunidade")
	xhr.onload = conteudoComunidadeGeneral
	xhr.send()
}
openpost = (e) => {
    let email = e.querySelector(".card-title").innerText // o email tem que ser do usuário logado, desse jeito o email ta sendo o de quem fez o post
    let texto = e.querySelector("p").innerText
	let post_id = e.querySelector(".post_idholder").value

    document.getElementById("postemail").innerHTML = email + "<span style=\"font-size: 0.6em; padding-left: 0.5em;\"> postou</span>"
	document.getElementById("posttexto").innerText = texto
	
	document.getElementById("avaliarusuario_email").value = email
	document.getElementById("avaliarpost_id").value = post_id

	preencherRespostas()

    modalpost.open()
}

preencherRespostas = () => {
	let post_id = document.getElementById("avaliarpost_id").value
	let temp = ""
	for(let i=0 ; i < conteudo_comunidade.length ; i++) {
		if(conteudo_comunidade[i].answer_to == post_id) {
			temp += `
			<div class="card card-post col s12">
				<div class="card-content modal-trigger post-preview">
					<span class="card-title grey-text text-lighten-2">${conteudo_comunidade[i].usuario_email}</span>
					<p>${conteudo_comunidade[i].texto}</p>
				</div>
			</div>`
		}
	}
	document.getElementById("campo-respostas").innerHTML = temp
}

conteudoComunidadeGeneral = (e) => {
	let lastpost_id = Number.MIN_VALUE;
	let posts = JSON.parse(e.target.responseText)
	conteudo_comunidade = posts
	let conteudo = ""
	for(let i=posts.length-1 ; i >= 0 ; i--) {
		if(conteudo_comunidade[i].answer_to == null) {
			conteudo += `
			<div class="card card-post">
				<div class="card-content post-preview" onclick="openpost(this)">
					<span class="card-title grey-text text-lighten-2">${posts[i].usuario_email}</span>
					<input type="hidden" class="post_idholder" value="${posts[i].id}"/>
					<p>${posts[i].texto}</p>
				</div>
			</div>`;
		}
		if(posts[i].id > lastpost_id) lastpost_id = posts[i].id
	}
	document.getElementById("comunidade").innerHTML = conteudo;
	sessionStorage.setItem("last_post", JSON.stringify(lastpost_id))
}

// conteudoComunidade = (e) => {
// 	let conteudo = "";
// 	let posts = JSON.parse(e.target.responseText)
// 	for(let i=0 ; i < posts.length ; i++) {
// 		conteudo += `
// 		<div class="card card-post">
// 			<div id="post${i}" class="modal card">
// 				<div class="modal-content">
// 					<h4 class="black-text">${posts[i].usuario_email} postou</h4>
//                     <div>
//     					<p class="black-text">${posts[i].texto}</p>
//                         <span class="rating-area">
//                             <span class="card-title grey-text">Avalie esse post</span>
//                             <form id="avalicao${posts[i].id}" onsubmit="avaliar()">
//                                 <p class="range-field">
//                                     <input type="range" name="nota" id="nota${posts[i].id}" value="1" min="1" max="5" oninput="this.nextElementSibling.value = 'Nota: ' + this.value + '/5'"/>
//                                     <output for="nota${posts[i].id}" class="grey-text">Nota: 1/5</output>
//                                 </p>
//                             </form>
//                             <div class="center-align">
//                                 <button class="btn waves-effect waves-light" id="avaliar${posts[i].id}" type="submit" name="action">Avaliar
//                                     <i class="material-icons right">send</i>
//                                 </button>
//                             </div>
//                         </span>
//                     </div>
//                 </div>
// 				<div class="modal-footer">
// 					<a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
// 				</div>
// 			</div>
// 			<div class="card-content modal-trigger post-preview" data-target="post${i}">
// 				<span class="card-title grey-text text-lighten-2">${posts[i].usuario_email}</span>
// 				<p>${posts[i].texto}</p>
// 			</div>
// 		</div>`;
// 	}
// 	document.getElementById("comunidade").innerHTML = conteudo;
// }

loadFAQ = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/faq");
	xhr.onload = conteudoFAQ;
	xhr.send();
}
loadFAQSearch = (e) => {
	let entrada = e.target.value;
	if(entrada.length > 0 || entrada != " ") {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", entrada.length == 0 ? "/faq" : `/faq/${entrada}`);
		xhr.onload = conteudoFAQ;
		xhr.send();
	} else loadFAQ();
}
conteudoFAQ = (e) => {
	let conteudo = "";
	let faq = JSON.parse(e.target.responseText)
	for(let i=0 ; i < faq.length ; i++) {
		conteudo += `
		<div class="card card-faq-post">
			<div class="card-content">
			<span class="card-title grey-text text-lighten-2">${faq[i].pergunta}</span>
			<p>${faq[i].resposta}</p>
			</div>
		</div>`;
	}
	document.getElementById("faqcontent").innerHTML = conteudo;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal')
    var instances = M.Modal.init(elems)

    modalpost = M.Modal.getInstance(document.getElementById("postmodal"))
    modalcriarpost = M.Modal.getInstance(document.getElementById("addpost"))

    loadComunidade()
});

document.getElementById("email_crarpost").value = JSON.parse(sessionStorage.getItem("userdata")).email
document.getElementById("email_responder").value = JSON.parse(sessionStorage.getItem("userdata")).email

// conteudoComunidadeGeneral()