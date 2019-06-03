const assert = require("assert");

const api = require("./../api");

let app = {};

describe("Suite de testes da API FACS", function() {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Deve listar as facs cadastradas na rota /facs", async () => {
    const { result, statusCode } = await app.inject({
      method: "GET",
      url: "/facs"
    });

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(result));
  });

  it("Deve retornar somente 5 registros", async () => {
    const { result, statusCode } = await app.inject({
      method: "GET",
      url: "/facs?skip=0&limit=5"
    });

    assert.deepEqual(statusCode, 200);
    assert.ok(result.length === 5);
  });
});
