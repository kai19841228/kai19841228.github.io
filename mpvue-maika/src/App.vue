<script>
import Vue from 'vue'
export default {
  mounted () {
    // 根据query所带参数来调用不容环境的接口。
    var opations = mpvue.getLaunchOptionsSync()
    if (opations.query.env === 'dev') {
      Vue.prototype.$baseUrl = 'http://dev.cebbank.m.imycargo.com/api'
    } else if (opations.query.env === 'test') {
      Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com/api'
    } else if (opations.query.env === 'pre') {
      Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com/api'
    } else {
      Vue.prototype.$baseUrl = 'http://m.imycargo.com/api'
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
  },
  onHide () {
    console.log('App Hide')
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
