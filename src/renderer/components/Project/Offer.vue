<template>
  <article class="offer">
    <h2>{{ offer.title }}</h2>
    <p>
      {{ offer.summary }}
      <a @click="openLink(offer.link)">{{$t('offer_link')}}</a>.
    </p>
  </article>
</template>

<script>

import { shell } from 'electron'

export default {
  name: 'Offer',
  props: {
    offer: Object
  },
  methods: {
    openLink (url) {
      shell.openExternal(url)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
