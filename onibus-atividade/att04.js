const data = require('./onibus.json')

// - Filtrar ônibus por status:
//     - Implemente uma função que aceite um status como entrada (por exemplo, "em operação" ou "em manutenção") e retorne uma lista de ônibus com esse status.

const status = "em operação"

data.onibus.map((item)=>{
    if(item.status == status){
        console.log(`Ônibus em operação: ${item.id}`)
    }
})