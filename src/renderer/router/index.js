import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/components/Search.vue'
import Project from '@/components/Project.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
