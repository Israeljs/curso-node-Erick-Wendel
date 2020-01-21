const { equal, deepEqual, ok } = require('assert')//para validar as variáveis
const MongoDb = require('../db/strategies/mongodb/mongoDB')
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' }
const MOCK_HEROI_DEFAULT = { nome: `Homem Aranha-${Date.now()}`, poder: 'Super Teia' }
const MOCK_HEROI_ATUALIZAR = { nome: `Patalino-${Date.now()}`, poder: 'Velocidade' }
let MOCK_HEROI_ATUALIZAR_ID = ''

//const context = new Context(new MongoDb())
let context = {}
describe('MongoDB Suite de testes', function() {//para usaro this tem que manter a palavra function para não ser trocado o contexto
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ATUALIZAR_ID = result._id
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        console.log(result)
        deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [{ nome, poder}] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome})//trazer o primeiro objeto da lista e desse objeto apenas o nome e o poder
        const result = { nome, poder }//desnecessario, poderia ser feito igual ao cadastrar
        deepEqual(result, MOCK_HEROI_DEFAULT)

    })
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {nome: 'Pernalonga'})
        deepEqual(result.nModified, 1)
    })

    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID) //traz a quantidade de item removido
        deepEqual(result.n, 1)
    })
})

//npm run test:watch
//npm test/t