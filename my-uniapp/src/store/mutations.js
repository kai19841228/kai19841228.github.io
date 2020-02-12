import * as types from './mutation-type.js'
// this.$store.commit('xxxx', obj)  xxxx为mutations异步事件名称,obj为传递的参数
export default {
  [types.SET_MENU_DATA] (state, data) {
    state.menu = data
  }
}
