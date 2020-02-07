<template>
  <header class="header-bar">
    <div class="header-bar_app-actions">
      <button class="btn btn--primary">{{$t('new_project_title')}}</button>
      <button class="btn">Import</button>
      <button class="btn">Export</button>
    </div>
    <h1 class="header-bar_title">Project title (TODO)</h1>
    <div class="header-bar_project-actions">

    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'header',
    computed: {
      ...mapState({
        projects: state => state.Main.projects
      })
    }
  }
</script>

<style>

  .header-bar {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 50px;
    background-color: #303030;
    color: #e9e9e9;
    line-height: 50px;
    box-shadow: 0px 2px 2px rgba(0,0,0,.5);
  }

  .header-bar_app-actions {
    float: left;
    margin-left: 10px;
  }

  .header-bar_project-actions {
    float: right;
    margin-right: 10px;
  }

  .header-bar_title {
    text-align: center;
    font-size: 1em;
    font-weight: normal;
    padding: 0;
    margin: 0;
  }

  .btn {
    color: #c1c1c1;
    font-size: .8em;
    background-color: #686971;
    border-width: 0;
    border-radius: 4px;
    height: 30px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #605e62
  }

  .btn.btn--primary {
    color: white;
    background-color: #7097d2;
  }

  .btn.btn--primary:hover {
    background-color: #5773ad
  }
</style>