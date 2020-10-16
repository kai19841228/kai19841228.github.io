<template>
  <div>
    <view class="page-section-spacing">
        <scroll-view scroll-y="true" style="height: 600rpx;" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll" :scroll-into-view="toView" :scroll-top="scrollTop">
          <view id="demo1" class="scroll-view-item demo-text-1"></view>
          <view id="demo2"  class="scroll-view-item demo-text-2"></view>
          <view id="demo3" class="scroll-view-item demo-text-3"></view>
        </scroll-view>
      </view>
    <div style="height:1000px;background:#F0F;"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toView: 'demo3',
      scrollTop: 0
    }
  },

  components: {
  },
  computed: {
  },

  methods: {
    upper: function (e) {
      console.log('下拉刷新')
      mpvue.showNavigationBarLoading()
      setTimeout(function () {
        // mpvue.stopPullDownRefresh()
        mpvue.hideNavigationBarLoading()
      }, 2000)
    },
    lower: function (e) {
      console.log('上拉加载更多')
      mpvue.showToast({
        title: 'loading....',
        icon: 'loading'
      })
      setTimeout(function () {
        mpvue.hideToast()
      }, 2000)
    },
    scroll: function (e) {
      console.log('滚动~~~~~~~~~~~')
    }
  },
  onLoad () {
  },
  mounted () {
    console.log(mpvue.getLaunchOptionsSync())
    // pege 滚动到指定位置
    mpvue.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  async onPullDownRefresh (e) {
    console.log('下拉刷新page')
    setTimeout(function () {
      mpvue.stopPullDownRefresh()
    }, 6000)
  },
  onReachBottom (e) {
    console.log('上拉加载page')
  }
}
</script>

<style lang="postcss" scoped>
.page-section-spacing{
}
.scroll-view-item{
  height: 600rpx;
}
.demo-text-1 {
  position:relative;
  align-items:center;
  justify-content:center;
  background-color:#1AAD19;
  color:#FFFFFF;
  font-size:36rpx;
}
.demo-text-2 {
  position:relative;
  align-items:center;
  justify-content:center;
  background-color:rgb(17, 164, 209);
  color:#FFFFFF;
  font-size:36rpx;
}
.demo-text-3 {
  position:relative;
  align-items:center;
  justify-content:center;
  background-color:rgb(241, 102, 9);
  color:#FFFFFF;
  font-size:36rpx;
}
</style>
