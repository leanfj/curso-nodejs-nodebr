const axios = require("axios");
const URL = `http://swapi.co/api/people`;

async function obterPessoas(nome) {
  // Criando string de query com url
  const queryUrl = `${URL}?search=${nome}&format=json`;

  const resposta = await axios.get(queryUrl);
  return resposta.data;
}

async function obterEstado(UF) {
  const queryURL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/mesorregioes`;

  const resposta = await axios.get(queryURL);
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
  obterPessoas,
  obterEstado
};
