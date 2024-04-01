// 1) validar o preenchimento, adicionar um clube ao vetor e listar os clubes;

// 2) listar os clubes (se houver);

// 3) montar a tabela de jogos, no formato primeiro x último, segundo x penúltimo e assim por diante.

// Exibir mensagem e não listar a tabela de jogos, caso o número de clubes informados seja ímpar.

// entrada de dados
const inNome = document.getElementById('inNome')

//botao
const btnAdicionar = document.getElementById('btnAdicionar')
const btnListar = document.getElementById('btnListar')
const btnJogos = document.getElementById('btnJogos')

// saida de dados
const outLista = document.getElementById('outLista')


const clubes = []
const jogos = []

btnAdicionar.addEventListener('click', ()=>{
    let nome = inNome.value

    if(nome === ''){
        alert('Insira os dados corretamente')
        inNome.focus()
        return
    }else{
        clubes.push(nome)
        console.log(clubes)
    }
})

btnListar.addEventListener('click', ()=>{
    if(clubes.length === 0){
        alert('Não tem clubes, adicione as informações corretamente')
        inNome.focus()
        return
    }else{
        let lista = ''
        clubes.map((clube, index)=>{
            return (lista += `${index + 1} - ${clube}\n`)
        })
        outLista.textContent = lista
    }
})

btnJogos.addEventListener('click',()=>{
    if(clubes.length % 2 !== 0){
        alert('Não é possível fazer a tebela pois a quantidade de clubes é ímpar')
        inNome.focus()
        return
    }else{
    
    for(let i = 0; i <= clubes.length; i++){
    let primeiroRemovido = clubes.shift()
    let ultimoRemovido = clubes.pop()

    console.log(primeiroRemovido)
    console.log(ultimoRemovido)
    
    jogos.push(primeiroRemovido, ultimoRemovido)
    
    }
    console.log(jogos)

    for(let i = 0; i < jogos.length; i += 2){
        const lista = jogos.join(`${jogos[i]} x ${jogos[i + 1]}\n`)

        document.write(`${jogos[i]} x ${jogos[i + 1]} `)
        
        // outLista.textContent = lista
    }
    
}
  
})

{/* <h1>Ordernar os clubes e jogos</h1>

<p>Clube:
    <input type="text" id="inNome" autofocus>
    
    <input type="button" value="Adicionar" id="btnAdicionar">
</p>

    


<input type="button" value="Listar todos os clubes" id="btnListar">
<input type="button" value="Mostrar tabela de jogos" id="btnJogos">

<pre id="outLista"></pre> */}