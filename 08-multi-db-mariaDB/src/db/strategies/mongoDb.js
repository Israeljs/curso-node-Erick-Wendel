const ICrud = require('./base/interfaces/interfaceCrud')
//classes concretas, que implementa as funções de fato
class MongoDB extends ICrud {
  constructor() {
      super()//chamando o construtor do ICrud
  }
  create(item) {
      console.log('O item foi salvo no MongoDB')
  }
}

module.exports = MongoDB
