<template>
<div class="rechargeSure container">
  <div class="midd">
    <div class="pack">
      <h3>充值金额：<span>{{rechargeMoney}}元</span></h3>
      <div class="payhold">
				<!-- #ifdef MP-WEIXIN -->
				<div class="pay on">微信</div>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<div class="pay on">支付宝</div>
				<!-- #endif -->
      </div>
    </div>
  </div>
  <div class="submitHold">
    <view class="submit" @click="submitPayment">付款</view>
  </div>
</div>
</template>
<script>
	import order from '../../services/order'
export default {
  data () {
    return {
			rechargeMoney: '',
			code: '',
			state: ''
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
		submitPayment () {
			// #ifdef MP-WEIXIN
			console.log('微信调起支付的代码')
			let url = '/pages/RechargeSuc/index'
			uni.reLaunch({ url })
			// #endif
			// #ifdef MP-ALIPAY
			console.log('支付宝调起支付的代码')
			// #endif
		}
  },
  onLoad: function (options) {
    console.log(options)
		this.rechargeMoney = options.rechargeMoney
  },
  mounted () {
		var self = this
		// #ifdef MP-WEIXIN
		console.log('微信获取openId代码')
		order.getWxUserInfo().then((res)=>{
			console.log(res)
		})
		// #endif
		// #ifdef MP-ALIPAY
		console.log('支付宝获取openId代码')
		// #endif
  }
}
</script>
<style scoped>
.midd{
	width: 100%;
	/* border-top: 60px solid #f7f7f7; */
	margin-bottom: 100px;
	text-align: center;
}
.midd .pack{
	width: 90%;
	margin: 0 auto;
	font-size: 30upx;
	color: #999;
}
.midd .pack h3{
	height: 100upx;
	line-height: 100upx;
	color: #333;
	font-size: 35upx;
}
.midd .pack h3 span{
	color: #ff8400;
}
.midd .pack .payhold{
	margin-top: 30upx;
}
.midd .pack .payhold .pay{
	background: url(../../static/images/btn_checked_orange.png) no-repeat right 20px center;
	background-size: 30upx;
	padding-left: 30upx;
	font-size: 30upx;
	line-height: 80upx;
	border: 1px solid #FDCD99;
	margin-top: 25upx;
}
.midd .pack .payhold .on{
	background-image: url(../../static/images/btn_checked_orange.png);
	background-color: #FFF6EE;
}
.submitHold{
	width: 100%;
	margin: 0 auto;
	margin-top: 60upx;
}
.submitHold .submit{
	font-size: 30upx;
	text-align: center;
	height: 100upx;
	line-height: 100upx;
	background-color: #ff8400;
	color: #fff;
	display: block;
	width: 90%;
	margin: 0 auto;
	border-radius: 100upx;
}
</style>
