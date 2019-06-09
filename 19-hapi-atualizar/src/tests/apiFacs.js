const assert = require("assert");

const api = require("./../api");

let app = {};

const MOCK_FAC_NUMERO = 444333;

const MOCK_FAC_CADASTRAR = {
  fac: 456456,
  category: 45
};

const MOCK_FAC_PARA_ATUALIZAR = {
  fac: 777777,
  category: 30
};

let MOCK_PARA_ATUALIZAR_ID = "";

describe("Suite de testes da API FACS", function() {
  this.beforeAll(async () => {
    app = await api;

    const { result } = await app.inject({
      method: "POST",
      url: "/facs",
      payload: MOCK_FAC_PARA_ATUALIZAR
    });

    MOCK_PARA_ATUALIZAR_ID = result._id;
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

  it("Deve retornar um item registrado com parametro fac enviado", async () => {
    const { result, statusCode } = await app.inject({
      method: "GET",
      url: `/facs?fac=${MOCK_FAC_NUMERO}`
    });

    const [primeiroRegistro] = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(primeiroRegistro.fac, MOCK_FAC_NUMERO);
  });

  it("Deve cadastrar um item", async () => {
    const { result, statusCode, message } = await app.inject({
      method: "POST",
      url: "/facs",
      payload: MOCK_FAC_CADASTRAR
    });

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(result.message, "FAC cadastrada com sucesso");
    assert.ok(result, MOCK_FAC_CADASTRAR);
  });

  it("Deve atualizar um item", async () => {
    const novaFAC = 777666;

    const { result, statusCode } = await app.inject({
      method: "PATCH",
      url: `/facs/${MOCK_PARA_ATUALIZAR_ID}`,
      payload: { fac: novaFAC }
    });

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(result.message, "FAC atualizada com sucesso");
    assert(result, 1);
  });
});
