const Mongoose=  require('mongoose')
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

//mocha workaround
module.exports = Mongoose.models.TB_HEROIS || Mongoose.model('TB_HEROIS', heroiSchema)