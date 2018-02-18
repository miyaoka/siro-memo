<template>
  <footer>
    <nav class="links">
      <a
        href="https://github.com/miyaoka/siro-memo"
        rel="nofollow noopener"
        target=“_blank”>
        <img
          src="/img/logo/github.png"
          alt="Powered by GitHub">
      </a>

      <a
        href="https://www.contentful.com/"
        rel="nofollow noopener"
        target=“_blank”>
        <img
          src="/img/logo/contentful.svg"
          alt="Powered by Contentful"/>
      </a>

      <a
        href="https://www.netlify.com/"
        rel="nofollow noopener"
        target=“_blank”>
        <img
          src="/img/logo/netlify.svg"
          alt="Powered by Netlify">
      </a>
    </nav>
  </footer>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';

footer {
  text-align: center;
  padding: 1rem 1rem 2rem;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.9);
}
.links {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-gap: 1rem;
  align-items: center;
  margin: 2rem auto;
  width: 280px;
  img {
    width: 80px;
  }
}
</style>
