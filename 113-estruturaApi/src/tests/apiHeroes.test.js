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
            url: '/herois'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode 
        //console.log('result', result)
        deepEqual(statusCode, 200)
        ok(Array.isArray(dados))
    })

})