const SET_CITY_CURRENT = 'SET_CITY_CURRENT'
const SET_UP_ADRESS = 'SET_UP_ADRESS'
const SET_DOWN_ADRESS = 'SET_DOWN_ADRESS'
const SET_UP_CITY = 'SET_UP_CITY'
const SET_DOWN_CITY = 'SET_DOWN_CITY'
const SET_USER_PHONE = 'SET_USER_PHONE'
const SET_RIDER_PHONE = 'SET_RIDER_PHONE'
const SET_RIDER_NAME = 'SET_RIDER_NAME'
const SET_CURRENT_CITY = 'SET_CURRENT_CITY'
const SET_SWITCH_STATU = 'SET_SWITCH_STATU'
const SET_STATE = 'SET_STATE'
const SET_BOOKING_START_TIME = 'SET_BOOKING_START_TIME'
const state = {
  cityCurrent: {
    status: 0
  }, // 当前城市
  cityUp: {
    cityId: '',
    cityName: '',
    cityCode: '',
    regionNumber: '',
    centeralLaGd: '',
    centeralLoGd: '',
    status: 0
  }, // 上车城市
  cityDown: {
    cityId: '',
    cityName: '',
    cityCode: '',
    regionNumber: '',
    centeralLaGd: '',
    centeralLoGd: '',
    status: 0
  }, // 下车城市
  orderTime: {
    bookingStartTime: '',
    flightBookingStartTime: '',
    timeStr: '现在'
  }, // 下单时间
  switchStatu: false, // 页面带人叫车状态切换
  upAdress: {}, // 上车地址
  downAdress: {}, // 下车地址
  orderType: 1, // 订单类型 1普通用户2企业用户
  serviceType: 1, // 服务类型 1即时2预约
  bookingDate: '', // 出发时间 时间戳
  startPoint: '', // 起点坐标 经度,纬度
  endPoint: '', // 终点坐标 经度,纬度
  companyId: '', // 公司ID 企业订单传入
  userPhone: '', // 预订人手机号
  riderPhone: '', // 乘车人 手机号
  riderName: '', // 乘车人 姓名
  payFlag: 1, // 支付人标记 1:预订人 | 2:乘车人
  callByOthers: '' // 是否代人叫车 0否1是
}
const mutations = {
  increment: (state) => {
    const obj = state
    obj.count += 1
  },
  SET_BOOKING_START_TIME (state, data) {
    console.log(state, data)
    state.orderTime.timeStr = data.timeStr
    state.orderTime.bookingStartTime = data.time
  },
  SET_STATE (state, data) {
    state = data
  },
  SET_CITY_CURRENT (state, data) {
    state.menu = data
  },
  SET_UP_ADRESS (state, data) {
    state.upAdress = data
  },
  SET_DOWN_ADRESS (state, data) {
    state.downAdress = data
  },
  SET_UP_CITY (state, data) {
    // 城市变化 清空上次地址
    state.cityUp = data
    state.upAdress = {}
  },
  SET_DOWN_CITY (state, data) {
    // 城市变化 清空上次地址
    state.cityDown = data
    state.downAdress = {}
  },
  SET_USER_PHONE (state, data) {
    state.userPhone = data
  },
  SET_RIDER_PHONE (state, data) {
    state.riderPhone = data
  },
  SET_RIDER_NAME (state, data) {
    state.riderName = data
  },
  SET_CURRENT_CITY (state, data) {
    state.cityCurrent = data
  },
  SET_SWITCH_STATU (state, data) {
    state.switchStatu = data
  }
}
const actions = {
  setBookingStartTime (context, data) {
    context.commit(SET_BOOKING_START_TIME, data)
  },
  setState (context, data) {
    context.commit(SET_STATE, data)
  },
  setMenuData (context, data) {
    context.commit(SET_CITY_CURRENT, data)
  },
  setUpAdress (context, data) {
    context.commit(SET_UP_ADRESS, data)
  },
  setDownAdress (context, data) {
    context.commit(SET_DOWN_ADRESS, data)
  },
  setUpCity (context, data) {
    context.commit(SET_UP_CITY, data)
  },
  setDownCity (context, data) {
    context.commit(SET_DOWN_CITY, data)
  },
  setUserPhone (context, data) {
    context.commit(SET_USER_PHONE, data)
  },
  setRiderPhone (context, data) {
    context.commit(SET_RIDER_PHONE, data)
  },
  setRiderName (context, data) {
    context.commit(SET_RIDER_NAME, data)
  },
  setCurrentCity (context, data) {
    context.commit(SET_CURRENT_CITY, data)
  },
  setSwitchStatu (context, data) {
    context.commit(SET_SWITCH_STATU, data)
  }
}
const getters = {
  getCount: state => {
    return state.count
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
