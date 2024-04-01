const data = require('./onibus.json')

// - Verificar se há motorista atribuído:
//     - Escreva uma função que aceite o ID de um ônibus como entrada e verifique se há um motorista atribuído a esse ônibus.

const idOnibus = 'A100'

data.onibus.map((item)=>{
    if(item.id == idOnibus){
        console.log(item.motorista)
    }
})