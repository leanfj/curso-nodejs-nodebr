const assert = require("assert");
const api = require("./../api");

let app = {};

describe("Teste de rotas de autorização da api", function() {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Deve retorno um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        userName: "leanfj",
        password: "123"
      }
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
});
