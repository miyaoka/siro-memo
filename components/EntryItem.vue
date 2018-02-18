<template>
  <div class="entry">
    <embed-youtube
      class="youtube"
      :url="youtube"/>
    <div class="content">
      <header>
        <nuxt-link
          class="header-link"
          :to="{
            name: 'posts-id',
            params: { id }
          }">
          <div class="date">
            <span class="date-m">{{month}}</span>
            <span class="date-d">{{mday}}</span>
          </div>
          <h2 class="title">{{title}}</h2>
        </nuxt-link>
      </header>
      <vue-markdown
        class="body"
        :source="body"
        :anchorAttributes="{
          target: '_blank',
          rel: 'noopener'
        }"/>
    </div>
  </div>
</template>

<script>
import EmbedYoutube from '~/components/EmbedYoutube.vue'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    EmbedYoutube,
    VueMarkdown
  },
  props: {
    id: { type: String },
    title: { type: String },
    date: { type: String },
    body: { type: String },
    youtube: { type: String }
  },
  computed: {
    d() {
      return new Date(this.date)
    },
    month() {
      return this.d.getMonth() + 1
    },
    mday() {
      return this.d.getDate()
    }
  }
}
</script>

<style lang="scss" scoped>
$date-size: 50px;
$date-pad: 6px;

.entry {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  padding: 1rem;

  .youtube {
    border-radius: 1rem;
    width: 320px;
    height: 180px;
    background: rgba(0, 0, 0, 0.6);
  }
  .content {
    border-left: 8px solid rgba(0, 0, 0, 0.1);
    padding-left: 1rem;

    .body {
      font-size: 1.1rem;
      line-height: 1.5;
    }
  }
}

.header-link {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 1rem;
}
.date {
  width: $date-size;
  height: $date-size;
  background: #000;
  color: #fff;
  border-radius: 50%;
  position: relative;
  font-size: 1.1rem;
  font-family: 'miyaoka-GenJyuuGothicX-Heavy';

  &-m,
  &-d {
    position: absolute;
  }
  &-m {
    top: $date-pad;
    left: $date-pad;
  }
  &-d {
    right: $date-pad;
    bottom: $date-pad;
  }
}
.title {
  font-size: 1.8rem;
  margin: 0;
}
</style>
