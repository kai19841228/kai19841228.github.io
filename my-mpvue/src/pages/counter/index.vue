<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">清零</button>
    </p>
    <div class="hello">hello world!!!!{{status[0]}}</div>
    <div v-for="(card, index) in list" :key="index">{{status[index]}}</div>
  </div>
</template>

<script>
// Use Vuex
import store from '@/store/store'

export default {
  data () {
    return {
      status: {
        0: '验证码已发送到您的手机，请注意查看',
        1: '用户不存在或密码错误',
        2: '服务器异常，请稍后重试',
        3: '请输入正确的验证码',
        4: '验证码已过期，请重新获取',
        5: '手机号格式错误，请重新输入',
        6: '您的账户异常',
        7: '获取验证码次数过多，请稍后重试',
        8: '您的账户异常',
        9: '短信下发操作太频繁请稍候再试！', // 校验距离上次发送验证码时间，如未失效则不发送
        10: '当日短信获取次数据已达上限'
      },
      list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    }
  },
  computed: {
    count () {
      return store.getters.getCount
      // return store.state.demo.count
    }
  },
  watch: {
    'count': function (newval, oldval) {
      console.log(newval, oldval)
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      // 直接调用 mutations 改变store
      store.commit('decrement')
    },
    reset () {
      // 调用actions 传递参数 改变store
      store.dispatch({type: 'resetCount', count: 0})
      // 直接调用 mutations传参 改变store
      store.commit({type: 'resetCount', count: 0})
    }
  },
  onLoad () {
    console.log('-------')
    console.log(this.$root.$mp.query)
  },
  mounted: function () {
    console.log('-------')
    console.log(this.$root.$mp.query)
    this.$store.commit('increment')
    console.log(this.$store.getters.getCount)
  },
  onShow (opts) {
    console.log('App Show', opts)
  },
  onHide () {
    console.log('App Hide')
  }
}
</script>

<style lang="postcss" scoped>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.hello{
  font-size: 12px;
  width: 375px;
  background-color: #F00;
}
</style>
