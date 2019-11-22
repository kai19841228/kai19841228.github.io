<template>
<div>
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
</div>
</template>
<script>
// import order from '@/services/order'
// import store from '@/store/store'
export default {
  data () {
    return {
      rechargeList: [{'amount': 50, 'prompt': '无标签'}, {'amount': 100, 'prompt': '无标签'}, {'amount': 300, 'prompt': '无标签'}, {'amount': 500, 'prompt': '无标签'}, {'amount': 1000, 'prompt': '无标签'}, {'amount': 2000, 'prompt': '无标签'}], // 充值金额列表
      customMoney: '1', // 自定义充值金额
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
      mpvue.navigateBack()
    },
    changeCharge (item) {
      this.rechargeMoney = item
      this.customMoney = ''
      console.log(this.rechargeMoney)
    },
    inputMoney (e) {
      console.log(this.customMoney)
      var self = this
      self.customMoney = self.customMoney.replace(/^0(0+)|[^\d]+/g, '')
      self.rechargeMoney = self.customMoney
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
    box-shadow: 0 5px 6px hsla(0,0%,78%,.5);
}
</style>
