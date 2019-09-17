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
import { refreshProject } from '../../parser/offerProcessing.js'
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
  REFRESH_OFFERS ({ commit }, uidProject) {
    return new Promise(async (resolve) => {
      try {
        let {newSources, newOffers} = await refreshProject(state.projects[uidProject])
        commit('UPDATE_OFFERS', uidProject, newOffers)
        commit('UPDATE_SOURCES', uidProject, newSources)
      } catch {
        console.log('Refresh Offers problems :', e)
      }
      
      resolve()
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
    offers.forEach(offer => {
      Vue.set(state.projects[uidProject].offers, offer.uid, offer)
    })
  },
  UPDATE_SOURCES (state, uidProject, sources) {
    sources.forEach(source => {
      Vue.set(state.projects[uidProject].sources, source.uid, source)
    })
  }
}
export default { state, mutations, actions }
