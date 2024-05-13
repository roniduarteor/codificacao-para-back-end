import {createServer} from 'node:http' // aqui ele ta importando só o createServer pq do modulo de HTTP a gente só vai usar o createServer
import fs from 'node:fs'
import { URLSearchParams } from 'node:url' // aqui a mesma coisa do http

import lerDadosReceitas from './lerReceitas.js'

const PORT = 3333 // porta para saber onde buscar as informações do nosso servidor

const server = createServer((request, response)=>{ // não precisa mais usar o http. no inicio, já que a gente já está importando a função createServer diretamente do HTTP
    const {method, url} = request // aqui ele ta fazenod a requisição do método (GET, PUT, DELETE, etc...), e da URL
    // request -> todo envio do cliente ao servidor

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
                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify(receitaAtualizada))
                })
        })
    })

    }else if(method === 'DELETE' && url.startsWith('/receitas/')){ // deletar
       // response.end(method) // só pra exibir o negócio certinho
        
        const id = parseInt(url.split('/')[2])
        lerDadosReceitas((err, receitas)=>{ // essa função faz o trabalho do fs.readFile
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler dados da receita'}))
                return // serve para parar a execução
            }
            const indexReceita = receitas.findIndex((receita)=> receita.id === id)
            if(indexReceita === -1){
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Receita não encontrada'}))
                return
            }else{
                receitas.splice(indexReceita, 1)

                fs.writeFile("receitas.json", JSON.stringify(receitas, null, 2), (err)=>{ // serve para escrever as informações no aquivo.json
                    // 1º onde vai escrever, 2º como vai escrever, 3º se não conseguir escrever
                    if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Erro ao deletar receita no banco de dados'}))
                    return
                    }
                    response.writeHead(200, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Receita excluída!'}))
                })
            }
        })


        

    }else if(method === 'GET' && url.startsWith('/receitas/')){ // listar específico
       // response.end(method) // só pra exibir o negócio certinho

    }else if(method === 'GET' && url.startsWith('/categorias')){
        //localhost:3333/categorias
       // response.end(method) // só pra exibir o negócio certinho
        
    }else if(method === 'GET' && url.startsWith('/busca')){
        //localhost:3333/busca?termo=Pratos%20Principais
        // %20 significa espaço
        // response.end(method) // só pra exibir o negócio certinho

        const urlParam = new URLSearchParams(url.split('?')[1]) // aqui pra dividir a url e pegar as informações separando pela interrogação
        const termo = urlParam.get('termo') // vai pegar o valor contido no termo =)

        lerDadosReceitas((err, receitas)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: "Erro ao ler dados da receita"}))
                return
            }

            const resultadoBusca = receitas.filter((receita)=> receita.nome.includes(termo) || receita.categoria.includes(termo) || receita.ingredientes.some((ingrediente)=> ingrediente.includes(termo)))

            if(resultadoBusca.length === 0){
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: `Não foi encontrada receita com o termo ${termo}`}))
                return
            }
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(resultadoBusca))
        })

    }else if(method === 'GET' && url.startsWith('/ingredientes')){
        //localhost:3333/ingredientes/pesquisa=cebola
        // response.end(method) // só pra exibir o negócio certinho

        

    }else{ // caso a rota não seja encontrada!
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Rota não encontrada'}))
    }
})

server.listen(PORT, ()=>{ // ta abrindo o servidor
    console.log(`Servidor on PORT: ${PORT} 😶‍🌫️`)
})

