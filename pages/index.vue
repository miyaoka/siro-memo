<template>
  <section class="container">
    <header>
      <h1>シロ動画まいにち感想メモ</h1>
      <div>ためになる動画のどこに感銘を受けたのか、個人的な見どころをメモしていきます</div>
    </header>
    <div class="articles" ref="articles">
      <article
        v-for="{sys, fields} in posts"
        :key="sys.id">
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
        order: '-fields.date'
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

<style lang="scss" scoped>
header {
  text-align: center;
}
</style>
