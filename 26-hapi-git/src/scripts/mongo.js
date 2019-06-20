// Mostrar DataBase
// show dbs

// Mudar para utilização do database
// use facs

//Mostra collections
// show collections

// Inserir intem em um a collection
db.facs.insertOne({
  fac: 123456,
  category: 30
});

// Listar primeiro item da collection
db.facs.findeOne({});

// Comandos javscript dentro do mongodb
for (let index = 0; index < 100; index++) {
  db.facs.insertOne({
    fac: index,
    category: 30
  });
}

//Limitar resultado de busca e ordenar
db.facs
  .find({})
  .limit(10)
  .sort({ fac: -1 });

//Retornar item de cada elemento
db.facs.find({}, { fac: 1, _id: 0 }).limit(10);

// Operações CRUD MongoDb

// CREATE
db.facs,
  insertOne({
    fac: 111111,
    category: 30
  });

// READ
db.facs.find({});
db.facs.findOne({ facs: 111111 });

// UPDATE
db.facs.update(
  { _id: ObjectId("5ccf3c857d13bc06ebfada36") },
  { $set: { category: 40 } }
);

// DELETE
db.facs.remove({ _id: ObjectId("5ccf3c857d13bc06ebfada36") });
