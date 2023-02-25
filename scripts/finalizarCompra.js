import { produtos } from "./main.js";

let sectionMinhaCesta = document.getElementById("sectionMinhaCesta")

async function teste(){
    console.log(`foi`)
    produtos.map(produto=>{
        sectionMinhaCesta.innerHTML +=`
        <div id="listaDeProdutos">
        <div class="cardDoProdutoFinalizarCompra">
            <img class="imagemDoProdutoFinalizarCompra" src="${produto.image}" alt="picture ${produto.title}">
            <div class="textoDoProdutoFinalizarCompra">
                <h3>${produto.title}</h3>
                <div class="divInputeRemoverePreco">
                    <div class="divInputeRemover">
                        <div class="inputDequantidaGeral">
                            <button>++</button>
                            <input type="number">
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

export{teste}