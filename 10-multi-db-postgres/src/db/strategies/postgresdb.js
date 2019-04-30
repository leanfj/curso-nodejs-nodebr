const ICRUD = require("./interfaces/interfaceCRUD");
const Sequelize = require("sequelize");

class PostgresDB extends ICRUD {
  constructor() {
    super();
    this._DRIVER = null;
    this.facs = null;
    this._connect();
  }

  async isConnected() {
    try {
      await this._DRIVER.authenticate();
      return true;
    } catch (error) {
      console.error("FAIL", error);
      return;
    }
  }

  create(item) {
    console.log("O item foi salvo no PostgresDB");
  }

  _connect() {
    this._DRIVER = new Sequelize("facs", "leanfj", "senhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false
    });
  }

  async defineModel() {
    this.facs = DRIVER.define(
      "facs",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        fac: {
          type: Sequelize.INTEGER,
          required: true
        },
        category: {
          type: Sequelize.INTEGER,
          required: true
        }
      },
      {
        tableName: "TB_FACS",
        freezeTableName: false,
        timestamps: false
      }
    );

    await Facs.sync();
  }
}

module.exports = PostgresDB;
