import { countRequestProcessing } from '../../parser/itemParser.js'

const state = {
  number: 0
}

const actions = {
  REFRESH_NUMBER ({ commit }) {
    commit('REFRESH_NUMBER')
  }
}

const mutations = {
  REFRESH_NUMBER (state) {
    state.number = countRequestProcessing()
  }
}

export default {
  state,
  mutations,
  actions
}
