import wepy from 'wepy'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
const axiosConfig = {
  getPostParam: function (url, param, vm, baseURL) {
    if (baseURL) {
      fly.config.baseURL = vm.$parent.globalData.userURL
    } else {
      fly.config.baseURL = vm.$parent.globalData.baseURL
    }
    return fly.post(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': wepy.getStorageSync('token')
      }})
  },
  getPostParamCallF: function (url, param, callFunc, vm, baseURL) {
    if (baseURL) {
      fly.config.baseURL = vm.$parent.globalData.userURL
    } else {
      fly.config.baseURL = vm.$parent.globalData.baseURL
    }
    fly.post(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': wepy.getStorageSync('token')
      }}).then(function (response) {
        // console.log(response)
        if (response && response.data && response.data.data && response.data.data.token) {
          wepy.setStorageSync('token', response.data.data.token)
        }
        if (response.data.code === 0) {
          callFunc(vm, response.data.data)
        } else {
          wepy.showToast({
            title: response.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getParamCallF: function (url, param, callFunc, vm) {
    fly.config.baseURL = vm.$parent.globalData.baseURL
    fly.get(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': wepy.getStorageSync('token')
      }}).then(function (response) {
        // console.log(response)
        if (response && response.data && response.data.data && response.data.data.token) {
          wepy.setStorageSync('token', response.data.data.token)
        }
        if (response.data.code === 0) {
          callFunc(vm, response.data.data)
        } else {
          wepy.showToast({
            title: response.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
export default axiosConfig
