<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img alt="Vue logo" src="../../public/img/fox-icon.png" />
    <button @click="notifi">通知提醒</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Push from "push.js";

export default {
  name: "home",
  components: {},
  mounted() {},
  methods: {
    notifi() {
      Push.create("测试提示");
      // if (window.Notification) {
      //   if (window.Notification.permission == "granted") {
      //     var notification = new Notification("你有一条新信息", {
      //       body: "你好我是王小婷",
      //       icon: "/A2HS/images/fox1.jpg"
      //     });
      //     window.console.log(notification);
      //   } else {
      //     window.Notification.requestPermission();
      //   }
      // } else {
      //   alert("你的浏览器不支持此消息提示功能，请使用chrome内核的浏览器！");
      // }
    }
  }
};
</script>
