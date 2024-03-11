// Arrow Function '=>' funções anônimas, ou seja, não tem nome

let circleArea = function(r){ // variável que recebeu uma função como valor
    let PI = Math.PI
    let area = PI * r * r
    return area.toFixed(2)
} 


let circleArea2 = (r)=>{ // posso ignorar o nome "Function" e ai eu adiciono a seta
    let PI = Math.PI
    let area = PI * r * r
    return area.toFixed(2) // ela precisa retornar algum valor
} 

console.log(circleArea(6)) // se não tiver um return, ele n consegue retornar um valor



let circleArea3 = (r)=>(Math.PI * r * r).toFixed(2) // como n utilizei as chaves, o retorno do valor já está implicito

console.log(circleArea3(2));