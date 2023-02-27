let dinheiroCliente = document.getElementById("dinheiroCliente")

function pegarClienteLogadoLocalStorage(){
    return JSON.parse(localStorage.getItem('clienteLogado')) ?? []
}

function alterarHeader(){
    let clienteLogado = pegarClienteLogadoLocalStorage()
    console.log(clienteLogado.length)
    if(clienteLogado.length != 0){
        dinheiroCliente.innerText = `$ ${clienteLogado.moedas.toFixed(2)}`
        iconeLogin.style.backgroundImage = "url(../imagens/iconeUrso.svg)"
    }
}

setTimeout(() => alterarHeader(), 5000)