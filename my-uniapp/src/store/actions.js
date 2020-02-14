import * as types from './mutation-type.js'
import ajaxApi from '../utils/fly.js'
// this.$store.dispatch('xxxx', obj)  xxxx为actions异步事件名称,obj为传递的参数
export default {
  setMenuData (context, data) {
    context.commit(types.SET_MENU_DATA, data)
  },
  getCity(context, parem) {
		console.log('0000000')
		console.log(ajaxApi.getPostParamCallF)
		ajaxApi.getPostParamCallF('/api/mycar/user/city/getCityList', {cityName: ''}, function (vm, data) {
			console.log(data)
		}, parem.vm)
  }
}
