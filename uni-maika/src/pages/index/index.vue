<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
		},
		onLoad() {
		},
		// 监听页面显示
		onShow() {},
		// 页面初次渲染完成
		onReady() {},
		// 监听页面隐藏
		onHide() {},
		// 监听页面卸载
		onUnload() {}
	}
</script>

<style>
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
</style>
