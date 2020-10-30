
loadComunidade = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/comunidade");
	xhr.onload = conteudoComunidade;
	xhr.send();
}
conteudoComunidade = (e) => {
	let conteudo = "";
	let posts = JSON.parse(e.target.responseText)
	for(let i=0 ; i < posts.length ; i++) {
		conteudo += `
		<div class="card card-post">
			<div id="post${i}" class="modal card">
				<div class="modal-content">
					<h4 class="black-text">${posts[i].usuario_email} postou</h4>
					<p class="black-text">${posts[i].texto}</p>
				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
				</div>
			</div>
			<div class="card-content modal-trigger post-preview" data-target="post${i}">
				<span class="card-title grey-text text-lighten-2">${posts[i].usuario_email}</span>
				<p>${posts[i].texto}</p>
			</div>
		</div>`;
	}
	document.getElementById("comunidade").innerHTML = conteudo;
}
loadComunidade() 

respostaComunidade = (e) => {
	let resposta = "";
	let posts = JSON.parse(e.target.responseText)
	for(let i=0 ; i < posts.length; i++) {
		conteudo += `
		<div class="card card-post">
			<div id="post${i}" class="modal card">
				<div class="modal-content">
					<h4 class="black-text">${posts[i].usuario_email} postou</h4>
					<p class="black-text">${posts[i].texto}</p>
				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
				</div>
			</div>
			<div class="card-content modal-trigger post-preview" data-target="post${i}">
				<span class="card-title grey-text text-lighten-2">${posts[i].usuario_email}</span>
				<p>${posts[i].texto}</p>
			</div>
		</div>`;
	}
	document.getElementById("resposta").innerHTML = conteudo;
}
loadComunidade() 

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

