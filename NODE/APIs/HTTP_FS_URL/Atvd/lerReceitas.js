import fs from 'node:fs'


const lerDadosReceitas = (callback) => { // esse parametro callback vai se transformar em uma função
    fs.readFile('receitas.json', 'utf8', (err, data)=>{
        if(err){
            callback(err)
        }
        try{
            const receitas = JSON.parse(data)
            callback(null, receitas)
        }catch(error){
            callback(error)
        }
    })
}

export default lerDadosReceitas