let urlProduto = `'https://fakestoreapi.com/products/1'`
let sectionComprarProduto = document.getElementById("sectionComprarProduto")
let divImagemComprarProduto = document.getElementById("divImagemComprarProduto")
let tituloComprarProduto = document.getElementById("tituloComprarProduto")
let avaliaçõesComprarProduto = document.getElementById("avaliaçõesComprarProduto")
let descricaoComprarProduto = document.getElementById("descricaoComprarProduto")
let precoComprarProduto = document.getElementById("precoComprarProduto")
let detalhesDaCompra = document.getElementById("detalhesDaCompra")

let produtoEscolhido = []

async function pegarProduto(idDoProduto){
    const res = await fetch(`https://fakestoreapi.com/products/${idDoProduto}`)
    produtoEscolhido = await res.json()
    mostraNaTela(produtoEscolhido)
}


async function mostraNaTela(produto){
    divImagemComprarProduto.innerHTML = `<img src="${produto.image}" alt="${produto.title}">`
    tituloComprarProduto.innerText = `${produto.title}`
    avaliaçõesComprarProduto.innerHTML = `<p>${produto.rating.rate} / 5.0</p> <p>(${produto.rating.count} avaliações)</p>`
    descricaoComprarProduto.innerText = `${produto.description}`
    precoComprarProduto.innerText = `$ ${produto.price}`
}

function pegarIdDoProdutoLocalStorage() {
    return JSON.parse(localStorage.getItem('produtoVerMais')) ?? 1
}

function pegarIdDoproduto(){
    let idDoProduto = pegarIdDoProdutoLocalStorage()

    if(idDoProduto!= undefined){
        return idDoProduto
    }else{
        return 1
    }
}

pegarProduto(pegarIdDoproduto())