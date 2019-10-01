import { countProcessing } from '../offerProcessing.js'

const state = {
  currentProcessingRequest: 0
}

const actions = {
  REFRESH_PROCESSING (context) {
    let processingPromise = countProcessing()
    processingPromise.then((num) => {
      if (num !== context.state.currentProcessingRequest) {
        context.commit('SET_PROCESSING_REQUEST', num)
      }
      if (num > 0) {
        setTimeout(() => {
          context.dispatch('REFRESH_PROCESSING')
        }, 500)
      }
    })
  }
}

const mutations = {
  SET_PROCESSING_REQUEST (state, num) {
    state.currentProcessingRequest = num
  }
}
export default { state, mutations, actions }
