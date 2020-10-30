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
	document.body.style.background =  `url(../../img/backdrop${x}.jpg)`;
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

document.getElementById("togglefaq").onclick = loadFAQ;
document.getElementById("pesquisafaq").oninput =  loadFAQSearch;
