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

// function pegarClientesLocalStorage(){
//     return JSON.parse(localStorage.getItem('clientes')) ?? []
// }

// function criarUsuario(usuario) {
//     let listaClientes = pegarClientesLocalStorage()
//     listaClientes.push(usuario)
//     adicionarClienteLocalStorage(listaClientes)
// }

// function adicionarClienteLocalStorage(listaDeClientes) {
//     return localStorage.setItem("clientes", JSON.stringify(listaDeClientes))
// }

// criarUsuario(lucas)