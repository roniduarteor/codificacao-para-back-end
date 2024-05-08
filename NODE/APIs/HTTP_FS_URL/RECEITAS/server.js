import http from 'node:http'
import fs from 'node:fs'

const PORT = 3333


const server = http.createServer((request, response)=>{

    const {url, method} = request

        fs.readFile('receitas.json', 'utf8', (err,data)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end({message: "Erro interno do servidor"})
                return
            }

            let receitas = []

            try{
                receitas = JSON.parse(data)
            } catch(error){
                console.log(error)
            }

            if(url === '/receitas' && method === 'POST'){
                let body = ''
                request.on('data', (chunk)=>{
                     body += chunk.toString()
                })

                request.on('end', ()=>{
                    const novaReceita = JSON.parse(body)

                    novaReceita.id = receitas.length + 1
                    receitas.push(novaReceita)

                    fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (error)=>{
                        if(error){ // se o erro acontecer
                            response.writeHead(500, {'Content-Type': 'application/json'})
                            response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                            return
                        }

                        response.writeHead(200, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify(novaReceita)) // passa a nova receia pro arquivo json
                    })
                })
                
         }

         else if(url==='/receitas' && method==='GET'){
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(receitas))
         }

         else if(url==='/receitas/categorias' && method==='GET'){
            const categorias = []
            const listagem = receitas.map((receita)=> categorias.push(receita.categoria))

            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(categorias))
         }

         else if(url==="/receitas/ingredientes" && method==='GET'){
            const ingredientes = []
            const listagem = receitas.map((receita)=> ingredientes.push(receita.ingredientes))

            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(ingredientes))
         }

         else if(url.startsWith('/receitas/') && method==='GET'){
            const idReceita = url.split('/')[2]
            const index = receitas.findIndex((receita)=> receita.id == idReceita) // não retornar o array

            if(index !== -1){
                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(receitas[index]))
            }else{
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Receita não encontrada'}))
            }
         }

         else if(url.startsWith('/receitas/') && method==='PUT'){
            const idReceita = url.split('/')[2]
            const index = receitas.findIndex((receita)=> receita.id == idReceita)

            let body = ''
            request.on('data', (chunk)=>{
                body += chunk.toString()
            })

            request.on('end', ()=>{
                const atualizacaoReceita = JSON.parse(body)

            if(index !== -1){
                receitas[index] = {...receitas[index], atualizacaoReceita}

                fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (err)=>{
                    if(err) {
                    response.writeHead(500, { "Content-Type": "application/json" })
                    response.end(JSON.stringify({ message: "Erro interno do servidor"}))
                    return
                    }

                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify(receitas[index]))
                })
            
            }else{
            response.writeHead(404, { "Content-Type": "application/json" })
            response.end(JSON.stringify({ message: "Receita não encontrada" }))
            }
            })

            
         }

         else if(url.startsWith('/receitas/') && method==='DELETE'){
            const idReceita = url.split('/')[2]
            const index = receitas.findIndex((receita)=> receita.id == idReceita)

            if(index !== -1){
                receitas.splice(index, 1)

                fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (err)=>{
                    if(err){
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                        return
                    }

                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: "Receita removida!"}))
                })
            }else{
            response.writeHead(404, { "Content-Type": "application/json" })
            response.end(JSON.stringify({ message: "Receita não encontrada" }))
            }
         }
        })
    

})

server.listen(PORT, ()=>{
    console.log(`server on PORT ${PORT}`)
})