<script>
	import Vue from 'vue'
	export default {
		onLaunch: function(options) {
			console.log('App Launch')
			// 根据query所带参数来调用不容环境的接口。 options 和下边这句 是一样的数据
			// var options = uni.getLaunchOptionsSync()
			// 设置网络接口请求域名，环境不同，域名不同
			if (options.query.env === 'dev') {
				Vue.prototype.$baseUrl = 'http://dev.cebbank.m.imycargo.com'
			} else if (options.query.env === 'test') {
				Vue.prototype.$baseUrl = 'http://test.m.imycargo.com'
			} else if (options.query.env === 'pre') {
				Vue.prototype.$baseUrl = 'http://test.m.imycargo.com'
			} else {
				Vue.prototype.$baseUrl = 'http://m.imycargo.com'
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './static/common';
</style>
