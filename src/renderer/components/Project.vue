<template>
  <div class="main" v-if="project">
    <h1>project {{project.uid}}</h1>
  </div>
</template>
<script>
export default {
  name: 'project',
  props: ['uid'],
  data () {
    return {
      project: null
    }
  },
  methods: {
    getProject (uid) {
      this.project = this.$store.state.Main.projects[uid]
    }
  },
  created () {
    this.getProject(this.uid)
  },
  watch: {
    '$route' () {
      this.getProject(this.uid)
    }
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 2em;
  padding: 0 .5em;
}
</style>