const ICrud = require('../base/interfaces/interfaceCrud')
const Sequelize = require('sequelize');


class MariaDB extends ICrud {//classes concretas, que implementa as funções de fato
  constructor(connection, schema) {
    super()
    this._connection = connection
    this._schema = schema
  }
  async isConnected() {
    try {
      await this._connection.authenticate()//ver o conne_connection
      return true
    } catch (error) {
      console.log('fail', error)
      return false
    }
  }
  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    )
    await model.sync()
    return model
  }
  async create(item) {
    //return this._schema.create(item, {raw: true}) //dando erro
    const {
      dataValues
    } = await this._schema.create(item)
    return dataValues
  }
  async update(id, item) {
    //console.log(id, item)
    return this._schema.update(item, { where: { id: id } })
  }
  async delete(id) {
    const query = id ? { id } : {}  //o id foi passado? sim: vou passar o id. si não vou passar um objeto vazio para a variável query
    return this._schema.destroy({ where: query })
  }
  async read(item = {}) {
    return this._schema.findAll({ where: item, raw: true }) //para trazer apenas os resultados do valor dessa listagem
  }
  static async connect() {
    const connection = new Sequelize(
      'herois', //database
      'root', // user
      'root', //senha
      {
        host: 'localhost',
        dialect: 'mariadb',
        quoteIdentifiers: false,// case sensitive  
        operatorsAliases: false,// deprecation warning
        logging: false //desabilita os logings que poluem o rtorno do test no cmd
        // dialectOptions: {
        //   ssl: true,
        // },
      }
    )
    return connection //quem recebe manipula as opções de banco de dados
  }
}


module.exports = MariaDB