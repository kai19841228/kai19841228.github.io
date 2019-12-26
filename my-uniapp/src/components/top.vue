<template>
	<view class="top bgColor">
		<view class="bar">
			<image v-if="imgSrc" :src="imgSrc+'fenlei.png'" class="icon type"></image>
			<view class="barContent">
				<view>我的</view>
				<view class="sel">音乐馆</view>
				<view>发现</view>
			</view>
			<image v-if="imgSrc" :src="imgSrc+'jiahao.png'" class="icon add"></image>
		</view>
		<view class="serch bgDeepColor">
			<input type="text" placeholder="搜索" placeholder-style="color:rgba(255,255,255,.8)" />
			<image class="icon" v-if="imgSrc" :src="imgSrc+'sousuo5.png'"></image>
		</view>
	</view>
</template>

<script>
	import * as types from '../store/mutation-type.js'
	import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	export default {
		name: "top",
		props:{
// 			prodata: {
// 				type: Object,
// 				default: {}
// 			},
		},
		data() {
			return {
				imgSrc: '/static/'
			};
		},
		methods: {
			handel:function (str){
				console.log('********')
			}
		},
		computed: {
			// ...mapGetters(['getShowflag']),
			...mapState({
				menu: function (state) {
					return state.menu
				}
			})
    },
		mounted () {
			console.log('top组件 store更改之前' + this.menu.a)
			// store 触发action 更改store
			setTimeout(function () {
				this.$store.dispatch('setMenuData', {a: 1})
				console.log('top组件 store更改之后' + this.menu.a)
			}.bind(this), 3000)
		},
		destroyed () {
		}
	}
</script>

<style scoped>
	.top{
		padding: 40upx 20upx;
		width:100%;
		box-sizing: border-box;
		color: #fff;
		font-size: 32upx;
	}
	
	.top .bar{
			display: flex;
			justify-content: space-between;
			line-height: 44upx;
	}
.top .bar .icon{
		width: 44upx;
		height:44upx;
	}
	
.top .bar .barContent{
		display: flex;
		width: 360upx;
		margin: 0 auto;
		justify-content: space-between;
	}
.top .bar .barContent .sel{
		font-size: 36upx;
		font-weight: 600;
	}
	.top .serch{
		position: relative;
		margin-top: 32upx;
		padding: 10upx 20upx;
		height: 76upx;
		line-height: 60upx;
		box-sizing: border-box;
		color: rgba(255,255,255,1);
	}
.top .serch input{
		padding: 8upx;
		padding-left: 60upx;
	}
.top .serch .icon{
		position: absolute;
		top: 16upx;
		left: 20upx;
		width: 40upx;
		height: 40upx;
	}
</style>
