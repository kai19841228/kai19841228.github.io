<template>
<view class="container">
  <view class="MyTrip-header" id="MyTrip-header">
    <view class="menu" :class="{'on': type == 1}" @tap="menuHandle(1)">个人行程</view>
    <view class="menu" :class="{'on': type == 2}" @tap="menuHandle(2)">企业行程</view>
    <view class="menu" :class="{'on': type == 3}" @tap="menuHandle(3)">出租车行程</view>
  </view>
  <view class="page-section-spacing" style="padding-top: 100upx;" v-if="type == 1">
    <scroll-view scroll-y="true" :style="{height: scrollHeight + 'px' }" class="scroll" @scrolltoupper="PullDown" @scrolltolower="ReachBottom">
      <view class="title" v-if="currentTripList.length > 0">当前行程</view>
        <view class="currentList">
          <view class="scroll-view-item trip current" @tap="navigateToHandle" v-for="(item, index) in currentTripList" :key="index">
              <view><text>{{item.serviceType}}</text><text style="float: right;">{{item.status}}</text></view>
              <view class="time">{{item.bookingTime}}</view>
              <view class="up">{{item.bookingStartAddr}}</view>
              <view class="down">{{item.bookingEndAddr}}</view>
            </view>
        </view>
        <view class="title" v-if="historyTrip.length > 0">历史行程</view>
          <view class="HistoryList">
            <view catchtap="navigateToHandle" class="trip" v-for="(item, index) in historyTrip" :key="index">
              <view><text>{{item.serviceType}}</text><text style="float: right;">{{item.status}}</text></view>
              <view class="time">{{item.bookingTime}}</view>
              <view class="up">{{item.bookingStartAddr}}</view>
              <view class="down">{{item.bookingEndAddr}}</view>
            </view>
            <view v-if="historyTrip.length != 0" class="loadMore">数据加载完毕</view>
        </view>
    </scroll-view>
    <!-- 暂无数据提示 -->
    <view class="noData" v-if="currentTripList.length == 0 && historyTrip.length == 0">
      <img class="pic" src="/static/images/none.png">
      <view class="desc">目前尚无任何行程</view>
    </view>
  </view>
</view>
</template>
<script>
// import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
      scrollHeight: '',
      type: 1,
      currentTripList: [
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'}
      ],
      historyTrip: [
        {serviceType: '预约订单', status: '已完成', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'},
        {serviceType: '预约订单', status: '待服务', bookingTime: '2019-12-2', bookingStartAddr: '万豪国际', bookingEndAddr: '万豪国际'}
      ]
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
    PullDown () {
      console.log('页面到顶了，按需看要不要刷新列表')
    },
    ReachBottom () {
      console.log('页面到底了。加载更多')
    },
    menuHandle (item, event) {
      this.type = item
      console.log(item)
      // 根据选择的type，显示内容
      if (this.type === 1) {
        console.log('显示个人行程')
      } else if (this.type === 2) {
        console.log('显示企业行程')
      } else if (this.type === 3) {
        console.log('显示出租车行程')
      }
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
		const query = uni.createSelectorQuery().in(this)
		query.select('#MyTrip-header').boundingClientRect()
		query.exec((res) => {
			const sys = uni.getSystemInfoSync()
			this.scrollHeight = sys.safeArea.height - res[0].height - 15
		})
  }
}
</script>
<style lang="postcss" scoped>
.scroll{box-sizing: border-box;}
.MyTrip-header{
	width: 90%;
	height: 100rpx;
	margin: 0 auto;
	padding: 0 5%;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
	-webkit-box-shadow: 0 0px 20px 0 rgba(30,46,104,.1);
}
.MyTrip-header .menu{
  font-size: 36rpx;
	color: #bfbfbf;
	text-align: center;
	line-height: 100rpx;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
.MyTrip-header .menu.on{
	color: #c8161d;
    border-bottom: 4rpx solid #c8161d;
}
.page-section-spacing{
  width: 100%;
  height: 100%;
}
.page-section-spacing .title{
    width: 90%;
    margin: 0 auto;
    color: #999;
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
}
.page-section-spacing .trip{
	width: 100%;
    padding: 20rpx 8% 20rpx 5%;
    color: #333;
    background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAfCAYAAADqUJ2JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA5ODk1OEUxNDYzMTFFNzhEQ0NGRTg5NjcyRUM1Q0EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA5ODk1OEYxNDYzMTFFNzhEQ0NGRTg5NjcyRUM1Q0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDk4OTU4QzE0NjMxMUU3OERDQ0ZFODk2NzJFQzVDQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDk4OTU4RDE0NjMxMUU3OERDQ0ZFODk2NzJFQzVDQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgVmWJQAAAG9SURBVHjanJVdK4NxGMY3hnwAckBKkhIiEVFTPoS3EydGoZASikKa1yIHSsnylrwcOlA2IklOJQlJ3k4cWVjJdeta/Xsadj9X/VrX2n7d/+e5n83p9/sdSBJwgUeHMm63++c1BmSCLeCj0FZENADKQRVYAcl2RZvgmV1ka3ZkItoGDeCF71WCDZCiFUl2QD14Yq/gpGlakWQX1IEH9jJOlq4VSfYou2cvpixDK5IEKLtjL6IsSyuSHIBacMteANZBjlYkOaLshj0frII8rUhyDGrANXsul7ZQK5KcgGpwxS7HWwYlWpHklLJL9mw+m6VakeSMsnN2uYuLgUBAltfh5M+IJrJT+yCV/VX2LcbGgy575TT6IfhwKSVNYBrEsctFb8SPW1AzUYtFsgQ8ItFc7HYwaUh8nO5Nc9e6gNeQLIBmUxKNqAcMG5J50AqC1g/+dbH7Qa8hmQOd1kn+m2jQIpn9SxJpItmPEdBhSGZAd6Tj/DZRLBizSKaikZgimWwCtBmSUdAXjSQsSOQkHvYvHm8IvEe7rfLFcUrkaCHebq9GEhZdUPLOuyXiT+2T7OKmxoMEHjFk57//W4ABADeoYVkYfaN0AAAAAElFTkSuQmCC) 95% 28rpx no-repeat;
    background-size: 2%;
    box-sizing: border-box;
    border-bottom: 1rpx solid #e5e5e5;
    position: relative;
    font-size: 32rpx;
}
.page-section-spacing .currentList .current:first-child{
	border-top: 1rpx solid #ededed;
}
.page-section-spacing .HistoryList .History:first-child{
	border-top: 1rpx solid #ededed;
}
.page-section-spacing .trip .money{
    padding-left: 5%;
    color: #c8161d;
}
.page-section-spacing .trip .time{
  color: #999;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDAxN0Q1MDQxMzdBMTFFNzkxRDA4NjVCMEQyMTFDMTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDAxN0Q1MDUxMzdBMTFFNzkxRDA4NjVCMEQyMTFDMTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMDE3RDUwMjEzN0ExMUU3OTFEMDg2NUIwRDIxMUMxMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMDE3RDUwMzEzN0ExMUU3OTFEMDg2NUIwRDIxMUMxMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpxscTQAAAGESURBVHjatJXPKwRhGMfflfJjNhesgyu7J1sO3GhOOAhHW3KWorgjJQ6Sm3/AhSsHkpo5cBPZnHdPyqp10baE+H7rnXqb5n29w+xTn8u+7/OZZ+eZ93lTnucJTfSAeTAGBkGn/L0K7sAFOHRd9ykqORUhToNNsAhahTnewQHYwANe1YWm0MYsuAGrFlJGC1gBt77v53TifnANchpJBXxo1vrAFeTZsNgBp6BLk1gDvWDXUD1zTyBPq+I1Q6WMT/BlqDgIOtYDMbu9LJKLJVTdTXEBtCUoZtMLFE+I5GOc4oEGiPMUZxogzlD8bbGxmacUXIK6jZniZ4t9jjy6PECTFvIKxfeWf29Byj0LeZHi8xjvTpXPGfad8d0dy6PqxJC3gw7D8T9ixS9gL2bXOadnNGv7GKHVYFbsgIcEPjM6ttUh9AamwOM/pMydRrX18Dwug5E/Vs6cUUhLuhuE8iGwJZvwW9Tk3mFVqrvzguA4nZVDKi8vVyEPVJGfFLvPRkUl/wgwAMpgWruCkpPVAAAAAElFTkSuQmCC) left 11rpx no-repeat;
    background-size: 4%;
    width: 87%;
    padding-left: 5%;
}
.page-section-spacing .trip .up{
	color: #999;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlGOTMzMDUyNjdERjExRThBOEU0Q0VEODIzNTYzNTE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlGOTMzMDUzNjdERjExRThBOEU0Q0VEODIzNTYzNTE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzM4NUNDRjU2N0QyMTFFOEE4RTRDRUQ4MjM1NjM1MTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzM4NUNDRjY2N0QyMTFFOEE4RTRDRUQ4MjM1NjM1MTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5sgvwtAAAHV0lEQVR42tRaC28U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) left 11rpx no-repeat;
    background-size: 4%;
    width: 87%;
    padding-left: 5%;
}
.page-section-spacing .trip .down{
	color: #999;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlGOTMzMDU2NjdERjExRThBOEU0Q0VEODIzNTYzNTE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlGOTMzMDU3NjdERjExRThBOEU0Q0VEODIzNTYzNTE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUY5MzMwNTQ2N0RGMTFFOEE4RTRDRUQ4MjM1NjM1MTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUY5MzMwNTU2N0RGMTFFOEE4RTRDRUQ4MjM1NjM1MTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7L/zZwAAAG50lEQVR42sSa+29URRTH93Frt29Y2mLbFCkKJUqRl4ZotEpEg4r+ZAjRxBj/Av8R/wATEn4CxfgIGGyBH6wQ5LERTaO2xUAjFpDSQqFdabvb+vmSs5tl2e3O3d7iJCcz996Z85o5Z845u+H5+flQfuvv78+OU6lUaG5uLhQOh7PvNNY6IBqJROp49QzwHM+b6DvpG+gbmVer+TxP0t3keYJ+kP4X+vPAb+C+y3M6gzPTNAZ3yPO87Luurq6HePVC5bcWQAyvE0DwKfrVQBtQLTlz5lZJICAJxJnbAsNrGQ8ZSKBr5TDhVwAxVQk0AbuAvTCznT5WaCfz3oV5rskIDLwO3APOAAeB74FRYFpLl0qAChGGkT3ARsZP0MfK0ZwJp7VbGWt3uoEvgB5gJmgBonZkXgLeh+BboeCabGgDODdwrGQ72qWTdqTSgQgA4ma6dyHyIf2ztsXhULAN9PM76ZuhFwe+drELz1FDO0H+kTHvhZamSSGPAZuhFUGAu4y/Ae4utChSAqm8STcI9+qsLiHz+UrdajS7jYeyd2CFPA3wQujRN9EcB3419+u+A/IQXDArgbcZy3Dr/wcB6kVbPBgv7jvA5AiLt5i7XO6DqLxGymAyR3M6BrVGzzOv5mLVy9Pp9B6Gw0CvWHM9QnJn60GwudQZzAsvRulF6JyI8jxt3yrtln6ed2/w/Hihi6+QDYoH5q9n/BNw20kA+WT5Zh9HR55iEDgBHIbgeXCk8gT0eHfBXONrPCtmqiuBN2I8ZPg55SrAFrp2Z/8XDv8OfMrwR9aOKTgrdLz4lqC/zHcJ8gmw3XEn2s0LOgugyWscEKdMo8cNbi10pIFZmL9uO9VlgV9LKW8IP2tMAOd7oNMQl2r/Aqctfrnlw9jHYaoHOG04XCLfTj8C1FugVaop6ErAyIDcXOY4WK6QH41m8wibO2A5gUvgFitmj8W2rsnhllZLknD0w9hYhtncxEfvlBDlCpMj1JhyJ+Yn7cIsZcxNfgSocQmHyZhS0Wj0DlBQ29I0fvyBjC63Z80dsyOXVuNHAFekHoxEMkzl7oKYlvbvJxEVFaFcIfXd5kRnZ2e9/JTVD0/FBLhtEpfCWgHxJuXGQFpMihFpPaP53B1Rfish9E2C27GocLmUC11iRY0Y5ErAZxxuXg9mOtBifGZmJvs+txCQEYg52V2anp4WxJm3WjhKaV+8iCc/Xmjc0b1Vw+huGNzmeCFlhdAarXUJVZifBMb9CKBKwVUHXqpA/DL9bjTU6ngcKmzuOxbvVzmsuWqhinM4rav+smMWFYWhbuBjvFJrqWOnOZqrNRaVuqSmikYvOBsxxnYSIdayza7Ju27JDzjn8uc/WLzzTyacZqxjspLvOvOvWknmSdcjh3P4A8FPOguA2xvCwIYQIGlbXEpL8kLrMGQVq16BWB9Mq7x30zxIo8owfNdx26ic19VcpATwDaHUi37caNq2LWFBVI2jcYYtj1D1bUdOkUr5wDLeNTve8Jk2hSISwOUiEW5hAXRW2bYBCH7OLqyk73RNasQs89v9hOMLtCtoX1W7gWIpZUFtqKjKMRqprKzs1fb5cZEBFomkkEHoH2N8VXeJr7IKi+eAKwyPWPH1UbefoX+Y/u9CuXDJsopFkGmL9XUc1rraQgBtypjvXYj5hUKJzHnW4usIoiT9Tx9B3mJaymglrFrtXwDFMjnxzCwu7BxGvZ/xpaW0Bzv3l0QLSHD+Z8uqjeYajAwauMHwgFUrOmxd4MVd6Q4BTsH8AcY3XOuQD7VM5JjXRhHsGLuyDgIvhh0CeL+lafCfoetVfclPIfWhFo/Hi9HoQ7jmqampdoitDkoGHR2U8ld9ff0h3Ldu8cX9QrNq1api80eTyWTf8PBwN2FBI7ZRG4QAKGMyFoslWltb+6qrq0f9rPWKXWRF2pziJL5/Zj9C7FisUZvHOyechntu0QKU0NY0BI9DSPfC05YWRstVvnYVXF8JZ7Hb1rcbdWyqxO2D8O1ybME0rzx3n+Eqq3nlGJw0xT1xEc0dksnQvwkzK/zgwZuNAUcZHqK/KJzlHEevHM2pTEKgp7FSz4MQXgYTuxwzLHGpCsZpnIAizfvBonCWs5O+BRDjbW1tmctOP1SfnZiYaBkZGelgJzaIkWKaFIO44TDC/gGObxsaGs4ajvt1I+FecgFEqLb2Ae85DtM9uNXaycnJ92BwG4LEijiAezCZYP2XjY2NPbjM8cW64EgogFZVVXW9o6Njf11d3QFsY7BolMY3zdFcrQmCdiA/myp3sBrpdzoSPKveox8vWuy7fkPQfyKOMOeE5gYVggT2u6+Vza/AbI8Zs2pEm+yzEqKj+sacaxZ1BkL3PwEGAHh3gWKP4t0wAAAAAElFTkSuQmCC) left 11rpx no-repeat;
    background-size: 4%;
    width: 87%;
    padding-left: 5%;
}
.loadMore{
    padding: 10rpx;
    text-align: center;
    background-color: #FFF;
    margin-top: 20rpx;
}
.noData{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
}
.noData .pic{
    width: 400rpx;height: 240rpx;display: block;margin:0 auto;
}
.noData .desc{
    color: #999;
    text-align: center;
    margin-top: 20rpx;
}
::-webkit-scrollbar{
	display: none;
}
</style>
