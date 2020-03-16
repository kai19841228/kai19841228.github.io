<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="htmlSrc"></web-view>
	</view>
</template>
<script>
export default {
  data () {
    return {
      htmlSrc: '',
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
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
      nui.navigateBack()
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
		// 隐私条款
    this.htmlSrc = 'https://rest-h5.imycargo.com/#/personalInfo'
		console.log(this.htmlSrc)
  }
}
</script>
<style lang="postcss" scoped>
</style>
