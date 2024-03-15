// Estrutura de dados -> ARRAY

// ao criar uma variável vc cria um espaço para armezar o valor dela
const array = []
// array[1] = 3
// array[1] = 6

// const numero = 3
// numero = 5
console.log(array)


// função que vai se transformar em um objeto
const vetor = new Array()
console.log(typeof array) // retorna objeto
console.log(typeof vetor) // retorna objeto


// referência aos elementos de um array
const produtos = ["Arroz", "Feijão", "Iogurt"]
console.log(produtos[0]) // se eu quiser buscar algo em específico tenho que passar o indice onde o produto está Ex.: produtos[0] -> retorna o Arrroz

// --------------- COLOCAR E TIRAR COISA DO ARRAY ---------------

// para adicionar dados:
const estados = ["Alagoas"]
estados.push('Recife') // sempre adiciona no FINAL
console.log(estados)

estados.unshift('Bahia') // sempre adiciona no COMEÇO
console.log(estados)


// para remover dados
estados.pop() // sempre exclui no FINAL
console.log(estados)

estados.shift() // sempre exclui no COMEÇO
console.log(estados)


// --------------- VERIFICAR O TAMANHO DO ARRAY ---------------

const numeros = [1,2,3,4,5,6]
console.log(`Tamanho do array: ${numeros.length}`)


// --------------- APRESENTAR DADOS DE UM ARRAY ---------------
const cidades = ['Maceió', 'Rio Largo', 'Marechal']
console.log(`${cidades.toString()}`)

console.log(`${cidades.join(' - ')}`) // forma que eu escolho como vou separar os itens do array para apresentá-los

