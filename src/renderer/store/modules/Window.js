const state = {
  windowX: 0,
  windowY: 0,
  windowWidth: 400,
  windowHeight: 400,
  windowMaximize: true
}

const actions = {
  UP_WIN_POS ({ commit }, x, y) {
    commit('UP_WIN_POS', x, y)
  },
  UP_WIN_SIZE ({ commit }, w, h) {
    commit('UP_WIN_SIZE', w, h)
  },
  UP_WIN_MAXIMIZE ({ commit }, max) {
    commit('UP_WIN_MAXIMIZE', max)
  }
}

const mutations = {
  UP_WIN_POS (state, x, y) {
    state.windowX = x
    state.windowY = y
  },
  UP_WIN_SIZE (state, w, h) {
    state.windowWidth = w
    state.windowHeight = h
  },
  UP_WIN_MAXIMIZE (state, max) {
    state.windowMaximize = max
  }
}

export default { state, mutations, actions }
