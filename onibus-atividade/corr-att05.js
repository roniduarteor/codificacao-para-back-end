const data = require('./onibus.json')

const infoOnibus = (idOnibus)=>{
    const encontrarOnibus = data.onibus.filter((onibus)=> onibus.id === idOnibus)
    return encontrarOnibus != 0 ? {encontrarOnibus} : {
        message: 'Não existe esse ônibus na base de dados'
    }
}

const onibusId= 'A100'
const onibusInfo = infoOnibus(onibusId)
console.log(onibusInfo)