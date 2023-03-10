// Isso é o template de como será mostrado os itens na cesta

let sectionMinhaCesta = document.getElementById("sectionMinhaCesta")
let quatidadeProdutosResumo = document.getElementById("quatidadeProdutosResumo")
let precoProdutosResumo = document.getElementById("precoProdutosResumo")
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra")
console.log(btnFinalizarCompra)

function pegarClienteLogadoLocalStorage() {
    return JSON.parse(localStorage.getItem('clienteLogado')) ?? []
}

const produtosNoCarrinho = pegarClienteLogadoLocalStorage().carrinho

async function pegarProdutosNoCarrinho(idDoProduto) {
    const res = await fetch(`https://fakestoreapi.com/products/${idDoProduto}`)
    let produtoEscolhido = await res.json()
    return produtoEscolhido
}

let produtosNoCarrinhoFiltrados = []

async function mostrarProdutosDoCarrinho() {
    produtosNoCarrinhoFiltrados = await criarNovoObjetoDosProdutos()
    console.log(produtosNoCarrinhoFiltrados)

    await produtosNoCarrinhoFiltrados.forEach((produto, index) => {
        sectionMinhaCesta.innerHTML += `
                <div class="cardDoProdutoFinalizarCompra">
                    <img class="imagemDoProdutoFinalizarCompra" src="${produto.imagem}" alt="picture ${produto.title}">
                    <div class="textoDoProdutoFinalizarCompra">
                        <h3>${produto.titulo}</h3>
                        <div class="divInputeRemoverePreco">
                            <div class="divInputeRemover">
                                <input type="number" value="${produto.quantidade}" id="inputNumber${index}" class="inputQuantidadeFinalizarCompra" data-quantidade="${index}">

                                <button>Remover</button>
                            </div>
                            <p class="precoTotalCard" data-precoTotal="${index}">$ ${produto.precoTotal}</p>
                        </div>
                    </div>
                </div>
        `
    })
    
    var inputNumero = await document.querySelectorAll("#sectionMinhaCesta>div>div>div>div>.inputQuantidadeFinalizarCompra")
    console.log(inputNumero)
    inputNumero.forEach(inputNum =>{
        inputNum.addEventListener("change",()=>{
            let qualInput = inputNum.dataset.quantidade
            var precoParaMudar = document.querySelector(`[data-precoTotal="${qualInput}"]`)
            let valorTotal = inputNum.value * produtosNoCarrinhoFiltrados[qualInput].precoUnico
            atualizarCarrinho(produtosNoCarrinhoFiltrados[qualInput].idProduto,inputNum.value,valorTotal,qualInput)
            precoParaMudar.textContent=`${valorTotal}`
            atualizarResumoDaCompra()
        })
    })
}

function atualizarCarrinho(idDoProduto,quantidadeProduto,valorTotal,dataDoInput){
    let clienteLogado = JSON.parse(localStorage.getItem('clienteLogado'))
    console.log(idDoProduto,quantidadeProduto,valorTotal,dataDoInput)
    let produtoNoCarrinho = clienteLogado.carrinho[dataDoInput]
    console.log(produtoNoCarrinho)
    produtoNoCarrinho.quantidade = Number(quantidadeProduto)
    produtoNoCarrinho.precoTotal = valorTotal.toFixed(2)

    localStorage.setItem("clienteLogado",JSON.stringify(clienteLogado))
}

async function filtrarProdutoDoCarrinho() {
    const produtosFiltrados = produtosNoCarrinho.map((produto) => {
        return pegarProdutosNoCarrinho(produto.idProduto)
    })
    console.log(Promise.all(produtosFiltrados))
    return Promise.all(produtosFiltrados)
}

async function criarNovoObjetoDosProdutos() {
    let produtoDaAPi = await filtrarProdutoDoCarrinho()
    console.log(produtoDaAPi)
    let clienteLogado = await pegarClienteLogadoLocalStorage()
    let novosObjetos = []
    clienteLogado.carrinho.map((produtoNoCarrinho) => {
        novosObjetos.push(produtoNoCarrinho)
    });

    produtoDaAPi.map((produtoNaApi, index) => {
        novosObjetos[index].titulo = produtoNaApi.title
        novosObjetos[index].precoUnico = Number(produtoNaApi.price)
        novosObjetos[index].imagem = produtoNaApi.image
    })
    return novosObjetos
}

function atualizarResumoDaCompra(){
    let clienteLogado = pegarClienteLogadoLocalStorage()
    let pegarQuantidade = clienteLogado.carrinho.map(quant=>quant.quantidade)
    let somaQuantidade = pegarQuantidade.reduce((somaQuantidade,index)=> somaQuantidade + index)
    let produtoPlural = "produto"
    if(somaQuantidade>1){
        produtoPlural = "produtos"
    }
    quatidadeProdutosResumo.textContent = `${somaQuantidade} ${produtoPlural}`

    let pegarPrecoTotal = clienteLogado.carrinho.map(quant=>quant.precoTotal)
    let somaPrecoTotal = pegarPrecoTotal.reduce((somaPrecoTotal,index)=> Number(somaPrecoTotal) + Number(index))
    let teste = somaPrecoTotal.toFixed(2)
    precoProdutosResumo.textContent = `$ ${teste}`
    return somaPrecoTotal
}

btnFinalizarCompra.addEventListener("click",finalizarCompra)

function finalizarCompra(){
    let clienteLogado = pegarClienteLogadoLocalStorage()
    let carrinhoClienteLogado = clienteLogado.carrinho
    let comprasClienteLogado = clienteLogado.compras
    let moedasClienteLogado = clienteLogado.moedas
    let somaPrecoTotal = atualizarResumoDaCompra()

    if(somaPrecoTotal>moedasClienteLogado){
        alert(`Saldo Insuficiente para realizar a compra`)
    }else{
        carrinhoClienteLogado.forEach(produto=> comprasClienteLogado.push(produto))
    clienteLogado.carrinho = []
    clienteLogado.compras = carrinhoClienteLogado
    clienteLogado.moedas = moedasClienteLogado - somaPrecoTotal
    
    localStorage.setItem("clienteLogado",JSON.stringify(clienteLogado))
    location.reload()
    }
    
}

let verificarCarrinho = pegarClienteLogadoLocalStorage().carrinho

if(verificarCarrinho.length > 0){
    atualizarResumoDaCompra()
    mostrarProdutosDoCarrinho()
}else{
    sectionMinhaCesta.innerHTML += `<h2>O Carrinho Está Vazio</h2>`   
}