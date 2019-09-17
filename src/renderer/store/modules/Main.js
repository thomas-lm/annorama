/*
  Main storage module
  Store application option & project

  Main:
    language: #langCode
    projects:
      '#projectUid':
        uid: #projectUid
        name: #project name
        category: housing | shopping | job
        sources:
          '#sourceUid':
            uid: #sourceUid
            url: #url
            lastRequest: #date
            itemNumber: #itemNumber
        offers:
          '#offerUid':
            uid: #offerUid
            url: #offerUrl
            title: #offerTitle
            description: #offerDescription
            date: #offerDate
 */

import { DEFAULT_LANGUAGE } from '../../../constantes.js'
import offerProcessing from '../../parser/offerProcessing.js'
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
  },
  REFRESH_OFFERS (context, uidProject) {
    let refreshPromise = offerProcessing.refreshProject(context.state.projects[uidProject])
    refreshPromise.then(([newSources, newOffers]) => {
      context.commit('UPDATE_OFFERS', uidProject, newOffers)
      context.commit('UPDATE_SOURCES', uidProject, newSources)
    })
  }
}

const mutations = {
  CHANGE_LANGUAGE (state, code) {
    state.language = code
  },
  ADD_PROJECT (state, project) {
    Vue.set(state.projects, project.uid, project)
  },
  UPDATE_OFFERS (state, uidProject, offers) {
    for(const [uid, offer] of Object.entries(offers)) {
      Vue.set(state.projects[uidProject].offers, uid, offer)
    }
  },
  UPDATE_SOURCES (state, uidProject, sources) {
    for(const [uid, source] of Object.entries(sources)) {
      Vue.set(state.projects[uidProject].sources, uid, source)
    }
  }
}
export default { state, mutations, actions }
