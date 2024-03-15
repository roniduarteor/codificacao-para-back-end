const listaPacientes = []

// saida de dados
const outAtendimento = document.getElementById('outAtendimento')
const outList = document.getElementById('outList')


// ------------ ADICIONAR PACIENTE ------------
const btnAdicionar = document.getElementById('btnAdicionar')
btnAdicionar.addEventListener('click', ()=>{
    
    const inPaciente = document.getElementById('inPaciente').value

    if(inPaciente === ''){
        alert('Insira o nome do paciente')
        return
    }

        listaPacientes.push(inPaciente)
        console.log(listaPacientes)

        let lista = ''
        listaPacientes.map((listaPaciente, index)=>{
            return (lista += `${index + 1} - ${listaPaciente}\n`)
        })

        outList.innerHTML = lista
    
})



// ------------ URGENCIA ------------
const btnUrgencia = document.getElementById('btnUrgencia')
btnUrgencia.addEventListener('click', ()=>{

     const inPaciente = document.getElementById('inPaciente').value

    if(inPaciente === ''){
        alert('Insira o nome do paciente')
        return
    }
        listaPacientes.unshift(inPaciente)
        console.log(listaPacientes)

        let lista = ''
        listaPacientes.map((listaPaciente, index)=>{
            return (lista += `${index + 1} - ${listaPaciente}\n`)
        })

        outList.innerHTML = lista
})



// ------------ ATENDER ------------
const btnAtender = document.getElementById('btnAtender')
btnAtender.addEventListener('click', ()=>{
    const inPaciente = document.getElementById('inPaciente').value

    if(listaPacientes.length === 0){
        alert('Nenhum paciente na lista de espera')
        return
    }

    let atender = listaPacientes[0]
    outAtendimento.innerHTML = atender

        listaPacientes.shift(inPaciente)
        console.log(listaPacientes)

        let lista = ''
        listaPacientes.map((listaPaciente, index)=>{
            return (lista += `${index + 1} - ${listaPaciente}\n`)
        })

        outList.innerHTML = lista
})

// ------------ FAZER APARECER NO HTML ------------



// <h1>Consultório Odontológico</h1>
//     <p>
//         Paciente:
//         <input type="text" id="inPaciente" autofocus>
//         <input type="button" value="Adicionar" id="btnAdicionar">
//         <input type="button" value="Urgência" id="btnUrgencia">
//         <input type="button" value="Atender" id="btnAtender">
//     </p>

//     <h3>
//         Em atendimento:
//         <span id="outAtendimento" class="fontAzul"></span>
//     </h3>

//     <pre id="outList"></pre>
//     <script src="./app.js"></script>
    