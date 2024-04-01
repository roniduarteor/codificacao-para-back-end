const data = require('./onibus.json')

// - Listar todas as paradas de uma linha:
//     - Escreva uma função que aceite o ID da linha como entrada e retorne todas as paradas associadas a essa linha, ordenadas pela ordem de parada.

const idLinha = 1

data.linhas.forEach((item)=>{
    if(item.id == idLinha){
        console.log(item.paradas)
    }
})