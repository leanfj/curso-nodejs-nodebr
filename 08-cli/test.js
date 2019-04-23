const { deepEqual, ok } = require("assert");

const dataBase = require("./database");

const DEFAULT_FAC = {
  facNumber: 123456,
  category: 30,
  id: 1
};

const DEFAULT_FAC_UPDATE = {
  facNumber: 654321,
  category: 30,
  id: 2
};

describe("FAC manipulation", () => {
  before(async () => {
    await dataBase.registerFAC(DEFAULT_FAC);
    await dataBase.registerFAC(DEFAULT_FAC_UPDATE);
  });

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

  it("Should remove a FAC", async () => {
    const expected = true;

    const result = await dataBase.removeFAC(DEFAULT_FAC.id);

    deepEqual(result, expected);
  });

  it("Should update a FAC with ID", async () => {
    const expected = {
      ...DEFAULT_FAC_UPDATE,
      category: 40
    };

    const newData = {
      category: 40
    };

    await dataBase.updateFAC(DEFAULT_FAC_UPDATE.id, newData);

    const [result] = await dataBase.listFACS(DEFAULT_FAC_UPDATE.id);

    deepEqual(result, expected);
  });
});
