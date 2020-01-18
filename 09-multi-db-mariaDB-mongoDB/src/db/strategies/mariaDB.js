const ICrud = require('./base/interfaces/interfaceCrud')
const Sequelize = require('sequelize');


class MariaDB extends ICrud {//classes concretas, que implementa as funções de fato
  constructor() {
    super()
    this._driver = null
    this._herois = null
  }
  async isConnected() {
    try {
      await this._driver.authenticate()//ver o driver
      return true
    } catch (error) {
      console.log('fail', error)
      return false
    }
  }
  async defineModel() {
    this._herois = this._driver.define('herois', 
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        }
      },{
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
      }
    )
  
    // force: true will drop the table if it already exists
    await this._herois.sync()
  }
  async create(item) {
    //return this._herois.create(item, {raw: true}) //dando erro
    const {
      dataValues
    } = await this._herois.create(item)
    return dataValues
  }
  async update(id, item) {
    //console.log(id, item)
    return this._herois.update(item, {where: {id: id}})
  }
  async delete(id) {
    const query = id ? { id } : {}  //o id foi passado? sim: vou passar o id. si não vou passar um objeto vazio para a variável query
    return this._herois.destroy({where: query})
  }
  async read(item = {}) {
    return this._herois.findAll({where: item, raw: true}) //para trazer apenas os resultados do valor dessa listagem
  }
  async connect() {
    this._driver = new Sequelize(
      'herois', //database
      'root', // user
      'root', //senha
      {
        host: 'localhost',
        dialect: 'mariadb',
        quoteIdentifiers: false,// case sensitive  
        operatorsAliases: false// deprecation warning
        // dialectOptions: {
        //   ssl: true,
        // },
      }
    )
      await this.defineModel()
  }
}


module.exports = MariaDB