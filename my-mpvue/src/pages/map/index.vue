<template>
  <div class="counter-warp">
    <view class="map_box">
      <!-- <map id="navi_map" longitude="116.451028" latitude="39.949643" scale="15" :markers="markers" @markertap="makertap"></map> -->
      <map id="navi_map" show-location="true" longitude="116.443457" latitude="39.921737" :polyline="polyline" show-compass="true" scale="10" :markers="markers" @markertap="makertap"></map>
    </view>
    <view class="map_text">
      <text class="h1">{{textData.name}}</text>
      <text>{{textData.desc}}</text>
      <text @click="goToLocation">回到定位中心</text>
      <text @click="getCenterLocation">获取经纬度</text>
    </view>
  </div>
</template>

<script>
var amap = require('../../../static/js/amap-wx.js')
var markersData = []
export default {
  data () {
    return {
      markers: [],
      polyline: [{
        points: [
          {
            latitude: 39.921737,
            longitude: 116.443457
          }, {
            longitude: 116.44345,
            latitude: 39.921422
          }
        ],
        color: '#ff6600',
        width: 2,
        dottedLine: false,
        arrowLine: true,
        borderColor: '#000',
        borderWidth: 5
      }],
      textData: {
        name: '',
        desc: ''
      }
    }
  },
  computed: {
  },
  methods: {
    reset () {
    },
    makertap (e) {
      console.log(e)
      var id = e.mp.markerId
      var that = this
      // console.log(markersData)
      that.showMarkerInfo(markersData, id)
      that.changeMarkerColor(markersData, id)
    },
    showMarkerInfo (data, i) {
      // console.log(data[i])
      var that = this
      that.textData.name = data[i].name
      that.textData.desc = data[i].address
    },
    changeMarkerColor (data, i) {
      var that = this
      var markers = []
      for (var j = 0; j < data.length; j++) {
        if (j === i) {
          data[j].iconPath = '/static/images/marker_checked.png'
        } else {
          data[j].iconPath = '/static/images/marker.png'
        }
        markers.push({
          id: data[j].id,
          latitude: data[j].latitude,
          longitude: data[j].longitude,
          iconPath: data[j].iconPath,
          width: data[j].width,
          height: data[j].height
        })
      }
      that.markers = markers
    },
    goToLocation () { // 将地图中心移动到当前定位点。需要配合map组件的show-location使用
      var that = this
      that.mapCtx.moveToLocation()
    },
    includePoint (points) { // 缩放视野展示所有经纬度
      var that = this
      that.mapCtx.includePoints({
        padding: [10],
        points: points
      })
    },
    getCenterLocation () { // 获取当前地图中心的经纬度。返回的是 gcj02 坐标系，可以用于 wx.openLocation()
      var that = this
      that.mapCtx.getCenterLocation({
        success: function (data) {
          console.log(data)
        }
      })
    }
  },
  onLoad () {
    var that = this
    var myAmapFun = new amap.AMapWX({key: 'e4e9a71da2ac6541fd215562d7fa3986'})
    myAmapFun.getPoiAround({
      querykeywords: '',
      success: function (data) {
        // 成功回调
        console.log(data)
        markersData = data.markers
        var newMarkers = []
        that.polyline[0].points = []
        markersData.forEach(function (item, index) {
          newMarkers.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: '/static/images/marker.png',
            width: item.width,
            height: item.height
          })
          that.polyline[0].points.push({
            longitude: item.longitude,
            latitude: item.latitude
          })
        })
        that.includePoint(that.polyline[0].points)
        that.markers = newMarkers
        that.showMarkerInfo(markersData, 0)
        that.changeMarkerColor(markersData, 0)
      },
      fail: function (info) {
        // 失败回调
        console.log(info)
      }
    })
    myAmapFun.getRegeo({
      success: function (data) {
        console.log(data)
      },
      fail: function (info) {
        // 失败回调
        console.log(info)
      }
    })
  },
  mounted: function () {
    console.log(this.$store)
    mpvue.getUserInfo({
      success: function (res) {
        console.log(res)
      }
    })
  },
  onReady: function (e) {
    this.mapCtx = mpvue.createMapContext('navi_map')
  }
}
</script>

<style lang="postcss" scoped>
.map_box{
  position:absolute;
  top: 0px;
  bottom: 120px;
  left: 0px;
  right: 0px;
}
#navi_map{
  width: 100%;
  height: 100%;
}
.map_text{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  background: #fff;
  padding: 0 15px;
}
text{
  margin: 5px 0;
  display: block;
  font-size:12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.h1{
  margin: 15px 0;
  font-size:15px;
}
</style>
