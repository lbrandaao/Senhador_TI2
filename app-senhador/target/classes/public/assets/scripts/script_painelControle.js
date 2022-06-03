/**
 * @author Leonardo Barbosa Brandão
 * Ciência da Computação - PUC-Minas - COREU
 */

/**
 * Abstrações
 */

// Abstração do Token recebido correspondente 
// ao usuário logado. Neste caso, o Token é o ID 1
var Token = 1;

/////////////////////////////////////////////////////////////////////
/**
 * Funcionalidades para Senhas Cadastradas do usuário logado
 */

/**
 * Method that makes a request for user's passwords
 */
 function getSenhas() {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaSecaoSenhas;
    xhr.onerror = error;
    xhr.open('GET', `/senha/usuario/${Token}`);
    xhr.send();
}

/**
 * Method that treats the request response for user's passwords 
 */
function montaSecaoSenhas() {
    let senhas = JSON.parse( this.responseText );
    let section = document.getElementById("section-data");
    section.innerHTML = `
        <h2 class="section-name row">Senhas</h2>
            <div class="section-content container" id="section-content-passwords">
                
            </div>
            <div class="div-btn-newdata row">
                <button class="btn col-2" type="button" id="btnNewSenha">Inserir nova Senha</button>
            </div>
            <div class="div-input-data row" id="div-input-data"></div>
            <div class="div-generate-password row">
            	<h3 class="text-generate-password col-12">Clique no Gerador de Senhas para Gerar uma Senha Forte</h3>
            	<input type="text" class="col-5" id="generated-password">
            	<button class="btn btn-primary col-4" id="btnGeneratePassword" type="button" onclick="generatePassword()">Gerar Senha</button>
            </div>
    `
    
    let section_content = document.getElementById("section-content-passwords");
    

    senhas.forEach((senha) => {
        section_content.innerHTML += `
            <div class="data-row row">
                <div class="col-2 div-application"><span class="application">${senha.aplicacao}</span></div>
                <div class="col-6 div-value">
                    <span class="value">${senha.valor}</span>
                </div>
                <div class="div-btn col-3">
                    <button class="btn edit-btn-password" type="button" alt="${senha.id_senha}">Editar</button>
                    <i class="fas fa-window-close remove-icon" alt="${senha.id_senha}"></i>
                </div>
            </div>               
        `
    })

    // Edit Button settings
    let edit_items = document.querySelectorAll(".edit-btn-password");
    edit_items.forEach((i) => {
        i.addEventListener('click', getSenhaToUpdate);
    })

    // Removal Senha Button Settings
    let remove_items = document.querySelectorAll(".remove-icon");
    remove_items.forEach((i) => {
        i.addEventListener('click', removeSenha);
    })

    // New Senha Button settings
    document.getElementById("btnNewSenha").addEventListener("click", montaDivNovaSenha); 
}

function removeSenha() {
    let pkSenha = Token+"-"+this.getAttribute("alt");

    let confirm_removal = confirm("Tem certeza que deseja remover esta senha?");

    if (confirm_removal) {
        let xhr = new XMLHttpRequest();
        xhr.onload = confirmedSenhaRemoval;
        xhr.onerror = error;
        xhr.open('GET', `/senha/delete/${pkSenha}`);
        xhr.send();
    }
}

function confirmedSenhaRemoval(){
    alert("Senha removida com sucesso.");
    getSenhas();
}

/**
 * Method that adds a new password section
 */
 function montaDivNovaSenha() {
    let section = document.getElementById("div-input-data");
    section.innerHTML = `
        <div class="col-3 div-application">
            <label for="aplicacao">Aplicação</label>
            <input type="text" class="application" name="aplicacao" id="aplicacao">
        </div>
        <div class="col-6 div-value">
            <label for="valor">Valor</label>
            <input type="text" class="value" name="valor" id="valor">
        </div>
        <div class="div-btn col-2">
            <button class="btn btn-warning" type="button" id="btnInsertSenha">Salvar</button>
        </div>
    `

    // Insert Button settings
    document.getElementById("btnInsertSenha").addEventListener("click", insertSenha);
}

function insertSenha() {
    let aplicacao = document.getElementById("aplicacao").value;
    let valor = document.getElementById("valor").value;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmSenhaInsert;
    xhr.onerror = error;
    xhr.open('POST', `/senha/insert?id_usuario=${Token}&aplicacao=${aplicacao}&valor=${valor}`);
    xhr.send();
}

function confirmSenhaInsert() {
    if (this.status == 201) {
        alert("Senha Inserida com sucesso!");
        getSenhas();
    }
    else {
        alert("Não foi possível inserir a senha nova.");
    }
}

/**
 * Method that makes a request for one instances on senha table
 */
 function getSenhaToUpdate() {
    let pkSenha = Token+"-"+this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = montaDivUpdateSenha;
    xhr.onerror = error;
    xhr.open('GET', `/senha/${pkSenha}`);
    xhr.send();
}

/**
 * Method that adds a edition password section
 */
function montaDivUpdateSenha() {
    let senha = JSON.parse( this.responseText );
    //let senha = senhas[0];

    let section = document.getElementById("div-input-data");
    section.innerHTML = `
        <div class="col-3 div-application">
            <label for="aplicacao">Aplicação</label>
            <input type="text" class="application" name="aplicacao" id="aplicacao" value="${senha.aplicacao}" placeholder="${senha.aplicacao}">
        </div>
        <div class="col-6 div-value">
            <label for="valor">Valor</label>
            <input type="text" class="value" name="valor" id="valor" value="${senha.valor}" placeholder="${senha.valor}">
        </div>
        <div class="div-btn col-2">
            <button class="btn btn-warning" type="button" id="btnUpdateSenha" alt="${senha.id_senha}">Salvar</button>
        </div>
    `

    // Update Button settings
    document.getElementById("btnUpdateSenha").addEventListener("click", updateSenha);
}

function updateSenha() {
    let pkSenha = Token+"-"+this.getAttribute("alt");
    let aplicacao = document.getElementById("aplicacao").value;
    let valor = document.getElementById("valor").value;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmSenhaUpdate;
    xhr.onerror = error;
    xhr.open('POST', `/senha/update/${pkSenha}?aplicacao=${aplicacao}&valor=${valor}`);
    xhr.send();
}

function confirmSenhaUpdate() {
    if (this.status == 200) {
        alert("Senha Atualizada com sucesso!");
        getSenhas();
    }
    else {
        alert("Não foi possível atualizar a senha");
    }
}

/////////////////////////////////////////////////////////////////////
/**
 * Funcionalidades para Cartões Cadastradoss do usuário logado
 */

/**
 * Method that makes a request for the user's cards
 */
 function getCartoes() {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaSecaoCartoes;
    xhr.onerror = error;
    xhr.open('GET', `/cartao/usuario/${Token}`);
    xhr.send();
}

/**
 * Method that treats the request response for user's cards
 */
function montaSecaoCartoes() {
    let cartoes = JSON.parse( this.responseText );
    let section = document.getElementById("section-data");
    section.innerHTML = `
            <h2 class="section-name row">Cartões</h2>
            <div class="section-content container" id="section-content-cartoes">
                
            </div>
            <div class="div-btn-newdata row">
                <button class="btn col-2" type="button" id="btnNewCartao">Inserir novo Cartão</button>
            </div>
            <div class="div-input-data input-cartao row" id="div-input-data"></div>
    `
    
    let section_content = document.getElementById("section-content-cartoes");
    

    cartoes.forEach((cartao) => {
        let data = new Date(cartao.data_validade);
        let data_formatada = data.getFullYear()+"-"+(((data.getMonth()+1) < 10)?"0"+(data.getMonth()+1):(data.getMonth()+1));
        section_content.innerHTML += `
            <div class="data-row row">
                <div class="col-2 div-number"><span class="number">${cartao.numero}</span></div>
                <div class="col-3 div-nome-impresso">
                    <span class="nome_impresso">${cartao.nome_impresso}</span>
                </div>
                <div class="col-2 div-data-validade">
                    <span class="data-validade">${data_formatada}</span>
                </div>
                <div class="col-1 div-numero-seguranca">
                    <span class="numero-seguranca">${cartao.numero_seguranca}</span>
                </div>
                <div class="div-btn col-3">
                    <button class="btn edit-btn-cartao" type="button" alt="${cartao.id_cartao}">Editar</button>
                    <i class="fas fa-window-close remove-icon" alt="${cartao.id_cartao}"></i>
                </div>
            </div>               
        `
    })

    // Edit Button settings
    let edit_items = document.querySelectorAll(".edit-btn-cartao");
    edit_items.forEach((i) => {
        i.addEventListener('click', getCartaoToUpdate);
    })

    // Removal Cartão Button Settings
    let remove_items = document.querySelectorAll(".remove-icon");
    remove_items.forEach((i) => {
        i.addEventListener('click', removeCartao);
    })

    // New Cartão Button settings
    document.getElementById("btnNewCartao").addEventListener("click", montaDivNovoCartao); 
}

function removeCartao() {
    let pkCartao = Token+"-"+this.getAttribute("alt");

    let confirm_removal = confirm("Tem certeza que deseja remover este cartao?");

    if (confirm_removal) {
        let xhr = new XMLHttpRequest();
        xhr.onload = confirmedCartaoRemoval;
        xhr.onerror = error;
        xhr.open('GET', `/cartao/delete/${pkCartao}`);
        xhr.send();
    }
}

function confirmedCartaoRemoval(){
    alert("Cartão removido com sucesso.");
    getCartoes();
}

/**
 * Method that adds a new card section
 */
 function montaDivNovoCartao() {
    let section = document.getElementById("div-input-data");
    section.innerHTML = `
        <div class="row">
            <div class="col-5 div-numero">
                <label for="numero">Número</label>
                <input type="text" class="numero" name="numero" id="numero">
            </div>
            <div class="col-5 div-nome-impresso">
                <label for="nome_impresso">Nome Impresso</label>
                <input type="text" class="nome_impresso" name="nome_impresso" id="nome_impresso">
            </div>
        </div>
        <div class="row">
            <div class="col-3 div-data-validade">
                <label for="data_validade">Data de Validade</label>
                <input type="month" class="data_validade" name="data_validade" id="data_validade">
            </div>
            <div class="col-3 div-numero-seguranca">
                <label for="numero_segurancao">Número de Segurança</label>
                <input type="text" class="numero_seguranca" name="numero_seguranca" id="numero_seguranca">
            </div>
            <div class="div-btn col-4">
                <button class="btn btn-warning" type="button" id="btnInsertCartao">Salvar</button>
            </div>
        </div>
    `

    // Insert Button settings
    document.getElementById("btnInsertCartao").addEventListener("click", insertCartao);
}

function insertCartao() {
    let numero = document.getElementById("numero").value;
    let nome_impresso = document.getElementById("nome_impresso").value;
    let data_validade = document.getElementById("data_validade").value;
    let numero_seguranca = document.getElementById("numero_seguranca").value;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmCartaoInsert;
    xhr.onerror = error;
    xhr.open('POST', `/cartao/insert?id_usuario=${Token}&numero=${numero}&nome_impresso=${nome_impresso}&data_validade=${data_validade}&numero_seguranca=${numero_seguranca}`);
    xhr.send();
}

function confirmCartaoInsert() {
    if (this.status == 201) {
        alert("Cartão inserido com sucesso!");
        getCartoes();
    }
    else {
        alert("Não foi possível inserir o cartão novo.");
    }
}

/**
 * Method that makes a request for one instances on cartao table
 */
 function getCartaoToUpdate() {
    let pkCartao = Token+"-"+this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = montaDivUpdateCartao;
    xhr.onerror = error;
    xhr.open('GET', `/cartao/${pkCartao}`);
    xhr.send();
}

/**
 * Method that adds a edition cartao section
 */
function montaDivUpdateCartao() {
    let cartao = JSON.parse( this.responseText );
    //let cartao = cartoes[0];
    let data = new Date(cartao.data_validade);
    let data_formatada = data.getFullYear()+"-"+(((data.getMonth()+1) < 10)?"0"+(data.getMonth()+1):(data.getMonth()+1));

    let section = document.getElementById("div-input-data");
    section.innerHTML = `
        <div class="row">
            <div class="col-5 div-numero">
                <label for="numero">Número</label>
                <input type="text" class="numero" name="numero" id="numero" value="${cartao.numero}" placeholder="${cartao.numero}">
            </div>
            <div class="col-5 div-nome-impresso">
                <label for="nome_impresso">Nome Impresso</label>
                <input type="text" class="nome_impresso" name="nome_impresso" id="nome_impresso" value="${cartao.nome_impresso}" placeholder="${cartao.nome_impresso}">
            </div>
        </div>
        <div class="row">
            <div class="col-3 div-data-validade">
                <label for="data_validade">Data de Validade</label>
                <input type="month" class="data_validade" name="data_validade" id="data_validade" value="${data_formatada}" placeholder="${data_formatada}">
            </div>
            <div class="col-3 div-numero-seguranca">
                <label for="numero_segurancao">Número de Segurança</label>
                <input type="text" class="numero_seguranca" name="numero_seguranca" id="numero_seguranca" value="${cartao.numero_seguranca}" placeholder="${cartao.numero_seguranca}">
            </div>
            <div class="div-btn col-4">
                <button class="btn btn-warning" type="button" id="btnUpdateCartao" alt="${cartao.id_cartao}">Salvar</button>
            </div>
        </div>
    `

    // Update Button settings
    document.getElementById("btnUpdateCartao").addEventListener("click", updateCartao);
}

function updateCartao() {
    let pkCartao = Token+"-"+this.getAttribute("alt");
    let numero = document.getElementById("numero").value;
    let nome_impresso = document.getElementById("nome_impresso").value;
    let data_validade = document.getElementById("data_validade").value;
    let numero_seguranca = document.getElementById("numero_seguranca").value;
    
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmCartaoUpdate;
    xhr.onerror = error;
    xhr.open('POST', `/cartao/update/${pkCartao}?numero=${numero}&nome_impresso=${nome_impresso}&data_validade=${data_validade}&numero_seguranca=${numero_seguranca}`);
    xhr.send();
}

function confirmCartaoUpdate() {
    if (this.status == 200) {
        alert("Cartão atualizado com sucesso!");
        getCartoes();
    }
    else {
        alert("Não foi possível atualizar o cartão.");
    }
}

/////////////////////////////////////////////////////////////////////

/**
 * Funcionalidades Gerais
 */
function error(err) {
	console.log('Erro:', err);
}

function changeData(event) {
    let data = event.target.value;
    
    switch (data){
        case 'senha':
            getSenhas();
            break;
        case 'cartao':
            getCartoes();
    }
}


function generatePassword() {
	 let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
            let passwordLength = 16;
            let password = "";

            for (let i = 0; i < passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
    document.getElementById('generated-password').value = password
}

document.getElementById("inputDataSelect").addEventListener('change', changeData);

onload = getSenhas;