const minimist = require('minimist')
// console.log(minimist) // se retornar [Function (anonymous)] então ta funcionando

const args = minimist(process.argv.slice(2))
console.log(args)

const nome = args['nome']
const idade = args['idade']

console.log(`Nome: ${nome} e idade: ${idade} anos`)