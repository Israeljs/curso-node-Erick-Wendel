use herois


// create
db.herois.create/insert({ nome: 'Iron man', poder: 'Rico'})

// read
db.herois.find({}).prety()

// update
db.herois.update({_id: id}, {$set: {nome: 'papaleguas'}})

// delete
db.herois.delete({_id: id})

