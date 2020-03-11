<template>
<div class="mainHold">
  <div class="whiting">
    <div class="djs">
      <img src="/static/images/app_icon32.gif" class="w_pic">
      <span style="top:47%;">正在为您挑选司机</span>
    </div>
    <!-- <p class="zz">正在为您挑选司机</p> -->
    <p class="zz"></p>
    <view class="btn_cal" @click="orderCancel">取消订单</view>
  </div>
</div>
</template>
<script>
import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
      orderId: '',
      orderNo: '',
      timerAjax: ''
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
      uni.navigateBack()
    },
    orderCancel () {
      // 取消订单
      order.cancelOrderPrejudge(this)
    },
    orderPoll () {
      var self = this
      // 轮询订单
      order.getOrderPoll(self)
    },
    // 清空 time
    clearTime () {
      if (this.timerAjax) {
        clearInterval(this.timerAjax)
      }
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.orderNo = options.orderNo
    this.orderId = options.orderId
  },
  onUnload: function () {
    this.clearTime()
  },
  mounted () {
    var self = this
    this.clearTime()
    this.orderPoll()
    this.timerAjax = setInterval(getPoll, 5000)
    function getPoll () {
      self.orderPoll()
    }
  }
}
</script>
<style lang="css" scoped>
.mainHold{
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  flex-direction: column;
  height:100%;
	width: 100%;
}
.whiting {
  font-size: 16px;
  background-color: #fff;
  width: 90%;
  display: block;
  margin-top: 15px;
  padding-top: 15%;
  padding-bottom: 5%;
}
.whiting .djs {
  width: 60%;
  position: relative;
  overflow: hidden;
  margin: 0 auto
}
.whiting .djs .w_pic {
  width: 400rpx;
  height: 400rpx;
  display: block;
  margin: 0 auto;
}
.whiting .djs span {
  font-size: 16px;
  color: #999;
  display: block;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 40%;
}
.whiting .djs p {
  font-size: 30px;
  color: #ff8400;
  display: block;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 52%;
}
.whiting .djs p b {
  font-weight: normal
}

.whiting .djs p small {
  font-size: 32px;
  margin-left: 1%
}
.whiting .zz {
  padding-top: 5%;
  padding-bottom: 20%;
  width: 100%;
  text-align: center;
  font-size: 32px;
  color: #666
}
.whiting .btn_cal {
  display: block;
  width: 130px;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  color: #ff8400;
  border: 1px solid #ff8400;
  text-align: center
}
</style>
