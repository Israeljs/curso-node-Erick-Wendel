const ICrud = require('../base/interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
}

//classes concretas, que implementa as funções de fato
class MongoDB extends ICrud {
  constructor(connection, schema) {
    super()//chamando o construtor do ICrud
    this._schema = schema
    this._connection = connection
  }
  async isConnected() {
    const state = STATUS[this._connection.readyState]//pega o stado na posição do STATUS
    if(state === 'Conectado') return state

    if(state !== 'Conectando') return state

    await new Promise( resolve => setTimeout(resolve, 1000))//se conectando: espera 1 segundo e verifica novamente
    
    return STATUS[this._connection.readyState]
  }
    static connect() { //não precisa dar new
      Mongoose.connect('mongodb://localhost/herois', {
      useNewUrlParser: true
     }, (error) => {
      if (!error) return;
      console.error('error to connect on mongodb', error)
    })
    const connection = Mongoose.connection
    //this._connection = connection
    connection.once('open', () => console.log('db is running!'))
    //this.defineModel()
    return connection
  }

  create(item) {
    return this._schema.create(item)//_schema é nosso model
  }

  read(item, skip=0, limit=0){//apartir do (skip) traga (limit) resultados
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._schema.updateOne({_id: id}, {$set: item}) //traga apenas oque foi passado como parâmetro
  }

  delete(id) {
    return this,this._schema.deleteOne({_id: id})
  }
}

module.exports = MongoDB
