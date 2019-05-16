const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const mongoStrategy = new Context(new MongoDB());

const MOCK_FAC = {
  fac: 555666,
  category: 40
};

const MOCK_FAC_UPDATE = {
  fac: 444333,
  category: 40
};

const MOCK_FAC_DELETE = {
  fac: 111111,
  category: 40
};

let MOCK_FAC_UPDATE_ID = "";

let MOCK_FAC_DELETE_ID = "";

describe("Mongo Strategy", function() {
  // this.timeout(Infinity);

  this.beforeAll(async function() {
    await mongoStrategy.connect();

    const result = await mongoStrategy.create(MOCK_FAC_UPDATE);
    MOCK_FAC_UPDATE_ID = result.id;

    const resultToDelete = await mongoStrategy.create(MOCK_FAC_DELETE);
    MOCK_FAC_DELETE_ID = resultToDelete.id;
  });

  it("Should connect in Mongo Database", async function() {
    const result = await mongoStrategy.isConnected();
    const expected = "Conectado";
    assert.equal(result, expected);
  });

  it("Should register new item in Mongo Databse", async function() {
    const { fac, category } = await mongoStrategy.create(MOCK_FAC);

    assert.deepEqual({ fac, category }, MOCK_FAC);
  });

  it("Should list item with query", async function() {
    const query = { fac: MOCK_FAC.fac };

    const [{ fac, category }] = await mongoStrategy.read(query);

    const result = {
      fac,
      category
    };

    assert.deepEqual(result, MOCK_FAC);
  });

  it("Should update item with id", async function() {
    const result = await mongoStrategy.update(MOCK_FAC_UPDATE_ID, {
      category: 30
    });

    assert.deepEqual(result.nModified, 1);
  });

  it("Should delete item with id", async function() {
    const result = await mongoStrategy.remove(MOCK_FAC_DELETE_ID);
    assert.deepEqual(result.n, 1);
  });
});
