// entrada de dados
const inNumero = document.getElementById('inNumero')

// botoes
const btnAdicionar = document.getElementById('btnAdicionar')
const btnVerificar = document.getElementById('btnVerificar')

// saida de dados
const outLista = document.getElementById('outLista')

const numeros = []
const adicionarNumero = ()=>{
    const numero = Number(inNumero.value)
    if(numero === 0 || isNaN(numero)){
        alert('Número Inválido')
        return
    }

    const numeroIgual = numeros.includes(numero)
    if(!numeroIgual){
        numeros.push(numero)
        inNumero.focus()
    }else{
        alert('Número repetido')
        inNumero.focus()
    }

    outLista.textContent = `${numeros.join(', ')}`
    inNumero.value = ''
}
btnAdicionar.addEventListener('click', adicionarNumero)

const verificarOrdem = ()=>{
    if(numeros.length === 0){
        alert('Não existe elementos no array de números')
        return
    }

    const verificaArray = numeros.every((num, index)=>{
        if(index === numeros.length - 1){
            return true
        }
        return num < numeros[index+1]
    })

    if(verificaArray){
        outLista.textContent = `Ordem Crescente`
    }else{
        outResposta.textContent = `Não estão em ordem crescente`
    }
}
btnVerificar.addEventListener('click', verificarOrdem)

