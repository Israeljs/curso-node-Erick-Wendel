const BaseRoute = require('./base/baseRoute')
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return  {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => { 
                return this.db.read()
            }
        }
    }

    create() {
        return  {
            path: '/herois',
            method: 'POST',
            handler: async (request, headers) => {//com o express seria desse jeito
                const result = await this.db.read() 
                return result
            }
        }
    }
}

module.exports = HeroRoutes