<template>
  <div class="wld" style="padding: 10px 20px;">

  <view class="page-body">
    <form @submit="formSubmit" @reset="formReset">
      <view class="weui-cell__bd">
        <input type="text" class="weui-input" :value="motto" placeholder="v-model" />
        <input type="text" class="weui-input" v-model="motto" placeholder="v-model" />
        <input type="text" class="weui-input" v-model.lazy="motto" placeholder="v-model.lazy" />
      </view>

      <view class="page-section page-section-gap">
        <view class="page-section-title">switch</view>
        <switch name="switch" checked="true" @change="switchChange"/>
      </view>

      <radio-group class="radio-group" @change="radioChange" name="radio">
        <label class="radio"  v-for="(item, index) in radioItems" :key="index">
          <radio :value="item.name" :checked="item.checked"/>{{item.value}}
        </label>
      </radio-group>

      <checkbox-group @change="checkboxChange" name="checkbox">
        <label class="checkbox" v-for="(item, index) in items" :key="index">
          <checkbox :value="item.name" :checked="item.checked"/>{{item.value}}
        </label>
      </checkbox-group>

      <view class="page-section page-section-gap">
        <view class="page-section-title">slider</view>
        <slider value="50" name="slider" show-value @change="slideChange"></slider>
      </view>

      <view class="page-section">
        <view class="page-section-title">input</view>
        <view class="weui-cells weui-cells_after-title">
          <view class="weui-cell weui-cell_input">
            <view class="weui-cell__bd">
              <input class="weui-input" @input="inputChange" name="input" placeholder="这是一个输入框" />
            </view>
          </view>
        </view>
      </view>

      <view class="btn-area">
        <button type="primary" formType="submit">Submit</button>
        <button formType="reset">Reset</button>
      </view>
    </form>
  </view>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      article: '<div>我是HTML代码</div>',
      radioItems: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'}
      ],
      items: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        {name: 'BRA', value: '巴西'},
        {name: 'JPN', value: '日本'},
        {name: 'ENG', value: '英国'},
        {name: 'TUR', value: '法国'}
      ]
    }
  },
  components: {
    wxParse
  },
  computed: {
  },
  methods: {
    formSubmit (e) {
      console.log('form发生了submit事件，携带数据为：', e.mp.detail.value)
    },
    formReset (e) {
      console.log('form发生了reset事件，携带数据为：', e)
    },
    radioChange (e) {
      console.log(e.mp.detail.value)
    },
    checkboxChange (e) {
      console.log('checkbox发生change事件，携带value值为：', e.mp.detail.value)
    },
    switchChange (e) {
      console.log('switch发生change事件，携带value值为：', e.mp.detail.value)
    },
    slideChange (e) {
      console.log('slide发生change事件，携带value值为：', e.mp.detail.value)
    },
    inputChange (e) {
      console.log('input发生change事件，携带value值为：', e.mp.detail.value)
    }
  },
  onLoad () {
    // let that = this
  },
  mounted () {
    // let app = getApp()
  }
}
</script>

<style lang="postcss">
</style>
