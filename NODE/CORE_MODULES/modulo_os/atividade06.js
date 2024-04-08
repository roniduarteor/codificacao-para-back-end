// Atividade 6: Pesquise outros métodos e propriedades do módulo OS
// Crie um código que exiba informações adicionais do sistema operacional, como número IPV4 e IPV6 de rede, 
// Informações de tempo de atividade do sistema operacional em Horas, minutos e segundos
// Diretórios temporários.

const os = require('node:os')

// Math.round pra arredondar pro número inteiro mais próximo
let hora = Math.round(os.uptime / 3600) // pega os segundos, divide por 3600 para transformar em horas
let minutos = Math.round((os.uptime % 3600)/60) // pega os segundos, divide para horas, mas pega o resto dessa divisão (que o resto vai ser igual ao que sobrou das horas), o resto da divisão é os segundos que restaram/sobraram, ent divide por 60 pra descobrir os minutos
let segundos = Math.round((os.uptime % 3600) % 60) // pega os segundos, divide pra virar horas, mas pega o resto das horas, que vai ser transformada em minutos, pra dps pega o resto dos minutos, que vai ser o segundos
console.log(`${hora}h ${minutos}min ${segundos}s`)
console.log(os.tmpdir())
console.log(os.networkInterfaces())