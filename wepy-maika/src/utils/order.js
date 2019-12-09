import ajaxApi from './fly.js'
import wepy from 'wepy'
var amap = require('../static/js/amap-wx.js')
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
    } else if (data.data.code === 500332) {
      wepy.showToast({
        title: '您有一笔未支付订单，支付完成后才可继续用车！请前往app支付。',
        icon: 'none',
        duration: 2000
      })
    } else {
      wepy.showToast({
        title: data.data.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 轮询订单
  getOrderPoll (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/orderDispatch/pollService', {orderId: vm.orderId}, order.dealOrderPoll, vm)
  },
  dealOrderPoll (vm, data) {
    if (data.status === 30) {
      // 30状态 跳转成功页
      let url = '/pages/orderSuc?orderId=' + data.orderId + '&' + 'orderNo=' + data.orderNo
      wepy.navigateTo({ url })
    } else if (data.status === 100) {
      // 100状态为取消 调用接口返回提示信息
      vm.clearTime()
      ajaxApi.getPostParam('/api/mycar/user/order/info/getMyCarOrderDetail/v2-2-5', {orderNo: vm.orderNo}, vm).then(function (response) {
        if (response.data.code === 0) {
          wx.showModal({
            title: '提示',
            content: response.data.data.cancelDesc,
            showCancel: false,
            confirmColor: '#ff8400',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定 去充值页面')
                let url = '/pages/index'
                wepy.reLaunch({ url })
              }
            }
          })
        } else {
          wepy.showToast({
            title: response.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  // 取消预判
  cancelOrderPrejudge (vm) {
    ajaxApi.getPostParam('/api/mycar/user/orderMgmt/checkCancel', {orderId: vm.orderId}, vm).then(function (response) {
      if (response.data.code === 500501 || response.data.code === 500502 || response.data.code === 500503 || response.data.code === 500506 || response.data.code === 500507 || response.data.code === 500508 || response.data.code === 500510) {
        wx.showModal({
          title: '提示',
          content: response.data.message,
          showCancel: true,
          confirmColor: '#ff8400',
          success (res) {
            if (res.confirm) {
              // console.log('调用取消接口')
              order.cancelOrder(vm)
            }
          }
        })
      } else if (response.data.code === 500504 || response.data.code === 500505 || response.data.code === 500509) {
        wepy.showToast({
          title: '已产生违约金，请到app端取消并支付违约金',
          icon: 'none',
          duration: 2000
        })
      } else if (response.data.code === 500511) {
        wepy.showToast({
          title: '订单在行程中或已完成，不能取消',
          icon: 'none',
          duration: 2000
        })
      } else {
        wepy.showToast({
          title: response.data.message,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 取消订单
  cancelOrder (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/orderMgmt/cancelOrder', {orderId: vm.orderId}, order.dealcancelOrder, vm)
  },
  dealcancelOrder (vm, data) {
    if (vm.timer) {
      clearTimeout(vm.timer)
      clearInterval(vm.timerAjax)
    }
    wx.showModal({
      title: '提示',
      content: '取消成功',
      showCancel: false,
      confirmColor: '#ff8400',
      success (res) {
        if (res.confirm) {
          // console.log('调用取消接口')
          let url = '/pages/index'
          wepy.reLaunch({ url })
        }
      }
    })
  },
  // 司机信息
  getDriver (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/order/info/getMyCarOrderDetail/v2-2-5', {orderNo: vm.orderNo}, order.dealDriver, vm)
  },
  dealDriver (vm, data) {
    vm.driverData = data
  },
  // 获取验证码
  verifyCode (vm) {
    let parem ={
      phone: order.encrypt(vm.phone)
    }
    ajaxApi.getPostParamCallF('/api/user/login/getVerifyCode', parem, order.dealverifyCode, vm, 1)
  },
  dealverifyCode (vm, data) {
  },
  // 登陆
  login (vm) {
    let parem ={
      phone: '',
      verifyCode: '',
      pushId: '',
      pushIdGetui: '',
      pushIdXiaomi: '',
      pushIdHuawei: '',
      pushIdMycar: '',
      pushIdRonglian: '',
      cityId: '',
      cityName: '',
      longitude: '',
      latitude: '',
    }
    ajaxApi.getPostParamCallF('/api/user/login/login', parem, order.dealLogin, vm, 1)
  },
  dealLogin (vm, data) {
  }
}
export default order