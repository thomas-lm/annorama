import Vue from 'vue'
import Router from 'vue-router'

import NewProject from '@/components/NewProject.vue'
import Search from '@/components/Search.vue'
import Project from '@/components/Project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newProject',
      component: NewProject
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
