<script>
	import Vue from 'vue'
	export default {
		globalData: {  
			text: 'text'  
		},
		// 初始化完成时触发
		onLaunch: function(options) {
			// console.log('App Launch')
			// 根据query所带参数来调用不容环境的接口。 options 和下边这句 是一样的数据
			// var options = uni.getLaunchOptionsSync()
			// 设置网络接口请求域名，环境不同，域名不同
			if (options.query.env === 'dev') {
				Vue.prototype.$baseUrl = 'http://dev.cebbank.m.imycargo.com'
				uni.setEnableDebug({enableDebug: true})
			} else if (options.query.env === 'test') {
				Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com'
				uni.setEnableDebug({enableDebug: true})
			} else if (options.query.env === 'pre') {
				Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com'
				uni.setEnableDebug({enableDebug: true})
			} else {
				// Vue.prototype.$baseUrl = 'http://cebbank.m.imycargo.com'
				Vue.prototype.$baseUrl = 'https://rest-h5.imycargo.com'
				uni.setEnableDebug({enableDebug: false})
			}
			// 检测小程序有没有新版本，提示是否更新
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function (res) {
					// 请求完新版本信息的回调
					console.log('在app.vue检测小程序是否更新' + res.hasUpdate)
					updateManager.applyUpdate()
					if (res.hasUpdate) {
						// uni.showLoading({title: '版本更新中', mask: true})
					}
				})
				updateManager.onUpdateReady(function () {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						confirmColor: '#ff8400',
						success: function (res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
				updateManager.onUpdateFailed(function (res) {
					// 新的版本下载失败
					// uni.hideLoading()
					// uni.showModal({
					//   title: '升级失败',
					// 	content: '新版本下载失败，请检查网络！',
					// 	confirmColor: '#ff8400',
					// 	showCancel: false
					// })
				})
			}
		},
		// 监听app显示
		onShow: function() {
			// console.log('App Show')
		},
		// 监听app隐藏
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
/*每个页面公共css */
/* @import './static/common'; */
.container {
  height: 100vh;
	width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #f5f5f5;
}
page {
	min-height: 100%;
	display: flex;
	font-size: 16px;
}
/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}
swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}
/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}
/* #endif */
/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}
/* #endif */
</style>
