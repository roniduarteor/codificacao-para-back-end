const criancas = []

// entrada de dados
const inNome = document.getElementById('inNome')
const inIdade = document.getElementById('inIdade')


// botões
const btnAdicionar = document.getElementById('btnAdicionar')
const btnListar = document.getElementById('btnListar')
const btnFiltrar = document.getElementById('btnFiltrar')

// saída de dados
const outLista = document.getElementById('outLista')


btnAdicionar.addEventListener('click', ()=>{
    let nome = inNome.value
    let idade = inIdade.value

    if(nome === '' || idade === '' || isNaN(idade)){
        alert('Insira os dados corretamente')
        inNome.focus()
        return
    }

    if(idade > 12){
        alert('Idade máxima: 12 anos')
        inNome.focus()
        return

    }else{
    criancas.push({nome: nome, idade: idade})
    console.log(criancas)
    }
})


btnListar.addEventListener('click', ()=>{
    if(criancas.length === 0){
        alert('Não possuem crianças cadastradas')
        inNome.focus()
        return
    }

    let listaCriancas = '' // a gente precisa de algo pra percorrer o array e assim listá-lo
    criancas.forEach((crianca)=> 
        listaCriancas += `${crianca.nome} --- ${crianca.idade}\n`
    )
     outLista.textContent = listaCriancas
})

btnFiltrar.addEventListener('click', ()=>{
    if(criancas.length === 0){
        alert('Não possuem crianças cadastradas')
        inNome.focus()
        return
    }

    let listaIdade = '' // a gente precisa de algo pra percorrer o array e assim listá-lo
    criancas.forEach((crianca)=> 
        listaIdade += `${crianca.idade}\n`
    )

    listaIdade.sort()

    criancas.idade.sort()


    // const ordemCrescente = (a,b) => a - b;
    // console.log(numbers.sort(ordemCrescente))
})


/* <h1>Programa ordenar por idade</h1>

    <p>Nome da criança:
        <input type="text" id="inNome" autofocus>
    </p>

    <p>Idade:
        <input type="text" id="inIdade">
        <input type="button" value="Adicionar" id="btnAdicionar">
    </p>

    <input type="button" value="Listar Todas as Crianças" id="btnListar">
    <input type="button" value="Filtrar Por Idade" id="btnFiltrar">

    <pre id="outLista"></pre> */