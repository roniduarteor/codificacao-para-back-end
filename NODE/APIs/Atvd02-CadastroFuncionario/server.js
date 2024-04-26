import http from 'http'
import fs from 'fs'

const PORT = 3333

let empregados = []
const server = http.createServer((request, response)=>{
    const {url, method} = request

    fs.readFile('empregados.json', 'utf8', (err, data)=>{

        if (err) {
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Erro interno do servidor" }));
            return;
        }

        try{
            empregados = JSON.parse(data)
        } catch (error) {
            console.log('Erro ao analisar JSON:', error)
        }

    if(url === '/empregados' && method === 'POST'){
        let body = ''
        request.on('data', (chunk)=>{
            body += chunk.toString()
        })
        request.on('end', ()=>{
            const novoEmpregado = JSON.parse(body)
            

            if(novoEmpregado.idade < 18){
                response.writeHead(400, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ message: "Idade tem que ser maior ou igual a 18 anos" }))
                return
            }if(novoEmpregado.password !== novoEmpregado.confirmPassword){
                response.writeHead(400, {'Content-Type': 'application/json'})
                return  response.end(JSON.stringify({message: "As senhas fornecidas não correspondem"}))
            }

            novoEmpregado.id = empregados.length + 1
            empregados.push(novoEmpregado)

            fs.writeFile(
                "empregados.json",
                JSON.stringify(empregados, null, 2),
                (err) => {
                    if(err) {
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.end(JSON.stringify({message: 'Erro interno do servidor'}))
                        return
                    }
                    response.writeHead(201, { "Content-Type": "application/json" });
                    response.end(JSON.stringify(novoEmpregado));
                }
            )
        })
    }

    else if(url === '/empregados' && method === "GET"){
        response.writeHead(200, { "Content-Type": "application/json" })
        response.end(JSON.stringify(empregados))
    }

    else if(url === '/empregados/count' && method === 'GET'){
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(empregados.length));
    }

    else if(url.startsWith('/empregados/porCargo/') && method === "GET"){
        const cargo = url.split('/')[3]
        const cargoIgual = empregados.map((empregado)=> {
            if(empregado.cargo == cargo){
                return empregado
            }
        })

        if(cargoIgual){
            response.writeHead(200, {"Content-Type": 'application/json'})
            response.end(JSON.stringify(cargoIgual))
            
            fs.writeFile(
                "empregados.json",
                JSON.stringify(empregados, null, 2),
                (err) => {
                  if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(
                      JSON.stringify({ message: "Erro interno do servidor" })
                    );
                    return;
                  }
                  response.writeHead(200, { "Content-Type": "application/json" });
                  response.end(JSON.stringify(cargoIgual));
                }
              )
        }else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Cargo não encontrado" }));
    }}

    // GET /empregados/porHabilidade/{habilidade}: Rota para listar todos os funcionários que possuam uma determinada habilidade.

    else if(url.startsWith('/empregados/porHabilidade/') && method === 'GET'){
        const habilidade = url.split('/')[3]

        const habilidadeIgual = empregados.filter((empregado)=>{
            return empregado.habilidades == habilidade
        })

        if(habilidadeIgual){
            response.writeHead(200, {"Content-Type": 'application/json'})
            response.end(JSON.stringify(habilidadeIgual))
            
            fs.writeFile(
                "empregados.json",
                JSON.stringify(empregados, null, 2),
                (err) => {
                  if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(
                      JSON.stringify({ message: "Erro interno do servidor" })
                    );
                    return;
                  }
                  response.writeHead(200, { "Content-Type": "application/json" });
                  response.end(JSON.stringify(habilidadeIgual));
                }
              )
        }else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Habilidade não encontrada" }));
    }
    }

    else if(url.startsWith('/empregados/') && method === 'GET'){
        const id = url.split('/')[2]
        const findIndex = empregados.findIndex((empregados)=> empregados.id == id)

        if(findIndex !== -1){
            response.writeHead(200, {"Content-Type": 'application/json'})
            response.end(JSON.stringify(empregados[findIndex]))
        }else {
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Empregado não encontrado" }))
        }

        fs.writeFile(
            "empregados.json",
            JSON.stringify(empregados, null, 2),
            (err) => {
              if (err) {
                response.writeHead(500, { "Content-Type": "application/json" })
                response.end(
                  JSON.stringify({ message: "Erro interno do servidor" })
                );
                return
              }
              response.writeHead(200, { "Content-Type": "application/json" })
              response.end(JSON.stringify({message: "Empregado encontrado"}));
            }
          );
    }

    else if(url.startsWith('/empregados/') && method === 'PUT'){
        const id = url.split("/")[2]; 

      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });

      request.on('end', ()=>{
        const atualizarFuncionario = JSON.parse(body)

        const findIndex = empregados.findIndex((empregado)=> empregado.id == id)
        if(findIndex !== -1){
            if(atualizarFuncionario.idade < 18){
                response.writeHead(400, { "Content-Type": "application/json" })
                response.end(JSON.stringify({ message: "Idade tem que ser maior ou igual a 18 anos" }))
                return
            }if(atualizarFuncionario.password !== atualizarFuncionario.confirmPassword){
                response.writeHead(400, {'Content-Type': 'application/json'})
                return  response.end(JSON.stringify({message: "As senhas fornecidas não correspondem"}))
            }

            empregados[findIndex] = {...empregados[findIndex], ...atualizarFuncionario}

            fs.writeFile(
                "empregados.json",
            JSON.stringify(empregados, null, 2),
            (err) => {
              if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(
                  JSON.stringify({ message: "Erro interno do servidor" })
                );
                return;
              }
              response.writeHead(200, { "Content-Type": "application/json" });
              response.end(JSON.stringify(empregados[findIndex]));
            }
            )
        }else{
            response.writeHead(404, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Empregado não encontrado" }));
        }
      })
    }

    else if(url.startsWith('/empregados/') && method === 'DELETE'){

        const id = parseInt(url.split("/")[2]); 
      const findIndex = empregados.findIndex((empregados) => empregados.id == id);
      if (findIndex !== -1) {
        empregados.splice(findIndex, 1);
        fs.writeFile(
          "empregados.json",
          JSON.stringify(empregados, null, 2),
          (err) => {
            if (err) {
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(
                JSON.stringify({ message: "Erro interno do servidor" })
              );
              return;
            }
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(
              JSON.stringify({ message: "empregado removido com sucesso" })
            );
          }
        );
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Empregado não encontrado" }));
      }

    }

    })

    
})

server.listen(PORT, ()=>{
    console.log(`Server on PORT ${PORT}`)
})