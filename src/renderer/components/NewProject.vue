<template>
  <div class="main new_project_vue">
    <h2 class="new_project_title">{{$t('new_project_title')}}</h2>
    <p v-if="errors.length">
      <b class="msg_error">Please correct the following error(s):</b>
      <ul>
        <li class="msg_error" v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>

    <p class="new_project_input"><input type="text" v-model="projectName"
    :placeholder="$t('new_project_inputName')" /></p>
    <p class="new_project_input"><select v-model="projectCategory">
      <option value="">{{$t('new_project_selectCategory')}}</option>
      <option value="job">{{$t('project_cat_job')}}</option>
      <option value="housing">{{$t('project_cat_housing')}}</option>
      <option value="shopping">{{$t('project_cat_shopping')}}</option>
    </select></p>

    <p class="new_project_input"><input type="text" v-model="projectUrl1"
    :placeholder="$t('new_project_inputUrl')" /></p>
    <p class="new_project_action"><button @click="createProject()">{{$t('new_project_action')}}</button></p>
  </div>
</template>

<script>

export default {
  name: 'newProject',
  data () {
    return {
      projectName: '',
      projectCategory: '',
      projectUrl1: '',
      errors: []
    }
  },
  methods: {
    createProject () {
      this.errors = []
      // check forms
      if (this.projectName === '') {
        this.errors.push(this.$t('new_project_errName'))
      }
      if (this.projectCategory === '') {
        this.errors.push(this.$t('new_project_errCategory'))
      }
      if (this.projectUrl1 === '') {
        this.errors.push(this.$t('new_project_errUrl'))
      }

      if (this.errors.length === 0) {
        // get the next id
        let maxUid = 0
        for (const uid in this.$store.state.Main.projects) {
          if (uid > maxUid) maxUid = uid
        }

        let pUid = parseInt(maxUid) + 1
        this.$store.dispatch('ADD_PROJECT', {
          uid: pUid,
          name: this.projectName,
          category: this.projectCategory,
          sources: {
            '1' : {
              uid: 1,
              url: this.projectUrl1,
              lastRequest: undefined,
              itemNumber: 0
            }
          },
          offers: {}
        })
        this.$nextTick(() => {
          this.$router.push({ name: 'project', params: { uid: pUid } })
        })
      }
    }
  },
  created: function () {
    this.errors = []
    this.projectUrl1 = ''
    this.projectCategory = ''
    this.projectName = ''
  }
}
</script>

<style>

  .new_project_vue {
    padding-left: 3em;
    padding-right: 3em;
    max-width: 400px;
    margin: auto;
  }

  .new_project_input {
    line-height: 2em;
    height: 2em;
  }

  .new_project_input input, .new_project_input select {
    height: 2em;
    width: 100%;
    margin: auto;
  }

  .new_project_action {
    text-align: center;
  }

  .new_project_action button{
    width: 200px;
    height: 2em;
  }

  .msg_error {
    color: red;
  }
</style>