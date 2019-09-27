<template>
  <div class="main" v-if="project">
    <div class="project_header">
      <span class="project_title">{{ project.name }} (#{{project.uid}})</span>
      <img :title="$t('project_bt_refresh')" class="project_header_action" :src="'static/ico_refresh.svg'" @click="refreshProject()"/>
      <img :title="$t('project_bt_new_source')" class="project_header_action" :src="'static/ico_add.svg'" />
      <img :title="$t('project_bt_detail')" class="project_header_action" :src="'static/ico_list.svg'" />
    </div>
    <div class="project_loader" v-bind:class="{ animate : currentProcessNumber > 0, hide: currentProcessNumber === 0 }" ></div>
    <div class="project_content">
      <Offer v-for="offer in project.offers" :key="offer.uid" v-bind:offer="offer" />
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
      project: null
    }
  },
  methods: {
    getProject (uid) {
      this.project = this.$store.state.Main.projects[uid]
    },
    refreshProject () {
      this.$store.dispatch('REFRESH_OFFERS', this.uid)
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
      currentProcessNumber: state => state.Processing.currentProcessingRequest
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
</style>