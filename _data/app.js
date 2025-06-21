module.exports = {
  // Make an “environment” variable available to files written in a templating language (.njk files etc).
  // If the NODE_ENV environment variable has been defined (perhaps in a npm script, or in Netlify dasboard),
  // use its value. Otherwise assume "development".
  environment: process.env.NODE_ENV || "development"
};
