import * as types from './mutation-type.js'
import order from '../services/order'
// this.$store.dispatch('xxxx', obj)  xxxx为actions异步事件名称,obj为传递的参数
export default {
  setServiceType (context, data) {
    context.commit(types.SET_SERVICE_TYPE, data)
  },
	setBookingStartTime (context, data) {
    context.commit(types.SET_BOOKING_START_TIME, data)
  },
	setSwitchStatu (context, data) {
    context.commit(types.SET_SWITCH_STATU, data)
  },
  setUpAdress (context, data) {
    context.commit(types.SET_UP_ADRESS, data)
  },
  setDownAdress (context, data) {
    context.commit(types.SET_DOWN_ADRESS, data)
  },
  setUpCity (context, data) {
    context.commit(types.SET_UP_CITY, data)
  },
  setDownCity (context, data) {
    context.commit(types.SET_DOWN_CITY, data)
  },
  setUserPhone (context, data) {
    context.commit(types.SET_USER_PHONE, data)
  },
  setRiderPhone (context, data) {
    context.commit(types.SET_RIDER_PHONE, data)
  },
  setRiderName (context, data) {
    context.commit(types.SET_RIDER_NAME, data)
  },
  setCurrentCity (context, data) {
    context.commit(types.SET_CURRENT_CITY, data)
  },
  setPredict (context, data) {
    context.commit(types.SET_PREDICT, data)
  },
  getLocation(context, data) {
		console.log(data.vm)
		// 获取授权列表，若果授权了用户信息，获取用户信息
		uni.getSetting({
			success: res => {
				console.log(res)
				console.log('action异步')
				order.getCityList(data.vm)
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
						}
					})
				}
			}
		})
  },
	getCity(context, parem) {
		console.log('0000000')
		console.log(ajaxApi.getPostParamCallF)
		ajaxApi.getPostParamCallF('/api/mycar/user/city/getCityList', {cityName: ''}, function (vm, data) {
			console.log(data)
		}, parem.vm)
	}
}
