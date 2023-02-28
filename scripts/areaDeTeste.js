let lucas= [
    {
        nome:"lucas",
        senha:"123456",
        moedas:1000,
        carrinho:[
            {
                IdProduto:"4",
                quantidade:2,
                precoTotal:999
            },
            {
                IdProduto:"11",
                quantidade:1,
                precoTotal:888
            }
        ],
        compras:[
            {
                dataDaCompra:"25.02.2023",
                IdProduto:"monitor",
                quantidade:2,
                precoTotal:999
            },
            {
                dataDaCompra:"26.02.2023",
                IdProduto:"blusa",
                quantidade:1,
                precoTotal:50
            }
        ]
    }
]

let teste2 = [
    {
        title:"vermelho",
        price:"grande",
        image:3,
        jogarFora:undefined
    },
    {
        title:"amarelo",
        price:"mini",
        image:7,
        jogarFora:undefined
    }
]



function testando(){
    let novoProduto= []
    lucas[0].carrinho.map((element) => {
        
        novoProduto.push(element)
    });

    teste2.forEach((element,index)=>{
        novoProduto[index].title = element.title
        novoProduto[index].price = element.price
        novoProduto[index].image = element.image
    })
    return novoProduto
}

function testando2(){
    let bora = testando()
    console.log(bora)
}

testando2()