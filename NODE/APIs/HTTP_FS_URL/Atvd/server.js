import {createServer} from 'node:http' // aqui ele ta importando só o createServer pq do modulo de HTTP a gente só vai usar o createServer
import fs from 'node:fs'
import { URLSearchParams } from 'node:url' // aqui a mesma coisa do http

import lerDadosReceitas from './lerReceitas.js'

const PORT = 3333 // porta para saber onde buscar as informações do nosso servidor

const server = createServer((request, response)=>{ // não precisa mais usar o http. no inicio, já que a gente já está importando a função createServer diretamente do HTTP
    const {method, url} = request // aqui ele ta fazenod a requisição do método (GET, PUT, DELETE, etc...), e da URL

    // aqui estão listadas as rotas para criar nossa api

    if(method === 'GET' && url === '/receitas'){ // listar
        // response.end(method) // só pra exibir o negócio certinho

        // FS -> fs.readFile('ondeEstáOarquivo', 'utf8', callback)
        // aqui ele vai ler o arquivo "readFile"

        lerDadosReceitas((err, receitas)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: "Erro ao leros dados das receitas"}))
                return
            }
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(receitas))
        })


    }else if(method === 'POST' && url === '/receitas'){ // cadastrar
        // response.end(method) // só pra exibir o negócio certinho

        let body = ''
        request.on('data', (chunk)=>{
            body+= chunk
        })
        request.on('end', ()=>{
            if(!body){
                response.writeHead(400, {"Content-type": "application/json"})
                response.end(JSON.stringify({message:"Corpo da aplicação vazio"}))
                return
            }
            const novaReceita = JSON.parse(body)
            lerDadosReceitas((err, receitas) => {
                if(err){
                    response.writeHead(500, {"Content-type": "application/json"})
                    response.end(JSON.stringify({message:"Erro ao ler dados da receita"}))
                    return
                }
                novaReceita.id = receitas.length + 1
                receitas.push(novaReceita)
                fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (err)=>{
                    if(err){
                        response.writeHead(500, {"Content-type": "application/json"})
                        response.end(JSON.stringify({message:"Erro ao cadastrar nova receita"}))
                        return
                    }
                })
                response.writeHead(201, {"Content-type": "application/json"})
                response.end(JSON.stringify(novaReceita))
                return
            })
            response.end()
        }) 
        
    }else if(method === 'PUT' && url.startsWith('/receitas/')){ // atualizar
        // response.end(method) // só pra exibir o negócio certinho
        
        const id = parseInt(url.split('/')[2])
        let body = ''

        request.on('data', (chunk)=>{
            body += chunk
        })
        request.on('end', ()=>{
            if(!body){
                response.writeHead(400, {"Content-type": "application/json"})
                response.end(JSON.stringify({message:"Corpo da aplicação vazio"}))
                return
            }

            lerDadosReceitas((err, receitas) => {
                if(err){
                    response.writeHead(500, {"Content-type": "application/json"})
                    response.end(JSON.stringify({message:"Erro ao ler dados da receita"}))
                    return
                }

                const indexReceita = receitas.findIndex(()=> receitas.id === id)

                if(indexReceita !== -1){
                    response.writeHead(404, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Receita não encontrada'}))
                    return
                }

                const receitaAtualizada = JSON.parse(body)
                receitaAtualizada.id = id
                receitas[indexReceita] = receitaAtualizada

                fs.writeFile('receitas.json', JSON.stringify(receitas, null, 2), (err)=>{
                    if(err){
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify({message: 'Não é possível atualizar a receita'}))
                        return
                    }
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify(receitaAtualizada))
                })
        })
    })

    }else if(method === 'DELETE' && url.startsWith('/receitas/')){ // deletar
       // response.end(method) // só pra exibir o negócio certinho
        
    }else if(method === 'GET' && url.startsWith('/receitas/')){ // listar específico
       // response.end(method) // só pra exibir o negócio certinho
        
    }else if(method === 'GET' && url.startsWith('/categorias')){
        //localhost:3333/categorias
       // response.end(method) // só pra exibir o negócio certinho
        
    }else if(method === 'GET' && url.startsWith('/busca')){
        //localhost:3333/busca?termo=Pratos%20Principais
        // %20 significa espaço
        // response.end(method) // só pra exibir o negócio certinho

    }else if(method === 'GET' && url.startsWith('/ingredientes')){
        //localhost:3333/busca?termo=cebola
        // response.end(method) // só pra exibir o negócio certinho

    }else{ // caso a rota não seja encontrada!
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Rota não encontrada'}))
    }
})

server.listen(PORT, ()=>{ // ta abrindo o servidor
    console.log(`Servidor on PORT: ${PORT} 😶‍🌫️`)
})

