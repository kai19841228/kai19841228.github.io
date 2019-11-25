<template>
<div></div>
</template>
<script>
// import order from '@/services/order'
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
      mpvue.navigateBack()
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
  }
}
</script>
<style lang="postcss" scoped>
</style>
