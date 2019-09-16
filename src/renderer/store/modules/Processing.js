const state = {
  currentProcessingRequest: 0
}

const actions = {
  SET_PROCESSING_REQUEST ({ commit }, num) {
    commit('SET_PROCESSING_REQUEST', num)
  }
}

const mutations = {
  SET_PROCESSING_REQUEST (state, num) {
    state.currentProcessingRequest = num
  }
}
export default { state, mutations, actions }
