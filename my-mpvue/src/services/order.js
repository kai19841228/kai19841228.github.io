const { ajax } = require('@/utils/wxsendRequest').default
// vm.$baseUrl 在入口文件main里配置的全局

const orderData = {
  status: {
    0: '验证码已发送到您的手机，请注意查看',
    104: '用户不存在或密码错误',
    1: '服务器异常，请稍后重试',
    105: '请输入正确的验证码',
    108: '验证码已过期，请重新获取',
    114: '手机号格式错误，请重新输入',
    117: '您的账户异常',
    185: '获取验证码次数过多，请稍后重试',
    136: '您的账户异常',
    186: '短信下发操作太频繁请稍候再试！', // 校验距离上次发送验证码时间，如未失效则不发送
    203: '当日短信获取次数据已达上限'
  },
  getOrderData (vm, data) {
    let callback = orderData.dealOrderData
    ajax({
      url: vm.$baseUrl + '/web/order/orderInfo/getList/v2-0-0',
      type: 'POST',
      contentType: '', // contentType为空是form Data，不为空是request payload方式传递参数。
      data: data,
      success: function (ret) {
        typeof callback === 'function' && callback(vm, ret)
      },
      error: function (ret) {
        typeof callback === 'function' && callback(vm, ret)
      }
    })
  },
  dealOrderData (vm, ret) {
    if (ret.code === 0) {
      // 前端根据返回code码，来对应提示信息
      let msg = orderData.status[ret.code] ? orderData.status[ret.code] : '请稍后再试'
      mpvue.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      mpvue.showToast({
        title: ret.message,
        icon: 'none',
        duration: 2000
      })
    }
  },
  login (vm, data) {
    let callback = orderData.dealLogin
    ajax({
      url: vm.$baseUrl + '/car-web/account/login',
      type: 'POST',
      contentType: '', // contentType为空是form Data，不为空是request payload方式传递参数。
      data: data,
      success: function (ret) {
        typeof callback === 'function' && callback(vm, ret)
      },
      error: function (ret) {
        typeof callback === 'function' && callback(vm, ret)
      }
    })
  },
  dealLogin (vm, ret) {
    if (ret.code === 0) {
      // console.log(ret.data.token)
      mpvue.setStorage({
        key: 'myCarWebtoken',
        data: ret.data.token
      })
      mpvue.setStorage({
        key: 'myCarWebUserName',
        data: vm.userName
      })
      vm.userName = ''
      vm.password = ''
    } else {
      mpvue.showToast({
        title: ret.message,
        icon: 'none',
        duration: 2000
      })
    }
  }
}

export default orderData
