const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongoDB/mongoDB')
const HeroiSchema = require('./db/strategies/mongoDB/schemas/heroiSchema')
//const mongoDb = new Context(new MongoDB())

const app = new Hapi.Server({
    port: 5000,
    host: 'localhost'
})

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))

    app.route({
        path: '/herois',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    })

    await app.start()
    console.log('server running at', app.info.port)

    return app
}

module.exports = main()
