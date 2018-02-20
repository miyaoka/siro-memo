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
      <div class="body">
        <vue-markdown
          class="marked"
          :source="editBody"
          :anchorAttributes="{
            target: '_blank',
            rel: 'noopener'
          }"/>
        <div
          v-if="isDev && isEditing"
          class="edit"
          >
          <textarea
            v-model="editBody"
            ref="editbody"/>
        </div>
      </div>
      <div v-if="isDev">
        <button @click="isEditing = !isEditing">{{isEditing ? '戻る' : '編集'}}</button>
        <div v-if="isEditing && body !== editBody" @click="isEditing = false">
          <button @click="discard">discard</button>
          <button @click="save">save</button>
          <button @click="publish">publish</button>
        </div>
      </div>
    </div>
    <a
      v-if="isDev"
      class="ctf-link"
      :href="`https://app.contentful.com/spaces/${spaceId}/entries/${id}`"
      target="_blank"
      rel="noopener"
      >Open CTF</a>
  </div>
</template>

<script>
import * as contentful from 'contentful-management'
import VueMarkdown from 'vue-markdown'
import EmbedYoutube from '~/components/EmbedYoutube.vue'

const getEntry = async (id) => {
  const space = await contentful
    .createClient({
      accessToken: process.env.CTF_MANAGEMENT_TOKEN
    })
    .getSpace(process.env.CTF_SPACE_ID)
  return await space.getEntry(id)
}

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
  data() {
    return {
      editBody: '',
      isEditing: false,
      isDev: process.env.NODE_ENV === 'development',
      spaceId: process.env.CTF_SPACE_ID
    }
  },
  created() {
    this.editBody = this.body
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
  },
  methods: {
    discard() {
      this.editBody = this.body
    },
    async save() {
      try {
        const entry = await getEntry(this.id)
        entry.fields.body = {
          ...entry.fields.body,
          'ja-JP': this.editBody
        }
        const updatedEntry = await entry.update()
      } catch (err) {
        console.log(err)
      }
    },
    async publish() {
      try {
        const entry = await getEntry(this.id)
        const updatedEntry = await entry.publish()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/mixin/_mediaquery.scss';
$date-size: 50px;
$date-pad: 6px;

.entry {
  display: grid;
  grid-template-columns: auto minmax(100px, 100%);
  grid-gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  position: relative;

  @include mq(tb) {
    grid-template-columns: minmax(100px, 100%);
  }

  .youtube {
    border-radius: 1rem;
    width: 320px;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    align-self: start;

    @include mq(tb) {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    @include mq() {
      width: 100%;
    }
  }
  .content {
    border-left: 8px solid rgba(0, 0, 0, 0.05);
    padding-left: 1rem;

    @include mq(tb) {
      border: none;
      padding: 0;
    }

    .body {
      position: relative;
      min-height: 3rem;
      .marked {
        font-size: 1.1rem;
        line-height: 1.5;
      }
      .edit {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        textarea {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .ctf-link {
    position: absolute;
    right: 0;
    top: -1rem;
    background: #43b149;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: #fff;
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
