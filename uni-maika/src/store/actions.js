import * as types from './mutation-type.js'
export default {
  setMenuData (context, data) {
    context.commit(types.SET_MENU_DATA, data)
  }
}
