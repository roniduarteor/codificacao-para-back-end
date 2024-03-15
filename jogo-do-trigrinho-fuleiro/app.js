const numeroSorteado = Math.floor(Math.random() * 100) + 1
console.log(numeroSorteado)

const numerosErrados = []

// botões
const btnApostar = document.getElementById('btnApostar')


const btnReiniciar = document.getElementById('btnReiniciar')
btnReiniciar.addEventListener('click', ()=>{
    window.location.reload()
})

// saida de dados
const outErros = document.getElementById('outErros')
const outChances = document.getElementById('outChances')
const outDicas = document.getElementById('outDicas')


let tentivas = 6
let erros = 0
const numeroJogados = []

btnApostar.addEventListener('click', ()=>{
    const inNumero = document.getElementById('inNumero').value
    numeroJogados.push(inNumero)

    if(inNumero === '' || inNumero <= 0 || isNaN(inNumero)){
        alert('Insira um valor válido!')
        window.location.reload()
    }

    else if(inNumero != numeroSorteado){
        erros = numeroJogados.length
        let chances = tentivas - erros

        console.log(`Quantidade de erros: ${erros}`)
        console.log(`Chances restante: ${chances}`)
        console.log(numeroSorteado)

        if(chances == 0){
            alert(`Acabaram suas chances =( \n o número sorteado era: ${numeroSorteado}`)
            btnApostar.disabled = true
            return
        }else{
            let dica = inNumero < numeroSorteado ? "Maior" : "Menor"
            outDicas.textContent = `Tente um número ${dica} que ${inNumero}`


            outChances.innerHTML = chances // mostrar quantas chances ainda tem
            outErros.innerHTML = `${erros} [${numeroJogados.join(' - ')}]` // mostrar os numeros já jogados
            console.log(numeroJogados)
        }
        
        
        

    }else if(inNumero == numeroSorteado){
        erros = numeroJogados.length
        let chances = tentivas - erros

        console.log(`Quantidade de erros: ${erros}`)
        console.log(`Chances restante: ${chances}`)

        btnApostar.disabled = true
        outDicas.textContent = `Parabéns! você acertou o número ${numeroSorteado}!`
        return
    }


})

/* <h1>Descubra um número</h1>

<p>Número:</p>
<input type="text" id="inNumero" autofocus>
<input type="button" value="Apostar" id="btnApostar">
<input type="button" value="Reiniciar o jogo" id="btnReiniciar">

<h3>Erros: <span id="outErros"></span></h3>
<h3>Chances: <span id="outChances"></span></h3>
<h3>Dica: 
    <span id="outDicas">Dica: É um número entre 1 e 100</span></h3> */
