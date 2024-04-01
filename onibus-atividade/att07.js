const data = require('./onibus.json')

// - Listar todas as linhas disponíveis:
//     - Implemente uma função que retorne uma lista de todas as linhas disponíveis, juntamente com os horários de partida e chegada.

data.linhas.map((item)=>{
    console.log(item.nome)
    console.log(item.horarios)
    console.log('\n')
})