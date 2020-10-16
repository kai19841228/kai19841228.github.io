<template>
  <div class="wld">
    <wxParse :content="article" @preview="preview" @navigate="navigate" />
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'

export default {
  data () {
    return {
      article: '<div>我是HTML代码</div>'
    }
  },
  components: {
    wxParse
  },
  computed: {
  },
  methods: {
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },
    preview (src, e) {
      // do something
    },
    navigate (href, e) {
      // do something
    }
  },
  onLoad () {
    let that = this
    let _header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
    var token = mpvue.getStorageSync('myCarWebtoken')
    if (token) {
      _header['token'] = token
    }
    this.$request.post(that.$baseUrl + '/car-web/account/login', {
      userName: 'wanglidong',
      password: 'abc123'
    }, {headers: _header})
      .then(function (response) {
        console.log(response.data)
        if (response.data.code === 0) {
          // do something
          console.log(response.data.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  mounted () {
    // let app = getApp()
    let that = this
    let article = `
<div style="width:100%;text-align:center;">
<img class="wld" src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_02.jpg" alt="wxParse-微信小程序富文本解析组件Logo">
<img class="wld" src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_03.jpg" alt="wxParse-微信小程序富文本解析组件Logo">
<h1 style="color:red;">wxParse-微信小程序富文本解析:组件</h1>
<h2 class="aa">支持Html及markdown转wxml可视化</h2>
</div>
<div style="margin-top:10px;">
<h3 style="color: #000;">支持video</h3>
<div style="margin-top:10px;">
<video poster="https://images.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_02.jpg" src="https://images.01zhuanche.com/frontapp/activity/201711/video/gy.mp4"></video>
</div>
</div>


<div style="margin-top:10px;">
<h3 style="color: #000;">支持的标签</h3>
<blockquote>wxParse支持70%的html的标签</blockquote>
<div style="margin-top:10px;">
<span>span标签</span>
<strong style="color: red;">strong标签</strong>
</div>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持的标签ul/li</h3>
<blockquote>带有内联的li</blockquote>
<div style="margin-top:10px;">
<ul>
<li style="color: red;">我是li 红色</li>
<li style="color: blue;">我是li 蓝色</li>
<li style="color: yelloe;">我是li 黄色</li>
</ul>
</div>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持内联样式style</h3>
<blockquote>wxParse可以渲染原html带有的style样式</blockquote>
<div style="margin-top:10px;">
<span>span标签</span>
<strong>strong标签</strong>
</div>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持class潜入</h3>
<blockquote>wxParse可以注入html带有的class属性</blockquote>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持图片自适应</h3>
<blockquote>wxParse可以动态计算图片大小并进行自适应适配</blockquote>
<div style="margin-top:10px;">
<img src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_01.jpg" alt="">
<img src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_02.jpg" alt="">
<img src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_03.jpg" alt="">
<img src="https://img.yun.01zhuanche.com/frontapp/activity/201711/imgs/gy/gy_04.jpg" alt="">
</div>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持图片点击预览,左右滑动预览</h3>
<blockquote>wxParse可以讲一篇文章中的几个图片一起预览</blockquote>
<div style="margin-top:10px;">
你可以点击上面的图片，将会进入预览视图，同时左右滑动可以切换图片预览
</div>
</div>

<div style="margin-top:10px;">
<h3 style="color: #000;">支持多数据循环渲染</h3>
<blockquote>wxParse支持特定设置下的多数据渲染，适用于在评论、多文本分别渲染等</blockquote>
<div style="margin-top:10px; text-align:center;">
请继续向下看，循环渲染多条html评论
</div>
</div>
<div style="margin-top:10px;">
<h3 style="color: #000;">支持短table标签</h3>
<blockquote>wxParse目前对于table的支持比较有限</blockquote>
<div style="margin-top:10px; text-align:center;">
<table>
<tr>
<th>标题1</th>
<th>标题2</th>
<th>标题3</th>
<th>标题4</th>
<th>标题5</th>
</tr>
<tr>
<td>cell1</td>
<td>cell2</td>
<td>cell3</td>
<td>cell4</td>
<td>cell5</td>
</tr>
<tr>
<td>cell1</td>
<td>cell2</td>
<td>cell3</td>
<td>cell4</td>
<td>cell5</td>
</tr>
</table>
</div>
</div>`
    setTimeout(function () {
      that.article = article
    }, 3000)
  }
}
</script>

<style lang="postcss">
@import url("~mpvue-wxparse/src/wxParse.css");
.wld .wxParse .img {
  vertical-align: top!important;
}
</style>
