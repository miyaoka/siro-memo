<template>
  <div>
    <AppHeader/>
    <nuxt/>
    <span v-if="mounted">
      <script async defer src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    </span>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      mounted: false
    }
  },
  async mounted() {
    this.mounted = true
  }
}
</script>

<style>

</style>
