<template>
  <div class="main" v-if="project">
    <div class="project_header">
      <span class="project_title">{{ project.name }} (#{{project.uid}})</span>
      <img :title="$t('project_bt_refresh')" class="project_header_action" :src="'static/ico_refresh.svg'" @click="refreshProject"/>
      <img :title="$t('project_bt_new_source')" class="project_header_action" :src="'static/ico_add.svg'" @click="displayAddSource" />
      <router-link :to="{ name: 'projectConf', params: { uid: project.uid } }">
        <img :title="$t('project_bt_detail')" class="project_header_action" :src="'static/ico_list.svg'"/>
      </router-link>
    </div>
    <div class="add_source_container" :class="{ hide : !add_source_show }" @click="hideAddSource">
      <input class="add_source_input" ref="addsourceinput" type="text" :placeholder="$t('project_input_add_source_placeholder')" @keyup.enter="addSource"/>
    </div>
    <div class="project_loader" v-bind:class="{ animate : currentProcessNumber > 0, hide : currentProcessNumber === 0 }" ></div>
    <div class="project_content">
      <Offer v-for="offer in getSortedOffers()" :key="offer.uid" v-bind:offer="offer" />
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import Offer from '@/components/Project/Offer.vue'

export default {
  name: 'project',
  components: {
    Offer
  },
  props: ['uid'],
  data () {
    return {
      project: null,
      add_source_show: false
    }
  },
  methods: {
    getProject (uid) {
      this.project = this.$store.state.Main.projects[uid]
    },
    getSortedOffers () {
      // Trie par date de creation
      return Object.values(this.project.offers).sort((a, b) => {
        if (a.creationDate === b.creationDate) {
          return 0
        } else if (a.creationDate && b.creationDate) {
          return a.creationDate > b.creationDate ? -1 : 1
        } else if (a.creationDate) {
          return -1
        } else if (b.creationDate) {
          return 1
        } else {
          // Tri par défaut
          return a.uid < b.uid
        }
      })
    },
    refreshProject () {
      this.$store.dispatch('REFRESH_PROJECT_OFFERS', [this.uid, undefined])
      this.$store.dispatch('REFRESH_PROCESSING')
    },
    displayAddSource () {
      this.add_source_show = true
      this.$nextTick(() => {
        this.$refs.addsourceinput.focus()
      })
    },
    hideAddSource (e) {
      if (e.target.classList.contains('add_source_container')) {
        this.add_source_show = false
      }
    },
    addSource () {
      let val = this.$refs.addsourceinput.value
      if (val) {
        let uid = 1
        for (var sourceUid in this.project.sources) {
          if (sourceUid > uid) {
            uid = sourceUid
          }
        }
        let newSource = {
          uid: parseInt(uid) + 1,
          url: val,
          lastRequest: new Date(),
          itemNumber: 0
        }
        this.$store.dispatch('ADD_SOURCE', [this.uid, newSource])
      }
      this.$refs.addsourceinput.value = ''
      this.add_source_show = false
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

.add_source_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
}

.add_source_container.hide {
  display: none;
}

.add_source_input {
  position: absolute;
  width: 400px;
  margin: 4em auto;
  height: 2em;
  left: calc(50% - 200px);
  background-color: #FFFAF6;
  padding: .3em;
  border: 1px solid #878F94;
  z-index: 2;
}
</style>