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
            creationDate: #offerCreationDate
            lastUpdate: #offerLastUpdate
            link: #offerUrl
            mainImageFileName: leboncoin/b9cf08fc57539d2c0b17e878dc089729869c45f6.jpg
            price: "290 000\_€"
            priceHistory: [price,date]
            title: Maison de ville 6 pièces 121 m²
            uid: 1-1676374425
 */

import { DEFAULT_LANGUAGE } from '../../../constantes.js'
import { refreshProject, refreshOffer } from '../offerProcessing.js'
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
  REFRESH_PROJECT_OFFERS (context, [uidProject, uidSource]) {
    console.log('refreshProjectOffers', uidProject, uidSource)
    let refreshPromise = refreshProject(context.state.projects[uidProject], uidSource)
    refreshPromise.then(([newSources, newOffers]) => {
      context.commit('UPDATE_SOURCES', [uidProject, newSources])
      Vue.nextTick(function() {
        context.commit('UPDATE_OFFERS', [uidProject, newOffers])
      });
    })
  },
  ADD_SOURCE ({ commit }, [uidProject, source]) {
    commit('ADD_SOURCE', [uidProject, source])
  },
  REFRESH_OFFER_DETAIL (context, [uidProject, uidOffer]) {
    context.commit('UPDATE_OFFER_PENDING', [uidProject, uidOffer, true])
    let refreshPromise = refreshOffer(context.state.projects[uidProject], uidOffer)
    refreshPromise.then((offerDefail) => {
      context.commit('UPDATE_OFFER_DETAIL', [uidProject, uidOffer, offerDefail])
      Vue.nextTick(function() {
        context.commit('UPDATE_OFFER_PENDING', [uidProject, uidOffer, false])
      });
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
  UPDATE_OFFERS (state, [uidProject, updatedOffers]) {
    let project = state.projects[uidProject]
    // Create offer if not exists
    if (project.offers === undefined) {
      Vue.set(project, 'offers', {})
    }

    let updatedKeys = Object.keys(updatedOffers)
    // console.log(updatedKeys)
    let existingKeys = Object.keys(project.offers)
    // console.log(existingKeys)

    // Update existing offer
    for (const [uid, offer] of Object.entries(project.offers)) {
      if (updatedKeys.includes(uid)) {
        if (offer.pricesHistory === undefined) {
          offer.pricesHistory = []
        }

        // Update price if different
        if (offer.price !== updatedOffers[uid].price) {
          // add to history
          offer.pricesHistory.push({price: offer.price, date: offer.lastUpdate})
          offer.price = updatedOffers[uid].price
        }

        // Update image
        if (offer.mainImageFileName !== updatedOffers[uid].mainImageFileName) {
          offer.mainImageFileName = updatedOffers[uid].mainImageFileName
        }

        // Creation date
        if (offer.creationDate === undefined) {
          offer.creationDate = offer.lastUpdate
        }

        // Update offer date
        offer.lastUpdate = updatedOffers[uid].lastUpdate
      }
    }

    // Create new offer
    for (const [uid, offer] of Object.entries(updatedOffers)) {
      if (!existingKeys.includes(uid)) {
        Vue.set(state.projects[uidProject].offers, uid, offer)
      }
    }
  },
  UPDATE_SOURCES (state, [uidProject, sources]) {
    for (const [uid, source] of Object.entries(sources)) {
      Vue.set(state.projects[uidProject].sources, uid, source)
    }
  },
  ADD_SOURCE (state, [uidProject, source]) {
    Vue.set(state.projects[uidProject].sources, source.uid, source)
  },
  UPDATE_OFFER_DETAIL (state, [uidProject, uidOffer, detail]) {
    let project = state.projects[uidProject]
    if (project.offers && project.offers[uidOffer]) {
      Vue.set(project.offers[uidOffer], 'detail', detail)
    }
  },
  UPDATE_OFFER_PENDING (state, [uidProject, uidOffer, active]) {
    let project = state.projects[uidProject]
    if (project.offers && project.offers[uidOffer]) {
      Vue.set(project.offers[uidOffer], 'pending', active)
    }
  }
}
export default { state, mutations, actions }
