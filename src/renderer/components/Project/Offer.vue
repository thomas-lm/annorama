<template>
  <article class="offer">
    <div class="offer_image_container">
      <img class="offer_image" :src="getImageLink()" />
    </div>
    <h2 class="offer_title"><img :v-if="offer.parser != undefined" class="parser_icon" :title="offer.parser" :src="'static/parser/icons/' + offer.parser + '.png'"/>
    {{ offer.title }} - <b>{{ offer.price }}</b></h2>
    <p class="offer_desc">
      <small>[{{ offer.uid }}]</small> {{ offer.summary }}<br />
      <ul v-if="offer.detail">
        <li v-if="offer.detail.error">error : {{offer.detail.error}}</li>
        <li v-if="offer.detail.title">title : {{offer.detail.title}}</li>
        <li v-if="offer.detail.price">price : {{offer.detail.price}}</li>
        <li v-if="offer.detail.date">date : {{offer.detail.date}}</li>
        <li v-if="offer.detail.description">description : {{offer.detail.description}}</li>
        <li v-if="offer.detail.localisation">localisation : {{offer.detail.localisation}}</li>
        <li v-if="offer.detail.fai_included">fai_included : {{offer.detail.fai_included}}</li>
        <li v-if="offer.detail.type">type : {{offer.detail.type}}</li>
        <li v-if="offer.detail.detroomsail">rooms : {{offer.detail.rooms}}</li>
        <li v-if="offer.detail.square">square : {{offer.detail.square}}</li>
        <li v-if="offer.detail.ges">ges : {{offer.detail.ges}}</li>
        <li v-if="offer.detail.energy">energy : {{offer.detail.energy}}</li>
      </ul>
      <div v-if="offer.detail && offer.detail.images">
        <img v-for="image in offer.detail.images" :key="image" v-bind:image="image" :src="getImageLink(image)" />
      </div>
      <a v-if="!offer.pending" @click="getOfferDetail()">{{ $t('offer_link') }}</a>
      <span v-if="offer.pending" >{{ $t('offer_link') }}</span>
      <span class="offer_last_update" v-if="Date.parse(offer.creationDate)" :title="$d(new Date(offer.creationDate), 'timeShort')">
        {{ $d(new Date(offer.creationDate), 'dateShort') }}
      </span>
    </p>
    <div class="offer_loader" v-bind:class="{ animate : offer.pending, hide : !offer.pending }" ></div>
  </article>
</template>

<script>

import { mapState } from 'vuex'
import { remote } from 'electron'
import path from 'path'
import { APP_IMAGE_STORE_DIR } from '../../../constantes.js'

export default {
  name: 'Offer',
  props: {
    offer: Object,
    uidProject: Number
  },
  methods: {
    getOfferDetail () {
      this.$store.dispatch('REFRESH_OFFER_DETAIL', [this.uidProject, this.offer.uid])
    },
    getImageLink () {
      if (this.offer.mainImageFileName) {
        let url = 'file://' + path.join(remote.app.getPath('userData'), APP_IMAGE_STORE_DIR, this.offer.mainImageFileName)
        if (this.currentProcessNumber === 0) {
          // Need to show the new picture at update
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


  .offer_loader {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .5em;
    background: linear-gradient(90deg, #818f8e, #d7dfdb, #818f8e);
    background-size: 200%;
    z-index: 2;
  }

  .offer_loader.hide {
    background:none;
  }

  .offer_loader.animate {
    animation: Loading 2s infinite;
  }
</style>
