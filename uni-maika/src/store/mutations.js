import * as types from './mutation-type.js'
export default {
  [types.SET_SERVICE_TYPE] (state, data) {
    state.serviceType = data.serviceType
  }
}
