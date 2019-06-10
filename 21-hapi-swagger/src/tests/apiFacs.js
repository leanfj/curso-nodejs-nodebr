const assert = require("assert");

const api = require("./../api");

let app = {};

const MOCK_FAC_CADASTRAR = {
  fac: 456456,
  category: 45
};

const MOCK_FAC_PARA_ATUALIZAR = {
  fac: 777777,
  category: 30
};

let MOCK_ID_PARA_ATUALIZAR = "";

const MOCK_ID_ERRADO = "5cdcc4b111c2a36bd6b65ad4";

describe("Suite de testes da API FACS", function() {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: "POST",
      url: "/facs",
      payload: MOCK_FAC_PARA_ATUALIZAR
    });

    const dados = JSON.parse(result.payload);
    MOCK_ID_PARA_ATUALIZAR = dados.result._id;
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
      url: `/facs?fac=${MOCK_FAC_CADASTRAR.fac}`
    });

    const [primeiroRegistro] = result;

    assert.deepEqual(statusCode, 200);
    assert.ok(primeiroRegistro.fac, MOCK_FAC_CADASTRAR.fac);
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
      url: `/facs/${MOCK_ID_PARA_ATUALIZAR}`,
      payload: { fac: novaFAC }
    });

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(result.message, "FAC atualizada com sucesso");
    assert.ok(result.n, 1);
  });

  it("Deve retornar erro ao atualizar um item invalido", async () => {
    const novaFAC = 777666;

    const { result, statusCode } = await app.inject({
      method: "PATCH",
      url: `/facs/${MOCK_ID_ERRADO}`,
      payload: { fac: novaFAC }
    });

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(result.message, "Não Foi possível atualizar");
    assert.ok(result.n === 0);
  });

  it("Deve remover um item com id correto", async () => {
    const { result, statusCode } = await app.inject({
      method: "DELETE",
      url: `/facs/${MOCK_ID_PARA_ATUALIZAR}`
    });

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(result.message, "FAC removida com sucesso");
    assert.ok(result.n === 1);
  });

  it("Deve retornar erro ao remover um item com id incorreto", async () => {
    const { result, statusCode } = await app.inject({
      method: "DELETE",
      url: `/facs/${MOCK_ID_ERRADO}`
    });

    assert.deepEqual(statusCode, 412);
    assert.deepEqual(result.message, "Não foi possível remover");
  });
});
