require('dotenv').config()

const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})

module.exports = {
  generate: {
    routes() {
      return client
        .getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID
        })
        .then((posts) =>
          posts.items.map((post) => ({
            route: `posts/${post.sys.id}`,
            payload: post
          }))
        )
        .catch(console.error)
    }
  },
  modules: [['@nuxtjs/google-analytics', { id: 'UA-3536169-20' }]],
  css: ['~/assets/css/base.scss'],
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_CPA_ACCESS_TOKEN: process.env.CTF_CPA_ACCESS_TOKEN,
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_MANAGEMENT_TOKEN: process.env.CTF_MANAGEMENT_TOKEN
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ` : '') + 'シロ動画感想メモ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `ためになる動画のどこに感銘を受けたのか、個人的な見どころをメモしていきます`
      },
      {
        property: 'og:title',
        content: 'シロ動画感想メモ',
        hid: 'ogTitle'
      },
      { property: 'og:site_name', content: 'シロ動画感想メモ' },
      { property: 'og:url', content: 'https://siro-memo.netlify.com', hid: 'ogUrl' },
      { property: 'og:type', content: 'article' },
      { property: 'og:locale', content: 'ja_JP' },
      {
        property: 'og:description',
        content: `ためになる動画のどこに感銘を受けたのか、個人的な見どころをメモしていきます`,
        hid: 'ogDesc'
      },
      {
        property: 'og:image',
        content: 'https://siro-memo.netlify.com/img/ogp-dolphin.jpg',
        hid: 'ogImage'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
