const data = require('./onibus.json')

const horarioPorLinha = (idLinha)=>{
    const linha = data.linhas.find((linha)=> linha.id == idLinha) // isso pra pegar o id lá, como se tivesse filtrando/encontrando a

    if(linha){
        const horarios = linha.horarios.map((item)=>{
            // return {saida: item.saida, chegada: item.chegada}
            return `Saída ${item.saida}, Chegada: ${item.chegada}`
        })
        return horarios.join('\n')
        
    }else{
        return {message: "Não foi encontrada uma linha de ônibus"}
    }
}

const id = 1
const horariosLinhas = horarioPorLinha(id)
console.log(horariosLinhas)