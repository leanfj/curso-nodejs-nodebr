const { deepEqual, ok } = require("assert");

const dataBase = require("./database");

const DEFAULT_FAC = {
  facNumber: 123456,
  category: 30,
  id: 1
};

describe("FAC manipulation", () => {
  it("Should list of FAC registred with Id", async () => {
    const expected = DEFAULT_FAC;

    const [positionOne] = await dataBase.listFACS(expected.id);

    deepEqual(positionOne, expected);
  });

  it("Should register a FAC", async () => {
    const expected = DEFAULT_FAC;

    await dataBase.registerFAC(expected);

    const [actual] = await dataBase.listFACS(expected.id);

    deepEqual(actual, expected);
  });
});
