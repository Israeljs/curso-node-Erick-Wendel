const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

async function main() {
    try {
        const { results } = await obterPessoas(`a`)//pegar todo mundo que começe ou tenha a palavra 'a' no meio do texto

        const pesos = results.map(item => parseInt(item.height))//parseInt - para garantir que seja um número e não uma string
        console.log('pesos', pesos)
        // [20.2, 30.3, 40.5] = 0
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)//É sempre bom passar um segundo parametro depois da função para caso vier uma lista vazia e então quebrar o código
        const minhaLista = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
                return anterior.concat(proximo)//método para concatenar listas
            }, [])//[] se essa lista estiver vazia ela por padrão é uma lista e pode usar todos os métodos de lista
            .join(', ')//transforma toda a lista em uma única stringe e, no caso separa-la por vírgulas.
        console.log('total', total)


    } catch (error) {
        console.error(`DEU RUIM`, error)
    }
}

main()