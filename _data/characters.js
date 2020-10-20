const fetch = require("node-fetch");
const url = "https://rickandmortyapi.com/api/character";

// module.exports = async function() {

//   return fetch("https://rickandmortyapi.com/api/character")
//     .then(res => res.json()) // node-fetch option to transform to json
//     .then(json => {
//       //console.log(json.results);
//       // prune the data to return only what we want
//       return json.results;
//     });
// };




// module.exports = async url => {
//   try {
//     const result = await fetch(url);
//     //return result.results;
//   } catch (error) {
//     console.log(error);
//   }
// };


// module.exports = async url => {
//   try {
//     const response = await fetch(url);
//     const json = await response.json();
//     return json.results;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const axios = require("axios");

// module.exports = async () => {
//   const result = await axios.get("https://rickandmortyapi.com/api/character");

//   return result.data.results;
// };
