import { teste } from "./finalizarCompra.js"
const url = `https://fakestoreapi.com/products`
let produtos = []
const demostracaoDosProdutos = document.getElementById("demostracaoDosProdutos")
async function conectApi(urlApi){
    const res = await fetch(urlApi)
    produtos = await res.json()
    console.table(produtos)
    if(demostracaoDosProdutos != null){
        produtos.map(produto => {
            demostracaoDosProdutos.innerHTML += `
                <div class="cardDoProduto">
                    <div class="divImagemDoProduto">
                        <img src="${produto.image}" alt="${produto.title} foto" class="imagemDoProduto">
                    </div>
                    <div class="textoDoProduto">
                        <p>${produto.category}</p>
                        <h2><abbr title="${produto.title}">${produto.title}</abbr></h2>
                        <h3>$${produto.price}</h3>
                        <div class="divBotoesDoCard">
                            <button class="botaoComprarDoCard" data-comprar="${produto.id}">Comprar</button>
                            <button class="botaoCarrinhoDoCard" alt="adicionar ao carrinho" data-carrinho="${produto.id}"></button>
                        </div>
                    </div>
                </div>
            `
            
        });    
    }
    
    teste()
    var ComprarBtn = await document.querySelectorAll("#demostracaoDosProdutos>div>div>div>.botaoComprarDoCard")
    ComprarBtn.forEach(botao =>{
        botao.addEventListener("click",function funciona(event){
            let valorId = botao.dataset.comprar
            localStorage.setItem("produtoVerMais",JSON.stringify(valorId))
            window.location.href = "verMaisSobreOProduto.html"
        })
    })
    
}

conectApi(url)
export{produtos}