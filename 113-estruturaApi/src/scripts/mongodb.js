// docker ps //para visualizar o id que o mongodb tá rodando
// docker exec -it 'idDomongodb' mongo -u israel -p 1234 --authenticationDatabase herois

//read
db.herois.TB_HEROIS.find().limit(200).sort({nome: -1})//ordenação descendente
db.herois.TB_HEROIS.count()
db.herois.TB_HEROIS.findOne()
db.herois.TB_HEROIS.find({}, {poder: 1, _id: 0})//where vazio. Do resultado quero apenas a coluna poder
db.herois.TB_HEROIS.find({nome: 'flash'})
db.herois.TB_HEROIS.find({_id: ObjectId("5e20b9d98a2346fc93866abb")})

//create
db.herois.TB_HEROIS.insert({ nome: 'Iron man', poder: 'Rico'}).pretty()

for(let i=0; i<=100; i++) {
    db.herois.TB_HEROIS.insert({ 
        nome: `CLONE-${i}`, 
        poder: 'Rico',
        nascimento: `198${i}`
    }).pretty()
}

//update
db.herois.TB_HEROIS.update({_id: ObjectId("5e20c0ed8a2346fc93866b22")}, 
                           {nome: 'mulher maravilha'})
db.herois.TB_HEROIS.update({_id: ObjectId("5e20b9d98a2346fc93866abb")}, //altera apenas os campos setados, não apaga nada mais
                           { $set: {nome: 'lanterna verde'} } )


//delete
db.herois.TB_HEROIS.remove() //deleta ninguem                          
db.herois.TB_HEROIS.remove({}) //deleta todo mundo                         
db.herois.TB_HEROIS.remove({nome: 'lanterna verde'})                           
db.herois.TB_HEROIS.remove({_id: ObjectId("5e20b9d98a2346fc93866abb")})                           