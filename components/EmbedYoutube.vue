<template>
  <youtube-embed-lite
    :vid="vid"
    :params="params"
  />
</template>

<script>
const yembed = 'https://www.youtube.com/embed/'
import YoutubeEmbedLite from '@miyaoka/vue-youtube-embed-lite'

export default {
  components: {
    YoutubeEmbedLite
  },
  props: {
    url: { type: String, required: true }
  },
  data() {
    return {
      vid: '',
      params: {}
    }
  },
  watch: {
    url: {
      immediate: true,
      handler() {
        const [base, query] = this.url.split('?')
        const qParams = query
          ? query
              .split('&')
              .map((q) => q.split('='))
              .reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1] }), {})
          : {}
        const eParams = {
          ...(qParams.t && { start: qParams.t })
        }
        this.vid = qParams.v || base.split('/').pop()
        this.params = eParams
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
