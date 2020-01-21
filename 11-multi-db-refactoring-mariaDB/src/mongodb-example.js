// npm i mongoose
const Mongoose = require('mongoose')
//Mongoose.connect('mongodb://erickwendel:minhaoutrasenhasecreta@localhost:27017/herois', {
Mongoose.connect('mongodb://localhost:27017/herois', {
  useNewUrlParser: true
}, (error) => {
  if (!error) return;
  console.error('error to connect on mongodb', error)
})
const connection = Mongoose.connection
connection.once('open', () => console.log('db is running!'))
//verificando o estado da conexão: 0:disconectado, 1:conectado, 2:conectando, 3:disconectando 
/*setTimeout(() => {
  const state = connection.readyState
  console.log(state)  
}, 1000)*/

//modelo de validação, como a coleção vai ser
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
//registrando o nosso modelo
const model = Mongoose.model('TB_HEROIS', heroiSchema)
async function main() {
  const resultCadastrar = await model.create({
    nome: 'Batman',
    poder: 'Dinheiro',
    
  })
  console.log('resultCadastrar', resultCadastrar)

  const items = await model.find()
  console.log('items', items)

}
main()