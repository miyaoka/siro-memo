<template>
  <article>
    <entry-item
      :id="post.sys.id"
      :title="post.fields.title"
      :youtube="post.fields.youtube"
      :body="post.fields.body"
      :date="post.fields.date"/>
  </article>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import EntryItem from '~/components/EntryItem.vue'

const client = createClient()

export default {
  components: {
    EntryItem
  },
  head: {
    title: this.post && this.post.fields.title
  },
  data() {
    return {
      post: {}
    }
  },
  async asyncData({ env, params, payload, error }) {
    if (payload) return { post: payload }
    try {
      return {
        post: await client.getEntry(params.id)
      }
    } catch ({ response }) {
      error(
        response
          ? {
              statusCode: response.status,
              message: response.statusText
            }
          : {
              statusCode: 503,
              message: 'Connection error'
            }
      )
    }
  },
  mounted() {
    this.loadTwitterWidget()
  },
  updated() {
    this.loadTwitterWidget()
  },
  methods: {
    loadTwitterWidget() {
      // Reload twitter widget for this episode when already loaded on root
      if (window['twttr']) window['twttr'].widgets.load()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
