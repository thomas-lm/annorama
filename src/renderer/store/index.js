import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import modules from './modules'

import { APP_SETTINGS_FILE } from '../../constantes.js'
import Storage from './storage.js'
import { app, remote } from 'electron'

let userStorage
if (app === undefined) {
  userStorage = new Storage(remote.app.getPath('userData'), APP_SETTINGS_FILE)
} else {
  userStorage = new Storage(app.getPath('userData'), APP_SETTINGS_FILE)
}

Vue.use(Vuex)

// Local hdd storage
const vuePersist = new VuexPersistence({
  saveState: (key, state, storage) => {
    // console.log('save state ', key, state, storage)
    userStorage.set(key, state)
  },
  restoreState: (key, storage) => {
    // console.log('restore state ', key, storage)
    return userStorage.get(key)
  },
  modules: ['Main']
})

export default new Vuex.Store({
  modules,
  plugins: [
    vuePersist.plugin
  ],
  strict: process.env.NODE_ENV !== 'production'
})
