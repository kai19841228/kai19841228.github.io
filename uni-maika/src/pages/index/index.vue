<template>
	<view class="container">
		<TopMenu :menus="menus" :isActive="isActive" @isActiveChange="activeChange"></TopMenu>
		<scroll-view scroll-y='true' enable-flex="true" :scroll-top="scrollTop" @scroll="scroll" class="orderPlace">
			<mainBody class="mainBody"></mainBody>
			<div class="submitHold"><view id="wld" class="submit" @click="submitHandle">呼叫约车</view></div>
			<div class="submitHold"><view class="submit" @click="pai(1)">派单</view></div>
			<div class="submitHold"><view class="submit" @click="pai(2)">派单成功</view></div>
			<div class="submitHold"><view class="submit" @click="pai(3)">充值页面</view></div>
			<div class="submitHold"><button class="submit" open-type="share">页面内button分享</button></div>
			<div class="submitHold"><button class="submit" @opensetting="openSetting" open-type="openSetting">打开授权设置页</button></div>
			<div class="submitHold"><button class="submit"  @getphonenumber="getPhoneNumber" open-type="getPhoneNumber">获取微信绑定手机号</button></div>
		</scroll-view>
		<!-- <view class="title">{{refresh.orderStatusFilter(60)}}</view> -->
	</view>
</template>

<!-- 引入wxs，和使用。 -->
<!-- <script src="../../utils/uni-refresh.wxs" module="refresh" lang="wxs"></script> -->
<script>
	import TopMenu from '../../components/topMenu.vue'
	import mainBody from '../../components/mainBody.vue'
	import order from '../../services/order'
	import utils from '../../utils/utils'
	export default {
		data() {
			return {
				menus: [
					{serviceTypeCode: 'JSYC', serviceTypeName: '即时', serviceFlag: 1, sort: '1'},
					{serviceTypeCode: 'YYYC', serviceTypeName: '预约', serviceFlag: 1, sort: '2'},
					{serviceTypeCode: 'JJYC', serviceTypeName: '接机', serviceFlag: 1, sort: '3'},
					{serviceTypeCode: 'SJYC', serviceTypeName: '送机', serviceFlag: 1, sort: '4'},
					{serviceTypeCode: 'CZC', serviceTypeName: '出租车', serviceFlag: 1, sort: '5'}
				],
				scrollTop: 0,
				old: {
						scrollTop: 0
				}
			}
		},
		components: {
			TopMenu,
			mainBody
		},
		methods: {
			// 在打开授权设置页并关闭后回调
			openSetting (e) {
				console.log(e)
			},
			getPhoneNumber (e) {
				// 针对企业小程序开发者 微信文档https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html
				// https://www.cnblogs.com/dreamstartplace/p/10517356.html  getPhoneNumber:ok getPhoneNumber:user deny
				console.log(e)
			},
			scroll (e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			activeChange () {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
						this.scrollTop = 0
				})
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
					const url = '/pages/orderPolling/index'
					uni.navigateTo({ url })
				} else if (item === 2) {
					const url = '/pages/orderSuc/index'
					uni.navigateTo({ url })
				} else if (item === 3) {
					const url = '/pages/Recharge/index?city=up'
					uni.navigateTo({ url })
				}
			}
		},
		onLoad() {
			uni.$off('activeChange', this.activeChange)
			uni.$on('activeChange', this.activeChange)
			// uni.hideShareMenu() // 隐藏右上角分享按钮
			// 提前向用户发起授权请求，然后在执行后续操作
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
						uni.getLocation({
							type: 'gcj02',
							success: function (res) {
							}
						})
			    },
					fail () {
						console.log('授权失败')
						// 授权列表，布尔值。在手机上查看
					}
			})
			// 获取授权列表，若果授权了用户信息，获取用户信息
			uni.getSetting({
				success: res => {
					console.log(res)
					if (res.authSetting['scope.userInfo']) {
						// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
						wx.getUserInfo({
							success: res => {
							}
						})
					}
				}
			})
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
			uni.$off('activeChange', this.activeChange)
		},
		onShareAppMessage: function (res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log('触发转发的是：', res.target ,res.from)
			} else {
				// 来自页面右上角转发按钮
				console.log('触发转发的是：', res.target ,res.from)
			}
			return {
				title: '麦卡出行',
				path: '/pages/index/index',
				imageUrl:'../../static/images/home_share.jpg',
				success: function (res) {
					// 转发成功
					console.log('分享成功', res)
					var shareTickets = res.shareTickets;
					if (shareTickets.length == 0) {
						return false;
					}
					wx.getShareInfo({
						shareTicket: shareTickets[0],
						success: function(res){
							var encryptedData = res.encryptedData;
							var iv = res.iv;
							console.log(encryptedData, iv)
						}
					})
				},
				fail: function (res) {
					// 转发失败
					console.log('转发失败', res)
				}
			}
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
</style>
