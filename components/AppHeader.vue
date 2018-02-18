<template>
  <header>
    <nuxt-link to="/">
      <h1>シロ動画感想メモ</h1>
    </nuxt-link>
    <div>ためになる動画のどこに感銘を受けたのか、個人的な見どころをメモしていきます</div>
  </header>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';

header {
  text-align: center;
  padding: 1rem 1rem 2rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.9);
}
h1 {
  font-size: 3rem;
  @include mq() {
    font-size: 2rem;
  }
}
</style>
