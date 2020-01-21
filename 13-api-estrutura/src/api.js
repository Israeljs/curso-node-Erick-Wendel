const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongoDB/mongoDB')
const HeroiSchema = require('./db/strategies/mongoDB/schemas/heroiSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 6000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}


async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))

    app.route[{
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    }]

    await app.start()
    //console.log('server running at', app.info.port)

    return app
}
module.exports = main()