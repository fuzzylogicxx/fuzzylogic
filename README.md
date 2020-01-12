# fuzzylogic.me

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0c7b2b0-c8f9-4575-9528-312449ecffdb/deploy-status)](https://app.netlify.com/sites/vigilant-almeida-537bd4/deploys)

This repository contains the source code for https://fuzzylogic.me, the personal website of Laurence Hughes.

The current version of the site is statically generated using 11ty, uses my own front-end boilerplate Sofrito https://github.com/fuzzylogicxx/sofrito, and is hosted on Netlify.

## Serve locally

cd into your project directory and from the command line run `npm run serve`


## Netlify Serverless (Lambda) Functions

This is currently being used for a “Create Bookmark Post” function and for more functions in future.

### Prerequisites
- install netlify-cli
- install netlify-lambda

### In `package.json`
- add a script which compiles serverless functions from source directory to a dest. directory using `netlify-lambda`
- Update script `build` so that Netlify CI/CD builds our serverless functions: `"build": "gulp build & ELEVENTY_ENV=prod eleventy && npm run build:lambda"`

### Local Workflow
- Run `netlify-dev` in your directory (which means we don’t need netlify-lambda serve). This will hot-reload changes to our source functions dir.
- (in another terminal window): `netlify functions:invoke nameoffunction --payload '{"foo": 1, "bar": "baz"}' --no-identity`
- can also run `npm run build:lambda` if need to.
- can browse to http://localhost:8888/.netlify/functions/nameofscript (where appropriate)
