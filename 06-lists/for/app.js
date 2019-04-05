const service = require("./service");

(async function main() {
  try {
    const resultado = await service.obterPessoas("sky");
    const nomes = [];

    for (i = 0; i <= resultado.results.length - 1; i++) {
      const pessoa = resultado.results[i];
      nomes.push(pessoa.name);
    }

    console.log("nomes", nomes);
  } catch (error) {
    console.error(`ERROR ${error}`);
  }
})();
