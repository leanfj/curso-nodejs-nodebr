const ICRUD = require("./interfaces/interfaceCRUD");

class MongoDB extends ICRUD {
  constructor() {
    super();
  }

  isConnected() {}

  create(item) {
    console.log("O item foi salvo no MongoDB");
  }
}

module.exports = MongoDB;
