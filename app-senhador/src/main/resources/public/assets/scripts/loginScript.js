function getUser() {
    let email = document.getElementById("inputEmail").value;
    let senha = document.getElementById("inputSenha").value;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaUsuarioValido;
    xhr.onerror = error;
    xhr.open('GET', `/login?email=${email}&senhamestra=${senha}`);
    xhr.send();
}

function verificaUsuarioValido() {
    let status = this.status;

    if (status == 200) {
        window.location.href = "/painel_controle.html";
    } else {
        alert("Usuário e/ou senha incorretos");
    }
    
}

function error(err) {
	console.log('Erro:', err);
}

document.getElementById("btnLogin").addEventListener("click", getUser);

