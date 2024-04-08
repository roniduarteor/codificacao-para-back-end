// mjs permite usar o import/export sem criar um projeto node e mudar o arquivo no package json
import soma from './soma.mjs'
const minimist = require('minimist')

soma(2,2)


// const minimist = require('minimist')
// // console.log(minimist) // se retornar [Function (anonymous)] então ta funcionando

// const args = minimist(process.argv.slice(2))
// console.log(args)

// const nome = args['nome']
// const idade = args['idade']

// console.log(`Nome: ${nome} e idade: ${idade} anos`)