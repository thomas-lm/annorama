<template>
  <div id="app">
    <header>
      <h1>{{$t('app_title')}}</h1>
    </header>
    <main>
      <aside class="sidebar">
        <h2 class="sidebar_title">{{$t('sidebar_title')}}</h2>
        <router-link class="sidebar_link" to="/">
          <img src="/static/ico_new.svg" class="sidebar_icon" />
          {{$t('sidebar_bt_new_project')}}
        </router-link>
        <div class="sidebar_projects">
          <router-link
              v-for="project in projects"
              v-bind:key="project.id"
              active-class="activeRoute"
              class="sidebar_link"
              :to="{ name: 'project', params: { id: project.id } }"
              :title="project.name">
            <img :src="'/static/ico_cat_' + project.category + '.svg'" class="sidebar_icon" /> {{project.name}} ({{project.nbItems}})
          </router-link>
        </div>
        <div class="sidebar_bottom">
          <router-link class="sidebar_link" to="/search">test Search</router-link>
          <button @click="lang('fr')">fr</button><button @click="lang('en')">en</button>
        </div>
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
          {id: 3, name: 'baignoire bébé', nbItems: 15, category: 'shopping'},
          {id: 4, name: 'boulot dev', nbItems: 10, category: 'job'},
          {id: 5, name: 'mouchoirs', nbItems: 15, category: 'shopping'}
        ]
      }
    },
    methods: {
      lang (code) {
        this.$i18n.locale = code
      }
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

.sidebar_projects {
  position: absolute;
  top: 5em;
  bottom: 4em;
  border-style: dotted;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 0;
  border-right-width: 0;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.sidebar_projects::-webkit-scrollbar {
  width: 10px;
  background-color: #d2d7d9;
}

.sidebar_projects::-webkit-scrollbar-thumb {
  background-color: #878f94;
}

.sidebar_bottom {
  position: absolute;
  bottom: 0;
  height: 4em;
  width: 100%;
  text-align: center;
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

.sidebar_icon {
  height: 1em;
  vertical-align: top;
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
