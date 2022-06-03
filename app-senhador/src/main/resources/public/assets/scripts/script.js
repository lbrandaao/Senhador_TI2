/**
 * @author Leonardo Barbosa Brandão
 * Ciência da Computação - PUC-Minas - COREU
 */

// Arrays para abstrair as respostas das requisições

///////////////////////////////////////////////////////////////////////////////


//---------------------------------------------------------------------------//
// Início das Funcionalidades para tabela usuario
//---------------------------------------------------------------------------//
/**
 * Method that initializates the section oneInstance for inserting a new instance
 */
function montaSecaoOneInstanceUsuario() {
    let section = document.getElementById("oneInstance");

    section.innerHTML = `
                        <h4>Inserir Usuário</h4>
                        <form class="container" action="/usuario/insert" method="post" id="form">
                            <div class="row justify-content-around">
                                <div class="col-4 attribute">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="senhamestra">Senha Mestra</label>
                                    <input type="text" name="senhamestra" id="senhamestra">
                                </div>

                                <div class="col-3 attribute">
                                    <label for="plano">Plano</label>
                                    <input type="text" name="plano" id="plano">
                                </div>
                            </div>
                            
                            <div class="row justify-content-around">
                                <div class="col-5 div-btn">
                                    <button class="btn btn-success" type="submit" id="btnSubmit">Inserir</button>
                                </div>
                            </div>
                        </form>    
    `
}

/**
 * Method that makes a request for all instances on usuario table
 */
function getUsuarios(orderby) {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaTabelaUsuarios;
    xhr.onerror = error;
    xhr.open('GET', `/usuario/list/${orderby}`);
    xhr.send();
}

/**
 * Method that treats the request response for all instances on usuario table 
 */
function montaTabelaUsuarios() {
    let usuarios = JSON.parse( this.responseText );
    let section = document.getElementById("entityInstances");
    section.innerHTML = `
                    <h4>Relação de Usuários</h4>
                    <table>
                        <tbody id="table-body">


                        </tbody>
                    </table>        
    `
    
    let table_body = document.getElementById("table-body");
    table_body.innerHTML = `
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Senha Mestra</th>
                                <th>Plano</th>
                                <th>Atualizar</th>
                                <th>Excluir</th>
                            </tr>
    `

    usuarios.forEach((usuario) => {
        table_body.innerHTML += `
                                <tr>
                                    <td>${usuario.id_usuario}</td>
                                    <td>${usuario.email}</td>
                                    <td>${usuario.senhamestra}</td>
                                    <td>${usuario.plano}</td>
                                    <td><i class="far fa-edit edit-icon" alt="${usuario.id_usuario}"></i></td>
                                    <td><i class="fas fa-window-close remove-icon" alt="${usuario.id_usuario}"></i></td>
                                </tr>
        `
    })

    // Icons settings
    let edit_items = document.querySelectorAll(".edit-icon");
    edit_items.forEach((i) => {
        i.addEventListener('click', getUsuarioToUpdate);
    })

    let remove_items = document.querySelectorAll(".remove-icon");
    remove_items.forEach((i) => {
        i.addEventListener('click', removeUsuario);
    })
}

/**
 * Method that makes a request for one instances on usuario table
 */
function getUsuarioToUpdate() {
    let idusuario = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = montaFormUpdateUsuario;
    xhr.onerror = error;
    xhr.open('GET', `/usuario/${idusuario}`);
    xhr.send();
}

/**
 * Method that treats the response from the get usuario to update request 
 */
function montaFormUpdateUsuario() {
    let usuario = JSON.parse( this.responseText );
   
    let section = document.getElementById("oneInstance");
    section.innerHTML = `
                <h4>Atualizar Usuário</h4>
                
                <form class="container" action="/usuario/update/${usuario.id_usuario}" method="post" id="form">
                    <div class="row justify-content-around">
                        <div class="col-4 attribute">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" placeholder="${usuario.email}" value="${usuario.email}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="senhamestra">Senha Mestra</label>
                            <input type="text" name="senhamestra" id="senhamestra" placeholder="${usuario.senhamestra}" value="${usuario.senhamestra}">
                        </div>

                        <div class="col-3 attribute">
                            <label for="plano">Plano</label>
                            <input type="text" name="plano" id="plano" placeholder="${usuario.plano}" value="${usuario.plano}">
                        </div>
                    </div>
                    
                    <div class="row justify-content-around">
                        <div class="col-5 div-btn">
                            <button class="btn btn-primary" type="submit" id="btnSubmit">Atualizar</button>
                        </div>
                    </div>
                </form>
    `;
}

/**
 * Method that makes a request for deleting one instances on usuario table
 */
function removeUsuario() {
    let idusuario = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmedRemoval;
    xhr.onerror = error;
    xhr.open('GET', `/usuario/delete/${idusuario}`);
    xhr.send();
}
//---------------------------------------------------------------------------//
// Fim das Funcionalidades para tabela usuario
//---------------------------------------------------------------------------//


///////////////////////////////////////////////////////////////////////////////


//---------------------------------------------------------------------------//
// Início das Funcionalidades para tabela senha
//---------------------------------------------------------------------------//
/**
 * Method that initializates the section oneInstance for inserting a new instance
 */
 function montaSecaoOneInstanceSenha() {
    let section = document.getElementById("oneInstance");

    section.innerHTML = `
                        <h4>Inserir Senha</h4>
                        <form class="container" action="/senha/insert" method="post" id="form">
                            <div class="row justify-content-around">
                                <div class="col-2 attribute">
                                    <label for="id">ID do usuário</label>
                                    <input type="text" name="id_usuario" id="id_usuario">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="aplicacao">Aplicação</label>
                                    <input type="text" name="aplicacao" id="aplicacao">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="valor">Valor</label>
                                    <input type="text" name="valor" id="valor">
                                </div>
                            </div>
                            
                            <div class="row justify-content-around">
                                <div class="col-5 div-btn">
                                    <button class="btn btn-success" type="submit" id="btnSubmit">Inserir</button>
                                </div>
                            </div>
                        </form>    
    `
}

/**
 * Method that makes a request for all instances on senha table
 */
 function getSenhas() {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaTabelaSenhas;
    xhr.onerror = error;
    xhr.open('GET', `/senha/list/1`);
    xhr.send();
}

/**
 * Method that treats the request response for all instances on the senha table 
 */
function montaTabelaSenhas() {
    let senhas = JSON.parse( this.responseText );
    let section = document.getElementById("entityInstances");
    section.innerHTML = `
                    <h4>Relação de Senhas</h4>
                    <table>
                        <tbody id="table-body">


                        </tbody>
                    </table>        
    `
    
    let table_body = document.getElementById("table-body");
    table_body.innerHTML = `
                            <tr>
                                <th>ID do Usuário</th>
                                <th>ID Senha</th>
                                <th>Aplicação</th>
                                <th>Valor</th>
                                <th>Atualizar</th>
                                <th>Excluir</th>
                            </tr>
    `

    senhas.forEach((senha) => {
        table_body.innerHTML += `
                                <tr>
                                    <td>${senha.id_usuario}</td>
                                    <td>${senha.id_senha}</td>
                                    <td>${senha.aplicacao}</td>
                                    <td>${senha.valor}</td>
                                    <td><i class="far fa-edit edit-icon" alt="${senha.id_usuario}-${senha.id_senha}"></i></td>
                                    <td><i class="fas fa-window-close remove-icon" alt="${senha.id_usuario}-${senha.id_senha}"></i></td>
                                </tr>
        `
    })

    // Icons settings
    let edit_items = document.querySelectorAll(".edit-icon");
    edit_items.forEach((i) => {
        i.addEventListener('click', getSenhaToUpdate);
    })

    let remove_items = document.querySelectorAll(".remove-icon");
    remove_items.forEach((i) => {
        i.addEventListener('click', removeSenha);
    })
}

/**
 * Method that makes a request for one instances on senha table
 */
function getSenhaToUpdate() {
    let pkSenha = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = montaFormUpdateSenha;
    xhr.onerror = error;
    xhr.open('GET', `/senha/${pkSenha}`);
    xhr.send();
}

/**
 * Method that treats the response from the get senha to update request 
 */
function montaFormUpdateSenha() {
    let senha = JSON.parse( this.responseText );

    let section = document.getElementById("oneInstance");
    section.innerHTML = `
                <h4>Atualizar Senha</h4>
                
                <form class="container" action="/senha/update/${senha.id_usuario}-${senha.id_senha}" method="post" id="form">
                    <div class="row justify-content-around">
                        <div class="col-2 attribute">
                            <label for="idusuario">ID do usuário</label>
                            <input type="text" name="idusuario" id="idusuario" placeholder="${senha.id_usuario}" value="${senha.id_usuario}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="aplicacao">Aplicação</label>
                            <input type="text" name="aplicacao" id="aplicacao" placeholder="${senha.aplicacao}" value="${senha.aplicacao}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="valor">Valor</label>
                            <input type="text" name="valor" id="valor" placeholder="${senha.valor}" value="${senha.valor}">
                        </div>
                    </div>
                    
                    <div class="row justify-content-around">
                        <div class="col-5 div-btn">
                            <button class="btn btn-primary" type="submit" id="btnSubmit">Atualizar</button>
                        </div>
                    </div>
                </form>
    `;
}

/**
 * Method that makes a request for deleting one instances on senha table
 */
function removeSenha() {
    let pkSenha = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmedRemoval;
    xhr.onerror = error;
    xhr.open('GET', `/senha/delete/${pkSenha}`);
    xhr.send();
}
//---------------------------------------------------------------------------//
// Fim das Funcionalidades para tabela senha
//---------------------------------------------------------------------------//


///////////////////////////////////////////////////////////////////////////////


//---------------------------------------------------------------------------//
// Início das Funcionalidades para tabela cartao
//---------------------------------------------------------------------------//
/**
 * Method that initializates the section oneInstance for inserting a new instance
 */
 function montaSecaoOneInstanceCartao() {
    let section = document.getElementById("oneInstance");

    section.innerHTML = `
                        <h4>Inserir Cartão</h4>
                        <form class="container" action="/cartao/insert" method="post" id="form">
                            <div class="row justify-content-around">
                                <div class="col-2 attribute">
                                    <label for="id_usuario">ID do usuário</label>
                                    <input type="text" name="id_usuario" id="id_usuario">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="nome_impresso">Nome Impresso</label>
                                    <input type="text" name="nome_impresso" id="nome_impresso">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="data_validade">Validade</label>
                                    <input type="month" name="data_validade" id="data_validade">
                                </div>
                            </div>

                            <div class="row justify-content-around">
                                <div class="col-6 attribute">
                                    <label for="numero">Número do Cartão</label>
                                    <input type="text" name="numero" id="numero">
                                </div>

                                <div class="col-4 attribute">
                                    <label for="numero_seguranca">Código de Segurança</label>
                                    <input type="text" name="numero_seguranca" id="numero_seguranca">
                                </div>
                            </div>
                            
                            <div class="row justify-content-around">
                                <div class="col-5 div-btn">
                                    <button class="btn btn-success" type="submit" id="btnSubmit">Inserir</button>
                                </div>
                            </div>
                        </form>    
    `
}

/**
 * Method that makes a request for all instances on cartao table
 */
 function getCartoes() {
    let xhr = new XMLHttpRequest();
    xhr.onload = montaTabelaCartoes;
    xhr.onerror = error;
    xhr.open('GET', `/cartao/list/1`);
    xhr.send();
}

/**
 * Method that treats the request response for all instances on the cartao table 
 */
function montaTabelaCartoes() {
    let cartoes = JSON.parse( this.responseText );
    let section = document.getElementById("entityInstances");
    section.innerHTML = `
                    <h4>Relação de Cartões</h4>
                    <table>
                        <tbody id="table-body">


                        </tbody>
                    </table>        
    `
    
    let table_body = document.getElementById("table-body");
    table_body.innerHTML = `
                            <tr>
                                <th>ID do Usuário</th>
                                <th>ID Cartão</th>
                                <th>Nome Impresso</th>
                                <th>Validade</th>
                                <th>Número</th>
                                <th>Código</th>
                                <th>Atualizar</th>
                                <th>Excluir</th>
                            </tr>
    `

    cartoes.forEach((cartao) => {
        table_body.innerHTML += `
                                <tr>
                                    <td>${cartao.id_usuario}</td>
                                    <td>${cartao.id_cartao}</td>
                                    <td>${cartao.nome_impresso}</td>
                                    <td>${cartao.data_validade}</td>
                                    <td>${cartao.numero}</td>
                                    <td>${cartao.numero_seguranca}</td>
                                    <td><i class="far fa-edit edit-icon" alt="${cartao.id_usuario}-${cartao.id_cartao}"></i></td>
                                    <td><i class="fas fa-window-close remove-icon" alt="${cartao.id_usuario}-${cartao.id_cartao}"></i></td>
                                </tr>
        `
    })

    // Icons settings
    let edit_items = document.querySelectorAll(".edit-icon");
    edit_items.forEach((i) => {
        i.addEventListener('click', getCartaoToUpdate);
    })

    let remove_items = document.querySelectorAll(".remove-icon");
    remove_items.forEach((i) => {
        i.addEventListener('click', removeCartao);
    })
}

/**
 * Method that makes a request for one instances on cartao table
 */
function getCartaoToUpdate() {
    let pkCartao = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = montaFormUpdateCartao;
    xhr.onerror = error;
    xhr.open('GET', `/cartao/${pkCartao}`);
    xhr.send();
}

/**
 * Method that treats the response from the get cartao to update request 
 */
function montaFormUpdateCartao() {
    let cartao = JSON.parse( this.responseText );

    let section = document.getElementById("oneInstance");
    section.innerHTML = `
                <h4>Atualizar Cartão</h4>
                
                <form class="container" action="/cartao/update/${cartao.id_usuario}-${cartao.id_cartao}" method="post" id="form">
                    <div class="row justify-content-around">
                        <div class="col-2 attribute">
                            <label for="idusuario">ID do usuário</label>
                            <input type="text" name="idusuario" id="idusuario" placeholder="${cartao.id_usuario}" value="${cartao.id_usuario}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="nome_impresso">Nome Impresso</label>
                            <input type="text" name="nome_impresso" id="nome_impresso" placeholder="${cartao.nome_impresso}" value="${cartao.nome_impresso}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="data_validade">Validade</label>
                            <input type="month" name="data_validade" id="data_validade" placeholder="${cartao.data_validade}" value="${cartao.data_validade}">
                        </div>
                    </div>

                    <div class="row justify-content-around">
                        <div class="col-6 attribute">
                            <label for="numero">Número do Cartão</label>
                            <input type="text" name="numero" id="numero" placeholder="${cartao.numero}" value="${cartao.numero}">
                        </div>

                        <div class="col-4 attribute">
                            <label for="numero_seguranca">Código de Segurança</label>
                            <input type="text" name="numero_seguranca" id="numero_seguranca" placeholder="${cartao.numero_seguranca}" value="${cartao.numero_seguranca}">
                        </div>
                    </div>
                    
                    <div class="row justify-content-around">
                        <div class="col-5 div-btn">
                            <button class="btn btn-primary" type="submit" id="btnSubmit">Atualizar</button>
                        </div>
                    </div>
                </form>
    `;
}

/**
 * Method that makes a request for deleting one instances on cartao table
 */
function removeCartao() {
    let pkCartao = this.getAttribute("alt");
    let xhr = new XMLHttpRequest();
    xhr.onload = confirmedRemoval;
    xhr.onerror = error;
    xhr.open('GET', `/cartao/delete/${pkCartao}`);
    xhr.send();
}
//---------------------------------------------------------------------------//
// Fim das Funcionalidades para tabela cartao
//---------------------------------------------------------------------------//


///////////////////////////////////////////////////////////////////////////////


//---------------------------------------------------------------------------//
// Início das Configurações Iniciais
//---------------------------------------------------------------------------//
function error(err) {
	console.log('Erro:', err);
}

/**
 * Method that confirms removal is complete
 */
function confirmedRemoval(){
    alert("Registro removido com sucesso.");
}

function mudaEntidade(event) {
    let entidade = event.target.value;
    
    switch (entidade){
        case 'usuario':
            montaSecaoOneInstanceUsuario();
            getUsuarios("1");
            break;
        case 'senha':
            montaSecaoOneInstanceSenha();
            getSenhas();
            break;
        case 'cartao':
            montaSecaoOneInstanceCartao();
            getCartoes();
    }
}

onload = () => { getUsuarios("1") };

document.getElementById("inputEntitySelect").addEventListener('change', mudaEntidade)

//---------------------------------------------------------------------------//
// Fim das Configurações Iniciais
//---------------------------------------------------------------------------//


