<template>
  <div class="app">
    <AppHeader/>
    <section class="content">
      <nuxt/>
    </section>
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

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';

.app {
  z-index: 2;
  position: relative;
}
.content {
  max-width: 960px;
  margin: auto;

  @include mq(tb) {
    max-width: 560px;
  }
}
</style>
