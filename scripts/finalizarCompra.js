// Isso é o template de como será mostrado os itens na cesta

let sectionMinhaCesta = document.getElementById("sectionMinhaCesta")

function pegarClienteLogadoLocalStorage(){
    return JSON.parse(localStorage.getItem('clienteLogado')) ?? []
}

const produtosNoCarrinho = pegarClienteLogadoLocalStorage().carrinho

async function pegarProdutosNoCarrinho(idDoProduto){
    const res = await fetch(`https://fakestoreapi.com/products/${idDoProduto}`)
    let produtoEscolhido = await res.json()
    return produtoEscolhido
}


async function mostrarProdutosDoCarrinho(){
    let produtosNoCarrinhoFiltrados = await filtrarProdutoDoCarrinho()

    produtosNoCarrinhoFiltrados.map(produto=>{
        sectionMinhaCesta.innerHTML +=`
        <div id="listaDeProdutos">
        <div class="cardDoProdutoFinalizarCompra">
            <img class="imagemDoProdutoFinalizarCompra" src="${produto.image}" alt="picture ${produto.title}">
            <div class="textoDoProdutoFinalizarCompra">
                <h3>${produto.title}</h3>
                <div class="divInputeRemoverePreco">
                    <div class="divInputeRemover">
                        <div class="inputDequantidaGeral">
                            <button>+</button>
                            <input type="number" c>
                            <button>--</button>
                        </div>
                        <button>Remover</button>
                    </div>
                    <p>${produto.price}</p>
                </div>
            </div>
        </div>
    </div>
        `
    })
}


async function filtrarProdutoDoCarrinho() {
    const produtosFiltrados = produtosNoCarrinho.map((element) => {
      return pegarProdutosNoCarrinho(element.idProduto);
    });
    return Promise.all(produtosFiltrados);
  }

mostrarProdutosDoCarrinho()

export{mostrarProdutosDoCarrinho}