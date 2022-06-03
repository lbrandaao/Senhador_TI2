function verifyPassword() {  
  var pw = document.getElementById("pswd").value;  
  var cpw = document.getElementById("cpswd").value;
     
   //minimum password length validation  
  if(pw.length < 8) {  
    document.getElementById("message").innerHTML = "**Senha deve ter pelo menos 8 caracteres";  
    return false;  
  }  
    
  //maximum length of password validation  
  if(pw.localeCompare(cpw)!=0){
    document.getElementById("message").innerHTML = "**Senhas devem ser iguais";
    return false;
  }
  else{
    document.getElementById("message").innerHTML = "";
  }
}

function error(err){
	console.log('Erro',err);
}

let email;
let senha;
let plano;

function getInfo(){
  email = document.getElementById("email").value;
  senha = document.getElementById("pswd").value;
  plano = document.getElementById("plano").value;
  let xhr = new XMLHttpRequest();
  xhr.onload = validateNewUser;
  xhr.onerror = error;
  xhr.open('GET',`/usuariobyemail?email=${email}`);
  xhr.send();
}

function validateNewUser(){
  let status = this.status;
  if(status!=404){
    alert("usuario ja existe");
    document.getElementById("message").innerHTML = "**Usuario já existe";
  }
  else{
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmInsert;
    xhr.onerror = error;
    xhr.open('POST',`/usuario/insert?email=${email}&senhamestra=${senha}&plano=${plano}`);
    xhr.send();

  }
}

function confirmInsert() {
	let status = this.status;
	
	if (status == 201) {
		alert("Conta criada com sucesso!");
    	window.location.href = "painel_controle.html";
	}
	
	else {
		alert("Ocorreu um erro ao criar sua conta.");
	}
	
}