const { obterEstado } = require("./service");

Array.prototype.meuFilter = function(callback) {
  lista = [];

  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    lista.push(item);
  }
};

async function main() {
  try {
    const resultado = await obterEstado(`33`);
    const nome = resultado.filter(function(item) {
      console.log(item);
    });

    const sigla = resultado.meuFilter(
      item => item.sigla.toLowerCase().indexOf(`J`) !== -1
    );
    const nomesRegiao = nome.map(regiao => regiao.nome);

    console.log(nomesRegiao);
  } catch (error) {
    console.error("Algo de Errado", error);
  }
}

main();
