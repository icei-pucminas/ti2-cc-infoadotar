const switch_darkmode = document.getElementById("toggle_nightmode");
const switch_darkmode_mobile = document.getElementById("toggle_nightmode_mobile");

toggleDarkMode = (which_switch) => {
	if(which_switch.checked) {
		document.body.classList.add("dark");	// body
		let cards = document.getElementsByClassName("card");	// corpo dos cards
		for(i of cards) {
			i.classList.add("dark");
		}
		document.getElementsByClassName("nav-wrapper")[0].classList.add("pink");		// corpo da
		document.getElementsByClassName("nav-wrapper")[0].classList.add("accent-4");	//  navbar

		document.getElementsByClassName("sidenav")[0].classList.add("dark");		// menu lateral
		let card_titles = document.querySelectorAll(".card-title");			// titulo dos cards
		for(i of card_titles) {
			i.classList.remove("grey-text");
		}
		let options = document.querySelectorAll(".card-content > span");		// opções do menu desktop
		for(i of options) {
			i.classList.remove("grey-text");
			i.classList.add("white-text");
		}		// texto do card tip-of-day

		let pink = document.querySelectorAll(".pink-text");					// texto em rosa
		for(i of pink) {
			i.classList.add("white-text");
		}

		let pink_action = document.querySelectorAll(".card-action .pink-text");		// corrigindo os escritos rosa dos cards
		for(i of pink_action) {
			i.classList.remove("white-text");
		}
		// Chart.defaults.global.defaultFontColor = 'whitesmoke';
		localStorage.setItem("darkmode_enabled", JSON.stringify(true));
	}
	else {
		document.body.classList.remove("dark");
		let cards = document.getElementsByClassName("card");
		for(i of cards) {
			i.classList.remove("dark");
		}
		document.getElementsByClassName("nav-wrapper")[0].classList.remove("pink");
		document.getElementsByClassName("nav-wrapper")[0].classList.remove("accent-4");
		
		document.getElementsByClassName("sidenav")[0].classList.remove("dark");
		let card_titles = document.querySelectorAll(".card-title");
		for(i of card_titles) {
			i.classList.add("grey-text");
		}
		let options = document.querySelectorAll(".card-content > span");
		for(i of options) {
			i.classList.remove("white-text");
			i.classList.add("grey-text");
		}
		
		let pink = document.querySelectorAll(".pink-text");
		for(i of pink) {
			i.classList.remove("white-text");
		}
		
		// Chart.defaults.global.defaultFontColor = 'black';
		localStorage.setItem("darkmode_enabled", JSON.stringify(false));
	}
}

switch_darkmode.onchange = () => toggleDarkMode(switch_darkmode);
switch_darkmode_mobile.onchange = () => toggleDarkMode(switch_darkmode_mobile);

pickBackground = () => {
	let x = Math.floor(Math.random() * 6);
	document.body.style.background =  `url(backdrop${x}.jpg)`;
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundPosition = "center";
	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.translate = "translateZ(-999px) scale(2)"	
}

let parallax = document.querySelectorAll("body"),
speed = 0.7;

window.onscroll = function() {
	[].slice.call(parallax).forEach(function(el,i){
		let windowYOffset = window.pageYOffset,
		elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

		el.style.backgroundPosition = elBackgrounPos;
	});
};

openpost = (e) => {
    let email = e.querySelector(".card-title").innerText // o email tem que ser do usuário logado, desse jeito o email ta sendo o de quem fez o post
    let texto = e.querySelector("p").innerText
	let post_id = e.querySelector(".post_idholder").value

    document.getElementById("postemail").innerHTML = email + "<span style=\"font-size: 0.6em; padding-left: 0.5em;\"> postou</span>"
	document.getElementById("posttexto").innerText = texto
	
	document.getElementById("avaliarusuario_email").value = email
	document.getElementById("avaliarpost_id").value = post_id

	let temp = ""
	for(let i=0 ; i < conteudo_comunidade.length ; i++) {
		if(conteudo_comunidade[i].answer_to == post_id) {
			tempo += `
			<div class="card card-post col s12">
				<div class="card-content modal-trigger post-preview">
					<span class="card-title grey-text text-lighten-2">${conteudo_comunidade[i].email}</span>
					<p>${conteudo_comunidade[i].text}</p>
				</div>
			</div>`
		}
	}
	document.getElementById("campo-respostas").innerHTML = temp

    modalpost.open()
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

    modalpost.open()

}
conteudoComunidadeGeneral = (e) => {
	let conteudo = "";
	let posts = JSON.parse(e.target.responseText)
	for(let i=0 ; i < posts.length ; i++) {
		conteudo += `
		<div class="card card-post">
			<div class="card-content post-preview" onclick="openpost(this)">
				<span class="card-title grey-text text-lighten-2">${posts[i].usuario_email}</span>
				<input type="hidden" class="post_idholder" value="${posts[i].id}"/>
				<p>${posts[i].texto}</p>
			</div>
		</div>`;
	}
	document.getElementById("comunidade").innerHTML = conteudo;
}


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

getSession = () => {
	let session = JSON.parse(sessionStorage.getItem("userdata"))
	let xhr = new XMLHttpRequest()
	xhr.open("POST", `/session`)
	// xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = () => {
		let dados = JSON.parse(xhr.responseText)
		for(elem of document.getElementsByClassName("campoNomeUsuario"))
			elem.innerText = dados.nome
		for(elem of document.getElementsByClassName("campoEmailUsuario"))
			elem.innerText = dados.email

	}
	xhr.send(session.email)
}

onload = () => {
	pickBackground()

	if(localStorage.getItem("darkmode_enabled") == undefined) {
		localStorage.setItem("darkmode_enabled", JSON.stringify(switch_darkmode.checked))
	} else {
		let status = JSON.parse(localStorage.getItem("darkmode_enabled"));
		if(status != switch_darkmode.checked) {
			switch_darkmode.checked = status
			toggleDarkMode(switch_darkmode)
		}
		if(status != switch_darkmode_mobile.checked) {
			switch_darkmode_mobile.checked = status
			toggleDarkMode(switch_darkmode_mobile)
		}
	}


	getSession()
}

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
            "answer_to": document.getElementById("answer_to_id").value
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
			document.getElementById("text-resposta").value = ""		// limpa a caixa de texto
	  })
}

document.getElementById("togglefaq").onclick = loadFAQ;
document.getElementById("pesquisafaq").oninput =  loadFAQSearch;


//#endregion

//#region Graphs

Chart.defaults.global.defaultFontColor = 'black';
const ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6'],
        datasets: [{
            label: 'Andamenento',
            data: [100, 60, 20, 35, 15, 25],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//#endregion