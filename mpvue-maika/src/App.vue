<script>
import Vue from 'vue'
import store from '@/store/store'
export default {
  mounted () {
    // 根据query所带参数来调用不容环境的接口。
    var opations = mpvue.getLaunchOptionsSync()
    if (opations.query.env === 'dev') {
      Vue.prototype.$baseUrl = 'http://dev.cebbank.m.imycargo.com'
    } else if (opations.query.env === 'test') {
      Vue.prototype.$baseUrl = 'http://test.m.imycargo.com'
    } else if (opations.query.env === 'pre') {
      Vue.prototype.$baseUrl = 'http://test.m.imycargo.com'
    } else {
      Vue.prototype.$baseUrl = 'http://m.imycargo.com'
    }
    console.log(this.$baseUrl)
  },
  created () {
  },
  onLaunch (opts) {
    console.log('App Launch', opts)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('App show')
    store.dispatch('setState', mpvue.getStorageSync('order'))
  },
  onHide () {
    console.log('App Hide')
    mpvue.setStorageSync('order', store.state.order)
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
page{
  background-color: #f5f5f5;
}
</style>
