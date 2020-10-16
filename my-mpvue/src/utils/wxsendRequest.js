export default {
  ajax (options) {
    var randomSum = function (min, max) {
      return min + Math.round(Math.random() * (max - min))
    }
    var rtime = randomSum(0, 100000)
    console.log('[' + rtime + ']服务请求地址：', options.url)
    var cookies = []
    cookies.push('appVersion=1.3.0')
    var myCarWebUserName = mpvue.getStorageSync('myCarWebUserName')
    if (myCarWebUserName) {
      cookies.push('myCarWebUserName=' + myCarWebUserName)
    }
    var mytoken = mpvue.getStorageSync('myCarWebtoken')
    if (mytoken) {
      cookies.push('myCarWebtoken=' + mytoken)
    }
    var _options = {
      url: options.url || '',
      method: options.type || 'GET',
      dataType: options.dataType || 'json',
      data: options.data || {},
      contentType: options.contentType || ''
    }
    if (typeof options.error === 'function') {
      _options.fail = options.error
    }
    if (typeof options.success === 'function') {
      _options.success = options.success
    }
    let _wxOption = {
      url: _options.url,
      method: _options.method,
      data: _options.data,
      dataType: _options.dataType,
      // 数据格式的转换也在这进行处理
      success: function (res) {
        console.log('res', res)
        if (res.statusCode === 200) {
          console.log('[' + rtime + ']服务返回数据：', res.data)
          typeof _options.success === 'function' && _options.success.call(this, res.data)
        } else {
          res.data = {
            code: -100200,
            message: 'the statusCode is ' + res.statusCode + ' for wx.request'
          }
          console.log('[' + rtime + ']服务返回数据：', res.data)
          typeof _options.success === 'function' && _options.success.call(this, res.data)
        }
      },
      fail: function (err) {
        console.log('err', err)
        var retData = {
          code: -100201,
          message: '请求失败',
          err: err
        }
        console.log('[' + rtime + ']服务返回数据：', retData)
        typeof _options.error === 'function' && _options.error.call(this, retData)
      }
    }
    var _header = {
      'cookie': cookies.join(';')
    }
    // post方式只有配置application/x-www-form-urlencoded，上传参数的类型才是form Data
    if (_wxOption.method === 'POST') {
      if (_options.contentType === '') {
        _header['content-type'] = 'application/x-www-form-urlencoded' // 默认值form Data
      } else {
        _header['content-type'] = 'application/json' // 上传参数的类型request payload
      }
      var token = mpvue.getStorageSync('myCarWebtoken')
      if (token) {
        _header['token'] = token
      }
      console.log('[' + rtime + ']服务请求的header：', _header)
    }
    _wxOption.header = _header
    console.log('[' + rtime + ']服务请求入参：', _wxOption.data)
    mpvue.request(_wxOption)
  }
}
