import { handleActions } from 'redux-actions'
const SET_UP_ADRESS = 'SET_UP_ADRESS'
const SET_DOWN_ADRESS = 'SET_DOWN_ADRESS'
const SET_UP_CITY = 'SET_UP_CITY'
const SET_DOWN_CITY = 'SET_DOWN_CITY'
const SET_USER_PHONE = 'SET_USER_PHONE'
const SET_RIDER_PHONE = 'SET_RIDER_PHONE'
const SET_RIDER_NAME = 'SET_RIDER_NAME'
const SET_CURRENT_CITY = 'SET_CURRENT_CITY'
const SET_SWITCH_STATU = 'SET_SWITCH_STATU'
const SET_TIME = 'SET_TIME'
const SET_STATE = 'SET_STATE'

export default handleActions({
  SET_STATE (state, data) {
    state = data
  },
  SET_TIME (state, data) {
    let obj = {
      title: data.payload[1],
      data: data.payload[0]
    }
    return {
      ...state,
      orderTime: obj
    }
  },
  SET_UP_ADRESS (state, data) {
    return {
      ...state,
      upAdress: data.payload
    }
  },
  SET_DOWN_ADRESS (state, data) {
    return {
      ...state,
      downAdress: data.payload
    }
  },
  SET_UP_CITY (state, data) {
    // 城市变化 清空上次地址
    return {
      ...state,
      cityUp: data.payload,
      upAdress: {}
    }
  },
  SET_DOWN_CITY (state, data) {
    // 城市变化 清空上次地址
    return {
      ...state,
      cityDown: data.payload,
      downAdress: {}
    }
  },
  SET_USER_PHONE (state, data) {
    console.log(state)
    return {
      ...state,
      userPhone: data.payload[1].detail.value
    }
  },
  SET_RIDER_PHONE (state, data) {
    return {
      ...state,
      riderPhone: data.payload[1].detail.value
    }
  },
  SET_RIDER_NAME (state, data) {
    return {
      ...state,
      riderName: data.payload[1].detail.value
    }
  },
  SET_CURRENT_CITY (state, data) {
    state.cityCurrent = data.payload
  },
  SET_SWITCH_STATU (state, data) {
    return {
      ...state,
      switchStatu: data.payload[1].detail.value
    }
  }
}, {
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
  }, // 下车城市
  cityDown: {
    cityId: '',
    cityName: '',
    cityCode: '',
    regionNumber: '',
    centeralLaGd: '',
    centeralLoGd: '',
    status: 0
  }, // 下车城市
  orderTime: {}, // 下单时间
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
})
