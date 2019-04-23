const { readFile, readFileSync, writeFile, writeFileSync } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = "facs.json";
  }

  async readFACS() {
    const archive = await readFileAsync(this.FILE_NAME, "utf8");

    return JSON.parse(archive.toString());
  }

  async writeFAC(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));

    return true;
  }

  async registerFAC(FAC) {
    const data = await this.readFACS();

    const id = FAC.id <= 1 ? Date.now() : FAC.id;
    FAC.id = id;

    const FACWithId = {
      ...FAC
    };

    const finalData = [...data, FACWithId];

    const result = await this.writeFAC(finalData);

    return result;
  }

  async listFACS(id) {
    const data = await this.readFACS();

    const dataFiltered = data.filter(item => (item ? item.id === id : true));

    return dataFiltered;
  }

  async removeFAC(id) {
    if (!id) {
      return await this.writeFAC([]);
    }

    const data = await this.readFACS();

    const index = data.findIndex(item => item.id === parseInt(id));

    if (index === -1) {
      throw Error("A FAC não foi encontrada");
    }

    data.splice(index, 1);

    return await this.writeFAC(data);
  }
}

module.exports = new Database();
