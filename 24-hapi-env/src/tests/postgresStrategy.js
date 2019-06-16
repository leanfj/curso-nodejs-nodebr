const assert = require("assert");
const facSchema = require("./../db/strategies/postgresdb/schemas/facSchema");
const Postgres = require("../db/strategies/postgresdb/postgresdb");
const Context = require("../db/strategies/base/contextStrategy");

const MOCK_FAC = {
  fac: 555666,
  category: 40
};

const MOCK_FAC_UPDATE = {
  fac: 444333,
  category: 40
};

let postgresStrategy = {};

describe("Postgres Strategy", function() {
  this.timeout(Infinity);

  this.beforeAll(async function() {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, facSchema);

    postgresStrategy = new Context(new Postgres(connection, model));

    await postgresStrategy.remove();

    await postgresStrategy.create(MOCK_FAC_UPDATE);
  });

  it("Should connect in PostgresSQL Database", async function() {
    const result = await postgresStrategy.isConnected();

    assert.equal(result, true);
  });

  it("Should register new FAC", async function() {
    const result = await postgresStrategy.create(MOCK_FAC);
    delete result.id;
    assert.deepEqual(result, MOCK_FAC);
  });

  it("Should be return data with FAC number", async function() {
    const [result] = await postgresStrategy.read({ fac: MOCK_FAC.fac });
    delete result.id;
    assert.deepEqual(result, MOCK_FAC);
  });

  it("Should be update data with ID", async function() {
    const [itemToUpdate] = await postgresStrategy.read({
      fac: MOCK_FAC_UPDATE.fac
    });

    const newItem = {
      ...MOCK_FAC_UPDATE,
      fac: 333444
    };
    const [, [{ dataValues }]] = await postgresStrategy.update(
      itemToUpdate.id,
      newItem
    );

    assert.deepEqual(dataValues.fac, newItem.fac);
  });

  it("Should be remove item with ID", async function() {
    const [item] = await postgresStrategy.read({});

    const result = await postgresStrategy.remove(item.id);

    assert.deepEqual(result, true);
  });
});
