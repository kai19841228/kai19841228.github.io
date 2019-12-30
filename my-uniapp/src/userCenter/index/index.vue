<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
		<view class="data">
			<text>{{val}}</text>
		</view>
		<button type="primary" @click="comunicationOff">结束监听</button>
	</view>
</template>
<script>
	import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	export default {
		data() {
			return {
				val: 'Helloworld',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742
					// iconPath: '../../../static/location.png'
				}]
			}
		},
		components:{
		},
		// 监听页面加载
		onLoad(options) {
			setInterval(()=>{
				uni.$emit('add', {
					data: 2
				})
			},1000)
			uni.$on('add', this.add)
		},
		// 监听页面显示
		onShow() {
		},
		// 页面初次渲染完成
		onReady() {},
		// 监听页面隐藏
		onHide() {},
		// 监听页面卸载
		onUnload() {},
		// 监测数据变动
		watch: {
		},
		computed: {
    },  
    methods: {
			goUrl:function (str){
				uni.navigateTo({
					url: str
				})
			},
			comunicationOff() {
				uni.$off('add', this.add)
			},
			add(e) {
				this.val += e.data
			}
    }
	}
</script>
<style scoped>
.content{
	display: flex;
	width: 100%;
	height: 100vh;
}
</style>
