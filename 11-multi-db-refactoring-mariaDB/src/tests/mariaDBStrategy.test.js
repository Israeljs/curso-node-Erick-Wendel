const { equal, deepEqual, ok } = require('assert')//para validar as variáveis
const MariaDB = require('./../db/strategies/mariaDB/mariaDB')
const HeroiSchema = require('./../db/strategies/mariaDB/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' }

let context = {}
describe('MariaDB Strategy', function() {
  this.timeout(Infinity)
  this.beforeAll(async () => {
    const connection = await MariaDB.connect()// o connect() é uma promise que tem que sincronizar com o banco
    const model = await MariaDB.defineModel(connection, HeroiSchema)
    context = new Context(new MariaDB(connection, model))
    await context.delete()
    // await context.create(MOCK_HEROI_CADASTRAR)
    await context.create(MOCK_HEROI_ATUALIZAR)
  })

  it('MariaDB Connection', async () => {
    const result = await context.isConnected()
    equal(result, true)

  })

  it('cadastrar', async () => {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id
    deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('listar', async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})//tras uma lista e é pego o primeiro item dela
    //outras formas de pegar a primeira posição
    // const posiaoZero = result[0]
    // const [posicao1, posicao2] = ['primeiro, sgundo']
    delete result.id
    deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('atualizar', async () => {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha'
    }
    const [result] = await context.update(itemAtualizar.id, novoItem)
    const [itemAtualizado] = await context.read({id: itemAtualizar.id})
    deepEqual(result, 1)//a atualização retorna 1
    deepEqual(itemAtualizado.nome, novoItem.nome)
    // const [result] = await context.read({})

    // const novoItem = {
    //   ...MOCK_HEROI_CADASTRAR,
    //   nome: 'Mulher Maravilha',
    // }
    // const [update] = await context.update(result.id, novoItem)

    // deepEqual(update, 1)
  })

  it('remover', async () => {
    const [item] = await context.read({})//tras todos os itens
    const result = await context.delete(item.id)// pega o id de um item
    deepEqual(result, 1)//retorna a quantidade de item afetados.
  })
})

//C:\Users\israelpc\preAcademia\08-multi-db-mariaDB\src\tests> mocha *.test.js
//C:\Users\israelpc\preAcademia\08-multi-db-mariaDB> npm test/t   
//C:\Users\israelpc\preAcademia\08-multi-db-mariaDB> npm run test:watch  
