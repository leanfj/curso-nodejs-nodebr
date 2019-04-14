const { obterPessoas } = require("./service");

Array.prototype.meuReduce = function(callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];

  for (i = 0; i <= this.length - 1; i++) {
    valorFinal = callback(valorFinal, this[i], this);
  }

  return valorFinal;
};

async function main() {
  try {
    const { results } = await obterPessoas("a");

    // Cria novo array filtrando pessoas com pesos descritos
    const massa = results.filter(pessoa => parseInt(pessoa.mass));

    // Transforma em um novo array com valores de peso em numeros
    const massaInNumbers = massa.map(pessoa => parseInt(pessoa.mass));

    // Soma os items do array
    const totalMassa = massaInNumbers.reduce(
      (anterior, proximo) => anterior + proximo
    );

    const totalMassa2 = massaInNumbers.meuReduce((anterior, proximo) => {
      return anterior + proximo;
    }, 0);

    const meuArray = [["Leandro", "Ferreira"], ["NodeBr", "JavascritpBr"]];

    const arrayzao = meuArray
      .meuReduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(", ");

    console.log(arrayzao);

    console.log(`
      Peso dos items: ${massaInNumbers}
      Total do peso: ${totalMassa2}
    `);
  } catch (error) {
    console.error("Algum erro aconteceu", error);
  }
}

main();
