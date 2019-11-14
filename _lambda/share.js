import fetch from 'node-fetch'
import slugify from 'slugify'
import { DateTime } from 'luxon'

// The place where new shared notes should go
const API_FILE_TARGET = 'https://api.github.com/repos/fuzzylogicxx/fuzzylogic/contents/posts/';


// Helper function to clean strings for frontmatter
const sanitize = str => {
  // replace endash and emdash with hyphens
  str = str.replace(/–/g, '-')
  str = str.replace(/—/g, '-')

  // replace double quotes and apostrophes
  str = str.replace(/"/g, "'")
  str = str.replace(/“/g, "'")
  str = str.replace(/”/g, "'")
  str = str.replace(/’/g, "'")

  return str.trim()
}

// generate the frontmatter string
const generateFrontmatter = yaml => {
  let fm = []
  fm.push('---')
  Object.keys(yaml).forEach(key => {
      if (yaml[key] && yaml[key].constructor == String) {
          fm.push(`${key}: ${yaml[key]}`)
      } else if (typeof yaml[key] === 'boolean') {
          fm.push(`${key}: ${String(yaml[key])}`)
      }
  })
  fm.push('---')
  return fm.join('\n')
}

// generate the new md file content
const generateFileContent = data => {
  const { title, url, body } = data
  const date = DateTime.utc().toISO({ suppressMilliseconds: true })

  const frontMatter = generateFrontmatter({
    date: `"${date}"`,
    title: `"${sanitize(title)}"`,
    description: `This is a bookmark`,
    linkTarget: `"${url}"`,
    tags: 'link',
    draft: `true`
  })

  console.log(frontMatter)

  let content = frontMatter
  if (body) {
      content += '\n\n' + sanitize(body)
  }
  //content += '\n\n' + `[${url}](${url})`

  return unescape(encodeURIComponent(content))
}

// generate the new md file name
const generateFileName = title => {
  // const date = DateTime.utc()
  // const unixSeconds = date.toSeconds()
  // let filename = date.toFormat('yyyy-LL-dd')

  // if (!title) {
  //     filename = `${filename}-${unixSeconds}`
  // } else {
  //     const slug = slugify(title, {
  //         remove: /[^a-z0-9 ]/gi,
  //         lower: true
  //     })
  //     filename += slug.length > 1 ? `-${slug}` : `-${unixSeconds}`
  // }

  const filename = slugify(title, {
      remove: /[^a-z0-9 ]/gi,
      lower: true
  })

  console.log(filename)
  return `${filename}.md`
}

// create the new file using the github API
const createFileInGithub = async params => {
  const { title, token } = params
  const fileName = generateFileName(title)
  const fileContent = generateFileContent(params)
  /*const url = API_FILE_TARGET + fileName

  const payload = {
      message: 'create bookmark using browser bookmarklet',
      branch: 'v3',
      committer: {
          name: 'fuzzylogicxx',
          email: 'laurence@fuzzylogicdigital.com'
      },
      content: Buffer.from(fileContent).toString('base64')
  }

  const options = {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/vnd.github.v3+json',
          Authorization: `token ${token}`
      },
      body: JSON.stringify(payload)
  }

  return await fetch(url, options)
  */
}

// helper function to handle API responses
const handleResponse = response => {
  if (response.ok) {
      return {
          statusCode: 200,
          body: `Note published!`
      }
  }

  return {
      statusCode: response.status,
      body: `${response.statusText}`
  }
}



// Main Lambda function
exports.handler = async (event, context) => {
  try {
      const params = JSON.parse(event.body)

      // Only allow POST
      if (event.httpMethod !== 'POST') {
          return { statusCode: 405, body: 'Method Not Allowed' }
      }

      // Token is required
      if (!params.token) {
          return { statusCode: 403, body: 'Missing Access Token' }
      }

      const response = await createFileInGithub(params)
      //return handleResponse(response)
  } catch (err) {
      console.log(err)
      return {
          statusCode: 400,
          body: err.toString()
      }
  }
};
