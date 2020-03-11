const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
const axiosConfig = {
  getPostParam: function (url, param, vm, baseURL) {
		console.log(vm.$baseUrl)
    if (baseURL === 1) {
      fly.config.baseURL = vm.$baseUrl
    } else if (baseURL === 2) {
      fly.config.baseURL = vm.$baseUrl
    } else {
      fly.config.baseURL = vm.$baseUrl
    }
    return fly.post(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': uni.getStorageSync('token')
      }})
  },
  getPostParamCallF: function (url, param, callFunc, vm, baseURL) {
    if (baseURL === 1) {
      fly.config.baseURL = vm.$baseUrl
    } else if (baseURL === 2) {
      fly.config.baseURL = vm.$baseUrl
    } else {
      fly.config.baseURL = vm.$baseUrl
    }
    fly.post(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': uni.getStorageSync('token')
      }}).then(function (response) {
        // console.log(response)
        if (response && response.data && response.data.data && response.data.data.token) {
          uni.setStorageSync('token', response.data.data.token)
        }
        if (response.data.code === 0) {
          callFunc(vm, response.data.data)
        } else {
          uni.showToast({
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
  getParamCallF: function (url, param, callFunc, vm, baseURL) {
    if (baseURL === 1) {
      fly.config.baseURL = vm.$baseUrl
    } else if (baseURL === 2) {
      fly.config.baseURL = vm.$baseUrl
    } else {
      fly.config.baseURL = vm.$baseUrl
    }
    fly.get(url, param, {headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'app-version': '2.2.5',
        'app-channel-num': 'CH_GD_H5',
        'token': uni.getStorageSync('token')
      }}).then(function (response) {
        // console.log(response)
        if (response && response.data && response.data.data && response.data.data.token) {
          uni.setStorageSync('token', response.data.data.token)
        }
        if (response.data.code === 0) {
          callFunc(vm, response.data.data)
        } else {
          uni.showToast({
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
