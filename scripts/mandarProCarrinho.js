function pegarCLienteLogadoLocalstorage() {
    return JSON.parse(localStorage.getItem("clienteLogado")) ?? []
}

function adicionarAoCarrinho(valorId, quantidade,preco,paginaVerMais) {
    
    let clienteLogado = pegarCLienteLogadoLocalstorage()
    if(clienteLogado.length == 0){
        alert(`Por Favor fazer Login antes de adicionar Produtos ao carrinho`)
    }else{
        let precoTotal = preco * quantidade
        
        let novoProduto = {
            idProduto: valorId,
            quantidade: quantidade,
            precoTotal: precoTotal,
        }
    
        let produtoExistente = undefined
        console.log(clienteLogado.carrinho.length)
        if(clienteLogado.carrinho.length >1){
            produtoExistente = clienteLogado.carrinho.find(produto => produto.idProduto == valorId)
        }
        
        if(produtoExistente !== undefined){
            alert(`Produto já esta no carrinho`)
        }else{
            colocarProdutoNoCarrinho(novoProduto)
            if(paginaVerMais == true){
                window.location.href = "finalizarComprar.html"
            }
        }
    }
}

function colocarProdutoNoCarrinho(novoProduto){
    let clienteLogado = pegarCLienteLogadoLocalstorage()
    clienteLogado.carrinho.push(novoProduto)
    adicionarProdutoAoLocalStorage(clienteLogado)
}

let adicionarProdutoAoLocalStorage = (clienteLogado)=> localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));

export{adicionarAoCarrinho}