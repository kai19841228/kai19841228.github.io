import ajaxApi from './fly.js'
import wepy from 'wepy'
var CryptoJS = require('crypto-js')
const order = {
  // 城市列表
  getCityList (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/city/getCityList', {cityName: vm.searchCityText}, order.delCityListSuc, vm)
  },
  delCityListSuc (vm, data) {
    vm.openCityList = data
    vm.$apply()
  },
  // 检查上车地址是否开通
  getCurrentCityServiceType (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/city/getCurrentCityServiceType/v2-0-0', {regionNumber: vm.cityUp.regionNumber}, order.dealUpCity, vm)
  },
  dealUpCity (vm, data) {
    var boo = false
    for (let item of data.serviceTypeVOList) {
      if (item.serviceTypeCode === 'JSYC') {
        boo = true
      }
    }
    if (!boo) {
      wepy.showModal({
        title: '提示',
        content: '当前城市未开通服务',
        showCancel: false,
        confirmColor: '#ff8400',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 选择城市列表')
            const url = '../citySelect/main?city=up'
            wepy.navigateTo({ url })
          }
        }
      })
    }
  },
  // 定位当前城市
  getCurrentCity (vm, data) {
    ajaxApi.getPostParam('/api/mycar/user/city/getCurrentCityServiceTypeByIp', data, vm).then(function (response) {
      order.dealCurrentCity(vm, response)
    })
  },
  dealCurrentCity (vm, response) {
    // console.log(response)
    if (response.data.code === 0) {
      vm.methods.setCurrentCity(response.data.data.cityInfoVO)
      if (vm.cityUp.status === 0) {
        vm.methods.setUpCity(response.data.data.cityInfoVO)
        vm.methods.setDownCity(response.data.data.cityInfoVO)
      }
    } else if (response.data.code === 500801) {
      wx.showModal({
        title: '提示',
        content: response.data.message,
        showCancel: false,
        confirmColor: '#ff8400',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 选择城市列表')
            const url = '/pages/cityChange?city=up'
            wepy.navigateTo({ url })
          }
        }
      })
    } else {
      wx.showToast({
        title: response.data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 费用预估
  getOrderCollect (vm) {
    let param = {
      cityId: vm.cityUp.cityId, // 城市id
      orderType: 1, // 订单类型 1普通用户2企业用户
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      startPoint: vm.upAdress.location.lng + ',' + vm.upAdress.location.lat, // 起点坐标 经度,纬度
      endPoint: vm.downAdress.location.lng + ',' + vm.downAdress.location.lat, // 终点坐标 经度,纬度
      riderPhone: '', // 预订人手机号
      companyId: '0' // 公司ID 企业订单传入
    }
    ajaxApi.getPostParamCallF('/api/mycar/user/orderCollect/estimateCost/v2-2-5', param, order.dealOrderCollect, vm)
  },
  dealOrderCollect (vm, data) {
    vm.predict = data.costList[0]
    vm.$apply()
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
      userPhone: vm.userPhone, // 预订人手机号
      riderPhone: vm.riderPhone || vm.userPhone, // 乘车人手机号
      riderName: vm.riderName, // 乘车人 姓名
      bookingStartAddr: vm.upAdress.address, // 预定上车地址
      bookingStartAddrShort: vm.upAdress.name, // 预定上车短地址
      bookingStartPoint: order.encrypt(vm.upAdress.location.lng + ',' + vm.upAdress.location.lat), // 预定上车坐标点
      bookingEndAddr: vm.downAdress.address, // 预定下车地址
      bookingEndAddrShort: vm.downAdress.name, // 预定下车短地址
      bookingEndPoint: order.encrypt(vm.downAdress.location.lng + ',' + vm.upAdress.location.lat), // 预定下车坐标点
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      groupId: vm.predict.groupId, // 车组id 经济型豪华型等
      debtAmount: vm.predict.debtAmount, // 折扣金额
      cityId: vm.cityUp.cityId, // 城市id
      payFlag: vm.payFlag, // 支付人标记 1:预订人 | 2:乘车人
      estimatedAmount: vm.predict.totalAmount, // 预估费用
      estimatedMileage: vm.predict.totalMileage / 1000, // 预估里程
      estimatedMinutes: vm.predict.totalTime, // 预估时长
      currentAddr: vm.upAdress.address, // 预定上车地址
      currentAddrShort: vm.upAdress.name, // 预定上车短地址
      currentPoint: order.encrypt(vm.upAdress.location.lng + ',' + vm.upAdress.location.lat) // 预定上车坐标点
    }
    ajaxApi.getPostParam('/api/mycar/user/order/placeOrderInfoInH5', param, vm).then(function (response) {
      order.dealPlaceOrder(vm, response)
    })
  },
  dealPlaceOrder (vm, data) {
    if (data && data.data && data.data.data && data.data.data.token) {
      wepy.setStorageSync('token', data.data.data.token)
    }
    if (data.data.code === 0) {
      console.log('跳转派单轮询页面')
      const url = '/pages/orderPolling?orderId=' + data.data.data.orderId + '&' + 'orderNo=' + data.data.data.orderNo
      console.log(url)
      wepy.reLaunch({ url })
    } else if (data.data.code === 500330) {
      wx.showModal({
        title: '提示',
        content: data.data.message,
        showCancel: false,
        confirmColor: '#ff8400',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 去充值页面')
            let url = '/pages/Recharge'
            wepy.navigateTo({ url })
          }
        }
      })
    } else {
      wepy.showToast({
        title: data.data.message,
        icon: 'none',
        duration: 2000
      })
    }
  }
}
export default order