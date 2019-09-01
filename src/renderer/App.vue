<template>
  <div id="app">
    <div class="left-panel">
      <div class="lp-header">
        <h1>Annorama</h1>
        <a href="/" class="bt-new-project">Nouvelle recherche</a>
      </div>
      <ul>
        <li><a href="ss">Projet 1</a></li>
        <li><a href="qsd">Projet 2</a></li>
      </ul>
    </div>
    <div class="main-panel">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'annorama-simu'
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.left-panel {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 170px;
  color: #6d4c92;
  background-color: #ece9ec;
}

.left-panel .lp-header {
  position: relative;
  height: 70px;
  padding: 0 .5em;
  border-bottom: 1px solid #cfcbd4;
}

.bt-new-project {
    text-decoration: none;
    font-size: .8em;
    text-align: center;
    border: 1px solid #4444FF;
    padding: .5em;
    border-radius: 1em;
    cursor: pointer;
}

.main-panel {
  position: absolute;
  left: 170px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color:#f6f6f6;
}
</style>
