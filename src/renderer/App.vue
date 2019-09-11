<template>
  <div id="app">
    <header>
      <h1>{{$t('app_title')}}</h1>
    </header>
    <main>
      <Sidebar />
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'annorama',
    components: {
      Sidebar
    },
    created () {
      this.$i18n.locale = this.$store.Main.language
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  cursor: default;
}

.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 170px;
  background-color: #d2d7d9;
}

.content {
  position: absolute;
  left: 170px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #FFFAF6;
  color: #91a19a;
}
</style>
