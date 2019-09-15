import { DEFAULT_LANGUAGE } from '../../../constantes.js'
import Vue from 'vue'

const state = {
  language: DEFAULT_LANGUAGE,
  projects: {}
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
    state.language = code
  },
  ADD_PROJECT (state, project) {
    Vue.set(state.projects, project.uid, project)
  }
}
export default { state, mutations, actions }
