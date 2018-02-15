<template>
  <iframe
    :width="width"
    :height="height"
    :src="src"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen></iframe>
</template>

<script>
const ybase = 'https://youtu.be/'
const yembed = 'https://www.youtube.com/embed/'

export default {
  props: {
    url: { type: String, required: true },
    width: { type: Number, default: 560 },
    height: { type: Number, default: 315 }
  },
  computed: {
    src() {
      const [base, query] = this.url.split('?')
      const params = query
        ? query
            .split('&')
            .map((q) => q.split('='))
            .reduce((prev, curr) => ({ ...prev, [curr[0]]: curr[1] }), {})
        : {}

      const vid = params.v || base.split('/').pop()
      return [`${yembed}${vid}`, params.t && `start=${params.t}`].join('?')
    }
  }
}
</script>

<style>

</style>
