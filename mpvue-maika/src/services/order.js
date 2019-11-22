import store from '@/store/store'
const { ajax } = require('@/utils/wxsendRequest').default
var CryptoJS = require('crypto-js')
// vm.$baseUrl 在入口文件main里配置的全局

const orderData = {
  Ajax (vm, url, data, callback, contentType, Type) {
    ajax({
      url: vm.$baseUrl + url,
      type: Type || 'POST',
      contentType: contentType || '', // contentType为空是form Data，不为空是request payload方式传递参数。
      data: data,
      success: function (ret) {
        if (ret && ret.data && ret.data.token) {
          mpvue.setStorageSync('token', ret.data.token)
        }
        typeof callback === 'function' && callback(vm, ret)
      },
      error: function (ret) {
        typeof callback === 'function' && callback(vm, ret)
      }
    })
  },
  // 定位当前城市
  getCurrentCity (vm, data) {
    orderData.Ajax(vm, '/mycar/user/city/getCurrentCityServiceTypeByIp', data, orderData.dealCurrentCity)
  },
  dealCurrentCity (vm, data) {
    console.log(data)
    if (data.code === 0) {
      store.dispatch('setCurrentCity', data.data.cityInfoVO)
      if (store.state.order.cityUp.status === 0) {
        store.dispatch('setUpCity', data.data.cityInfoVO)
        store.dispatch('setDownCity', data.data.cityInfoVO)
      }
    } else if (data.code === 500801) {
      mpvue.showModal({
        title: '提示',
        content: data.message,
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 选择城市列表')
            const url = '../citySelect/main?city=up'
            mpvue.navigateTo({ url })
          }
        }
      })
    } else {
      mpvue.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 检查上车地址是否开通
  getCurrentCityServiceType (vm) {
    orderData.Ajax(vm, '/mycar/user/city/getCurrentCityServiceType/v2-0-0', {regionNumber: store.state.order.cityUp.regionNumber}, orderData.deadealUpCitylCityList)
  },
  dealUpCity (vm, data) {
    if (data.code === 0) {
      var boo = false
      for (let item of data.data.serviceTypeVOList) {
        if (item.serviceTypeCode === 'JSYC') {
          boo = true
        }
      }
      if (!boo) {
        mpvue.showModal({
          title: '提示',
          content: '当前城市未开通服务',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定 选择城市列表')
              const url = '../citySelect/main?city=up'
              mpvue.navigateTo({ url })
            }
          }
        })
      }
    } else {
      mpvue.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 城市列表
  getCityList (vm) {
    orderData.Ajax(vm, '/mycar/user/city/getCityList', {cityName: vm.searchCityText}, orderData.dealCityList)
  },
  dealCityList (vm, data) {
    console.log(data)
    if (data.code === 0) {
      vm.openCityList = data.data
      console.log(vm.openCityList)
    } else {
      mpvue.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 费用预估
  getOrderCollect (vm) {
    let param = {
      cityId: store.state.order.cityUp.cityId, // 城市id
      orderType: 1, // 订单类型 1普通用户2企业用户
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      startPoint: vm.upAdress.location.lng + ',' + vm.upAdress.location.lat, // 起点坐标 经度,纬度
      endPoint: vm.downAdress.location.lng + ',' + vm.downAdress.location.lat, // 终点坐标 经度,纬度
      riderPhone: '', // 预订人手机号
      companyId: '0' // 公司ID 企业订单传入
    }
    orderData.Ajax(vm, '/mycar/user/orderCollect/estimateCost/v2-2-5', param, orderData.dealOrderCollect)
  },
  dealOrderCollect (vm, data) {
    console.log(data)
    vm.predict = data.data.costList[0]
  },
  // 加密
  encrypt (data) {
    const secretKey = 'MyCar@PP'
    var afterEncrypt = CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
    return afterEncrypt
  },
  // 下单
  getPlaceOrder (vm) {
    let param = {
      userPhone: store.state.order.userPhone, // 预订人手机号
      riderPhone: store.state.order.riderPhone || store.state.order.userPhone, // 乘车人手机号
      riderName: vm.riderName, // 乘车人 姓名
      bookingStartAddr: vm.upAdress.address, // 预定上车地址
      bookingStartAddrShort: vm.upAdress.name, // 预定上车短地址
      bookingStartPoint: orderData.encrypt(vm.upAdress.location.lng + ',' + vm.upAdress.location.lat), // 预定上车坐标点
      bookingEndAddr: vm.downAdress.address, // 预定下车地址
      bookingEndAddrShort: vm.downAdress.name, // 预定下车短地址
      bookingEndPoint: orderData.encrypt(vm.downAdress.location.lng + ',' + vm.upAdress.location.lat), // 预定下车坐标点
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      groupId: vm.predict.groupId, // 车组id 经济型豪华型等
      debtAmount: vm.predict.debtAmount, // 折扣金额
      cityId: store.state.order.cityUp.cityId, // 城市id
      payFlag: store.state.order.payFlag, // 支付人标记 1:预订人 | 2:乘车人
      estimatedAmount: vm.predict.totalAmount, // 预估费用
      estimatedMileage: vm.predict.totalMileage / 1000, // 预估里程
      estimatedMinutes: vm.predict.totalTime, // 预估时长
      currentAddr: vm.upAdress.address, // 预定上车地址
      currentAddrShort: vm.upAdress.name, // 预定上车短地址
      currentPoint: orderData.encrypt(vm.upAdress.location.lng + ',' + vm.upAdress.location.lat) // 预定上车坐标点
    }
    console.log(param)
    orderData.Ajax(vm, '/mycar/user/order/placeOrderInfoInH5', param, orderData.dealPlaceOrder)
  },
  dealPlaceOrder (vm, data) {
    console.log(data)
    if (data.code === 0) {
      console.log('用户点击确定 去充值页面')
      // const url = '../citySelect/main?orderId=' + data.data.orderId + 'orderNo=' + data.data.orderNo
      // mpvue.navigateTo({ url })
    } else if (data.code === 500330) {
      mpvue.showModal({
        title: '提示',
        content: data.message,
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 去充值页面')
            const url = '../Recharge/main'
            mpvue.navigateTo({ url })
          }
        }
      })
    } else {
      mpvue.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000
      })
    }
  }
}

export default orderData
