import http from "node:http" // ele faz as importações dos arquivos de http do node para que consigamos trabalhar com isso

const PORT = 3333 // criação da porta do nosso servidor: localhost:3333

const users = []; // isso aqui é o nosso array de usuários, como se a gente estivesse recebendo dados de uma API

// esse "http" veio do módulo http que a gente exportou do node lá na primeira linha
const server = http.createServer((request, response)=>{ // fazer a criação do nosso servidor, que sempre pede uma REQUISIÇÃO(request) e uma RESPOTA(response)

    const {method, url} = request; // aqui ele ta solicitando que a requisição seja feita por um metodo (get, post, path, put ou delete) e por um parâmetro da url

    // BUSCAR TODOS OS USUÁRIOS:
    if(url === "/users" && method == "GET"){
        response.setHeader("Content-Type", 'application/json') // isso aqui diz qual é o tipo de informação que eu estarei devolvendo a quem pediu ela, é como se estivesse colocando uma etiqueta na mensagem dizendo que isso que estou devolvendo é um texto em JSON

        response.end(JSON.stringify(users)) // ele ta dizendo que terminou de enviar o que o cliente pediu, nesse caso o array de usuários, é importante pois indica que ao servidor que a resposta foi enviada com sucesso

        // JSON.stringify -> ele pega o users (que é um ARRAY) e transforma em uma string JSON, e consequentemente enviando essa string como resposta por conta do response.end

        // então o response.end é tipo um return ou console.log, que escreve aquilo que tão pedindo pra ele retornar
    }






    // BUSCAR UM ÚNICO USUÁRIO
    else if(url.startsWith("/users/") && method === "GET"){ // "startsWith" -> só está verificando se a url começa com "/users/"
        const userId = url.split("/")[2]
        // split - > ele faz a divisão de uma string com base em algum parâmetro, nesse caso é o "/", então toda vez que aparecer uma / no nosso string, ele vai separá-los, por exemplo:

        // /users/123 -> ["", "users", "123"] -> o indice 0 fica vazio pq não tem nada antes da primeira "/"

        // e nesse caso, o nosso ID está no indice 2, por isso tem [2], ent userID vai pegar o valor que aparece lá no indice 2 =)

        const user = users.find((user)=> user.id = userId)  // tamo usando o find pra comparar os ID's que tem lá no nosso array de users com o userID, que foi extraído da url

        if(user) {// isso é igual a: if(user == true){...}, pq ali no find se ele encontrar o usuário de acordo com o ID quer dizer que é true, se não encontrar nada quer dizer false, ent vai pra o else
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify(user))
        } else {
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({message: "Usuário não encontrado!"}))// já que ele n encontrou nada, precisa retornar alguma coisa pra indicar isso, aqui ele retorna um objeto que é uma messagem dizendo que não encontrou
        }
    }





    // CADASTRAR UM USUÁRIO
    else if(url === "/users" && method === "POST"){ // POST para CADASTRAR um novo usário, postar

        let body = "" // aqui são as novas informações que vão ser enviadas pelo cliente, então elas serão armazenadas no body (corpo)

        request.on("data", (chunk)=>{ //  esse 'on' fica ativo para receber as coisas sempre q forem enviadas

        // o 'on' é ativado de acordo com o "data", ent se chegar algum dado, o 'on' vai ativar e aí vai começar a executar a função de callback

        // o chunk ele vai receber esse pedaço de informação que veio através de data e vai processar esse dado, e aqui em baixo vai colocar esse pedaço de dado em formato de string dentro do nosso body

        // então cada informação recebida vai se agrupando dentro do body para dps ela se tornar um JSON
            body += chunk.toString()
        })

        // nesse momento, todos os dados já foram recebidos, agora nós necessitamos processá-los
        request.on("end", ()=>{ // o end serve pra indicar que os dados foram recebidos, e que agora ele vai processar todos eles
            const novoUsuario = JSON.parse(body) // aqui ele ta pegando os dados em formato de string que estão no body, e transformando em um arquivo JSON! para que assim a gente possua acesso a esses dados

            novoUsuario.id = users.length + 1
            // aqui ele ta atribuindo um novo ID para esse novo usuário que foi cadastrado

            // e para isso, ele vai ver o tamanho do array de objetos (ver quantos usuários já tem cadastrado), para aí sim adicionar o novo id + 1

            users.push(novoUsuario);
            // aqui, dps de processar todos esses dados do novo usuario, estaremos adicionando ele ao Array de "users", para que ele se junte ao nosso banco de dados dos usuários


            // aqui é aquele padrão para exibir que o novo usuário foi cadastrado
            response.writeHead(201, {"Content-Type": "application/json"})
            // aqui ele usa 'writeHead' pois alem de etiquetar qual é o tipo de arquivo que ele está enviando, ele está identificando tbm qual é o status da resposta(201 created, 404 not foud, 200 Ok, etc...) que foi enviada, coisa que o setHead não pode fazer

            response.end(JSON.stringify(novoUsuario)) // aqui é o mesmo esquema de retornar para o usuário oq foi feito né, mostrar as informações que foram cadastradas do novoUsuario
        })
    }





    // ATUALIZAR O USUARIO
    else if(url.startsWith("/users/") && method === "PUT"){ // aquele mesmo esquema, pra ver se a url começa com /users/

        const userId = url.split("/")[2] // mesmo esquema de separar pra poder pegar só o ID que foi inserido na URL

        let body = "" // aquilo de armazenar os dados que vão vir do usuário
        
        request.on("data", (chunk)=>{ // msm esqueminha, ativa a função .on quando o "data" receber informações

            // a partir dessas informações vai separar cada uma delas individualmente e ler, dps transformar cada uma em string e sair juntando todas elas
            body += chunk.toString()
        })

        // dps de juntar as informações em formato de strings, ele vai ativar o evento "end", que a partir daí vamos começar a processar todas essas informações que estão em formato de string
        request.on("end", ()=>{
            const updateUser = JSON.parse(body) // vai transformar os dados em string em formato JSON


            const index = users.findIndex((user) => user.id == userId) // aqui é só pra pegar o indice do usuário no array de objetos users e comparar pra ver se existe, se existir ele vai retornar a posição de onde estão aquelas informações (index)

            // o findIndex se não encontrar nada correspondente, ele vai retornar [-1] !!!

            if(index !== -1) { // se o valor retornado do findIndex for diferente de -1, quer dizer que o usuário foi encontrado
                users[index] = {...users[index], updateUser}

                // 1º ele vai no array de objetos users e vai no usuário de acordo com o index que foi encontrado no findIndex

                // 2º ele pega tudo o que tá dentro desse usuário em específico, e ADICIONA ou SOBRESCREVE o que já tem lá
                    // ele faz isso através do Spread Operator -> ...

                    // que copia tudo do users[index] e adiciona ou substitui pelo que tem no updateUser

                response.setHeader("Content-Type", "application/json")
                response.end(JSON.stringify(users[index]))

                // e aqui é a mesma coisa de todos os outros, aquela velha receitinha básica para retornar ao usuário oq foi feito/ alterado
            }

            else { // aí aqui se ele n encontrar nenhum usuário de acordo com o index que foi passado na url, ele tem que retornar alguma mensagem, então:
                response.writeHead(404, {"Content-Type": "application/json"})
                // lembrando que para writeHead usa ":" dps do content-type, 
                // e no setHead usa ","  =)

                response.end(JSON.stringify({message: "Erro ao tentar atualizar usuário"}))
            }
        })
    }

    // DELETAR USUÁRIO
    else if(url.startsWith("/users/") && method == "DELETE"){
        // aquela parada de ver se a url começa com "/users/"

        const userId = url.split("/")[2]// msm coisa de pegar somente o id fornecido pelo usuario lá na url

        const index = users.findIndex((user)=> user.id == userId) // aqui a verificação pra ver se o id fornecido pelo usuario consta no banco de dados

        if(index !== -1){ // se o id constar no banco de dados, ele vai retornar o id (que consequentemente vai ser diferente de -1)
            users.splice(index, 1) 
            // o metodo splice é usado para excluir ou substituir elementos

            // aqui ele pede o index (posição de onde o elemento está)
            // e quantos elementos ele quer remover, nesse caso 1

            // ele passa 1 pois vai remover um objeto inteiro dentro do users, que tem varios objetos
            
            response.setHeader("Content-Type", "application/json")
            response.end(JSON.stringify({message:"Usuário exluído"}))
            // padrãozinho né, pra indicar que foi feito tudo certinho e tals
        }

        else{
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({message: "Erro ao tentar excluir usuário"}))

            // aqui é caso não encontre o index no banco de dados a partir do id que foi fornecido pelo usuário na url =)
        }
    }



    // CASO NÃO ENCONTRE A URL
    else{
        response.writeHead(404, {"Content-Type": "application/json"})
        response.end(JSON.stringify({message: "Url não encontrada"}))
    }
})


server.listen(PORT, () =>{
    console.log(`Servidor on PORT: ${PORT}`) // isso aqui é só pra indicar que o servidor está ativo, e tb indicar qual a porta que ele está ouvindo
})

// o listen serve pra meio que ativar o servidor, e a partir daí ele começar a ouvir tudo o que vai acontecer naquela porta , tipo uma velha fuxiqueira de interior