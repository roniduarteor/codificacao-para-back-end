console.log(process.argv)

const args = process.argv.slice(2)

const nome = args[0].split('=')[1] // 'nome=Carlos'
console.log(nome)

const idade = args[0].split('=')[1] // 'nome=Carlos'
console.log(idade)