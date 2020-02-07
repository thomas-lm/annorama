<template>
  <div id="app">
    <Header />
    <main>
      <Sidebar />
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
    <Statusbar />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Sidebar from '@/components/Sidebar.vue'
  import Header from '@/components/Header.vue'
  import Statusbar from '@/components/Statusbar.vue'

  export default {
    name: 'annorama',
    components: {
      Header,
      Sidebar,
      Statusbar
    },
    computed: {
      ...mapState({
        currentLanguage: state => state.Main.language
      })
    },
    mounted: function () {
      this.$nextTick(function () {
        // console.log('created window in ', this.currentLanguage)
        this.$i18n.locale = this.currentLanguage
        // console.log(this.$i18n)
      })
    }
  }
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  cursor: default;
}

.content {
  position: absolute;
  left: 170px;
  top: 60px;
  bottom: 1.5em;
  right: 0;
  min-width: 530px;
  background-color: #FFFAF6;
  color: #91a19a;
}

*::-webkit-scrollbar {
  width: 10px;
  background-color: #d2d7d9;
}

*::-webkit-scrollbar-thumb {
  background-color: #878f94;
}
</style>
