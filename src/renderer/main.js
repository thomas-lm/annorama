import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import { i18n } from './i18n'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
