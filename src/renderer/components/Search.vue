<template>
  <div class="main">
    <div class="menu"></div>
    <ProcessingSearchs />
    <div class="example">
      <p>Essayer avec ces urls :</p>
      <input type="text" value="https://www.leboncoin.fr/recherche/?category=23&text=baignoire&locations=Nantes&zlat=47.224668518910825&zlng=-1.5451087038240834&zdefradius=10000" /><br>
      <input type="text" value="https://www.seloger.com/list_beta.htm?tri=initial&enterprise=0&idtypebien=2&pxMax=300000&idtt=2,5&naturebien=1,2,4&ci=440109" />
    </div>
    <input class="urlpicker" type="text" v-model="inputUrl" placeholder="Coller ici l'url de la recherche" @keyup.enter.prevent="enterUrl()">
    <h1>{{ currentUrl }}</h1>
    <p class="error">{{ errorMsg }}</p>
    <SearchItem v-for="item in searchItems" :key="item.id" v-bind:item="item" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchItem from '@/components/Search/SearchItem.vue'
import ProcessingSearchs from '@/components/Search/ProcessingSearchs.vue'

export default {
  name: 'search',
  components: {
    SearchItem,
    ProcessingSearchs
  },
  data () {
    return {
      inputUrl: ''
    }
  },
  methods: {
    enterUrl () {
      this.$store.dispatch('LOAD_URL', this.inputUrl)
      this.inputUrl = ''
    }
  },
  computed: {
    ...mapState({
      currentUrl: state => state.Search.currentUrl.substring(0, 40) + '...',
      searchItems: state => state.Search.searchItems,
      errorMsg: state => state.Search.errorMsg
    })
  }
}
</script>

<style>
  a {
    color: #4444FF;
    cursor: pointer;
  }
  .error {
    color: #ff4444;
  }
  .example{
    font-size: 14px;
  }
  .example input {
    width : calc(100% - 3em);
    margin-left: 2em;
  }
  h1 {
    font-size: 1em;
    max-width: 100%;
    overflow: hidden;
  }
  .urlpicker {
    margin-top: 1em;
    width: calc(100% - 2em);
    margin-left: 1em;
    height: 1.2em;
    font-size: 1.2em;
  }
</style>