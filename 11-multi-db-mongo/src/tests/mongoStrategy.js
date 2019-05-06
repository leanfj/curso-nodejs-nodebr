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

describe("Mongo Strategy", function() {
  this.timeout(Infinity);

  this.beforeAll(async function() {
    await mongoStrategy.connect();
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
});
