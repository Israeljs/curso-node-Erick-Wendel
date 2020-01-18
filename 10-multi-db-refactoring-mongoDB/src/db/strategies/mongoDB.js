const ICrud = require('./base/interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}

//classes concretas, que implementa as funções de fato
class MongoDB extends ICrud {
  constructor() {
    super()//chamando o construtor do ICrud
    this._herois = null //o model(collection/tabela)
    this._driver = null //a connection
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState]//pega o stado na posição do STATUS
    if(state === 'Conectado') return state

    if(state !== 'Conectando') return state

    await new Promise( resolve => setTimeout(resolve, 1000))//se conectando: espera 1 segundo e verifica novamente
    
    return STATUS[this._driver.readyState]
  }
  defineModel() {
    const heroiSchema = new Mongoose.Schema({                                                                                                               
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })
    this._herois = Mongoose.model('TB_HEROIS', heroiSchema)
  }
  connect() {
    Mongoose.connect('mongodb://localhost:27017/herois', {
      useNewUrlParser: true
    }, (error) => {
      if (!error) return;
      console.error('error to connect on mongodb', error)
    })
    const connection = Mongoose.connection
    this._driver = connection
    connection.once('open', () => console.log('db is running!'))
    this.defineModel()
  }

  create(item) {
    return this._herois.create(item)//_herois é nosso model
  }

  read(item, skip=0, limit=0){//apartir do (skip) traga (limit) resultados
    return this._herois.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._herois.updateOne({_id: id}, {$set: item}) //traga apenas oque foi passado como parâmetro
  }

  delete(id) {
    return this,this._herois.deleteOne({_id: id})
  }
}

module.exports = MongoDB
