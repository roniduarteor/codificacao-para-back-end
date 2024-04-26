import http from 'node:http'

const PORT = 3333

const users = []
const server = http.createServer((request, response)=>{
    const {method, url} = request

    if(url === '/users' && method === "GET"  ){ // BUSCAR TODOS os usuários

        response.setHeader('Content-Type', 'application/json') // application/json -> pra virar um json
        response.end(JSON.stringify(users)) // converte todos os objetos do "users" pra entregar um objeto JSON


    }else if(url.startsWith("/users/") && method === 'GET'){ // BUSCAR UM único usuário 

        const userId = url.split('/')[2]  // vai ser o id que vai buscar lá na URL
        console.log(userId)

       const userById = users.find((user) => user.id == userId)

        if(userById){ //  esse if e else é para ver se ele vai retornar algum valor, se vai conseguir encontrar o id, pq se não encontrar nada ele vai retornar user sendo false, então precisa indicar que ali não foi encontrado nada
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(userById))

        }else{
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({ message: "Usuário não encontrado" }))
        }



    }else if(url === '/users' && method === 'POST'){ // CADASTRAR um usuário

        let body = ''
        request.on ('data', (chunk)=>{ // "on" é uma escuta / "data" recebe as informações via navegador

            body += chunk.toString() // pedacinhos para construir as informações

        })
        request.on('end', ()=>{ // evento para finalizar a instrução

            const novoUsuario = JSON.parse(body) // transformou a variável body em um JSON
            novoUsuario.id = users.length + 1 // ir mudando o id de acordo com o tamanho do array lá de users
            users.push(novoUsuario)
            response.writeHead(201, {'Content-Type': 'application/json'}) // como ta trabalhando com objetos, usa ":" ao invés de ","

            response.end(JSON.stringify(novoUsuario))

        })

    }else if(url.startsWith("/users/") && method === 'PUT'){ // ATUALIZAR um usuário

        const userId = url.split('/')[2]  // preciso pegar o usuário e ver se ele existe pra aí sim atualizar ele
        console.log(userId)

        let body = ''
        request.on ('data', (chunk)=>{

            body += chunk.toString()

        })
        request.on('end', ()=>{
            const updateUser = JSON.parse(body) // atualizar o usuario, a variável vai receber todas as informações no formato JSON
            const index = users.findIndex((user)=> user.id == userId)  // vai pesquisar pra ver se existe esse usuário

            if(index !== -1){ // ver se tem o usuário cadastrado, pra depois poder atualizar, e se não tiver, ele vai retornar um erro
                // atualizar
                users[index] = {...users[index], updateUser} // o objeto vai receber os usuarios novos
                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(users[index]))
            }else{
                // retornar um erro
                response.writehead(404, {"Content-Type": "application/json"})
                response.end(JSON.stringify({message: "Erro ao tentar atualizar usuário"}))
            }
        })

    }else if(url.startsWith("/users/") && method == 'DELETE'){ // DELETAR um usuário
        const userId = url.split('/')[2]
        console.log(userId)

        const index = users.findIndex((user)=> user.id == userId)

        if(index !== -1){
            users.splice(index, 1)
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({message: "Usuário excluído"}))
        }else{
        response.writehead(404, {"Content-Type": "application/json"})
        response.end(JSON.stringify({message: "Erro ao tentar excluir o usuário"}))
        }

        


    }else{ // Rota não existe / Recurso não encontrado
        response.writeHead(404, {"Content-Type": "application/json"})
        response.end(JSON.stringify({message: "Rota não encontrada"}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT: ${PORT}`)
})



// http -> protocolo de comunicação


// MÉTODOS: forma da aplicação front-end entrar em contato com o back-end

// GET (solicitar informações), 

// POST(Enviar uma informação, geralmente para cadastro),

// PUT(atualizar o objeto como um todo, ex.: mudar todas as informações do perfil), 

// PATH(atualizar uma informação específica, ex.: mudar a foto de perfil), 

// DELETE (deletar recursos)

/* 
    REQUISIÇÃO:
    pede o método HTTP e vê o que vai mandar

    1. corpo da requisição (request.body) (usa o POST)-> todas as informações que vão vir do corpo da aplicação

    2. parâmetros de busca (Search PARAMS, QUERY PARAMS) ex.:
        http://localhost:3333/users/2 (GET)
        2 -> parâmetro de busca

    3. Parâmetros de ROTA (ROUTE PARAMS) - http://localhost:3333/users/1 (PUT, PATH, DELETE)
        preciso passar uma informação para atualizar ou excluir um dado
*/


// CÓDIGOS