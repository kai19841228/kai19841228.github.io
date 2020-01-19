import ajaxApi from '../utils/fly'
var CryptoJS = require('crypto-js')
const order = {
	// 加密
	encrypt (data) {
		const secretKey = 'MyCar@PP'
		var afterEncrypt = CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		}).toString()
		return afterEncrypt
	},
	// 城市列表
	getCityList (vm) {
		ajaxApi.getPostParamCallF('/api/mycar/user/city/getCityList', {cityName: vm.searchCityText}, order.dealCityList, vm)
	},
	dealCityList (vm, data) {
		console.log(data)
		vm.openCityList = data
	},
  // 定位当前城市
  getCurrentCity (vm, data) {
    ajaxApi.getPostParam('/api/mycar/user/city/getCurrentCityServiceTypeByIp', data, vm).then(function (response) {
			if (response && response.data && response.data.data && response.data.data.token) {
			  uni.setStorageSync('token', response.data.data.token)
			}
			order.dealCurrentCity(vm, response)
		})
  },
  dealCurrentCity (vm, response) {
		if (response.data.code === 0) {
			vm.$store.dispatch('setCurrentCity', response.data.data.cityInfoVO)
			if (vm.$store.state.cityUp.status === 0) {
				vm.$store.dispatch('setUpCity', response.data.data.cityInfoVO)
				vm.$store.dispatch('setDownCity', response.data.data.cityInfoVO)
			}
		} else if (response.data.code === 500801) {
			uni.showModal({
				title: '提示',
				content: response.data.message,
				showCancel: false,
				confirmColor: '#ff8400',
				success (res) {
					if (res.confirm) {
						console.log('用户点击确定 选择城市列表')
						const url = '/pages/citySelect/index?city=up'
						uni.navigateTo({ url })
					}
				}
			})
		} else {
			uni.showToast({
				title: response.data.message,
				icon: 'none',
				duration: 2000
			})
		}
  },
  // 检查上车地址是否开通
  getCurrentCityServiceType (vm) {
    ajaxApi.getPostParamCallF('/api/mycar/user/city/getCurrentCityServiceType/v2-0-0', {regionNumber: vm.$store.state.cityUp.regionNumber}, order.dealUpCity, vm)
  },
  dealUpCity (vm, data) {
    var boo = false
    for (let item of data.serviceTypeVOList) {
      if (item.serviceTypeCode === 'JSYC') {
        boo = true
      }
    }
    if (!boo) {
      uni.showModal({
        title: '提示',
        content: '当前城市未开通服务',
        showCancel: false,
        confirmColor: '#ff8400',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定 选择城市列表')
            const url = '../citySelect/main?city=up'
            uni.navigateTo({ url })
          }
        }
      })
    }
  },
  // 费用预估
  getOrderCollect (vm) {
    let param = {
      cityId: vm.$store.state.cityUp.cityId, // 城市id
      orderType: 1, // 订单类型 1普通用户2企业用户
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      startPoint: vm.$store.state.upAdress.location.lng + ',' + vm.$store.state.upAdress.location.lat, // 起点坐标 经度,纬度
      endPoint: vm.$store.state.downAdress.location.lng + ',' + vm.$store.state.downAdress.location.lat, // 终点坐标 经度,纬度
			bookingEndAddr: vm.$store.state.downAdress.name, // 下车短地址
			bookingEndCityRegionCode: vm.$store.state.cityDown.regionNumber || '', // 下车地址所在城市编码
			riderPhone: vm.$store.state.riderPhone || '', // 乘车人手机号
			userPhone: vm.$store.state.userPhone || '', // 预订人手机号
			companyId: '0' // 公司ID 企业订单传入
    }
    ajaxApi.getPostParamCallF('/api/mycar/user/orderCollect/estimateCost/v2-2-5', param, order.dealOrderCollect, vm)
	},
	dealOrderCollect (vm, data) {
		vm.predict = data.estimateCostVOList[0]
		vm.$store.dispatch('setPredict', data.estimateCostVOList[0])
	},
  // 下单
  getPlaceOrder (vm) {
    let param = {
      userPhone: vm.$store.state.userPhone, // 预订人手机号
      riderPhone: vm.$store.state.riderPhone || vm.$store.state.userPhone, // 乘车人手机号
      riderName: vm.$store.state.riderName, // 乘车人 姓名
      bookingStartAddr: vm.$store.state.upAdress.address, // 预定上车地址
      bookingStartAddrShort: vm.$store.state.upAdress.name, // 预定上车短地址
      bookingStartPoint: order.encrypt(vm.$store.state.upAdress.location.lng + ',' + vm.$store.state.upAdress.location.lat), // 预定上车坐标点
      bookingEndAddr: vm.$store.state.downAdress.address, // 预定下车地址
      bookingEndAddrShort: vm.$store.state.downAdress.name, // 预定下车短地址
      bookingEndPoint: order.encrypt(vm.$store.state.downAdress.location.lng + ',' + vm.$store.state.upAdress.location.lat), // 预定下车坐标点
      serviceType: 1, // 服务类型 1即时2预约
      bookingDate: Math.ceil(new Date().getTime() / 1000), // 出发时间 时间戳
      groupId: vm.$store.state.predict.groupId, // 车组id 经济型豪华型等
      debtAmount: vm.$store.state.predict.debtAmount, // 折扣金额
      cityId: vm.$store.state.cityUp.cityId, // 城市id
      payFlag: vm.$store.state.payFlag, // 支付人标记 1:预订人 | 2:乘车人
      estimatedAmount: vm.$store.state.predict.totalAmount, // 预估费用
      estimatedMileage: vm.$store.state.predict.totalMileage / 1000, // 预估里程
      estimatedMinutes: vm.$store.state.predict.totalTime, // 预估时长
      currentAddr: vm.$store.state.upAdress.address, // 预定上车地址
      currentAddrShort: vm.$store.state.upAdress.name, // 预定上车短地址
      currentPoint: order.encrypt(vm.$store.state.upAdress.location.lng + ',' + vm.$store.state.upAdress.location.lat) // 预定上车坐标点
    }
    ajaxApi.getPostParam('/api/mycar/user/order/placeOrderInfoInH5', param, vm).then(function (response) {
			if (response && response.data && response.data.data && response.data.data.token) {
			  uni.setStorageSync('token', response.data.data.token)
			}
      order.dealPlaceOrder(vm, response)
    })
  },
  dealPlaceOrder (vm, data) {
		if (data && data.data && data.data.data && data.data.data.token) {
			uni.setStorageSync('token', data.data.data.token)
		}
		if (data.data.code === 0) {
			console.log('跳转派单轮询页面')
			const url = '/pages/orderPolling/index?orderId=' + data.data.data.orderId + '&' + 'orderNo=' + data.data.data.orderNo
			console.log(url)
			uni.reLaunch({ url })
		} else if (data.data.code === 500330) {
			wx.showModal({
				title: '提示',
				content: data.data.message,
				showCancel: false,
				confirmColor: '#ff8400',
				success (res) {
					if (res.confirm) {
						console.log('用户点击确定 去充值页面')
						let url = '/pages/Recharge/index'
						uni.navigateTo({ url })
					}
				}
			})
		} else if (data.data.code === 500332) {
			uni.showToast({
				title: '您有一笔未支付订单，支付完成后才可继续用车！请前往app支付。',
				icon: 'none',
				duration: 2000
			})
		} else {
			uni.showToast({
				title: data.data.message,
				icon: 'none',
				duration: 2000
			})
		}
	},
  // 获取openid http://www.yiyongtong.com/archives/view-4293-1.html
	// http://www.luyixian.cn/javascript_show_168514.aspx
  getWxUserInfo () {
    return new Promise((resolve, reject) => {
      uni.getProvider({
        service: "oauth",
        success: res => {
          // console.log(res)
          const provider = res.provider[0]
          uni.login({
            provider,
            success: loginRes => {
              // console.log(loginRes)
              const code = loginRes.code
              const appid = 'wx89661ebf2c5429c6' // 小程序AppID
              const secret = 'ae40f83b7d0923185a42c678b9690836' // 小程序密钥AppSecret
              const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
              uni.request({
                url,
                success: dataRes => {
                  // console.log(dataRes)
                  uni.getUserInfo({
                    provider,
                    withCredentials: true,
                    success: infoRes => {
                      // console.log(infoRes)
                      // 返回openId、用户信息、服务商等
                      resolve({...dataRes.data, ...infoRes.userInfo, provider})
                    }
                  })
                }
              })
            },
          })
        }
      })
    })
  },
  // 查看支付结果 发起支付页面把支付类型和outTradeNo返回,跳转结果页带过来
  payBack (vm) {
    ajaxApi.getPostParamCallF('/pay/result/wap', {payType: vm.payType, outTradeNo: vm.outTradeNo}, order.dealPayBack, vm)
  },
  dealPayBack (vm, data) {
    uni.hideLoading()
    vm.successPage = false
    vm.errorPage = false
    vm.loadingPage = false
    clearInterval(vm.timer)
    if (data.resultCode === 'SUCCESS') {
      vm.successPage = true
    } else if (data.resultCode === 'FAIL') {
      vm.errorPage = true
    } else if (data.resultCode === 'PAYING') {
      vm.loadingPage = true
    }
  }
}
export default order