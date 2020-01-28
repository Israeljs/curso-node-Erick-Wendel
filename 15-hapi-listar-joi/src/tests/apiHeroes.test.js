const { deepEqual, ok} = require('assert')
const api = require('../api')
let app = {}

describe('API Heroes test suite', function ()  {
    this.beforeAll(async () => {
        app = await api
    })
    it('listar /heroes', async () => {
        const result = await app.inject({//inject é do hapi
            method: 'GET', //simulando o cliente
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode 
        //console.log('result', result)
        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
    })
    it('listar /heroes - deve retrnar apenas 10itens', async () => {
        const TAMANHO_LIMITE = 3
        const result = await app.inject({//inject é do hapi
            method: 'GET', //simulando o cliente
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode 
        //console.log('result', result)
        deepEqual(statusCode, 200)
        ok(dados.length === TAMANHO_LIMITE)
    })
    it('listar /heroes - deve retornar limit incorreto', async () => {
        const TAMANHO_LIMITE = 'AEE'
        const result = await app.inject({//inject é do hapi
            method: 'GET', //simulando o cliente
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        
        const statusCode = result.statusCode 
        deepEqual(result.payload, 'Erro interno do servidor')
    })
    it('listar /heroes - deve filtrar 1 itens', async () => { //http://localhost:5000/herois?skip=0&limit=1000&nome=Homem%20Aranha-1580003276167
        const NAME = 'Homem Aranha-1580003276167'
        const result = await app.inject({//inject é do hapi
            method: 'GET', //simulando o cliente
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode 
        deepEqual(statusCode, 200)
        ok(dados[0].nome === NAME)
    })

})