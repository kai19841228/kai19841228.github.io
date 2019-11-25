<template>
  <div class="address">
    <div class="search">
      <span class="searchLeft" @click="toCity">{{address === 'up' ? cityUp.cityName : cityDown.cityName}}</span>
      <input id="input" type="text" class="searchText" :placeholder="searchtext" v-model="textSearch" @blur="blurInput">
      <span  @click="autoInput">搜索</span>
      <span class="cancel" @click="backPage">取消</span>
    </div>
    <div class="addressList">
      <div class="case" v-for="(item, i) in items" :key="i" @click="addressHandle(item)">
        <h1>{{item.name}}</h1>
        <h5>{{item.address}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
// import order from '@/services/order'
import store from '@/store/store'
export default {
  data () {
    return {
      address: '', // 搜索框显示文案
      searchtext: '您在哪儿上车', // 搜索框显示文案
      textSearch: '',
      items: '' // 显示列表
    }
  },
  components: {
  },
  computed: {
    cityUp () {
      return store.state.order.cityUp
    },
    cityDown () {
      return store.state.order.cityDown
    }
  },
  watch: {
    textSearch: function (val, val1) {
      this.autoInput()
    }
  },
  methods: {
    toCity () {
      // 变更城市
      let url = '../citySelect/main?city=' + this.address
      mpvue.navigateTo({ url })
    },
    backPage () {
      mpvue.navigateBack()
    },
    blurInput (e) {
      this.textSearch = e.target.value
    },
    autoInput () {
      var self = this
      var keywords = this.textSearch
      let city = self.address === 'up' ? self.cityUp.cityName : self.cityDown.cityName
      let url = 'https://restapi.amap.com/v3/place/text?key=4009c080ed924ea3275261bd23b9d2eb&keywords=' + keywords + '&types=&city=' + city + '&children=1&offset=10&page=1'
      this.$request.get(url, {
      }, {})
        .then(function (response) {
          // console.log(response)
          let arr = []
          for (let item of response.data.pois) {
            if (item.location) {
              let ads = item.cityname + item.adname + item.address
              let locationArr = item.location.split(',')
              arr.push({name: item.name, address: ads, location: {lng: locationArr[0], lat: locationArr[1]}})
            }
          }
          self.items = arr
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 地址选择
    addressHandle (item) {
      if (this.address === 'up') {
        store.dispatch('setUpAdress', item)
      } else {
        store.dispatch('setDownAdress', item)
      }
      this.backPage()
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.searchtext = options.address === 'up' ? '您在哪儿上车' : '您在哪儿下车'
    this.address = options.address
  },
  mounted () {
    this.items = []
  }
}
</script>
<style lang="postcss" scoped>
.address{
  background:#FFF;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
}
.search{
  width: 100%;
  display: flex;
  border-bottom:1px solid #ff9d62;
  position: relative;
  padding: 10px 10px;
  font-size: 16px;
  box-sizing: border-box;
}
.searchLeft{
  padding-right: 24px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAgUlEQVRIS+2TQQrAIAwEx/610CcV+tdSclOq2aTQWzyJmh3cbBo/r/azPgWQDpdFnyzagRPYZPX44AYO4OqPVz3IQqbiBvKaHIUsxRXA7hXEFY8APIgUjwJmkJB4BtBDbP9Kyypx2Um2ntgaoujFOQtIjoYf07TYrKB+IG0si6RFD/ByFRkEfJYMAAAAAElFTkSuQmCC) no-repeat right 5px center;
  background-size: 15px;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width:100px;
}
.searchText{
  flex: 1;
  font-size: 16px;
  padding-left: 30px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABEdJREFUWAntl0tIlFEUxxvHzApCKnqBRKtKJVpYLWqRUFGLoSKSEEeNHgS1zQp6bYIKatMuN+qopfTWLNoIQUHkJsJICESCiCRByMrX2O+Mcy53vvm+q6PSyg/unHPP43//37n3u/fOvHlzj7sCIbc71dva2rqov79/N9at4+Pja5CraIOhUOgb/Z5wONwejUa7U7My602JUH19/UYGvAp0BLnQNQTkuml3CgoK7hYXF4+4Yv18TkIQWRyPx28zwDGIhP0AgmzkfCHndFVV1augGD97IKHGxsa1o6OjzwDdZCcy0AdsbVlZWV/Qv+MT0jJ9O2h78S2x4uPEVVdUVNyybE7Vl5CQGRkZeUfmSiv7eXZ29oXy8vKPli1FbW9vX9DX13cK40WILVcnxG9UVlae175LphGSaQLsLU0r85fFepzF2ugCsn11dXXLyH+AbafaqRSFqohpP0hmeR2yZmwyVGVXJmQEj2r8LCoq2kNlHis+uDW87DrtB8kUQvI1AXJMg6UyTNEb7Wci5QsDK0r7kMxbwItemwwjhRAJV2n6NT3PtDLewZiiQV7qhGU/UltbW2j101RDSDY9vBGNkAWs+kwkFX5PlR4JBi+LGjrswjOEZAcmIbHpSZldX5ML0M/HgjaLmTH2+8WozRCCxDY1ktSm+mzIvLw82Rx1197c0tKSE4RrCPEVrNYg2fRUnw0ZiUR+88LfFIs9zoylNpWGEAkmCF124Nl+DObY2Jgcyr6PIcQ0/bIiFlv6bKk25mAQqCFklzR5NgXlTMvOC8t5l3hyc3PN9KlNpSFEQo8akdstfcaqbLiALE0CDZSWlvYHgRpCOTk5L6ygfXJQWv0ZqVT8gAVgj2OZJ1RDqKys7DPT1i1mqrUkeWqnJWRqSG64ZzSPL/ip6n7SEBInhO5YQRfl1Lb601LZcM+SqOvna35+/hMXUAohuXZCKrEHUaXltAednZ3zXQAuXywW24v/ksZQncslJSV/te8nUwjJCQ2J0wTGk8E7u7q6muWO5JfssgkZ1k4zeInDmhd9zWFd78oRXwohMcgdmDepFl0eAA/S3jQ0NGyZsLh/Zc0w1Vcg00Ze4joLmT9knUfqiwaCpN0YNRLQ6wCe0z5g4+iPIRuTs0mOA/WJbGpq2jA8PHwQVRawrhlxJR7yf3AVKeHQ/qQ2PxlISIKZqihvWoPq3QLk8iWbmxwHcuUVArrPoE48xPTgM7fEqZBKmzIFEyl3YCoit8h7NKmQPvMZaC1tG60Io5fMV/KOFhYWrsf3UJOIXcE51sH0F6jNK50VsoPlpgepw4DKfWaz7UvqA/hf0p7Ip61fU0dHR3Zvb+99Yg5pDjE/ILydRZ52q5gyIQUTKfcZuUIkT+1BOZtcx0EAqRr+DJy0cUWfFiEvyFT6XlJU6BxL4qY3978RkoGpbHhoaOgIlY1TnWambtJtwEt4rj9Xgckq8A/d5rPUKfmlbwAAAABJRU5ErkJggg==) no-repeat left 10px center;
  background-size: 15px;
}
.cancel{
  margin-left: 5px;
}
.addressList {
    overflow: auto;
    width: 100%;
    flex: 1;
    padding: 0 10px;
}
.addressList .case {
  box-sizing: border-box;
    padding: 10px;
    padding-left: 30px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAC9ElEQVRIS8WXTUgVURTH/+c+MqPs+YULk8q+QwhKDSKhD0RwUWBRQoRBbiRX5aaEbBFpEAot1AdhUIuyRUW0sEQoolA0jaQIAzHLXOiMLzNJtLknZsZ5854+ZyYx36zm457/79xzzz33DMHDxQMD8UhILJSsFRAom4k2g9lvmBKNE3M/g7sF+Vox8aOFMjOn3GTJacDPoaGU1XHxFSREGTMnuYmZflCQpQxMTk/Vrs3IUBeyWRDMSrBESlkHQooX4LwxDFUIcYFSk+5Gs58H5re8Qm4cC4BxdlHAuUaE2+JLchnl0Ez4pwiwDuUNwYcMPrIk0FkRAj2lwaTj4fAIsKaoTUs20ygz96WmlFqvQ2BjTVneWcqZztUSJM5Ya26Azexd1bfoRPLqLUOdnP69Xc92A6yNKNUguuTJXukF9d0H1I8AGEjeCd5WDKRlezIHc40vLbWS9OLACf5h133KEtRxBdTbaALnXJxVCt5fA5DP0QF9n9PEeDqxEiySLB+5uUud10Dv6hyH8a5z4H1X3aQgSBwjbVRpBKjMcfTEN4jmHED+cRYlAXmyHUjc4gLnAMlRtZOBXKeR9L4e1FEVGsLpeeCD9cYzvSwHDb+2v+VWgvdUOIcb6CJNGVPBnOwIfnUe9MmufLKo1U6mkW6IxwU2eOsJ8OGAS2RojLRRVY+fY0bQm4ugD7dCYrLwAbA+33z+2gbRUmyDd5wGH7jpts6aJzA+N0O8KLfF16wD51aaoe6qBv36bjuVdwPIci3zmqdQY2YSdG83aGrBU84Ac5wffKoHWJnoHmovyWWoDD6DeF4CsBZdVM/o/CZg01G3MIOM5PKynSyp/icQbdHDKA81AHoF83RxwHMBsfSotwHUfjlCXl9vty0UbmAUEM8lM8zSSKieWnNdPVarkONWydRf/NMhYeJAXdcBOQ3eW6U3Wp4CbJrOHhL6fcyORcORWDQCVpxi0voYs45Vs2fBl729DU/NZW/ow+Ex+YWJmP1/+Gn7C3oLiE7rOhFKAAAAAElFTkSuQmCC) no-repeat left 8px center;
    background-size: 17px;
}
.addressList .case h1 {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #000;
    line-height: 17px;
    margin-bottom: 5px;
}
.addressList .case h5 {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #666;
    line-height: 17px;
}
</style>
