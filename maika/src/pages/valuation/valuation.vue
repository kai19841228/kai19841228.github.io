<template>
	<view>
		<!-- <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view> -->
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
    this.htmlSrc = 'http://test.rest-h5.imycargo.com/#/pValuation?cityId=' + this.$store.state.cityUp.cityId + '&groupId=1&bookingServiceTypeId=1&bookingDate=' + Math.ceil(new Date().getTime() / 1000)
		console.log(this.htmlSrc)
  }
}
</script>
<style lang="postcss" scoped>
</style>
