class NotImplementedException extends Error {
    constructor() {
      super('Not Implemented Exception');
    }
  }
  //interface
  class ICrud {
    create(item) {
      throw new NotImplementedException();
    }
    read(query) {
      throw new NotImplementedException();
    }
    update(id, item) {
      throw new NotImplementedException();
    }
    delete(id) {
      throw new NotImplementedException();
    }
    
  }

//classes concretas, que implementa as funções de fato
class MongoDB extends ICrud {
    constructor() {
        super()//chamando o construtor do ICrud
    }
    create(item) {
        console.log('O item foi salvo no MongoDB')
    }
}

class MariaDB extends ICrud {
    constructor() {
        super()
    }
    create(item) {
        console.log('O item foi salvo no MariaDB')
    }
}

//classe abstrata. Chama os métodos de acordo com oque foi passado no construtor
class ContextStrategy {
  constructor(strategy) {
    this._database = strategy
  }
  create(item) {
    return this._database.create(item)
  }
  read(item) {
    return this._database.read(item)
  }
  update(id, item) {
    return this._database.update(id, item)
  }
  delete(id) {
    return this._database.delete(id)
  }
}

const contextMongo = new ContextStrategy(new MongoDB()) 
contextMongo.create()

const contextMaria = new ContextStrategy(new MariaDB())
contextMaria.create()