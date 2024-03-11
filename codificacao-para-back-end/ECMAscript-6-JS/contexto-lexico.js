// 1º Contexto - Global
let filme = 'Senhor dos aneis'

{
    // 2º Contexto - função
    let filme2 = 'Star Wars' // só funciona no contexto da função que foi criada
    if(true){
        // 3º Contexto - Bloco -> se eu declaro dentro desse bloco, ele só vai funcionar dentro desse bloco
        let filme3 = 'Barbie'
        console.log(filme)
        console.log(filme2)
        console.log(filme3)
    }
    console.log(filme)
    console.log(filme2) // filme 2 está sendo criada dentro de um bloco de código, então se e criar dentro desse contexto, ele só vai ser chamada dentro desse contexto
    console.log(filme3)
}

console.log(filme)
console.log(filme2) // deu erro pois essa variável 'filme2' está sendo chamada fora do escorpo