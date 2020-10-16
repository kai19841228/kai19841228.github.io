const state = {
  count: 0
}
const mutations = {
  increment: (state) => {
    const obj = state
    obj.count += 1
  },
  decrement: (state) => {
    const obj = state
    obj.count -= 1
  },
  updateCount (state, payload) {
    state.isCarSharingLayerState = payload.state
  },
  resetCount (state, payload) {
    const obj = state
    obj.count = payload.count
  }
}
const actions = {
  updateCount (context, params) {
    context.commit({
      type: 'updateCount',
      state: params.state
    })
  },
  resetCount (context, payload) {
    context.commit({
      type: 'resetCount',
      count: payload.count
    })
  }
}
const getters = {
  getCount: state => {
    return state.count
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
