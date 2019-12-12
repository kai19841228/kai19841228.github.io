import * as types from './mutation-type.js'
export default {
  [types.SET_MENU_DATA] (state, data) {
    state.menu = data
  }
}
