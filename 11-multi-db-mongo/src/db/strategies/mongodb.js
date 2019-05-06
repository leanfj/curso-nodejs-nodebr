const ICRUD = require("./interfaces/interfaceCRUD");
const mongoose = require("mongoose");

const statusConnection = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectado"
};

class MongoDB extends ICRUD {
  constructor() {
    super();
    this._facs = null;
    this._DRIVER = null;
  }

  async isConnected() {
    const state = statusConnection[this._DRIVER.readyState];

    if (state === "Conectado") {
      return state;
    }

    if (state !== "Conectando") {
      return state;
    }

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    return statusConnection[this._DRIVER.readyState];
  }

  defineModel() {
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

    this._facs = mongoose.model("facs", facSchema);
  }

  connect() {
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

    this._DRIVER = connection;

    connection.once("open", () => console.log("Conexão realizado com sucesso"));

    this.defineModel();
  }

  async create(item) {
    return await this._facs.create(item);
  }

  read(item = {}) {}

  update(id, item) {}

  remove(id) {}
}

module.exports = MongoDB;
