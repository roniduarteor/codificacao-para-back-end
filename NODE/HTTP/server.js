const http = require('node:http')
const PORT = 3333

// request -> url (faz análise em uma url)
const server = http.createServer((request, response)=>{
    if(request.url === '/'){
        response.writeHead(200, {'Content-Type': 'text/plan'})
        response.end('Página inicial')
    }else if(request.url === '/sobre'){
        response.writeHead(200, {'Content-Type': 'text/plan'})
        response.end('Página Sobre')
    }else{
        response.writeHead(404, {'Content-Type': 'text/plan'})
        response.end('Página Não encontrada')
    }
})

server.listen(PORT, ()=>{
    console.log('Servidor on PORT'+PORT)
})