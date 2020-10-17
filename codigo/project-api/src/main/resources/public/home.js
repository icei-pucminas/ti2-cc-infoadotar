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

loadFAQ = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "/comunidade");
	xhr.onload = conteudoComunidade;
	xhr.send();
}
conteudoComunidade = () => {
	let conteudo = "";
	for(let i=1 ; i < 10 ; i++) {
		conteudo += `
		<div class="card card-post">
			<div id="post${i}" class="modal card">
				<div class="modal-content">
					<h4 class="black-text">Post #${i}</h4>
					<p class="black-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, officiis.</p>
				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-close waves-effect waves-green btn-flat">Fechar</a>
				</div>
			</div>
			<div class="card-content modal-trigger post-preview" data-target="post${i}">
				<span class="card-title grey-text text-lighten-2">Post #${i}</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, officiis.</p>
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
	if(e.target.value.length > 0 || e.target.value != " ") {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `/faq/:${e.target.value}`);
		xhr.onload = conteudoFAQ;
		xhr.send();
	} else loadFAQ();
}
conteudoFAQ = () => {
	let conteudo = "";
	for(let i=1 ; i < 10 ; i++) {
		conteudo += `
		<div class="card card-faq-post">
			<div class="card-content">
			<span class="card-title grey-text text-lighten-2">FAQ #${i}</span>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum, officiis.</p>
			</div>
		</div>`;
	}
	document.getElementById("faqcontent").innerHTML = conteudo;
}

conteudoComunidade();

onload = () => {
	pickBackground();

	if(localStorage.getItem("darkmode_enabled") == undefined) {
		localStorage.setItem("darkmode_enabled", JSON.stringify(switch_darkmode.checked));
	} else {
		let status = JSON.parse(localStorage.getItem("darkmode_enabled"));
		if(status != switch_darkmode.checked) {
			switch_darkmode.checked = status;
			toggleDarkMode(switch_darkmode);
		}
		if(status != switch_darkmode_mobile.checked) {
			switch_darkmode_mobile.checked = status;
			toggleDarkMode(switch_darkmode_mobile);
		}
	}
	
	conteudoFAQ();
}

document.getElementById("togglefaq").onclick = loadFAQ;
document.getElementById("pesquisafaq").oninput = loadFAQSearch;