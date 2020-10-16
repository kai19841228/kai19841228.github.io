<script>
import Vue from 'vue'
export default {
  mounted () {
    // 根据query所带参数来调用不容环境的接口。
    var opations = mpvue.getLaunchOptionsSync()
    if (opations.query.env === 'test') {
      Vue.prototype.$baseUrl = 'http://test.manage.imycargo.com/api'
    } else if (opations.query.env === 'pre') {
      Vue.prototype.$baseUrl = 'http://pre.manage.imycargo.com/api'
    } else {
      Vue.prototype.$baseUrl = 'https://manage.imycargo.com/api'
    }
    console.log(this.$baseUrl)
  },
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  },
  onLaunch (opts) {
    console.log('App Launch', opts)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('小程序触发的 onshow')
  },
  onHide () {
    console.log('App Hide')
    console.log(this.$store.state)
    let store = JSON.stringify(this.$store.state)
    mpvue.setStorageSync('store', store)
    console.log(mpvue.getStorageSync('store'))
    console.log(JSON.parse(mpvue.getStorageSync('store')))
  }
}
</script>

<style>
@import "../static/weui.wxss";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
