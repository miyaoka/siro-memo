<template>
  <div class="app">
    <div class="content-wrapper">
      <AppHeader/>
      <section class="content">
        <nuxt/>
      </section>
      <span v-if="mounted">
        <script async defer src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
      </span>
    </div>
    <AppFooter class="footer"/>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
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
$footer-height: 120px;

.content-wrapper {
  z-index: 2;
  position: relative;
  margin-bottom: $footer-height;
  min-height: calc(100vh- #{$footer-height});

  background: linear-gradient(40deg, #fbfefd 0%, #3fbbd5 50%, #fafab4 100%);
  background-attachment: fixed !important;
  padding-bottom: 2rem;
}
.content {
  max-width: 960px;
  margin: auto;
  padding: 0 1rem;

  @include mq(tb) {
    max-width: 560px;
  }
}
.footer {
  height: $footer-height;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}
</style>
