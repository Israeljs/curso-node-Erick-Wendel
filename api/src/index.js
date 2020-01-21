const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongoDb')
const MariaDB = require('./db/strategies/mariaDB')

const contextMongo = new ContextStrategy(new MongoDB()) 
contextMongo.create()

const contextMaria = new ContextStrategy(new MariaDB())
contextMaria.create()