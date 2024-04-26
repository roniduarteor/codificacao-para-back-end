import http from 'node:http'
import fs from 'node:fs'
import { v4 as uuidv4 } from 'uuid'; // as -> da um novo nome a propriedade v4

const PORT = 3333

// titulo, autor, genero, anoPublicacao, [personagens]

const server = http.createServer((request,response)=>{
    const {url, method} = request
    

    fs.readFile('livros.json', 'utf8', (err, data)=>{ // fazer a escrita dos dados lá no livros.json
    
        if(err){
        response.writeHead(500, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: "Erro interno do servidor"}))

        return 
    }
    
    let jsonData= []

    try { // vai trabalhar com as informações,obrigando elas a passarem para o tipo JSON
        jsonData = JSON.parse(data)
    } catch(error) {
        console.log(error)
    }

    if(url === '/livros' && method === 'GET'){ // listar
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(jsonData))
    }else if(url === '/livros' && method === 'POST'){ // cadastrar

        let body = ''
        request.on('data', (chunk)=>{
            body += chunk.toString()
        })

        request.on('end', ()=>{
            const novoLivro = JSON.parse(body)

            novoLivro.id = uuidv4()
            jsonData.push(novoLivro)

            fs.writeFile('livros.json', JSON.stringify(jsonData, null, 2), (error)=>{
                if(error){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                    return
                }

                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({novoLivro}))

            })
        })

    }else if(url.startsWith("/livros/") && method === "PUT"){ // atualizar

        const id = url.split('/')[2]
        
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk.toString()
        })
        request.on('end', ()=>{
            const livroAtualizado = JSON.parse(body)
            const index = jsonData.findeIndex((livro)=> livro.id == id)
            
            if(index !== -1){

                jsonData[index] = {...jsonData[index], ...livroAtualizado}

                fs.writeFile('livros.json', JSON.stringify(jsonData, null, 2), (error)=>{
                    if(error){
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                        return
                    }
                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify(jsonData[index]))
                })

            }
        })
        
        

        console.log(id)
        response.end()

    }else if(url.startsWith('/livros/') && method === "DELETE"){ // excluir

        const id = url.split('/')[2]
        const index = jsonData.findIndex((livro)=> livro.id == id)
        if(index !== -1){
            jsonData.splice(index, 1)
            fs.writeFile('livros.json', JSON.stringify(jsonData, null, 2), (error)=>{
                if(error){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                    return
                }
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: "Livro removido com sucesso"}))
            })

        }

    }else if(url.startsWith('/livros/') && method === "GET"){ // procurar específico

        const id = url.split('/')[2]
        const index = jsonData.findIndex((livro)=> livro.id == id)

        if(index !== -1){
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(jsonData[index]))
        }else{
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: "Livro não encontrado"}))
        }

    }else{ // caso não exista
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Página não encontrada'}))
    }
    })


    
    
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT ${PORT}😶‍🌫️`)
})