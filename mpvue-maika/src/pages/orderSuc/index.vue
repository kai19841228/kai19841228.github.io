<template>
<div class="orderSuc">
  <div class="hold">
    <div class="driver">
      <div class="driverHold">
        <ul class="driverData">
          <li>
            <img class="head" src= "/static/images/icon_driver.png">
          </li>
          <li class="center">
            <h1>{{driverData.driverName || '程师傅'}}</h1>
            <h2>{{driverData.carNo || '京B8888'}}</h2>
            <p>{{driverData.color+driverData.modelDetail || '白色 新能源'}}</p>
          </li>
          <li>
            <h3><img class="start" src="/static/images/icon_star.png"> {{driverData.score}} {{driverData.orderCount || 0}}单</h3>
            <p style="text-align:center;margin-top:8px;"><img @click="callPhone" class="phone" src="/static/images/icon_phone.png"></p>
          </li>
        </ul>
      </div>
      <div class="Handle">
        <a class="submit" @click="cancel()">取消订单</a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
      orderId: '',
      orderNo: '',
      driverData: {
        driverPhone: '10086',
        score: 3.5000,
        orderCount: 10
      }
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    'driverData.score': function (val, val1) {
      this.driverData.score = this.keepOneNumber(this.driverData.score)
    }
  },
  methods: {
    keepOneNumber (val) {
      if (!val) return '5.0'
      return Number(val).toFixed(1)
    },
    backPage () {
      mpvue.navigateBack()
    },
    // 取消订单
    cancel () {
      order.cancelOrderPrejudge(this)
    },
    // 打电话
    callPhone () {
      mpvue.makePhoneCall({
        phoneNumber: this.driverData.driverPhone // 仅为示例，并非真实的电话号码
      })
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.orderNo = options.orderNo
    this.orderId = options.orderId
    console.log(this.orderNo)
  },
  mounted () {
    order.getDriver(this)
    var self = this
    setTimeout(function () {
      self.driverData.score = ''
    }, 300)
  }
}
</script>
<style lang="postcss" scoped>
.orderSuc{
  height: 100%;
  background-color: #fff;
}

  .hold{
    border-top: 15px solid #f7f7f7;
  }
    .driver{
      padding: 15px;
      
    }
  .driver  .driverHold .driverData{
          display: -ms-flexbox;
          display: -webkit-box;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-size: 15px;
          color: #666;
          border-bottom: 2px solid #D2D2D2;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
  .driverHold  .driverData .center{
            flex: 1;
          }
        .driverHold  .driverData  li h1{
              font-size: 20px;
            }
        .driverHold  .driverData  li   h2{
              font-size: 15px;
              color: #FF8400;
              padding: 4px 0;
            }
        .driverHold  .driverData  li   h3{
              font-size: 15px;
            }
        .driverHold  .driverData  .head{
            width: 80px;
            height: 80px;
            padding-right: 10px;
          }
        .driverHold  .driverData  .start{
            width: 15px;
            height: 15px;
            vertical-align:text-top;
          }
        .driverHold  .driverData  .phone{
            width: 30px;
            height: 30px;
          }
      .Handle{
        width: 100%;
        text-align:center;
      }
      .Handle  .submit{
          display: inline-block;
          width: 33%;
          height:40px;
          border-radius:10px;
          font-size:13px;
          font-family:PingFang SC;
          font-weight:600;
          color:#666666;
          line-height:40px;
          text-align: center;
          margin: 0 auto;
          padding-left: 10px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBElEQVRYR8WXPWgbQRCF3+jcSJUhkaoYQ8BdwEWKxNVpQgwBgxuDwCF1wK6cyu21qezKBtchAUGagMHgkNNWkosUgnQBg0gqKYFUUqPTmD3uxOos6X5SrKoDzcz7dnZmdpdg+UeW9ZEZwPO8kuu6LwDsAHgOYAPAarSAfwB+AugAuFRKffM8b5JlcakAzWbTqdVqb0XkGMB6lqAAekT0vt/vXzQajWCZz1IA3/efAPgAYDOjcNKsC+ANM/9Y5L8QQCm1GwTBJyKqFBQP3URk6DjOvuu6X+bFmQugxSeTyWcAK/8jbviOS6XS3jyIewA67SJyE638FxH9FpGtIiBE1BaRRwDWdCaI6FlyO2YAdMFVq9Xv8Z7rAMPh8FW5XP4YVX8ejsvRaPS6UqlcGQvoDgaDp2ZhzgC0Wq0DETlLqISBckIs9CGiw3q9fh5rTAGiPr9d0Gp5INJse0qpx/GcmAL4vv8SwPWSHKcF1q5ZbLTdNjN/1R8mwAmAo5RNXiaQVVxLnDLzuyRAOxqxaYU2TyiPuI7fYeaws8wM/AHwIE09+t8URIEi/cvMD5MAYwBORoDpfuuPnB2iXQJmDoecmQHrANa3wHoRWm9Du4PI+ijWLWH1MNIA1o9jDWH1QhJPQatXMhPC2qU0hrB6LY8hrD5MzJPR2tMsx/FcyDT1bVgoag6nO+AFkjCW0DBCAAAAAElFTkSuQmCC) no-repeat left 10px center;
          background-size: 15px;
          border: 1px solid #d1d0cf;
          border-radius: 20px;
        }
</style>
