const ICRUD = require("./interfaces/interfaceCRUD");
const Sequelize = require("sequelize");

class PostgresDB extends ICRUD {
  constructor() {
    super();
    this._DRIVER = null;
    this._facs = null;
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

  async defineModel() {
    this._facs = this._DRIVER.define(
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

    await this._facs.sync();
  }

  async connect() {
    this._DRIVER = new Sequelize("facs", "leanfj", "senhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false
    });

    await this.defineModel();
  }

  async create(item) {
    const { dataValues } = await this._facs.create(item);
    return dataValues;
  }

  async read(item = {}) {
    return await this._facs.findAll({ where: item, raw: true });
  }
}

module.exports = PostgresDB;
