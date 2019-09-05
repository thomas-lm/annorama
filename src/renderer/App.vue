<template>
  <div id="app">
    <header>
      <h1>Annorama</h1>
    </header>
    <main>
      <aside class="sidebar">
        <h2>Your projects</h2>
        <router-link class="link" to="/">  new project</router-link>
        <router-link
            v-for="project in projects"
            v-bind:key="project.id"
            active-class="activeRoute"
            class="link"
            :to="{ name: 'project', params: { id: project.id } }">
          {{project.name}} ({{project.nbItems}})
        </router-link>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'annorama',
    data () {
      return {
        projects: [
          {id: 1, name: 'maison Nantes', nbItems: 34, category: 'housing'},
          {id: 2, name: 'boulot java', nbItems: 10, category: 'job'},
          {id: 3, name: 'baignoire bébé', nbItems: 15, category: 'furniture'}
        ]
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 170px;
  color: #8c8364;
  background-color: #ddd6c1;
  padding: 0 .5em
}

.link.activeRoute {
  color: #584c27;
  background-color: #c7bc99;
}

.link {
  position: relative;
  display: block;
  color: #8c8364;
  text-decoration: none;
  padding: .5em 0;
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

.content {
  position: absolute;
  left: 170px;
  top: 0;
  bottom: 0;
  right: 0;
  background-color:#fdf6e3;
}
</style>
