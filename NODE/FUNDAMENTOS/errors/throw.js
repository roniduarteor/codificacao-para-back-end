// BLoco de código para tratar instruções async
// try{
//     // instrução de demora para acontecer ≠ estático
// } catch (error) {
//     console.log(error)
// }

const b = '10'

if(!Number.isInteger(b)){
    console.log('O valor de B não for um valor inteiro')
    throw new Error('o valor de B não é inteiro')
}

console.log('resto dos códigos')