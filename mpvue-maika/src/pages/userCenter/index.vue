<template>
<view class="container">
  <view class="user-page">
    <view>
      <view class="user-img" @tap="_onLogin">
        <img src="/static/images/Passenger.png">
      </view>
      <view class="user" @tap="_onLogin">{{ userName || "请点击登录" }}</view>
      <view class="ul">
        <view class="li" :class="item.className" @tap="_onSelect(item)" v-for="(item, index) in list" :key='index'>{{ item.text }}</view>
      </view>
      <view class="logout" v-if="userName != ''" @tap="logout">退出登录</view>
    </view>
  </view>
</view>
</template>
<script>
// import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
      userName: mpvue.getStorageSync('token'),
      list: [{
        className: 'history',
        text: '我的行程',
        url: '../myTrip/main'
      }, {
        className: 'account',
        text: '我的钱包',
        url: '../myTrip/main'
      }, {
        className: 'terms',
        text: '用户条款',
        url: '../myTrip/main'
      }, {
        className: 'aboutus',
        text: '关于我们',
        url: '../myTrip/main'
      }]
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    backPage () {
      mpvue.navigateBack()
    },
    _onLogin () {
      console.log('去登陆')
      if (this.userName === '') {
        // let url = '/pages/login'
        // mpvue.navigateTo({ url })
      }
      mpvue.setStorageSync('token', '0b6b25453a1d10985e2a7fffaa983fbb')
      this.userName = mpvue.getStorageSync('token')
    },
    _onSelect (item, event) {
      if (this.userName === '') {
        mpvue.showModal({
          title: '提示', // 提示的标题,
          content: '登陆信息已过期，请重新登陆。', // 提示的内容,
          showCancel: false, // 是否显示取消按钮,
          confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#ff8400', // 确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              console.log('****登陆***')
              // let url = '/pages/login'
              // mpvue.navigateTo({ url })
            }
          }
        })
      } else {
        console.log('选中页面跳转', item.url)
        let url = item.url
        mpvue.navigateTo({ url })
      }
    },
    logout () {
      console.log('退出登录')
      this.userName = ''
      mpvue.setStorageSync('token', '')
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
    mpvue.setNavigationBarTitle({ title: '个人中心' })
  }
}
</script>
<style lang="postcss" scoped>
.user-page {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-top: 10rpx;
    box-sizing: border-box;
    -weblit-box-sizing: border-box;
}
.user-page .ul {
  box-sizing: border-box;
    position: relative;
    width:100%;
    height: 100%;
    background-color:#fff;
    display:block;
    margin: 30rpx auto 0;
    padding: 0 5%;
    border-top:8px solid #eee;
    padding-top: 10rpx;
}
.user-page .ul .li {
    height: 120rpx;
    line-height: 120rpx;
    background-size: 48rpx;
    padding-left: 18%;
    width: 100%;
    box-sizing: border-box;
    background-position-x: 6%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    font-size: 34rpx;
    color: #222222;
    border-bottom: 1rpx solid #e9e9e9;
}
.user-img{
  position: relative;
  width: 160rpx;
  height: 160rpx;
  margin: 0 auto;
  background-size: contain;
}
.user-img image{
  width: 100%;
  height: 100%;
}
.user{
  text-align: center;
  font-size: 38rpx;
  color: #333;
  margin-top: 10rpx;
}
.user-page .ul .li.history {
    background-image: url(data:image/png;base64,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)
}

.user-page .ul .li.account {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAAH7+Yj7AAAAAXNSR0IArs4c6QAABPZJREFUWAnNWG9IZFUUd5rR/G8m0pQZhAVKi5igFCyGiSR+EARnxGz90IdV0Qz/rIxSDgirEeJYahJUiisIJgliSsgqyaKFkEKtrqAfNCxFY1AYm9VROz/rPO7MvDe+mX2SFx733Ht/53fPPffOPeeO7vz8/HaQRzGgbTabvxT7dSKSB58SESxfrs5IXX19/c9bW1uZ3DEyMlIeZDKZaK7z2/gg45OdSDc3N9fa3d39sajuZicPyNUXlLwQOcDR0ZF+dXU1VnbukpKSz1ipoqLibkhIyJkscHh4+EMGDg4OWpaWll5UbaNqoOzUPK1Yy26OCLBYLB+lp6fvXQAxcLEnIuI/Ga7DmAQUMZ5+raqqqlW0ESw8y97eXrIsY3x8/CORtb29vVEW2Nvba2NToJCUlHQgAUUGBom1aoerBorsvmTJRICam5vf29zcfB3yyclJJGqlotPpXImJib90dHR8LWIkQl4zu1gE+ZLpiHefnp6GsJ5E6EtJHCsvL7fY7faXxT7ILS0t5tbW1hHVhEzEljDh6Ojoa+Pj47eio6MPsErFE8YKXKelpT2ATD57h/tQFxUVPbRare2Li4sFaEu7HKgPQQJd+j4HuWShXq9/jEF/y/b2dgR0oqKi/kYtWYgGCgP+bQUFxcbGPg4PD3dx+7Laa1MSEhIclyn5Gvey0BdYzZjkQzVgNRjNCSUfrq2tPdPW1nbH5XKFUjgzoPZlUVhY2F/5+fnDxcXFv4o4yYd8DsVBNTKFp4OhoaFGxkoWosPzZ8UgpXpycvKVgYGBOzabLae2tvY+cE/kQ1ryusFgcC4sLJh5UjcLuVOp7uvru0nJgImuK0X/qrYQsWp2dvaWEhnvgWoLEdMyMzO/a2ho+EFcQVlZ2ScFBQX3yP81uOJUWwiSwsLCn0QyyE6nMxb3IeTDw8Pn/SKkmNO2sbERA2UuOBmpqamzaGdlZX2resmIzk1NTZ/iYzKxRjSvrKx8oJoQUVzunH5AZXd39wZHfb+WLFqkJLsRzs/Pv6AEVOqnjTCKY9KSKQQcd3V1WekTx1XJubm5AwyULgd0UNJqoJj7NA+i9vcGlyyEMmKHP/EDOp7FzYeeg4G03ZYcCMFV62i+Yq0NvvYGuh1CrH5lZeVZiqWW4+NjtztKa88wX1xc3HpNTc1XKSkpdu4Ta68zWFpaaqNkPRwgup2/oAtznRUo/p7SnefkdiA13qPLy8vPTU9Pv0nOeBsJBXgiIyP/6Onpuev5K/UykAMXlOTuUvRrWciotygqvwvOiIiInf7+fqvI/7+fwerq6h+xzTDK4XAYp6amkkQDvc6gOBiojBjb2dn5PrICfznIg40TExOP6urqvnF71/pLpIRHIoXcB+N4WGZkZIwj08BkSjrox6LGxsbewMMJC0Pcz87Ovqe5B5HlsSF0GzRfZhhyLKRF0AkNDbVDh5MScGl+Bukt+icbCI+wrFQjAYRh+CCLOuC6kl8xUtxAzp+4CKRwyLo032JMwukcziPdeTeRzSrl46JRkJOTk+/j7wXuvxIDmRxJLMn4fBbOUwGijPqhCNb8DIrkWsheHjQajb/t7OzcADm9Vfvo8XbkayLaurCzszO9L4zaseDgYEdeXt6aiPf6kWBwZmbmJfqHyLS/v/8qNXWigtYy7sqYmJjfc3Jyvvd8vGMuWQO1NuJJ+K79Gbz2Bv4DpEon0HPB7iQAAAAASUVORK5CYII=)
}

.user-page .ul .li.terms {
    background-image: url(data:image/png;base64,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)
}.user-page .ul .li.aboutus {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA89JREFUWAntmE9I1EEUx90t6hAGnayQ8FSxYhcJOqaQ/YHMCBXx3qEQZA9eAgOhiwcTpA7dO6iEJURFkB2l8BRGRocQsTwFgodkcft8fztvG3d2f+6Wqx4c+O178+bN+37nzczvN7M1NftlPwO7m4HEv8J3dnYeSiQSLfRvz2azKfSTyJOKh76Mvoz8THUafWZycnJdbZWWiglC7Dggg4D3Any0HEB8V/F9iu8QRH+W08d8yibY19d3eGVl5R4d04AdsQCVSIiu4T9SV1f3YGxs7Hc5fcsiqKwRfApiF/yg2L5Sf87zFn1xY2NjWe3JZFLTfQr1Ek8H+mnZreA7i+1mOdnckmBPT8+5TCbzkuD1BoCc4xkA4J1nK6kywFYah3maPacl9GvE+OTZAjWWoFtvH+ll5DKMvn98fPwxMhtEizGQsUR3d/cd5ChuB52rSJ6Py2SyVEytOUhM0R6RQ//F0zYxMfGoUnLCUB/Xt02xHG49+pSwXD0QBwKLMzQ0NNxntL2uqsxdB2CmlD/ZuZpKpWYaGxvTTU1NX+bn578V88X+HZ8PtCm2ElS/traWxV40dtEMuqlNGwDk+uPIyY8N8kRgepwuc9GiWIrpNaYdpmfKqUUJ0jRI9uxVMqc1F/T8T4OLqc1W47AGi4UMCDISfSFsatVngPqWG4JXy218teiXnK6+JYuLOWAOwhS21U0Gu7irq+syI3rtHBbYYWfNuRoSvAXwovckJK8w/W98nCCDNLabAx1emF5FqRe9lTy2Gex9ZHWth1S+whfC02NV7WLbHJpi1tir2A5/G4URTXUBduQRZJCsRScStaIvRl5l/FSyi/1wPoaPbT4BQUaRJwjosjmWIe1rI1dfj+3qY/jY1ikgaA2StbW1wSby27dDL8AI3hYBQdKczxpv+BPbQSIuho8B9o9C34Agac4TRNeRqarFx/CxDTQgyCh0TLei81y1Sx6jADvCDQhinTZGjOiG6VWUHV7sPLbZAoKQ0od81Tmc4fPTas7bLRUbPPuK6N4SnGgCgnza1nHUBcfKMPVt380upk7ZURGmsK1uMiDoGobIoi44Ks06CefU2F8dFKz4utk2Sb7BdzFEVwCHNbTJwVWKEnRH8BHrwOhGCdhi9WKyktOMi/XQizPiMD1TTi05de6a+R5y0U2OUeqYfmurg2uAUGBw5J4R95iaiDvLNfRiqWtoSYLqzCLWJX1XL02xBEVyT187RVBFmWQqgos7TQvYdWbcvYu7CKrs6b8+chRzv25d7r0/j3yS0iG6I3+/FeLu1/czsNMZ+APa29B4MpAH3gAAAABJRU5ErkJggg==)
}
.user-page .logout {
    position: absolute;
    border-top:1px solid #ededed;
    width: 100%;
    bottom: 0%;
    left: 0%;
    color: #999;
    font-size: 30rpx;
    height: 50px;
    line-height: 50px;
    display: block;
    box-sizing: border-box;
    text-align: center;
}
</style>
