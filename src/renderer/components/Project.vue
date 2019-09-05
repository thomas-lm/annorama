<template>
  <div class="main" v-if="project">
    project {{project.id}}
  </div>
</template>
<script>
export default {
  name: 'project',
  props: ['id'],
  data () {
    return {
      project: null
    }
  },
  methods: {
    getProject (id) {
      this.project = {
        id: id
      }
    }
  },
  created () {
    this.getProject(this.id)
  },
  watch: {
    '$route' () {
      this.getProject(this.id)
    }
  }
}
</script>