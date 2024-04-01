// const { aoQuadrado, divisao } = require('./criei_um_modulo')
const meuModulo = require('./criei_um_modulo')
console.log(meuModulo)

const subtracao = meuModulo.subtracao
const divisao = meuModulo.divisao
const aoQuadrado = meuModulo.aoQuadrado
subtracao(2,2)
aoQuadrado(2)
divisao(10,-2)
divisao(10,2)