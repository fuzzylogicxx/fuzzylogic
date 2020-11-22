const fetch = require("node-fetch");
require('dotenv').config();

const apiUrl = `https://389853243577723:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/fuzzylogic/resources/image?max_results=20`;

const getPhotos = async function(url) {
  console.log(url);
  return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return json.resources;
    });
};

module.exports = getPhotos(apiUrl);
