# fuzzylogic.me

[![Netlify Status](https://api.netlify.com/api/v1/badges/c0c7b2b0-c8f9-4575-9528-312449ecffdb/deploy-status)](https://app.netlify.com/sites/vigilant-almeida-537bd4/deploys)

This repository contains the source code for https://fuzzylogic.me, the personal website of Laurence Hughes.

The current version of the site is statically generated using 11ty and hosted on Netlify.

## Create anew

Make a directory and navigate to it:

```
mkdir my-blog-name
cd my-blog-name
```

Clone this repository:

```
git clone https://github.com/11ty/eleventy-base-blog.git .
```

Install dependencies

```
npm install
```

## Run Eleventy:

Generate a production-ready build to the _site folder:

```
npx @11ty/eleventy
```

(I use `npm run build`)

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```

(I use `npm run serve`)
