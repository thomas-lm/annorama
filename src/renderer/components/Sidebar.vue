<template>
  <aside class="sidebar">
    <h2 class="sidebar_title">{{$t('sidebar_title')}}</h2>
    <router-link class="sidebar_link" to="/"
            active-class="activeRoute">
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
        <button @click="lang('fr')">fr<span v-if="defaultLanguage=='fr'">*</span></button><button @click="lang('en')">en<span v-if="defaultLanguage=='en'">*</span></button>
    </div>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'sidebar',
    computed: {
      ...mapState({
        defaultLanguage: state => state.Main.language,
        projects: state => state.Main.projects
      })
    },
    methods: {
      lang (code) {
        this.$store.dispatch('CHANGE_LANGUAGE', code)
      }
    }
  }
</script>

<style>

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
</style>