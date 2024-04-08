// Atividade 5: Detalhes do Sistema Operacional
// Escreva um código que exiba informações detalhadas sobre o sistema operacional, como o nome, a versão e a plataforma.
// Utilize os métodos apropriados do módulo OS para obter as informações necessárias.

const os = require('node:os')

console.log(os.type())
console.log(os.version())
console.log(os.platform())
console.log(os.arch())