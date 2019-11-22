// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    order
  }
})

export default store
