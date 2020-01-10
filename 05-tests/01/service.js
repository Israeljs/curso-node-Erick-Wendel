const { get } = require('axios')

const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json` ///?search pesquisar por nome no formato jason
    const result = await get(url)
    //console.log(result.data) para buscar o objeto que será usado como padrão
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(item) {
//Do resultado que vir, da url, quero apenas retornar:
    return {
        nome: item.name,
        peso: item.height
    }
}
module.exports = {
    obterPessoas
}
