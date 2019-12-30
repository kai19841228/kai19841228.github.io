<template>
	<view class="container">
		<TopMenu :menus="menus" :isActive="isActive" @isActiveChange="activeChange"></TopMenu>
		<SelectTimerNow v-if="showComponent('SelectTimerNow')"></SelectTimerNow>
	</view>
</template>

<script>
	import TopMenu from '../../components/topMenu.vue'
	import SelectTimerNow from '../../components/SelectTimerNow.vue'
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
				isActive: this.$store.state.serviceType,
			}
		},
		components: {
			TopMenu,
			SelectTimerNow
		},
		methods: {
			activeChange (e) {
				this.isActive = e.data
			},
			// 根据服务类型 看那些组件显示，那些隐藏。
			showComponent: function (componentName) {
				let serviceType = this.$store.state.serviceType
				let willShow = false
				let componentsShowInMain = {
					// 即时
					'JSYC': ['TopMenu', 'getoffaddress', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 预约
					'YYYC': ['SelectTimerNow', 'getonaddress', 'getoffaddress', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 接机
					'JJYC': ['choseflight', 'SelectTimerNow', 'selecttimedif', 'termbuilding', 'getoffaddress', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 送机
					'SJYC': ['SelectTimerNow', 'getonaddress', 'termbuilding', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice'],
					// 出租车
					'CZC': ['SelectTimerNow', 'getonaddress', 'termbuilding', 'cartype', 'RiderAndPayTypeInfo', 'calculateprice']
				}
				componentName = (componentName || '').toLowerCase()
				willShow = !!componentsShowInMain[serviceType].find(item => item.toLowerCase() === componentName)
				return willShow
			}
		},
		onLoad() {
			uni.$off('activeChange', this.activeChange)
			uni.$on('activeChange', this.activeChange)
		},
		// 监听页面显示
		onShow() {},
		// 页面初次渲染完成
		onReady() {},
		// 监听页面隐藏
		onHide() {},
		// 监听页面卸载
		onUnload() {
			uni.$off('activeChange', this.activeChange)
		}
	}
</script>

<style>
.container {
  height: 100vh;
	width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>
