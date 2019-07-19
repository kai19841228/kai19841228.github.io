const utils = {
  /*
     * 获取Token
     */
  getToken: function () {
    var tokenValue = this.getCookie('myCarWebtoken')
    return tokenValue
  },

  /*
   * 设置token
   */
  setToken: function (tokenValue) {
    utils.setCookie('myCarWebtoken', tokenValue, 1)
  },
  /*
    * 获取cookie
    */
  getCookie: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },

  /*
   * 设置cookie
   */
  setCookie: function (name, value, days) {
    var d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  /*
   * 删除cookie
   */
  deleteCookie: function (name) {
    utils.setCookie(name, '', -1)
  }

}
export default utils
