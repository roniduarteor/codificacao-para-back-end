module.exports = {
    subtracao(a, b){
        console.log(`${a - b}`)
    },
    aoQuadrado(a){
        console.log(`${a*a}`)
    },
    divisao(a,b){
        if(b <= 0){
            console.log('Divisor tem que ser maior que 0')
        }else{
            console.log(`${a/b}`)
        }
    }
}