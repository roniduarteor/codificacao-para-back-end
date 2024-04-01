// entrada de dados
const inNome = document.getElementById('inNome')

//botao
const btnAdicionar = document.getElementById('btnAdicionar')
const btnListar = document.getElementById('btnListar')
const btnJogos = document.getElementById('btnJogos')

// saida de dados
const outLista = document.getElementById('outLista')


const clubes = []
const adicionarClube = ()=>{
    const clube = inNome.value
    if(clube === ''){
        alert('Preencha o campo')
        inNome.focus()
        return
    }
    clubes.push(clube)
    console.log(clubes)
    inNome.value='' // isso aqui pra limpar o campo de digitação
    inNome.focus()
}
btnAdicionar.addEventListener('click', adicionarClube)

const listarClube = ()=>{
    if(clubes.length === 0){
        alert('Não existem clubes cadastrados')
        inNome.focus()
        return
    }

    let lista = ''
    clubes.forEach((clube, index)=>{
        return lista += `${index + 1}. ${clube}\n`
    })

    outLista.textContent = lista
}
btnListar.addEventListener('click', listarClube)

const montarJogos = ()=>{
    if(clubes.length % 2 !== 0 || clubes.length === 0){
        alert('Impossível fazer a tabulação com essa quantidade de elementos')
        return
    }

    const metadeInicio = clubes.slice(0, clubes.length/2)
    const metadeFim = clubes.slice(clubes.length/2, clubes.length).reverse()

    let lista = ``
    for(let i = 0; i < metadeInicio.length; i++){
        lista += `${i + 1}. ${metadeInicio[i]} X ${metadeFim[i]}\n`
    }

    outLista.textContent = lista
    console.log(metadeInicio, clubes, metadeFim)
}
btnJogos.addEventListener('click', montarJogos)