// entrada de dados
const inCandidato = document.getElementById('inCandidato')
const inAcertos = document.getElementById('inAcertos')

// botões
const btnAdicionar = document.getElementById('btnAdicionar')
const btnListar = document.getElementById('btnListar')
const btnAprovados = document.getElementById('btnAprovados')

// saida de dados
const outLista = document.getElementById('outLista')

const candidatos = []

const adicionarCandidato = ()=>{
    const candidato = inCandidato.value
    const acertos = Number(inAcertos.value)

    if(candidato === '' || acertos === 0 || isNaN(acertos)){
        alert('Digite valores válidos')
        return
    }
    candidatos.push({nome: candidato, nota: acertos})

    let lista = ''
    candidatos.map((candidato)=>{
        return lista += `${candidato.nome} - ${candidato.nota} Nota\n`
    })
    console.log(candidatos)
    outLista.textContent = lista
}
btnAdicionar.addEventListener('click', adicionarCandidato)

const listarCandidatos = ()=>{
    if(candidatos.length === 0){
        alert('Não tem candidatos cadastrados')
        return
    }

    let lista = ''
    candidatos.map((candidato)=>{
        return lista += `${candidato.nome} - ${candidato.nota} Nota\n`
    })
    console.log(candidatos)
    outLista.textContent = lista
}
btnListar.addEventListener('click', listarCandidatos)

const aprovadosSegundaEtapa = ()=>{
    const notaCorte = Number(prompt("Digite  a nota para a 2º aprovação"))

    if(notaCorte == 0 || isNaN(notaCorte)){
        alert('Nota inválida')
        return
    }

    const filtrarCandidatos = candidatos.filter((candidato)=>{
        return candidato.nota >= notaCorte
    }) // filter gera um novo array

    const candidatosEmOrdem = filtrarCandidatos.sort((a,b)=>{
        return b.nota - a.nota // ordem do maior pro menor
    })
    console.log(filtrarCandidatos)
    console.log(candidatosEmOrdem)

    let lista = ''
    candidatosEmOrdem.forEach((candidato)=>{
        return lista += `${candidato.nome} - ${candidato.nota}\n`
    })
    outLista.textContent = lista
}
btnAprovados.addEventListener('click', aprovadosSegundaEtapa)