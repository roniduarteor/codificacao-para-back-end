const http = require('node:http')

// trabalha sempre com REQUISIÇÃO(request) e RESPOSTA(response)
const server = http.createServer((request, response)=>{
    response.write('oi, primeiro server HTTP')
    response.end()
})

server.listen(3333, ()=>{
    console.log('Servidor on PORT: 3333😶‍🌫️')
})