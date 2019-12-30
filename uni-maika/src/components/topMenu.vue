<template>
	<view id="header" class="header">
		<view class="user-container" id="user-container" @tap='onUser'>
			<img class='user' src="/static/images/app_icon021.png">
		</view>
		<scroll-view class="top-menu-wrapper" scroll-x="true" :style="{width: scrollWidth + 'px' }">
			<view v-for='(item, key) in menus' :key='key' class="top-menu-item" :class="[isActive==item.serviceTypeCode ? 'on' : '', errorClass]" @tap="onTypeChange(item.serviceTypeCode)">{{ item.serviceTypeName }}</view>
		</scroll-view>
	</view>
</template>

<script>
	import * as types from '../store/mutation-type.js'
	import {mapState, mapMutations, mapGetters, mapActions} from 'vuex'
	export default {
		name: "top",
		props: ['menus', 'isActive'],
		data() {
			return {
				scrollWidth: ''
			}
		},
		methods: {
			onUser () {
			},
			onTypeChange (item) {
				uni.$emit('activeChange', {
					data: item
				})
				this.$store.dispatch('setServiceType', {serviceType: item})
			}
		},
		computed: {
    },
		mounted () {
			const query = uni.createSelectorQuery().in(this)
			query.select('#user-container').boundingClientRect()
			query.exec((res) => {
				const sys = uni.getSystemInfoSync()
				this.scrollWidth = sys.safeArea.width - res[0].width - 15
			})
		},
		destroyed () {
		}
	}
</script>

<style scoped>
.header {
	padding: 5px 0;
  box-sizing: border-box;
  background: #FFF;
  width: 100%;
  position: relative;
	border-bottom: 1upx solid #e5e5e5;
	box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
	-webkit-box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
}
.header .user-container {
	margin-top: 10px;
  width: 40px;height: 30px;text-align: center; 
}
.header .user-container .user {
  width:20px;height:20px;
}
.top-menu-wrapper {
  white-space: nowrap;
  position: absolute;
  top: 10px;
  left: 40px;
  border-left: 1px dashed #bfbdbe;
}
.top-menu-item {
  display: inline-block;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #bfbdbe;
  padding-left:20px;
}
.top-menu-item.on{
  color: #ff8400;
}
</style>
