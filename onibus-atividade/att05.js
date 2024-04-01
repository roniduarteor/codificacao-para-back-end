const data = require('./onibus.json')

// - Encontrar informações do ônibus por ID:
//     - Crie uma função que aceite o ID de um ônibus como entrada e retorne todas as informações sobre esse ônibus.

const idOnibus = 'A100'

data.onibus.map((item)=>{
    if(item.id == idOnibus){
      console.log(item)
    }
})