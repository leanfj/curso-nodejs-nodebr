const ICRUD = require("./../interfaces/interfaceCRUD");
const Sequelize = require("sequelize");

class PostgresDB extends ICRUD {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error("FAIL", error);
      return;
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();

    return model;
  }

  static async connect() {
    const connection = new Sequelize("facs", "leanfj", "senhasecreta", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
      logging: false
    });

    return connection;
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item);

    return dataValues;
  }

  async read(item = {}) {
    return await this._schema.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._schema.update(item, {
      where: { id: id },
      returning: true
    });
  }

  async remove(id) {
    const query = id ? { id } : {};
    return await this._schema.destroy({ where: query });
  }
}

module.exports = PostgresDB;
