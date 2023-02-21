const url = `https://fakestoreapi.com/products`
let produtos = []
let corpo = document.body
async function conectApi(urlApi){
    const res = await fetch(urlApi)
    produtos = await res.json()
    console.table(produtos)
    produtos.forEach(produto => {
        corpo.innerHTML += `
            <div>
                <div>
                <img src="${produto.image}" alt="${produto.title}">
                </div>
                <div>
                    <p>${produto.category}</p>
                    <h2>${produto.title}</h2>
                    <h3>$${produto.price}</h3>
                    <div><button>Comprar</button><button>Cart</button></div>
                </div>
            </div>
        `
    });
}

conectApi(url)