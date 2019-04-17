const { readFile, readFileSync } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.NOME_ARQUIVO = "facs.json";
  }
  async getFAC() {
    const archive = await readFileSync(this.NOME_ARQUIVO, "utf8");
    return JSON.parse(archive.toString());
  }
  writeFAC() {}
  async readFACS(id) {
    const data = await this.getFAC();
    const dataFiltered = data.filter(item => (item ? item.id === id : true));
    return dataFiltered;
  }
}

module.exports = new Database();
