const axios = require("axios");

const baseURL = "https://swapi.co/api/people";

async function getPeople(name) {
  const searchURL = `${baseURL}/?search=${name}&format=json`;
  const result = await axios.get(searchURL);
  return result.data.results.map(mapPeople);
}

function mapPeople(item) {
  return {
    name: item.name,
    mass: item.mass
  };
}

module.exports = {
  getPeople
};
