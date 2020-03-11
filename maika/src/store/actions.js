import * as types from './mutation-type.js'
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
  }
	}