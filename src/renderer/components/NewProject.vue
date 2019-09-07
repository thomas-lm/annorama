<template>
  <div class="main project_vue">
    <h2 class="new_project_title">{{$t('new_project_title')}}</h2>
    <p class="new_project_input" ><input type="text" v-model="projectName"
    :placeholder="$t('new_project_inputName')" /></p>
    <p class="new_project_input" ><select v-model="projectCategory">
      <option value="">{{$t('new_project_selectCategory')}}</option>
      <option value="job">{{$t('project_cat_job')}}</option>
      <option value="housing">{{$t('project_cat_housing')}}</option>
      <option value="shopping">{{$t('project_cat_shopping')}}</option>
    </select></p>

    <p class="new_project_input" ><input type="text" v-model="projectUrl1"
    :placeholder="$t('new_project_inputUrl')" /></p>
    <p class="new_project_action"><button @click="creer()">{{$t('new_project_action')}}</button></p>
  </div>
</template>

<script>

export default {
  name: 'newProject',
  data () {
    return {
      projectName: '',
      projectCategory: '',
      projectUrl1: ''
    }
  },
  methods: {
    creer () {
      alert('todo')
    }
  }
}
</script>

<style>

  .project_vue {
    padding-left: 3em;
    padding-right: 3em;
    max-width: 400px;
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
</style>