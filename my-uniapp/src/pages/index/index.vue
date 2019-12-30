<template>
	<view class="content">
		<top id="top"></top>
		<swiper class="bannerContent" :autoplay="swiper.autoplay">
			<swiper-item v-for="(value,index) in swiper.img" :key="index">
				<image :src="value" class="swiperImg"></image>
			</swiper-item>
		</swiper>
		<view class="bar">
			<view class="iconSpan" v-for="(val,index) in contentBar" :key="index" @tap="barHandle(index)">
				<image :src="val.src" class="iconBarImg"></image>
				<view>{{val.name}}</view>
			</view>
		</view>
		<view class="used">
			<view class="usedImg"  @tap="goUrl('/pages/index/index')">
				<image :src="content.img"></image>
				<image class="icon" v-if="imgSrc" :src="imgSrc"></image>
				<view class="imgTitle">{{content.imgTitle}}</view>
			</view>
			<view class="list">
				<view class="grayColor info" v-for="(val,index) in content.list" :key="index"  @tap="goUrl('/pages/index/index?count='+index)">
					<view class="name">{{val.name}}</view>
					<view class="disc">{{val.disc}}</view>
					<image :src="val.src" class="listImg" ></image>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="wx">
			我是微信显示的元素
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<view class="">
			我是支付宝显示的元素
		</view>
		<!-- #endif -->
		<image class="logo" src="/static/logo.png" @tap="goUrl('/userCenter/index/index')"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<image class="logo" :src="imgSrc"></image>
		<view class="title">{{refresh.orderStatusFilter(60)}}</view>
		<view v-for="(val,index) in prodata" :key="index" :style="{width:blockWidth}" @tap="goUrl('/pages/index/index')">
			<view v-if="val.name" class="name">{{val.name}}-{{val.age}}</view>
		</view>
	</view>
</template>
<script src="./uni-refresh.wxs" module="refresh" lang="wxs"></script>
<script>
	import top from '../../components/top'
	import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	import ajaxApi from '../../utils/fly.js'
	const platform = uni.getSystemInfoSync().platform
	export default {
		'mp-weixin': {
			options: {
				multipleSlots: false
			}
		},
		data() {
			return {
				title: 'Helloworld',
				platform: platform,
				imgSrc: '/static/logo.png',
				blockWidth: '32%',
				prodata: [
					{name: '李*磊', age: '20'},
					{name: '韩*磊', age: '22'},
					{name: '测试1', age: '25'},
					{name: '测试2', age: '27'},
					{name: '测试3', age: '20'}
				],
				swiper:{
					autoplay:true,
					img:[
						'/static/1.jpeg',
						'/static/2.jpeg',
						'/static/3.jpeg'
					]
				},
				contentBar:[
					{name:"歌手",src:'/static/ren_l.png'},
					{name:"排行",src:'/static/paixingbang_l.png'},
					{name:"分类歌单",src:'/static/fenlei1_l.png'},
					{name:"电台",src:'/static/xinhaojieshouqi_l.png'},
					{name:"视频",src:'/static/shipin-tianchong_l.png'}
				],
				content:{
					img:"/static/sc1.jpg",
					imgTitle:'个性电台',
					list:[
						{name:"新歌新碟",disc:"神秘嘉宾先生选择新歌",src:'/static/sc2.jpeg'},
						{name:"动画片专辑|热映",disc:"李建老狼联手现场",src:'/static/sc3.jpeg'}
					]
				}
			}
		},
		components:{
			top
		},
		// 监听页面加载
		onLoad(options) {
			let that = this
			console.log(options)
			// #ifdef MP-WEIXIN
			console.log('微信执行的代码')
			// #endif
			// #ifdef MP-ALIPAY
			console.log('支付宝执行的代码')
			// #endif
			console.log(that.$store)
			console.log(platform)
			console.log(that.$utils.peoNum(200000))
			// 调用组件里的方法
			that.selectComponent('#top').$vm.handel()
			ajaxApi.getPostParamCallF('/api/mycar/user/city/getCityList', {cityName: ''}, function (vm, data) {
				console.log(data)
			}, that)
		},
		// 监听页面显示
		onShow() {
			setTimeout(function () {
				this.title = '测试uniApp Watch监测'
			}.bind(this), 5000)
		},
		// 页面初次渲染完成
		onReady() {},
		// 监听页面隐藏
		onHide() {},
		// 监听页面卸载
		onUnload() {},
		// 监测数据变动
		watch: {
			'title': function(newVal, oldVal) {
				console.log(newVal, oldVal)
			}
		},
		computed: {
			// ...mapGetters(['getShowflag']),
			...mapState({
				watchStoreStartAddress: function (state) {
					this.menu = state.menu
				}
			}),
			showCarTypeName (){
			}
    },  
    methods: {  
			...mapMutations(['logout']),
			openCarTypeSelectLayer (){
				alert(0)
			},
			goUrl:function (str){
				uni.navigateTo({
					url: str
				})
			},
			barHandle (n, event) {
				console.log(n)
			}
    }
	}
</script>

<style scoped>
	/* #ifdef MP-WEIXIN */
	.wx{
		color: #04BE02;
	}
	/* #endif */
	/* #ifdef MP-ALIPAY */
	.wx{
		color: #10AEFF;
	}
	/* #endif */
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
.bannerContent{
	width: 100%;
	height: 320upx;
}
.bannerContent .swiperImg{
	width: 100%;
	height: 100%;
}
.bar{
	display: flex;
	padding: 36upx 0;
	margin-top: -28upx;
	position: relative;
	z-index: 1;
	background: #FFFFFF;
	box-shadow:4upx 4upx 10upx #CCCCCC;
}
.bar .iconSpan{
	flex: 1;
	text-align: center;
}
.bar .iconSpan .iconBarImg{
	width: 44upx;
	height: 44upx;
}
.used{
	display: flex;
	margin-top: 40upx;
}
.used .usedImg{
	position: relative;
	width: 220upx;
	height: 220upx;
	margin-right: 20upx;
	box-shadow: 4upx 4upx 10upx #CCCCCC;
}
.used .usedImg image{
	height: 100%;
	width: 100%;
}
.used .usedImg .icon{
	position: absolute;
	width: 50upx;
	height: 50upx;
	top: 50%;
	left: 50%;
	margin: -25upx auto auto -25upx;
	opacity: .8;
}
.used .usedImg .imgTitle{
	position: absolute;
	display: block;
	width: 100%;
	bottom: 20upx;
	text-align: center;
	color: #FFFFFF;
}
.used .list{
	flex: 1;
}
.used .list .info{
	position: relative;
	height: 100upx;
	box-sizing: border-box;
	padding: 12upx 20upx;
	padding-right: 65px;
}
.used .list .info:first-child{
	margin-bottom: 20upx;
}
.used .list .info .name{
	font-size: 32upx;
}
.used .list .info .disc{
	font-size: 26upx;
	color: #6f6f6f;
}
.used .list .info .listImg{
	position: absolute;
	right: 0;
	top: 0;
	width: 100upx;
	height: 100upx;
}
</style>
