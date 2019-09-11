import { DEFAULT_LANGUAGE } from '../../../constantes.js'

const state = {
  language: DEFAULT_LANGUAGE,
  projects: []
}

const actions = {
  CHANGE_LANGUAGE ({ commit }, code) {
    commit('CHANGE_LANGUAGE', code)
  },
  ADD_PROJECT ({ commit }, project) {
    commit('ADD_PROJECT', project)
  }
}

const mutations = {
  CHANGE_LANGUAGE (state, code) {
    state.defaultLanguage = code
    this.$i18n.locale = code
  },
  ADD_PROJECT (state, project) {
    state.projects.push(project)
  }
}

export default { state, mutations, actions }
