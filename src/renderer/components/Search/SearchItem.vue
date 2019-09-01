<template>
  <div class="searchItem">
    <h2>{{ item.title }}</h2>
    <p>
      {{ item.summary }}
      <a @click="openLink(item.link)">see more detail</a>.
    </p>
  </div>
</template>

<script>

import { shell } from 'electron'

export default {
  name: 'SearchItem',
  props: {
    item: Object
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
