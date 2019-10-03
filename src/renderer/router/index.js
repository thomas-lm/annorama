import Vue from 'vue'
import Router from 'vue-router'

import NewProject from '@/components/NewProject.vue'
import Project from '@/components/Project.vue'
import ProjectConf from '@/components/ProjectConf.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newProject',
      component: NewProject
    },
    {
      path: '/project/:uid',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '/project/:uid/conf',
      name: 'projectConf',
      component: ProjectConf,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
