<script>
	import Vue from 'vue'
	export default {
		globalData: {  
			text: 'text'  
		},
		// 初始化完成时触发
		onLaunch: function(options) {
			console.log('App Launch')
			// 根据query所带参数来调用不容环境的接口。 options 和下边这句 是一样的数据
			// var options = uni.getLaunchOptionsSync()
			// 设置网络接口请求域名，环境不同，域名不同
			if (options.query.env === 'dev') {
				Vue.prototype.$baseUrl = 'http://dev.cebbank.m.imycargo.com'
			} else if (options.query.env === 'test') {
				Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com'
			} else if (options.query.env === 'pre') {
				Vue.prototype.$baseUrl = 'http://test.cebbank.m.imycargo.com'
			} else {
				Vue.prototype.$baseUrl = 'http://cebbank.m.imycargo.com'
			}
		},
		// 监听app显示
		onShow: function() {
			console.log('App Show')
		},
		// 监听app隐藏
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './static/common';
</style>
