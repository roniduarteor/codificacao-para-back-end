// Atividade 4: Informações do Usuário
// Escreva um código que exiba o nome do usuário do sistema atual.
// Em seguida, exiba também o diretório inicial do usuário.

const os = require('node:os')

console.log(os.hostname())
console.log(os.homedir())