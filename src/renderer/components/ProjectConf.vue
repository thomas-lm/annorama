<template>
  <div class="main" v-if="project">
    <div class="project_header">
      <span class="project_title">{{ project.name }} (#{{project.uid}})</span>
      <router-link :to="{ name: 'project', params: { uid: project.uid } }">
        <img :title="$t('project_bt_main')" class="project_header_action" :src="'static/ico_home.svg'"/>
      </router-link>
    </div>
    <div class="project_loader" v-bind:class="{ animate : currentProcessNumber > 0, hide : currentProcessNumber === 0 }" ></div>
    <div class="project_content">
      <h3>Stats (à traduire)</h3>
      <ul><li>x annonces</li><li>y masquées</li><li>z fusionnées</li></ul>
      <h3>Sources (à traduire)</h3>
      <ul>
        <li v-for="source in project.sources" :key="source.uid" v-bind:source="source">
          {{source.uid}} <input :value="source.url" />
          <img :title="$t('project_conf_bt_refresh_source')" class="source_action" :src="'static/ico_refresh.svg'" @click="refreshSource(source.uid)"/>
          {{source.itemNumber}} {{$t('project_conf_offers')}} {{$d(source.lastRequest, 'dateShort')}}
          <span class="source_error">{{ source.error }}</span>
        </li>
      </ul>
      <h3>Annonces masquée (à traduire)</h3>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'projectConf',
  components: {},
  props: ['uid'],
  data () {
    return {
      project: null
    }
  },
  methods: {
    getProject (uid) {
      this.project = this.$store.state.Main.projects[uid]
    },
    refreshSource (uidSource) {
      this.$store.dispatch('REFRESH_PROJECT_OFFERS', [this.uid, uidSource])
      this.$store.dispatch('REFRESH_PROCESSING')
    }
  },
  created () {
    this.getProject(this.uid)
  },
  watch: {
    '$route' () {
      this.getProject(this.uid)
    }
  },
  computed: {
    ...mapState({
      currentProcessNumber: state => parseInt(state.Processing.currentProcessingRequest)
    })
  }
}
</script>

<style lang="scss">
.project_header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  line-height: 2em;
  background-color: #d7dfdb
}

.project_title {
  padding: 0 0 0 .5em;
  font-weight: 700;
  max-width: calc(100% - 7.5em);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  line-height: 2em;
  height: 2em;
}

.project_header_action {
  width: 1.5em;
  height: 2em;
  margin-left: .5em;
  cursor: pointer;
}

.project_header_action:hover {
  background-color: #9BA3A7;
}

.project_header_action img {
  width: 100%;
  height: 100%;
}

.project_loader {
  position: absolute;
  top: 2em;
  left: 0;
  width: 100%;
  height: .5em;
  background: linear-gradient(90deg, #818f8e, #d7dfdb, #818f8e);
  background-size: 200%;
  z-index: 2;
}

.project_loader.hide {
  background:none;
}

.project_loader.animate {
  animation: Loading 2s infinite;
}

@keyframes Loading {
    0%{background-position:0% 52%}
    50%{background-position:100% 49%}
    100%{background-position:0% 52%}
}

.project_content {
  background-color: #fffaf6;
  position: absolute;
  top: 2em;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: hidden;
  overflow-y: auto;
}

.source_action {
  height: 1em;
  vertical-align: top;
  cursor: pointer;
}

.source_error {
  color: red;
}
</style>