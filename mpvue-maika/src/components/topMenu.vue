<template>
  <scroll-view class="top-menu-wrapper" scroll-x="true" :style="{width: scrollWidth + 'px' }">
    <view v-for='(item, key) in menus' :key='key' class="top-menu-item" :class="[isActive==item.serviceTypeCode ? 'on' : '', errorClass]" @tap="onTypeChange(item.serviceTypeCode)">{{ item.serviceTypeName }}</view>
  </scroll-view>
</template>

<script>
export default {
  props: ['menus', 'isActive', 'scrollWidth'],
  data () {
    return {
    }
  },
  methods: {
    onTypeChange (item) {
      this.$emit('isActiveChange', item)
    }
  }
}
</script>

<style lang="postcss" scoped>
.top-menu-wrapper {
  white-space: nowrap;
  position: absolute;
  top: 0rpx;
  left: 80rpx;
  border-left: 1rpx dashed #bfbdbe;
}
.top-menu-item {
  display: inline-block;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 16px;
  color: #bfbdbe;
  padding-left:20px;
}
.top-menu-item.on{
  color: #ff8400;
}
</style>
