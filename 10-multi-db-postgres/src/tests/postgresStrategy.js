const assert = require("assert");
const Postgres = require("../db/strategies/postgresdb");
const Context = require("../db/strategies/base/contextStrategy");

const postgresStrategy = new Context(new Postgres());

describe("Postgres Strategy", function() {
  this.timeout(Infinity);

  it("PostgresSQL Connection", async function() {
    const result = await postgresStrategy.isConnected();

    assert.equal(result, true);
  });
});
