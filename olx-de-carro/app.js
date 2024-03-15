const carro = []

// entrada de dados
const inModelo = document.getElementById('inModelo')
const inPreco = document.getElementById('inPreco')

// botões
const btnAdicionar = document.getElementById('btnAdicionar')
const btnListar = document.getElementById('btnListar')
const btnFiltrar = document.getElementById('btnFiltrar')

// saida de dados
const outLista = document.getElementById('outLista')


btnAdicionar.addEventListener('click', ()=>{
    //pegar o modelo do carro digitado
    const modelo = inModelo.value
    const preco = Number(inPreco.value)
   

    if(modelo === '' || preco === '' || isNaN(preco)){
        alert('Insira os dados corretamente')
        inModelo.focus()
        return
    }


    carro.push({modelo: modelo, preco: preco})
    console.log(carro)
})


btnListar.addEventListener('click', ()=>{
    if(carro.length === 0){
        alert('Não tem carros cadastradods')
        inModelo.focus()
        return
    }

    let listaCarros = '' // a gente precisa de algo pra percorrer o array e assim listá-lo
    carro.forEach((carro)=> 
        listaCarros += `${carro.modelo} --- ${carro.preco}\n`
    )

     outLista.textContent = listaCarros
})


btnFiltrar.addEventListener('click', ()=>{
    const maximo = Number(prompt(`Qual o valor máximo que o cliente deseja pagar?`))

    if(maximo === 0 || isNaN(maximo)){
        alert('Por favor, preencha os dados corretamente')
        return
    }

    const carrosFiltrados = carro.filter((carro)=>{
        return carro.preco <= maximo
    })

    let lista = ""
    carrosFiltrados.forEach((carro)=>{
        return (lista += `${carro.modelo} --- ${carro.preco}\n`)
    })

    outLista.textContent = lista
    console.log(carrosFiltrados)
})