<template>
  <div @click="clickHandle">
    <form @submit="formSubmit" @reset="formReset">
      <view class="section">
        <view class="section__title">用户名</view>
        <input v-model="userName" name="input" placeholder="please input here" />
      </view>
      <view class="section">
        <view class="section__title">密码</view>
        <input v-model="password" password="true" name="input" placeholder="please input here" />
      </view>
      <view class="btn-area">
        <button form-type="submit">Submit</button>
        <button form-type="reset">Reset</button>
      </view>
    </form>
    <p>Vuex counter：{{ count }}</p>
    <button @click="orderHandle">orderData</button>
    <button @click="chooseImage">调用相册</button>
    <view class="question-images">
      <div v-for="(item, index) in images" :key="index">
        <view class="q-image-wrap">
          <!-- 图片缩略图  -->
          <!-- <image class="q-image" :src="item" mode="aspectFit" @tap="handleImagePreview(index)"></image> -->
          <img class="q-image" :src="item" mode="aspectFit" @tap="handleImagePreview(index)">
          <!-- 移除图片的按钮  -->
          <view class="q-image-remover" @tap="removeImage(index)">删除</view>
        </view>
      </div>
    </view>
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
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
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
    },
    chooseImage: function () { // 调用相册
      // https://www.jianshu.com/p/c1e0574ee63d 调用相册参考
      let self = this
      mpvue.chooseImage({
        sizeType: ['original', 'compressed'], // 可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], // 可选择性开放访问相册、相机
        success: res => {
          const images = self.images.concat(res.tempFilePaths)
          // 限制最多只能留下3张照片
          self.images = images.length <= 3 ? images : images.slice(0, 3)
          mpvue.uploadFile({
            url: 'http://localhost:8080/upload/fileUpload', // 仅为示例，非真实的接口地址
            filePath: self.images[0],
            name: 'file',
            header: {
              'Content-Type': 'multipart/form-data'
            },
            formData: {
              'user': 'test'
            },
            success: function (res) {
              var data = res.data
              console.log(data)
              // do something
            }
          })
        }
      })
    },
    removeImage (e) { // 删除图片
      const idx = e
      this.images.splice(idx, 1)
    },
    handleImagePreview (e) { // 预览当前选中图片
      const idx = e
      const images = this.images
      mpvue.previewImage({
        current: images[idx], // 当前预览的图片
        urls: images // 所有要预览的图片
      })
    }
  },
  onLoad () {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    mpvue.getSetting({
      success (res) {
        if (!res.authSetting['scope.record']) {
          mpvue.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // mpvue.startRecord()
            }
          })
        }
      }
    })
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
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
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
