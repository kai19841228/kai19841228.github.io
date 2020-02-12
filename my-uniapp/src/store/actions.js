import * as types from './mutation-type.js'
// this.$store.dispatch('xxxx', obj)  xxxx为actions异步事件名称,obj为传递的参数
export default {
  setMenuData (context, data) {
    context.commit(types.SET_MENU_DATA, data)
  }
}
