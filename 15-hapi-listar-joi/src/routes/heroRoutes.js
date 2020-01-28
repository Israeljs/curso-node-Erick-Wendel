const BaseRoute = require('./base/baseRoute')
const Joi = require('@hapi/joi')
const { string, number } = Joi.types()

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return  {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload => body
                    // headers => hearders
                    // params => na url
                    // query => ?skip=10&linit=1000
                    query: {
                        skip: joi.number().integer().default(0),
                        limit: joi.number().integer().default(10),
                        nome: joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => { 
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    //console.log('limit', limit)
             
                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }
                    if (isNaN(skip))
                        throw Error('O tipo de skip é incorreto')
                    if (isNaN(limit))
                        throw Error('O tipo de limit é incorreto')

                    // return this.db.read(query, parseInt(skip), parseInt(limit))
                    return this.db.read(query, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.log('Deu ruim!', error)
                    return "Erro interno do servidor"
                }
            }
        }
    }

    // create() {
    //     return  {
    //         path: '/herois',
    //         method: 'POST',
    //         handler: async (request, headers) => {//com o express seria desse jeito
    //             const result = await this.db.read() 
    //             return result
    //         }
    //     }
    // }
}

module.exports = HeroRoutes