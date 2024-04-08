// Arquivo async

const fs = require('node:fs')

console.log('start')

fs.writeFile('Arquivo2.txt', 'Olá', ()=>{
    setTimeout(()=>{
        console.log('Arquivo Criado')
    },3000)
})

console.log('End')