// programação sincrona - statica

const fs = require('node:fs')

console.log('start')

fs.writeFileSync('Arquivo1.txt', 'Olá')

console.log('End')