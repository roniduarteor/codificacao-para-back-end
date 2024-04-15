import http from "node:http"

const PORT = 3333

const participantes = []

// nome, e-mail, senha, idade e cidade

// 1. **Selecionar um Único participante**: A API deve ser capaz de selecionar um único participante
// 2. **Contagem de Participantes**: A API deve ser capaz de fornecer o número total de participantes cadastrados.
// 3. **Contagem de Maiores de Idade**: A API deve ser capaz de calcular quantos participantes têm idade igual ou superior a 18 anos.
// 4. **Identificação da Cidade com Maior Número de Participantes**: A API deve determinar qual cidade teve o maior número de participantes cadastrados.



// 8. **GET /participants/city/most**: Rota para identificar a cidade com o maior número de participantes.

const server = http.createServer((request, response)=>{
    const {method, url} = request


    // cadastrar
    if(url === "/participants" && method === "POST"){

        // validar para maior de 16 anos
        let body = ""

        request.on("data", (chunk)=>{
            body += chunk.toString()
        })

        request.on("end", ()=>{
            const novoUsuario = JSON.parse(body)

            if(novoUsuario.idade >= 16){
            novoUsuario.id = participantes.length + 1

            participantes.push(novoUsuario)

            response.writeHead(201, {"Content-Type": "application/json"})
            response.end(JSON.stringify(novoUsuario))
            }else{
                response.writeHead(401, {"Content-Type": "application/json"})
                response.end(JSON.stringify({message: "Não permitido!, tem que ser ter idade ou maior que 16!"}))
            }
            
        })

    }

    



    // quantiade maior que 18 anos
    else if(url === "/participants/count/over18" && method === "GET"){
        const count = participantes.filter((participante)=> participante.idade >= 18).length

        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify({Quantidade: count}))
    }
    
    


    // total de participantes
    else if(url === "/participants/count" && method === "GET"){
        const count = participantes.length

        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify({Quantidade: count}))
    }
    
    
    // selecionar um único participante
    else if(url.startsWith("/participants/") && method === "GET"){
        const participanteId = url.split("/")[2]
        const participantePeloId = participantes.find((participante)=> participante.id == participanteId)

        if(participantePeloId){
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(participantePeloId))
        }else{
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({message: "Usuário não encontrado"}))
        }
    }


    // atualizar
    else if(url.startsWith("/participants/") && method === "PUT"){
        const userId = url.split("/")[2]
        const participantePeloId = participantes.find((participante)=> participante.id == userId)

        if(participantePeloId){
            let body = ''
            request.on("data", (chunk)=>{
                body += chunk.toString()
            })

            request.on("end", ()=>{
                const atualizacaoUsuario = JSON.parse(body)

                const index = participantes.findIndex((participante)=> participante.id == userId)

                if(index !== -1){
                    if(atualizacaoUsuario.idade >= 16){
                    participantes[index] = {...participantes[index], atualizacaoUsuario}
                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify(participantes[index]))
                    }else{
                    response.writeHead(404, {"Content-Type": "application/json"})
                    response.end(JSON.stringify({message: "Usuário precisa ter idade maior ou igual a 16 anos"}))
                    }
                    
                }else{
                    response.writeHead(404, {"Content-Type": "application/json"})
                    response.end(JSON.stringify({message: "Usuário não encontrado"}))
                }
            })
        }
    }

    // deletar
    else if(url.startsWith("/participants/") && method === "DELETE"){
        const userId = url.split("/")[2]

        const index = participantes.findIndex((participante)=> participante.id == userId)

                if(index !== -1){
                    participantes.splice(index, 1)
                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify({message: "Usuário deletado!"}))
        }else{
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({message: "Usuário não encontrado"}))
        }
        
    }

    // Buscar todos os participantes
    else if(url === '/participants' && method === "GET"){
        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify(participantes))
    }

    // caso não encontre uma página
    else{
        response.writeHead(404, {"Content-Type": "application/json"})
        response.end(JSON.stringify({message: "Página não encontrada"}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})