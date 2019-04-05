const axios = require("axios");
const URL = `http://swapi.co/api/people`;

async function obterPessoas(nome) {
  // Criando string de query com url
  const queryUrl = `${URL}?search=${nome}&format=json`;

  const resposta = await axios.get(queryUrl);
  return resposta.data;
}

// obterPessoas("r2")
//   .then(function(resultado) {
//     console.log("resultado", resultado);
//   })
//   .catch(function(error) {
//     console.error("DEU RUIM", error);
//   });
module.exports = {
  obterPessoas
};
