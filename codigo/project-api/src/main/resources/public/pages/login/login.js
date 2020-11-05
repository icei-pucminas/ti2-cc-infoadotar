const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;
const loginHeight = document.getElementById("login").clientHeight;
const cadastroHeight = document.getElementById("cadastro").clientHeight;

signUp = () => {

    anime({
        targets: '#cadastro',
        translateY: - cadastroHeight,
        easing: 'easeOutExpo'
    });
    // document.getElementsByClassName("painel-lateral")[0].style.background = `url("backdrop5.jpg")`;
}
signIn = () => {

    anime({
        targets: '#cadastro',
        translateY: (clientHeight - cadastroHeight),
        duration: 700,
        easing: 'easeInSine'
    });
    // document.getElementsByTagName("painel-lateral")[0].style.background = `url("backdrop4.jpg")`;
}

document.getElementById("changetocreate").onclick = () => signUp();
document.getElementById("_changetocreate").onclick = () => signUp();

document.getElementById("changetologin").onclick = () => signIn();
document.getElementById("_changetologin").onclick = () => signIn();


let validEmail = false;
let validSenha = false;
let validSenhasIguais = false;
let notEmpty = false;

checkEmpty = (e) => {
    if(e.target.value.length < 4) {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "red"
        }
        notEmpty = false;
    } else {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "green"
        }
        notEmpty = true;
    }
}
checkEmail = (e) => {
    if(e.target.value.indexOf('@') == -1 || e.target.value.indexOf('.') == -1 || e.target.value.length < 4) {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "red"
        }
        validEmail = false;
    } else {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "green"
        }
        validEmail = true;
    }
}
checkSenha = (e) => {
    if(e.target.value.length < 5) {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "red"
        }
        validSenha = false;
    } else {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "green"
        }
        validSenha = true;
    }
}
checkSenhasIguais = (e) => {
    let senha = document.getElementById("cadastro_senha").value;
    let confirmacao = document.getElementById("cadastro_confirmarsenha").value;
    if(confirmacao != senha) {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "red"
        }
        validSenhasIguais = false;
        document.getElementById("aviso-senha").innerHTML = "<small>As senhas não se coincidem.</small>";
    } else {
        for(i of document.getElementsByClassName("active")) {
            i.style.color = "green"
        }
        validSenhasIguais = true;
        document.getElementById("aviso-senha").innerHTML = "";
    }
}


document.getElementById("login_email").oninput = checkEmail;
document.getElementById("login_senha").oninput = checkSenha;

document.getElementById("cadastro_nome").oninput = checkEmpty;
document.getElementById("cadastro_email").oninput = checkEmail;
document.getElementById("cadastro_senha").oninput = checkSenha, checkSenhasIguais;
document.getElementById("cadastro_confirmarsenha").oninput = checkSenhasIguais;

saveSessionStorage = (key, value) => {
	console.log(key, value)
	if(JSON.parse(sessionStorage.getItem(key)) == null || value != null) {
		sessionStorage.setItem(key, JSON.stringify(value))
	} else saveSessionStorage(key);
}
saveSessionStorage = (key, value) => {
	return JSON.parse(sessionStorage.getItem(key))
}

document.body.oninput = () => {
    document.getElementById("submitlogin").disabled = ! (validSenha && validEmail);
    document.getElementById("submitcadastro").disabled = ! (validSenha && validEmail && validSenhasIguais && notEmpty);
}

cadastroEnviado = () => {
	let xhr = new XMLHttpRequest()
	xhr.open("POST", "/cadastro-auth")

	let formData = new FormData(document.getElementById("form-cadastro"))
	let temp = {};
	formData.forEach((value, key) => {temp[key] = value});
	let json = JSON.stringify(temp);

	xhr.onload = function (e) {
		let resposta = JSON.parse(e.target.response);
		// e.preventDefault()

		if(resposta.status == 200) {
			// login deu certo
			sessionStorage.setItem("userdata", json)
			window.location.href = "../home/home.html"
		} else if(resposta.status == 400) {
			// senha incorreta
			alert("Email já cadastrado.")
			window.location.href = "login.html"
		} else {
			// erro desconhecido
			alert("Erro desconhecido. Pedimos desculpas pelo inconveniente.")
			window.location.href = "login.html"
		}
	}

	xhr.send(json)
}
loginEnviado = () => {
	let xhr = new XMLHttpRequest()
	xhr.open("POST", "/login-auth")

	let formData = new FormData(document.getElementById("form-login"))
	let temp = {};
	formData.forEach((value, key) => {temp[key] = value});
	let json = JSON.stringify(temp);

	xhr.onload = function (e) {
		let resposta = JSON.parse(e.target.response);
		// e.preventDefault()

		if(resposta.status == 200) {
			// login deu certo
			
			sessionStorage.setItem("userdata", json)
			window.location.href = "../home/home.html"
		} else if(resposta.status == 403) {
			// senha incorreta
			alert("Senha incorreta")
			window.location.href = "login.html"
		} else if(resposta.status == 400) {
			// usuário não encontrado
			alert("Usuário não encontrado")
			window.location.href = "login.html"
		} else {
			// erro desconhecido
			alert("Erro desconhecido. Pedimos desculpas pelo inconveniente.")
			window.location.href = "login.html"
		}
	}

	xhr.send(json)
}
document.getElementById("form-cadastro").addEventListener("submit", cadastroEnviado);
document.getElementById("form-login").addEventListener("submit", loginEnviado);

onload = () => {
    document.getElementById("submitlogin").disabled = true;
    document.getElementById("submitcadastro").disabled = true;
}