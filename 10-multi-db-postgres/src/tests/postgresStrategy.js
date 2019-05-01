const assert = require("assert");
const Postgres = require("../db/strategies/postgresdb");
const Context = require("../db/strategies/base/contextStrategy");

const postgresStrategy = new Context(new Postgres());
const MOCK_FAC = {
  fac: 555666,
  category: 40
};
describe("Postgres Strategy", function() {
  this.timeout(Infinity);

  this.beforeAll(async function() {
    await postgresStrategy.connect();
  });

  it("PostgresSQL Connection", async function() {
    const result = await postgresStrategy.isConnected();

    assert.equal(result, true);
  });

  it("Cadastar nova FAC", async function() {
    const result = await postgresStrategy.create(MOCK_FAC);
    delete result.id;
    assert.deepEqual(result, MOCK_FAC);
  });
});
