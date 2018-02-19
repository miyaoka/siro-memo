# siro-memo

> contentful + Nuxt

## Usage

### Contentful env settings

- Copy `.env.sample` to `.env`
- Fill out `CTF_BLOG_POST_TYPE_ID`, `CTF_SPACE_ID`, `CTF_CDA_ACCESS_TOKEN`, `CTF_CPA_ACCESS_TOKEN`
  - Get values from your Contentful space. `Contentful > Space settings > API Keys`, `Contentful > Content model`

### Preview post

- Open `Contentful > Space settings > Content preview`
- Set value `http://localhost:3000/posts/{entry_id}` into `Contentful preview URLs`
- In editting your content. Click `Open preview` will open your local preview.

## Build Setup

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
