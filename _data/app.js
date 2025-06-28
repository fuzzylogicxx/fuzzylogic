export default {
  // Make a varianble named “environment” available to files which can’t access process.env directly (.njk files etc).
  // If the NODE_ENV environment variable is defined (perhaps in a npm script, or in Netlify dasboard),
  // use its value. Otherwise assume "development".
  environment: process.env.NODE_ENV || "development"
}
