const fs = require('fs')

console.log(fs) // fs é um modulo nativo do node.js

fs.readFile('arquivo.txt', 'utf8', (err,data)=>{

    if(err){
        console.log(err)
    }
    console.log(data)

}) // 3 parametros
// 1º onde está o arquivo 
// 2º cryptografia do arquivo 
// 3º função que passa 2 parametros (erro, e informações que estão no arquivo)