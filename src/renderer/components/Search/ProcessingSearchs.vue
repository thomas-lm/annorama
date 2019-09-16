<template>
  <div class="processingItemp" @mousedown="refresh()">
    Requêtes en cours de traitement : {{ currentNumberProcessingSearchs }}
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'processingItem',
  methods: {
    refresh () {
      this.$store.dispatch('REFRESH_NUMBER')
    }
  },
  computed: {
    ...mapState({
      currentNumberProcessingSearchs: state => state.Search.currentNumberProcessingSearchs
    })
  }
}
</script>

<style scoped lang="scss">

</style>
