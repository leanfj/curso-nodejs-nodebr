const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://leanfj:senhasecreta@localhost:27017/facs",
  { useNewUrlParser: true },
  error => {
    if (!error) {
      return;
    }
    console.log("Falha ao conectar no banco", error);
  }
);

const connection = mongoose.connection;

connection.once("open", () => console.log("Conexão realizado com sucesso"));

setTimeout(() => {
  const connectionState = connection.readyState;
  console.log("Estado da conexão =>", connectionState);
}, 1000);

const facSchema = new mongoose.Schema({
  fac: {
    type: Number,
    required: true
  },
  category: {
    type: Number,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
});

const model = mongoose.model("facs", facSchema);

async function main() {
  await model.deleteMany({}, () => {
    console.log("Items deletados");
  });

  const resultCadastrar = await model.create({
    fac: 999999,
    category: 30
  });

  console.log("Resultado do cadastro =>", resultCadastrar);

  const listItems = await model.find({});

  console.log("Items da lista =>", listItems);
}

main();
