const data = require('./onibus.json')

const onibusPorStatus = (status)=>{
    const onibus = data.onibus.filter((onibus) => onibus.status === status)
    return onibus.length != 0 ? {onibus}:{message: 'Onibus não encontrado'}
}

const statusOnibus = 'em operação'
const situacaoOnibus = onibusPorStatus(statusOnibus)
console.log(situacaoOnibus)