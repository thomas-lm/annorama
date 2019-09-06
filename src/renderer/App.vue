<template>
  <div id="app">
    <header>
      <h1>Annorama</h1>
    </header>
    <main>
      <aside class="sidebar">
        <h2 class="sidebar_title">Your projects</h2>
        <router-link class="sidebar_link" to="/"> + new project</router-link>
        <hr />
        <router-link
            v-for="project in projects"
            v-bind:key="project.id"
            active-class="activeRoute"
            class="sidebar_link"
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
          {id: 2, name: 'boulot javsdf sdf sdf a', nbItems: 10, category: 'job'},
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
}

.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 170px;
  background-color: #d2d7d9;
}

.sidebar hr {
  border-style: dotted;
  margin: 0;
}

.sidebar_title {
  padding: 0 .5em;
  font-size: 1.4em;
  margin: .5em 0;
  color: #878f94;
}

.sidebar_link.activeRoute {
  color: #d2d7d9;
  background-color: #869eac;
}

.sidebar_link {
  position: relative;
  display: block;
  color: #878f94;
  text-decoration: none;
  padding: .5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sidebar_link:hover {
  color: #d2d7d9;
  background-color: #9BA3A7;
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
