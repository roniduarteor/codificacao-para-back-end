// Adicionar números ao vetor

// impedir repetidos

// mostrar numeros toda vez que adicionar

// verificar ordem = ver se ta em ordem crescente


// entrada de dados
const inNumero = document.getElementById('inNumero')

// botoes
const btnAdicionar = document.getElementById('btnAdicionar')
const btnVerificar = document.getElementById('btnVerificar')

// saida de dados
const outLista = document.getElementById('outLista')


const numeros = []

btnAdicionar.addEventListener('click', ()=>{
    let numero = inNumero.value

    const repetido = numeros.find((num)=> num == numero)
    
    if(repetido == true){
        alert('Número repetido')
    }else{
        
        numeros.push(numero)
        let lista = ''
        numeros.map((numero, index)=>{
        return (lista += `${index + 1} - ${numero}\n`)
        
        
    })
        outLista.textContent = lista
    }

    
})

btnVerificar.addEventListener('click', ()=>{
    for(let i = 0; i < numeros.length; i++){
        if(numeros[i] > numeros[i + 1]){
            alert(`${numero[i]} - Não está em ordem crescente`)
            return
        }else{
            alert('Estão em ordem crescente')
        }
    }
    
    

    

    
})


{/* <h1>Adicionar Números</h1>

<p>Número
    <input type="number" id="inNumero" autofocus>
    
    <input type="button" value="Adicionar" id="btnAdicionar">
</p>

    


<input type="button" value="Verificar ordem" id="btnVerificar">

<pre id="outLista"></pre> */}