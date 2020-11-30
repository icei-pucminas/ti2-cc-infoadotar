const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;
let loginHeight = document.getElementById("login").clientHeight;
let cadastroHeight = document.getElementById("cadastro").clientHeight;
let userState = 0;
window.onresize = () => {
    loginHeight = document.getElementById("login").clientHeight;
    cadastroHeight = document.getElementById("cadastro").clientHeight;
    if(userState == 1) 
    {
        anime({
            targets: '#cadastro',
            translateY: - cadastroHeight,
        });
    }
}

signUp = () => {
    userState = 1;
    anime({
        targets: '#cadastro',
        translateY: - cadastroHeight,
        easing: 'easeOutExpo'
    });
    // document.getElementsByClassName("painel-lateral")[0].style.background = `url("backdrop5.jpg")`;
}
signIn = () => {
    userState = 0;
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

cadastroEnviado = (event) => {
    event.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "/cadastrarUsuario");

	let formData = new FormData(document.getElementById("form-cadastro"));
	let temp = {};
	formData.forEach((value, key) => {temp[key] = value});
	let json = JSON.stringify(temp);

	xhr.onload = function (e) {
		let resposta = JSON.parse(e.target.response);
		// e.preventDefault()

		if(resposta.status == 200) {
			// login deu certo
            signIn();
            alert("Cadastro efetuado com sucesso!");
		} else if(resposta.status == 400) {
			// senha incorreta
			alert("Email já cadastrado.");
		} else {
			// erro desconhecido
			alert("Erro desconhecido. Pedimos desculpas pelo inconveniente.");
		}
	}

	xhr.send(json)
}

document.getElementById("form-cadastro").addEventListener("submit", cadastroEnviado);

onload = () => {
    document.getElementById("submitlogin").disabled = true;
    document.getElementById("submitcadastro").disabled = true;
}