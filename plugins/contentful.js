const contentful = require('contentful')
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const isDev = process.env.NODE_ENV === 'development'
const config = {
  space: process.env.CTF_SPACE_ID,
  accessToken: isDev ? process.env.CTF_CPA_ACCESS_TOKEN : process.env.CTF_CDA_ACCESS_TOKEN,
  host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com'
}

// export `createClient` to use it in page components
module.exports = {
  createClient() {
    return contentful.createClient(config)
  }
}
