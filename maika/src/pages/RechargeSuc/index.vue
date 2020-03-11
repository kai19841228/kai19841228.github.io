<template>
<div class="rechargeBack container">
  <div v-if="successPage" class="rst">
    <div class="rst_succes" >
      <h2 class="clearfix co_mo">充值成功</h2>
      <img class="pic" style="width:280px;height:230px;" src="../../static/images/rst_icon01.png">
      <!-- <p class="rst_m">账户余额：<span>{{accountAmount}}</span>元</p> -->
    </div>
    <a class="back_index" @click="backHandle">马上用车</a>
  </div>
  <div v-if="errorPage" class="rst">
    <div class="rst_fail" >
      <h2 class="clearfix co_mo">充值失败</h2>
      <img class="pic" style="width:280px;height:180px;" src="../../static/images/rst_icon02.png">
      <!-- <p class="rst_m">账户余额：<span>{{accountAmount}}</span>元</p> -->
    </div>
    <a class="back_index" @click="backHandle">马上用车</a>
  </div>
  <div v-if="loadingPage" class="rst">
    <div class="rst_going" >
      <h2 class="clearfix co_mo">充值处理中...</h2>
      <p class="rstps">请稍后到“APP 钱包”中查看</p>
      <img class="pic" style="width:280px;height:200px;" src="../../static/images/rst_icon03.png">
      <!-- <p class="rst_m">账户余额：<span>{{accountAmount}}</span>元</p> -->
    </div>
    <a class="back_index" @click="backHandle">马上用车</a>
  </div>
</div>
</template>
<script>
import order from '../../services/order'
export default {
  data () {
    return {
      timer: '',
      num: 0,
      successPage: false,
      errorPage: false,
      loadingPage: false,
      payType: '',
      outTradeNo: ''
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
    backHandle () {
      let url = '../index/main'
      uni.reLaunch({ url })
    },
    // 支付回调
    rechargeBack () {
      let self = this
      this.timer = setInterval(() => {
        order.payBack(self)
        self.num++
        if (self.num === 3) {
          clearInterval(self.timer)
        }
      }, 100)
      setTimeout(function () {
        uni.hideLoading()
        if (self.successPage === false && self.errorPage === false && self.loadingPage === false) {
          self.loadingPage = true
        }
      }, 2000)
    }
  },
  onLoad: function (options) {
    console.log(options)
		this.payType = options.payType || 1
		this.outTradeNo = options.outTradeNo || 'RCG1775531424420191219174419'
  },
  mounted () {
    var self = this
    self.num = 0
    uni.showLoading({
      title: '加载中'
    })
    self.rechargeBack()
  },
  destroyed () { // 销毁完成状态
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="postcss" scoped>
.clearfix:after, .clearfix:before {
    display: table;
    content: "";
}
.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.rechargeBack{
  font-size: 15px;
}
.rst{
  padding-top: 3%;
  }

.rst .pic{
      display: block;
      width: 50%;
      margin: 0 auto;
    }
.rst .rst_m{
      display: block;
      width: 100%;
      text-align: center;
      padding-top: 10px;
    }

.rst .rst_m span{
        font-size: 15px;
      }
.rst .back_index{
  box-sizing: border-box;
      display: block;
      width: 90%;
      padding: 0 60px;
      text-align: center;
      height: 45px;
      line-height: 45px;
      background-color: #ff8400;
      color: #fff;
      font-size: 17px;
      margin: 0 auto;
      margin-top: 38px;
      border-radius: 5px;
    }
.rst .rst_succes{
  box-sizing: border-box;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      width: 90%;
      margin: 0 auto;
      padding: 15px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
.rst .rst_succes .co_mo{
        text-align: center;
        padding-top: 10px;
        font-size: 17px;
        color: #333;
        padding-bottom: 10px;
      }
.rst .rst_fail{
  box-sizing: border-box;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      width: 90%;
      margin: 0 auto;
      padding: 15px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
.rst .rst_fail .co_mo{
        text-align: center;
        padding-top: 10px;
        font-size: 17px;
        color: #333;
        padding-bottom: 10px;
      }
.rst_going{
  box-sizing: border-box;
      background-color: #fff;
      border-top: 1px solid #e5e5e5;
      width: 90%;
      margin: 0 auto;
      padding: 15px;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
.rst_going .co_mo{
        text-align: center;
        padding-top: 10px;
        font-size: 17px;
        color: #333;
        padding-bottom: 10px;
      }
.rst_going .rstps{
        text-align: center;
        width: 100%;
        margin-bottom: 10px;
        color: #999;
      }
</style>
