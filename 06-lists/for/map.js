const service = require("./service");

Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];

  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};

(async function main() {
  try {
    const resultado = await service.obterPessoas("a");

    // const nomes = [];

    // console.time("foreach");
    // resultado.results.forEach(function(element) {
    //   nomes.push(element.name);
    // });
    // console.timeEnd("foreach");

    // console.time("map");
    // // const nomes = resultado.results.map(function(element) {
    // //   return element.name;
    // // });

    // const nomes = resultado.results.map(element => element.name);

    // console.timeEnd("map");

    console.time("meumap");

    const nomes = resultado.results.meuMap(element => element.name);

    console.timeEnd("meumap");

    console.log(nomes);
  } catch (error) {
    console.log("Error", error);
  }
})();
