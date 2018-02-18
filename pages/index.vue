<template>
  <section>
    <article
      class="article"
      v-for="{sys, fields} in posts"
      :key="sys.id">
      <entry-item
        :id="sys.id"
        :title="fields.title"
        :youtube="fields.youtube"
        :body="fields.body"
        :date="fields.date"/>
    </article>
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
    try {
      const entries = await client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.date'
      })
      return {
        posts: entries.items
      }
    } catch (err) {
      console.error(err)
      return { posts: [] }
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
@import '~assets/css/mixin/_mediaquery.scss';

.article {
  &:not(:first-child) {
    margin-top: 2rem;
  }
}
</style>
