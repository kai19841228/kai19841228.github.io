<template>
	<view class="container">
		<scroll-view scroll-y='true' enable-flex="true" :scroll-top="scrollTop" @scroll="scroll" class="orderPlace">
			<mainBody class="mainBody"></mainBody>
			<view class="submitHold"><view id="wld" class="submit" @click="submitHandle">呼叫约车</view></view>
			<div class="submitHold"><view class="submit" @click="pai(1)">派单</view></div>
			<div class="submitHold"><view class="submit" @click="pai(2)">派单成功</view></div>
			<div class="submitHold"><view class="submit" @click="pai(3)">充值页面</view></div>
		</scroll-view>
		<!-- <view class="title">{{refresh.orderStatusFilter(60)}}</view> -->
		<view class="Agreement" @click="toPath('/pages/agreement/index')">
			协议
		</view>
	</view>
</template>

<!-- 引入wxs，和使用。 -->
<!-- <script src="../../utils/uni-refresh.wxs" module="refresh" lang="wxs"></script> -->
<script>
	import mainBody from '../../components/mainBody.vue'
	import order from '../../services/order'
	import utils from '../../utils/utils'
	export default {
		data() {
			return {
				scrollTop: 0,
				old: {
						scrollTop: 0
				}
			}
		},
		components: {
			mainBody
		},
		methods: {
			scroll (e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			submitHandle () {
				console.log(this.$store.state.switchStatu)
				// 检查手机号
				if (!utils.checkPhone(this.$store.state.userPhone)) {
					uni.showToast({
					  title: '请正确填写预订人手机号',
					  icon: 'none',
					  duration: 2000
					})
					return false
				}
				// 带人叫车 检查乘车人手机号
				if (this.$store.state.switchStatu) {
					if (!utils.checkPhone(this.$store.state.riderPhone)) {
						uni.showToast({
						  title: '请正确填写乘车人手机号',
						  icon: 'none',
						  duration: 2000
						})
						return false
					}
				}
				// 检查上车地址
				if (!this.$store.state.upAdress.location) {
					uni.showToast({
					  title: '请选择上车地址',
					  icon: 'none',
					  duration: 2000
					})
					return false
				}
				// 检查下车地址
				if (!this.$store.state.downAdress.location) {
					uni.showToast({
					  title: '请选择下车地址',
					  icon: 'none',
					  duration: 2000
					})
					return false
				}
				// 符合条件调用下单接口
				order.getPlaceOrder(this)
			},
			pai (item) {
				if (item === 1) {
					const url = '/pages/orderPolling/index?orderId=22925&orderNo=P1574415401785373'
					uni.navigateTo({ url })
				} else if (item === 2) {
					const url = '/pages/orderSuc/index?orderId=22925&orderNo=P1574415401785373'
					uni.navigateTo({ url })
				} else if (item === 3) {
					const url = '/pages/Recharge/index'
					uni.navigateTo({ url })
				}
			},
			toPath (val) {
				const url = val
				uni.navigateTo({ url })
			}
		},
		onLoad() {
		},
		// 监听页面显示
		onShow() {
			console.log(this.$store)
			// 进入主页 看上车地址有没有城市名称 没有调用定位当前城市信息和服务类型
			// 城市名称有值 检查上车城市开通服务了没有
			if (!this.$store.state.cityUp.cityName) {
				order.getCurrentCity(this, {})
			} else {
				order.getCurrentCityServiceType(this)
			}
			// 上下车地址都有值，调用费用预估
			if (this.$store.state.upAdress.name && this.$store.state.downAdress.name) {
				uni.$emit('getOrderCollect', {})
			}
		},
		// 页面初次渲染完成
		onReady() {},
		// 监听页面隐藏
		onHide() {},
		// 监听页面卸载
		onUnload() {
		}
	}
</script>

<style scoped>
.submitHold{
  width: 95%;margin: 10px auto;
  margin-top: 10px;
}
.submitHold .submit {
	display: block;
	height: 38px;
	background: #ff8400;
	border: 1px solid #ff8400;
	border-radius: 5px;
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: 600;
	color: #fff;
	line-height: 38px;
	text-align: center;
	box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
	-webkit-box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
}
.orderPlace{
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto;
}
.mainBody{
	width: 100%;
}
.Agreement{
	border-radius: 30px;
	box-sizing: border-box;
	background-color: #808080;
	color: #FFF6EE;
	font-size: 12px;
	text-align: center;
	line-height: 40px;
	width: 40px;
	height: 40px;
	position: fixed;
	bottom: 15px;
	right: 15px;
}
</style>
