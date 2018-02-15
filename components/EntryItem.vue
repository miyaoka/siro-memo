<template>
  <div class="entry">
    <embed-youtube
      class="youtube"
      :url="youtube"
    />
    <div class="content">
      <div class="date">
        <span class="date-m">{{month}}</span>
        <span class="date-d">{{mday}}</span>
      </div>
      <h2 class="title">{{title}}</h2>
      <vue-markdown
        class="body"
        :source="body"
        :anchorAttributes="{
          target: '_blank',
          rel: 'noopener'
        }"
        />
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
  }
}
.date {
  width: $date-size;
  height: $date-size;
  background: #000;
  color: #fff;
  border-radius: 50%;
  position: relative;
  font-size: 1.1rem;

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
.content {
  display: grid;
  grid-template-areas: 'date title' 'body body';
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;

  .date {
    grid-area: date;
  }
  .title {
    grid-area: title;
    font-size: 1.8rem;
  }
  .body {
    grid-area: body;
  }
}
p {
  -webkit-mar: 0;
}
</style>
