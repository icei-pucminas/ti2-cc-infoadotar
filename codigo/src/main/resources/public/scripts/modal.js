var modalpost
var modalcriarpost

let conteudo_comunidade
let avaliacoes

responder = (e) => {
	fetch("/postar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            "id": JSON.parse(sessionStorage.getItem("last_post")) + 1,
            "texto": document.getElementById("text-resposta").value,
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

media_avaliacoes = (e) => {
	let ratings = []
	fetch("/avaliacoes", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "manual"
	})
	.then(res => res.json())
	.then(data => {
		// console.log(data)
		sessionStorage.setItem("avaliacoes", JSON.stringify(data))
	})
}

avaliacao_post = (id) => {
	let ratings = JSON.parse(sessionStorage.getItem("avaliacoes"))
	let media
	for(let i of ratings) {
		if(i.post_id == id) {
			media = i.media
			return media
		}
	}
}
openpost = (e) => {
    let email = e.querySelector(".card-title").innerText // email do usuário que fez o post
    let texto = e.querySelector("p").innerText
	let post_id = e.querySelector(".post_idholder").value

    document.getElementById("postemail").innerHTML = email + "<span style=\"font-size: 0.6em; padding-left: 0.5em;\"> postou</span>"
	document.getElementById("posttexto").innerText = texto
	
	document.getElementById("avaliarusuario_email").value = email
	document.getElementById("avaliarpost_id").value = post_id

	media_avaliacoes()

	media = avaliacao_post(post_id)
	document.getElementById("media-avaliacao").innerText = media == undefined ? 0 : (media - Math.floor(media) == 0 ? media : (Math.round(media * 100) / 100).toFixed(2))
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

loadComunidade = () => {
	// let xhr = new XMLHttpRequest()
	// xhr.open("GET", "/comunidade")
	// xhr.onload = conteudoComunidadeGeneral
	// xhr.send()
	fetch("/comunidade", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "manual"
	})  .then(res => res.json())
	    .then(data => {
			sessionStorage.setItem("comunidade", JSON.stringify(data))
			conteudoComunidadeGeneral(data)
	  })
}

conteudoComunidadeGeneral = (posts) => {
	let lastpost_id = Number.MIN_VALUE;
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

loadFAQ = () => {
	fetch("/faq", {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		redirect: "manual"
	})  .then(res => res.json())
	    .then(data => {
			loadComunidade()
			sessionStorage.setItem("faq", JSON.stringify(data))
			conteudoFAQ(data)
	  })
}
loadFAQSearch = (e) => {
	let entrada = e.target.value
	const faq = JSON.parse(sessionStorage.getItem("faq"))

	let conteudo = ""
	if(entrada.length > 0) {
		for(let i of faq) {
			if(i.pergunta.toLowerCase().includes(entrada.toLowerCase())) {
				conteudo += `
				<div class="card card-faq-post">
					<div class="card-content">
					<span class="card-title grey-text text-lighten-2">${i.pergunta}</span>
					<p>${i.resposta}</p>
					</div>
				</div>`;
			}
		}
	} else {
		for(let i of faq) {
			conteudo += `
			<div class="card card-faq-post">
				<div class="card-content">
				<span class="card-title grey-text text-lighten-2">${i.pergunta}</span>
				<p>${i.resposta}</p>
				</div>
			</div>`;
		}
	}
	document.getElementById("faqcontent").innerHTML = conteudo
}
conteudoFAQ = (faq) => {
	let conteudo = ""
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

	loadFAQ()
});