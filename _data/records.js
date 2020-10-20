const fetch = require("node-fetch");
require('dotenv').config();

const apiUrl = `https://api.discogs.com/users/${process.env.DISCOGS_USERNAME}/collection/folders/0/releases?token=${process.env.DISCOGS_PERSONAL_ACCESS_TOKEN}&sort=added&sort_order=desc&per_page=5`;

const getRecords = async function(discogsApiUrl) {
  console.log(discogsApiUrl);
  return fetch(discogsApiUrl, { method: 'GET' })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return json.releases;
    });
};

module.exports = getRecords(apiUrl);
