import ajaxApi from '../utils/fly.js'
// import wepy from 'wepy'
var amap = require('../static/js/amap-wx.js')
const map = {
  mapInit (vm) {
    // 创建 map 上下文 MapContext 对象，就可以调用地图组件的方法
    vm.mapCtx = wx.createMapContext('wxMap', vm)
    // 实例化高德
    vm.myAmapFun = new amap.AMapWX({key: 'e4e9a71da2ac6541fd215562d7fa3986'})
  },
  // 获取屏幕中心坐标
  getCenterLocation (vm, callback) {
    vm.mapCtx.getCenterLocation({
      success: function(data) {
        callback(vm, data)
      },
      fail: function(res) {},
      complete: function() {}
    })
  },
  // 获取定位位置坐标
  getLocation (vm, callback) {
    wx.getLocation({
      type: 'wgs84', // 默认wgs84
      success: function(data) {
        callback(vm, data)
      },
      fail: function(res) {},
      complete: function() {}
    })
  },
  // 获取定位位置或指定位置的详细地址信息，逆地理编码
  getRegeo (vm, callback) {
    vm.myAmapFun.getRegeo({
      success: function (data) {
        callback(vm, data)
      },
      fail: function (info) {
        // 失败回调
        console.log(info)
      }
    })
  },
  // 获取POI数据
  getPoiAround (vm, parem, callback) {
    vm.myAmapFun.getPoiAround({
      querykeywords: '',
      success: function (data) {
        callback(vm, data)
      },
      fail: function (info) {
        // 失败回调
        console.log(info)
      }
    })
  },
  // 缩放视野展示所有经纬度
  includePoint (vm, points) {
    var that = vm
    that.mapCtx.includePoints({
      padding: [10],
      points: points
    })
  },
  // 将地图中心移置当前定位点，此时需设置地图组件 show-location 为true
  goToLocation (vm){
    var that = vm
    that.mapCtx.moveToLocation()
  },
  /***
   * 地图距离判断 返回为米
   * lat为纬度, lng为经度
   */
  getDistance (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    var s = (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
    // s = s / 1000; // 输出为公里
    // s = s.toFixed(4);
    return s
  },
  // 经纬度转换成三角函数中度分表形式。
  Rad (d) {
    return d * Math.PI / 180.0;
  },
  /***
   * 地图距离判断 返回为千米
   * lat为纬度, lng为经度, 一定不要弄错
   * 参考网址 https://blog.csdn.net/gts_0901y/article/details/80257559
   */
  GetDistance(lat1,lng1,lat2,lng2){
    var radLat1 = map.Rad(lat1);
    var radLat2 = map.Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = map.Rad(lng1) - map.Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2)*Math.pow(Math.sin(b/2), 2)));
    s = s * 6378.137 ; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; // 输出为公里
    s = s.toFixed(4);
    return s;
  },
  // 根据经纬度 查询地址信息
  regeoData (vm, parem) {
    ajaxApi.getPostParam('/v3/geocode/regeo?key=4009c080ed924ea3275261bd23b9d2eb&location=' + parem.longitude + ',' + parem.latitude + '&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0', {}, vm, 2).then(function (response) {
      map.dealregeoData(vm, response)
    })
  },
  dealregeoData (vm, response) {
    console.log(response)
    console.log(response.data.regeocode.formatted_address)
  }
}
export default map