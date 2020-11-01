require('dotenv').config();
const Cache = require("@11ty/eleventy-cache-assets");

const apiUrl = `https://389853243577723:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/fuzzylogic/resources/image`;

const getPhotos = async function(url) {
  let json = await Cache(url, {
    duration: "1d", // 1 day
    type: "json",
    fetchOptions: {
      method: 'GET'
    }
  });

  console.log(json.resources);
  return json.resources;
};

module.exports = getPhotos(apiUrl);
