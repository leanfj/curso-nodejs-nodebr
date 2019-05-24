const ICRUD = require("./../interfaces/interfaceCRUD");
const mongoose = require("mongoose");

const statusConnection = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectado"
};

class MongoDB extends ICRUD {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  async isConnected() {
    const state = statusConnection[this._connection.readyState];

    if (state === "Conectado") {
      return state;
    }

    if (state !== "Conectando") {
      return state;
    }

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    return statusConnection[this._connection.readyState];
  }

  static connect() {
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

    return connection;
  }

  create(item) {
    return this._schema.create(item);
  }

  read(item = {}) {
    return this._schema.find(item);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  remove(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
