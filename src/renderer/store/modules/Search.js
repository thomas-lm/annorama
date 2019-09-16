import { parseSearchUrl } from '../../parser/itemParser.js'

const state = {
  currentUrl: '',
  searchItems: [],
  errorMsg: '',
  currentNumberProcessingSearchs: 0
}

const actions = {
  LOAD_URL ({ commit }, url) {
    commit('LOAD_URL', url)
  }
}

const mutations = {
  LOAD_URL (state, url) {
    state.currentUrl = url
    state.currentNumberProcessingSearchs++
    parseSearchUrl(url)
      .then(response => {
        state.errorMsg = ''
        state.searchItems = response
      })
      .catch(error => {
        state.errorMsg = error
        state.searchItems = []
      })
  }
}

export default {
  state,
  mutations,
  actions
}
