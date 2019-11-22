import Vue from 'vue'
import App from './App'
import store from '@/store/store'
import Fly from 'flyio/dist/npm/wx'

Vue.prototype.$baseUrl = 'http://test.manage.imycargo.com/api'
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$request = new Fly()
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
