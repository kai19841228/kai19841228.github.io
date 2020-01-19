import Vue from 'vue'
import App from './App'
import store from './store'
//公共js 工具类
import utils from'./utils/utils'
Vue.config.productionTip = false
App.mpType = 'app'
//挂载
Vue.prototype.$utils = utils
Vue.prototype.$store = store
const app = new Vue({
  ...App,
  created () {},
  methods: {},
  mounted () {}
})
app.$mount()
