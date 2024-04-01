const data = require('./onibus.json')

// - Atualizar informações do ônibus:
//     - Crie uma função que aceite o ID de um ônibus e novas informações (como status, motorista, etc.) e atualize essas informações na base de dados.

const idOnibus = 'A100'

const escolhaMudanca = ['modelo', 'linha', 'status', 'motorista', 'ano_fabricacao', 'placa'] // o usuário vai escolher oq quer mudar

const escolhaDoUsuario = 'status' // escolheu oq queria mudar

data.onibus.map((item)=>{
    if(item.id == idOnibus){
        escolhaMudanca.find((item)=> item == escolhaDoUsuario) // pra ver se a mudanca q ele escolheu tem lá disponível pra mudar
            const mudanca = 'em manutenção' // oq ele mudou
            item.status = mudanca // fazendo a mudança / atualizando
            console.log(item)
    }
})