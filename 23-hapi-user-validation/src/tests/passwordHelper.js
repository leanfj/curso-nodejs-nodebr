const assert = require("assert");

const PasswordHelper = require("./../helpers/passwordHelper");

const SENHA = "Leandro#$34";

const HASH_SENHA =
  "$2b$04$Ql2iemkijsY0ABMQBNMsy.28wiJ9LiW5Xa2JH73C8F92X8dJ40Iqm";

describe("Suite de teste para password", function() {
  it("Deve gerar um has a partir de un senha", async function() {
    const result = await PasswordHelper.hashPassword(SENHA);

    assert.ok(result.length > 10);
  });

  it("Deve retornar o resultado positivo da validação do hash", async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH_SENHA);

    assert.deepEqual(result, true);
  });

  it("Deve retornar o resultado negativo da validação do hash", async () => {
    const result = await PasswordHelper.comparePassword(
      SENHA,
      HASH_SENHA + "a"
    );

    assert.deepEqual(result, false);
  });
});
