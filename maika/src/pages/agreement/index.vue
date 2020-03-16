<template>
<view class="agreement">
	<view class="item" @click="toPath('/pages/agreement/Privacy')">
		隐私条款
	</view>
	<view class="item" @click="toPath('/pages/agreement/service')">
		服务条款
	</view>
	<view class="item" @click="toPath('/pages/agreement/weiyuejin')">
		违约金规则
	</view>
</view>
</template>
<script>
import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    backPage () {
      uni.navigateBack()
    },
		toPath (val) {
			const url = val
			uni.navigateTo({ url })
		}
  },
  onLoad: function (options) {
  },
  mounted () {
  }
}
</script>
<style lang="css" scoped>
	.agreement{
		display: flex;
		flex-direction: column;
		background-color: #F7F7F7;
		width: 100%;
		height: 100vh;
		padding-top: 10px;
	}
	.item{
		background-color: #FFFFFF;
		border-bottom: 1px solid #e5e5e5;
		padding: 15px;
		padding-left: 15px;
		position: relative;
	}
	.item:first-child{
		border-top: 1px solid #E5E5E5;
	}
	.item::before{
		content: '';
		border-top: 1px solid #999999;
		border-right: 1px solid #999999;
		width: 10px;
		height: 10px;
		position: absolute;
		top:50%;
		right: 15px;
		transform: translateY(-50%) rotate(45deg);
	}
</style>
