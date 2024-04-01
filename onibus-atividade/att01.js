// Consultar horários de partida e chegada por linha:
//     - Crie uma função que aceite o ID da linha como entrada e retorne os horários de partida e chegada para essa linha.]

const data = require('./onibus.json') // pega os dados do Json

const id = 2 // id definido pelo usuário

    data.linhas.map((item)=>{ // percorre todo o array de linhas
            if(item.id == id){ // compara se o valor do id definido pelo usuário é igual ao do coisinha lá da data
                console.log(item.horarios)
            }
    })