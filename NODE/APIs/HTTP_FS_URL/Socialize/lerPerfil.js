import fs from 'node:fs'

const lerDadosDePerfil = (callback) => {
    fs.readFile('socialize.json', 'utf8', (err, data)=>{
        if(err){
            callback(err)
        }
        try{
            const perfil = JSON.parse(data)
            callback(null, perfil)
        }catch(error){
            callback(error)
        }
    })
}

export default lerDadosDePerfil