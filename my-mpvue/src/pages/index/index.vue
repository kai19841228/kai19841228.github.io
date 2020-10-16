<template>
  <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <a href="/pages/from/main" class="counter">from表单</a>
    <a href="/pages/wxParse/main" class="counter">html文本转小程序+Fly.js异步</a>
    <a href="/pages/scrollView/main" class="counter">去往下拉刷新、上拉加载更多示例页面</a>
    <a href="/pages/map/main" class="counter">去往Map示例页面</a>
    <a href="/pages/login/main" class="counter">去往异步示例和调用相册</a>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <a @click="toPath" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import order from '@/services/order'
import store from '@/store/store'
// const { ajax } = require('@/utils/wxsendRequest').default

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      images: [],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      userName: '',
      password: ''
    }
  },

  components: {
    card
  },
  computed: {
    count () {
      return store.state.demo.count
    }
  },

  methods: {
    orderHandle () {
      var data = {
        orderDateStart: '2019-5-29 00:00:00',
        orderDateEnd: '2019-6-5 23:59:59',
        pageSize: 20,
        pageNum: 1
      }
      order.getOrderData(this, data)
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    toPath () {
      mpvue.navigateTo({
        url: '../counter/main?id=10'
      })
    },
    formSubmit: function (e) {
      console.log('form发生了submit事件')
      let data = {
        userName: this.userName,
        password: this.password
      }
      order.login(this, data)
    },
    formReset: function () {
      console.log('form发生了reset事件')
    }
  },
  onLoad () {
  },
  mounted () {
    // let app = getApp()
    // 在页面上边引入wxsendRequest，在页面里调用。
    // const { ajax } = require('@/utils/wxsendRequest').default
    // ajax({
    //   url: 'http://test.manage.imycargo.com/api' + '/web/coupons/activity/op/update/v2-0-0',
    //   type: 'POST',
    //   contentType: '789',
    //   data: {
    //     activityCode: 'LXHD',
    //     activityContents: '拉新',
    //     activityId: 7,
    //     activityName: '拉新',
    //     couponsExpiryDate: '2019-05-26 00:00:00',
    //     couponsStartValidity: '2019-05-01 00:00:00',
    //     donateAmount: 1,
    //     donateLimit: 1,
    //     endDate: '2019-07-31 00:00:00',
    //     memo: '',
    //     rechargeAmount: 1,
    //     startDate: '2019-05-01 00:00:00',
    //     status: 1,
    //     userParticipateTimes: 1
    //   },
    //   success: function (ret) {
    //     if (ret.code === 0) {
    //       console.log('数据返回成功')
    //     } else {
    //       console.log('err')
    //     }
    //   }
    // })
  }
}
</script>

<style lang="postcss" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 13rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 10px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
