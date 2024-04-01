const data = require('./onibus.json')

// - Verificar disponibilidade de ônibus por linha:
//     - Implemente uma função que mostre quantos ônibus estão disponíveis para uma determinada linha.

const linha = 2

    data.onibus.map((item)=>{
        if(item.linha == linha){
            console.log(`Ônibus disponível: ${item.id}\n`)
        }
    })