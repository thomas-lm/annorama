<template>
  <article class="offer">
    <div class="offer_image_container">
      <img class="offer_image" :src="getImageLink(offer.mainImageFileName)" />
    </div>
    <h2 class="offer_title"><img :v-if="offer.parser != undefined" class="parser_icon" :title="offer.parser" :src="'static/parser/icons/' + offer.parser + '.png'"/>
    {{ offer.title }} - <b>{{ offer.price }}</b></h2>
    <p class="offer_desc">
      <small>[{{ offer.uid }}]</small> {{ offer.summary }}<br />
      <a @click="openLink(offer.link)">{{ $t('offer_link') }}</a>
      <span class="offer_last_update" v-if="Date.parse(offer.creationDate)" :title="$d(new Date(offer.creationDate), 'timeShort')">
        {{ $d(new Date(offer.creationDate), 'dateShort') }}
      </span>
    </p>
  </article>
</template>

<script>

import { mapState } from 'vuex'
import { shell, remote } from 'electron'
import path from 'path'
import { APP_IMAGE_STORE_DIR } from '../../../constantes.js'

export default {
  name: 'Offer',
  props: {
    offer: Object
  },
  methods: {
    openLink (url) {
      console.log('open external ', url)
      shell.openExternal(url)
    },
    getImageLink (imageName) {
      if (imageName) {
        let url = 'file://' + path.join(remote.app.getPath('userData'), APP_IMAGE_STORE_DIR, imageName)
        if (this.currentProcessNumber === 0) {
          url += '?rdm=' + Math.random(100)
        }
        return url
      }
      return ''
    }
  },
  computed: {
    ...mapState({
      currentProcessNumber: state => parseInt(state.Processing.currentProcessingRequest)
    })
  }
}
</script>

<style scoped lang="scss">
  .offer {
    position: relative;
    margin: .5em;
    padding: .5em;
    min-height: 4em;
    background-color: #FFE9D9;
    color: #878F94;
  }

  .offer_image_container {
    height: 4em;
    width: 7em;
    background-color: #FFFAF6;
    text-align: center;
    float: left;
  }

  .offer_image {
    max-height: 100%;
    max-width: 100%;
  }

  .offer_title {
    margin: 0 0 0 8em;
    line-height: 1em;
    font-size: 1em;
    padding: 0;
  }

  .offer_desc {
    margin: .5em .5em 0 8em;
  }

  .offer_desc a {
    text-decoration: underline;
    cursor: pointer;
  }

  .offer_last_update {
    float: right;
  }

  .parser_icon {
    height: 16px;
    background-color: #ffffff;
    margin-right: .5em;
  }
</style>
