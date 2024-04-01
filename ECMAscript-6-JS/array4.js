// Classificar os itens de um vetor
const nomes = ['Carlos', 'Wilton', 'Fonseca']

console.log(nomes.sort()) // ele ordena por ordem alfabética
console.log(nomes.reverse()) // muda a ordem dos dados

const numbers = [12, 3, 5, 8, 20]

const ordemCrescente = (a,b) => a - b;
console.log(numbers.sort(ordemCrescente))


const ordemDecrescente = (a,b) => b - a;
console.log(numbers.sort(ordemDecrescente))

console.log(numbers.sort()) // aqui ele faz a validação do primeiro caracter
// coloca em ordem crescente de acordo com o primeiro caracter