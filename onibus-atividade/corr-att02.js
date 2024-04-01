const data = require('./onibus.json')

const contarOnibusDisponveilPorLinha = (idLinha)=>{
    const onibusDaLinha = data.onibus.filter((onibus)=> onibus.linha === idLinha)
    return onibusDaLinha.length != 0 ? {onibusDaLinha} : {message: 'Não tem ônibus para essa linha'}
}

const id = 1
const onibusDisponivel = contarOnibusDisponveilPorLinha(id)
console.log(onibusDisponivel)