function teste(x,y,z){
    return x + y + z
}

console.log(teste(), teste(1), teste(1,2,3))


function soma(x,y,z){
    x = x || 1 // essas coisas no ecmascript antigo
    y = y || 1
    z = z || 1

    return x + y + z
}

console.log(soma(), soma(2), soma(1,2,3), soma(0,0,0)) // ele diz que 0 é um valor falso, então transforma em 1 lá na função

function soma2 (x,y,z){
    if(x == undefined){ // essas coisas no ecmascript antigo
        x = 1
    }
    if(y == undefined){ 
        y = 1
    }
    if(z == undefined){ 
        z = 1
    }

    return x + y + z
}
console.log(soma2(), soma2(2), soma2(1,2,3), soma2(0,0,0))

function soma3(x,y,z){
    x = x !== undefined ? x : 1 //operador ternário
    y = 1 in arguments ? y : 1
    z = isNaN(z) ? 1 : z
    return x + y + z
}
console.log(soma3(), soma3(2), soma3(1,2,3), soma3(0,0,0))

function soma4(x = 1, y = 1, z = 1){
    return x + y + z;
}

console.log(soma4(), soma4(2), soma4(1,2,3), soma4(0,0,0))