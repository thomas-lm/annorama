import Storage from '../../../storage.js'
import { DEFAULT_LANGAGE, APP_SETTINGS_PATH, APP_RENTERER_SETTINGS_FILE } from '../../../constantes.js'
import { app, remote } from 'electron'

let appPath = ''
if (app === undefined) {
  appPath = remote.app.getPath('userData')
} else {
  appPath = app.getPath('userData')
}

console.log('init storage Main')
const storage = new Storage(
  appPath + '/' + APP_SETTINGS_PATH,
  APP_RENTERER_SETTINGS_FILE,
  {
    defaultLanguage: DEFAULT_LANGAGE,
    projects: []
  }
)

const state = storage.getData()

const actions = {
  CHANGE_LANGUAGE ({ commit }, code) {
    commit('CHANGE_LANGUAGE', code)
  }
}

const mutations = {
  CHANGE_LANGUAGE (state, code) {
    state.defaultLanguage = code
    this.$i18n.locale = code
    storage.set('defaultLanguage', code)
  }
}

export default {
  state,
  mutations,
  actions
}
