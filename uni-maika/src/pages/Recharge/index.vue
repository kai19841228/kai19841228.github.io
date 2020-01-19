<template>
<div class="container">
  <div class="midd">
    <div class="pack">
      <h3>充值金额：</h3>
      <div class="list">
        <ul class="clearfix">
          <li v-for="(item, i) in rechargeList" :key="i" :class="[rechargeMoney==item.amount&&customMoney=='' ? 'on' : '']" @click="changeCharge(item.amount)">{{item.amount}}元</li>
        </ul>
      </div>
      <input type="tel" placeholder="请输入其他金额" class="input_je" v-model="customMoney" @blur="inputMoney" @input="inputMoney" maxlength="6">
    </div>
  </div>
  <div class="submitHold"><view class="submit" @click="submitHandle">充值</view></div>
</div>
</template>
<script>
export default {
  data () {
    return {
      rechargeList: [{'amount': 50, 'prompt': '无标签'}, {'amount': 100, 'prompt': '无标签'}, {'amount': 300, 'prompt': '无标签'}, {'amount': 500, 'prompt': '无标签'}, {'amount': 1000, 'prompt': '无标签'}, {'amount': 2000, 'prompt': '无标签'}], // 充值金额列表
      customMoney: '', // 自定义充值金额
      rechargeMoney: 0
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
    changeCharge (item) {
      this.rechargeMoney = item
      this.customMoney = ''
    },
    inputMoney (e) {
      var self = this
      self.customMoney = self.customMoney.replace(/^0(0+)|[^\d]+/g, '')
      self.rechargeMoney = self.customMoney
    },
    submitHandle () {
			if (!this.rechargeMoney) {
				uni.showToast({
				  title: '请选择金额',
				  icon: 'none',
				  duration: 2000
				})
				return false
			}
			if (this.rechargeMoney > 2000) {
				uni.showToast({
				  title: '交易金额必须小于2000元',
				  icon: 'none',
				  duration: 2000
				})
				return false
			}
      let url = '/pages/RechargeSure/index?rechargeMoney=' + this.rechargeMoney
      uni.navigateTo({ url })
    }
  },
  onLoad: function (options) {
    console.log(options)
  },
  mounted () {
  }
}
</script>
<style scoped>
.midd {
    width: 100%;
    border-top: 15px solid #f7f7f7;
}
.midd .pack {
    width: 90%;
    margin: 0 auto;
    font-size: 15px;
    color: #999;
}
.midd .pack h3 {
    height: 50px;
    line-height: 50px;
    color: #333;
    font-size: 15px;
}
.clearfix:after, .clearfix:before {
    display: table;
    content: "";
}
.midd .pack .list .clearfix li {
    width: 30%;
    float: left;
    text-align: center;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-bottom: 5%;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 5%;
    background-color: #efefef;
    color: #222;
    box-shadow: 0 3px 6px hsla(0,0%,78%,.5);
}
.midd .pack .list .clearfix li:nth-child(3n+3) {
    margin-right: 0;
}
.midd .pack .list .clearfix li.on {
    background: #ff8400;
    background-size: 26%;
    overflow: hidden;
    color: #fff;
}
.midd .pack .input_je {
    height: 40px;
    line-height: 40px;
    padding: 5px 0;
    width: 100%;
    display: block;
    padding-left: 15px;
    border-radius: 10px;
    font-size: 20px;
    background-color: #efefef;
    color: #222;
    box-shadow: 0 5px 6px hsla(0,0%,78%,.5);box-sizing: border-box;
}
.submitHold{
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
}
.submitHold .submit {
    display: block;
    height: 38px;
    background: #ff8400;
    border: 1px solid #ff8400;
    border-radius: 5px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #fff;
    line-height: 38px;
    text-align: center;
}
</style>
