import { adicionarAoCarrinho } from "./mandarProCarrinho.js"

let urlProduto = `'https://fakestoreapi.com/products/1'`
let sectionComprarProduto = document.getElementById("sectionComprarProduto")
let divImagemComprarProduto = document.getElementById("divImagemComprarProduto")
let tituloComprarProduto = document.getElementById("tituloComprarProduto")
let avaliaçõesComprarProduto = document.getElementById("avaliaçõesComprarProduto")
let descricaoComprarProduto = document.getElementById("descricaoComprarProduto")
let precoComprarProduto = document.getElementById("precoComprarProduto")
let formDetalhesDaCompra = document.getElementById("formDetalhesDaCompra")
let precoTotalVermais = document.getElementById("precoTotalVermais")
let quatidadeDoProduto = document.getElementById("quatidadeDoProduto")
let btnMaisDetalhes = document.getElementById("btnMaisDetalhes").addEventListener("click",maisQuantidade)
let btnMenosDetalhes = document.getElementById("btnMenosDetalhes").addEventListener("click",menosQuantidade)

let produtoEscolhido = []

async function pegarProduto(idDoProduto){
    const res = await fetch(`https://fakestoreapi.com/products/${idDoProduto}`)
    produtoEscolhido = await res.json()
    mostraNaTela(produtoEscolhido)
}


async function mostraNaTela(produto){
    divImagemComprarProduto.innerHTML = `<img src="${produto.image}" alt="${produto.title}">`
    tituloComprarProduto.innerText = `${produto.title}`
    avaliaçõesComprarProduto.innerHTML += `<p>${produto.rating.rate} / 5.0</p> <p>(${produto.rating.count} avaliações)</p>`
    descricaoComprarProduto.innerText = `${produto.description}`
    precoComprarProduto.innerText = `$ ${produto.price.toFixed(2)}`
    precoTotalVermais.innerText = `$ ${produto.price.toFixed(2)}`
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

formDetalhesDaCompra.addEventListener("submit",(event)=>{
    event.preventDefault()
    let idDoProduto = pegarIdDoproduto()
    let quantidade = Number(quatidadeDoProduto.value)
    let preco = produtoEscolhido.price
    adicionarAoCarrinho(idDoProduto,quantidade,preco.toFixed(2),true)
    
})


pegarProduto(pegarIdDoproduto())

function maisQuantidade(event){
    event.preventDefault()
    if(quatidadeDoProduto.value<10){
        quatidadeDoProduto.value = Number(quatidadeDoProduto.value)+1
        alterarPrecoTotal()
    }
}

function menosQuantidade(event){
    event.preventDefault()
    if(quatidadeDoProduto.value>1){
        quatidadeDoProduto.value = quatidadeDoProduto.value-1
        alterarPrecoTotal()
    }
}

quatidadeDoProduto.addEventListener("change",alterarPrecoTotal)

function alterarPrecoTotal(){
    let precoTotal = produtoEscolhido.price * quatidadeDoProduto.value
    precoTotalVermais.innerText = `$ ${precoTotal.toFixed(2)}`
}