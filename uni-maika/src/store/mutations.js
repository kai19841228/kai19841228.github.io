import * as types from './mutation-type.js'
// this.$store.commit('xxxx', obj)  xxxx为mutations异步事件名称,obj为传递的参数
export default {
  [types.SET_SERVICE_TYPE] (state, data) {
    state.serviceTypeStr = data.serviceTypeStr
  },
	[types.SET_BOOKING_START_TIME] (state, data) {
    state.orderTime.timeStr = data.timeStr
		state.orderTime.bookingStartTime = data.time
  },
	[types.SET_SWITCH_STATU] (state, data) {
		state.switchStatu = data.switchStatu
  },
  [types.SET_UP_ADRESS] (state, data) {
    state.upAdress = data
  },
  [types.SET_DOWN_ADRESS] (state, data) {
    state.downAdress = data
  },
  [types.SET_UP_CITY] (state, data) {
    // 城市变化 清空上次地址
    state.cityUp = data
    state.upAdress = {}
  },
  [types.SET_DOWN_CITY] (state, data) {
    // 城市变化 清空上次地址
    state.cityDown = data
    state.downAdress = {}
  },
  [types.SET_USER_PHONE] (state, data) {
    state.userPhone = data
  },
  [types.SET_RIDER_PHONE] (state, data) {
    state.riderPhone = data
  },
  [types.SET_RIDER_NAME] (state, data) {
    state.riderName = data
  },
  [types.SET_CURRENT_CITY] (state, data) {
    state.cityCurrent = data
  },
  [types.SET_PREDICT] (state, data) {
    state.predict = data
  }
}
