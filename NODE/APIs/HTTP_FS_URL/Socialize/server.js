import {createServer} from 'node:http'
import fs from 'node:fs'
import { URLSearchParams } from 'node:url'

import lerDadosDePerfil from './lerPerfil.js'

const PORT = 3333

const server = createServer((request, response)=>{
    const {method,url} = request

if(method === 'POST' && url === '/usuarios'){
    let body = ''
    request.on('data', (chunk)=>{
        body += chunk
    })
    request.on('end', ()=>{
        if(!body){ // caso não venha nenhuma informação
            response.writeHead(400, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: 'Corpo da aplicação vazio'}))
            return
        }
        const novoPerfil = JSON.parse(body)
        lerDadosDePerfil((err, perfil)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler dados da receita'}))
                return
            }

            // validar:
            // não pode repetir email

            const validacaoEmail = perfil.find((perfilUsuario)=> perfilUsuario.usuario.email.includes(novoPerfil.usuario.email))

            if(validacaoEmail){
                response.writeHead(401, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Esse email já foi cadastrado!'}))
                return
            }
            novoPerfil.id = perfil.length + 1
            perfil.push(novoPerfil)

            fs.writeFile('socialize.json', JSON.stringify(perfil, null, 2), (err)=>{
                if(err){ // dê erro quando for escrever no JSON
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message: 'Erro ao cadastrar nova receita'}))
                    return 
                }
            })
            response.writeHead(201, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(novoPerfil))
        })

    })
}

else if(method === 'GET' && url === '/usuarios'){
    lerDadosDePerfil((err, perfil)=>{
        if(err){
            response.writeHead(500, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: 'Erro ao ler os dados dos usuários'}))
            return
        }
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(perfil))
    })
}

else if(method === 'POST' && url === '/login'){
    // colocar as informações no body lá, pra enviar e dps ler no arquivo socialize.json e fazer a comparação

    let body = ''
    request.on('data', (chunk)=>{
        body += chunk
    })
    request.on('end', ()=>{
        const login = JSON.parse(body)

        lerDadosDePerfil((err, perfil)=>{
            if(err){
                response.writeHead(500, {"Content-type": "application/json"})
                response.end(JSON.stringify({message:"Erro ao ler dados dos usuários"}))
                return
            }

            // const validacaoEmail = perfil.find((perfilUsuario)=> perfilUsuario.usuario.email.includes(novoPerfil.usuario.email))

            const validacaoEmail = perfil.find((perfis)=> perfis.usuario.email.includes(login.email))

            // não esta validando corretamente :(
            const validacaoSenha = perfil.find((perfis)=> perfis.usuario.senha.includes(login.senha))

            if(validacaoEmail && validacaoSenha){
                response.writeHead(200, {"Content-type": "application/json"})
                response.end(JSON.stringify({message:"Login realizado com sucesso!"}))
            }else{
                response.writeHead(400, {"Content-type": "application/json"})
                response.end(JSON.stringify({message:"Informações incorretas ou não existem"}))
            }
    
        })
    })

}

else{
    response.writeHead(404, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({message: 'Rota não encontrada'}))
}
    
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT} 😶‍🌫️`)
})