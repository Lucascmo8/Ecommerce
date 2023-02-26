let iconeLogin = document.getElementById("iconeLogin")
let espacoDoLogin = document.getElementById("espacoDoLogin")

iconeLogin.addEventListener("click", verificarLogin)

let usuarioLogado = false

function verificarLogin() {
  if (usuarioLogado == false) {
    abrirEscolha()
  }
}

function abrirEscolha() {
  espacoDoLogin.innerHTML = `
    <div id="divEscolha">
      <button id="btnFecharEscolha">&times;</button>
      <button id="btnEscolhaLogin">Login</button>
      <button id="btnEscolhaCadastro">Cadastrar</button>
    </div>
  `

  let btnFecharEscolha = document.getElementById("btnFecharEscolha").addEventListener("click", removerDivEscolha)
  let btnEscolhaLogin = document.getElementById("btnEscolhaLogin").addEventListener("click", abrirTelaDeLogin)
  let btnEscolhaCadastro = document.getElementById("btnEscolhaCadastro").addEventListener("click", abrirTelaDeCadastro)
}

function removerDivEscolha() {
  let divEscolha = document.getElementById("divEscolha")
  espacoDoLogin.removeChild(divEscolha)
}

// Funções de cadastro
function anularForm(verificarCadastro) {
  let formCadastro = document.getElementById("formCadastro");
  formCadastro.addEventListener("submit", function (event) {
    event.preventDefault()
    verificarCadastro(event)
  })
}

function abrirTelaDeCadastro() {
    removerDivEscolha()
    espacoDoLogin.innerHTML += `
      <div id="containerFormCadastro" class="backgroundEscuro">
        <div class="conteinerUsal">
          <h2>Cadastrar</h2>
          <button id="btnFecharFormCadastro">&times;</button>
  
          <form id="formCadastro">
            <label>Usuário:</label>
            <input type="text" id="usuarioCadastro" min="4" max="16" required>
            <p id="avisoUsuarioUsado"></p>
  
            <label>Senha:</label>
            <input type="password" id="senhaCadastro" min="6" max="16" required>
  
            <label>Confirmar Senha:</label>
            <input type="password" id="confirmarSenhaCadastro" min="6" max="16" required>
            <p id="avisoCadastro"></p>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    `
  
    anularForm(verificarCadastro)
}

function verificarCadastro(event) {
    event.preventDefault();
    let btnFecharFormCadastro = document.getElementById("btnFecharFormCadastro").addEventListener("click",()=>espacoDoLogin.removeChild(containerFormCadastro));
    let usuarioCadastro = document.getElementById("usuarioCadastro");
    let senhaCadastro = document.getElementById("senhaCadastro");
    let confirmarSenhaCadastro = document.getElementById("confirmarSenhaCadastro");
    let avisoUsuarioUsado = document.getElementById("avisoUsuarioUsado");
    let avisoCadastro = document.getElementById("avisoCadastro");
  
    let clientes = pegarClientesLocalStorage();
    let usuarioExistente = clientes.find(cliente => cliente.usuario === usuarioCadastro.value)

    if (senhaCadastro.value != confirmarSenhaCadastro.value) {
      avisoCadastro.innerText = `As senhas precisam ser iguais`;
    } else if (usuarioExistente!== undefined) {
      avisoUsuarioUsado.innerText = `Nome de usuário já existe`;
    } else {
      let usuarioNovo = {
        usuario: usuarioCadastro.value,
        senha: senhaCadastro.value,
        moedas: 1000,
        carrinho: [],
        compras: []
      };
  
      criarUsuario(usuarioNovo);
      fecharFormCadastro()
    }
}

function fecharFormCadastro(){
    let containerFormCadastro = document.getElementById("containerFormCadastro")
    espacoDoLogin.removeChild(containerFormCadastro)
}

function pegarClientesLocalStorage(){
    return JSON.parse(localStorage.getItem('clientes')) ?? []
}

function criarUsuario(usuario) {
    let listaClientes = pegarClientesLocalStorage()
    listaClientes.push(usuario)
    adicionarClienteLocalStorage(listaClientes)
}

function adicionarClienteLocalStorage(listaDeClientes) {
    return localStorage.setItem("clientes", JSON.stringify(listaDeClientes))
}


// Funçoes de Login
function abrirTelaDeLogin() {
    removerDivEscolha()
    espacoDoLogin.innerHTML += `
        <div id="containerFormlogin" class="backgroundEscuro">
            <div class="conteinerUsal">
                <h2>Cadastrar</h2>
                <button id="btnFecharFormLogin">&times;</button>

                <form id="formLogin">
                    <label>Usuário:</label>
                    <input type="text" id="usuarioLogin" min="4" max="16" required>
                    <p id="avisoUsuarioNaoEncontrado"></p>

                    <label>Senha:</label>
                    <input type="password" id="senhaLogin" min="6" max="16" required>
                    <p id="avisoSenhaErrada"></p>
                
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    `
    anularFormLogin(analisarLogin)
}

function anularFormLogin(analisarLogin) {
  let formLogin = document.getElementById("formLogin");
  formLogin.addEventListener("submit", function (event) {
    event.preventDefault()
    analisarLogin(event)
  })
}

function analisarLogin(event){
  event.preventDefault()
  let usuarioLogin = document.getElementById("usuarioLogin")
  let senhaLogin = document.getElementById("senhaLogin")
  let avisoUsuarioNaoEncontrado = document.getElementById("avisoUsuarioNaoEncontrado")

  let listaClientes = pegarClientesLocalStorage()

  let clienteEncontrado = listaClientes.find(cliente => cliente.usuario == usuarioLogin.value && cliente.senha == senhaLogin.value)
  
  if(clienteEncontrado == undefined){
    avisoUsuarioNaoEncontrado.innerText = `Login ou senha incorreta`
  }else{
    localStorage.setItem("clienteLogado", JSON.stringify(clienteEncontrado))
  }
}

// porque no histórico a pessoa tem que estar logada para acessar
// não deixar concluir a compra sem estar logado