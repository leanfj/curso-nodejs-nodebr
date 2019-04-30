const ICRUD = require("./interfaces/interfaceCRUD");

class PostgresDB extends ICRUD {
  constructor() {
    super();
  }

  create(item) {
    console.log("O item foi salvo no PostgresDB");
  }
}

module.exports = PostgresDB;
