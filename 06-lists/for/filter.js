const { obterEstado, obterPessoas } = require("./service");

Array.prototype.meuFilter = function(callback) {
  lista = [];

  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(item);
  }

  return lista;
};

async function main() {
  try {
    const resultado = await obterPessoas(`a`);
    // const nome = resultado.filter(function(item) {
    //   console.log(item);
    // });

    const familiaLars = resultado.results.meuFilter(
      item => item.name.toLowerCase().indexOf(`lars`) !== -1
    );

    const pessoas = familiaLars.map(item => item.name);

    console.log(pessoas);
  } catch (error) {
    console.error("Algo de Errado", error);
  }
}

main();
