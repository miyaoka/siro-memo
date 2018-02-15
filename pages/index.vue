<template>
  <section class="container">
    <div class="articles" ref="articles">
      <article
        v-for="({fields},i) in posts"
        :key="i">
        <entry-item
          :title="fields.title"
          :youtube="fields.youtube"
          :body="fields.body"
          :date="fields.date"/>
      </article>
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import EntryItem from '~/components/EntryItem.vue'

const client = createClient()

export default {
  components: {
    EntryItem
  },
  async asyncData({ env }) {
    const posts = await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.date',
        limit: 10
      })
      .catch((err) => ({ items: [] }))

    return {
      posts: posts.items
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

<style>

</style>
