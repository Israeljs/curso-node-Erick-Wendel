const ICrud = require('./base/interfaces/interfaceCrud')
//classes concretas, que implementa as funções de fato

class MariaDB extends ICrud {
  constructor() {
      super()
  }
  create(item) {
      console.log('O item foi salvo no MariaDB')
  }
}

module.exports = MariaDB