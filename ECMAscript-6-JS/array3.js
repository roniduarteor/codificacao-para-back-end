// Pesquisar e filtrar dados de um array

const numbers = [1,2,3,4,5]

// Encontrar o primeiro elemento que satifaz a condição
const encontrado = numbers.find((num) => num > 2) // condição aqui de ser maior que 3, pega o primeiro q aparece e n liga pro resto
console.log(encontrado)



// cria um novo array com todos aqueles que passaram no teste/condição
const filter = numbers.filter((num) => num %2 === 0) // aqui ele pega todos os números pares
console.log(filter)



// Verifica se um array possui um determinado valor, retorna true ou false
const includes = numbers.includes(4) // se tiver o número ele vai dizer se é true(verdadeiro, dizendo que tem aquele número) ou false(falso, dizendo que NÃO tem aquele número)
console.log(includes)



// Faz um teste em todos os elementos, e todos eles devem passar para trazer uma mensagem verdadeira
const every = numbers.every((num) => num %2 === 0)
console.log(every) // ta dando false pois não tem só números pares no array de números



// Verifica se pelo menos 1 elemento satisfaz a condição
const some = numbers.some((num) => num %2 === 0)
console.log(some) // true pois existem elementos pares para essa condição