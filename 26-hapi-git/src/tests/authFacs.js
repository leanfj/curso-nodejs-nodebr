const assert = require("assert");
const api = require("./../api");

const Context = require("./../db/strategies/base/contextStrategy");
const Postgress = require("./../db/strategies/postgresdb/postgresdb");
const UserSchema = require("./../db/strategies/postgresdb/schemas/userSchema");

let app = {};

const USER = {
  username: "Leanfj",
  password: "123"
};

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: "$2b$04$LjFcYiyDfgrF77ZVYuloauBeT2bW8Iv4EskM2uiJdklQTf.vBraPC"
};

describe("Teste de rotas de autorização da api", function() {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgress = await Postgress.connect();
    const userModel = await Postgress.defineModel(
      connectionPostgress,
      UserSchema
    );

    const context = new Context(new Postgress(connectionPostgress, userModel));
    const result = await context.update(null, USER_DB, true);
  });

  it("Deve retorno um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
});
