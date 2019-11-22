<template>
  <web-view :src="htmlSrc"></web-view>
</template>
<script>
// import order from '@/services/order'
import store from '@/store/store'
export default {
  data () {
    return {
      htmlSrc: ''
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
      mpvue.navigateBack()
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
    this.htmlSrc = 'http://test.rest-h5.imycargo.com/#/pValuation?cityId=' + store.state.order.cityUp.cityId + '&groupId=1&bookingServiceTypeId=1&bookingDate=' + Math.ceil(new Date().getTime() / 1000)
  }
}
</script>
<style lang="postcss" scoped>
</style>
