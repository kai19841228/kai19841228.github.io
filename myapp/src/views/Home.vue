<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Push from "push.js";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {
    this.getdata();
    window.vConsole = new window.VConsole();
    Push.create("主页 测试提示");
  },
  methods: {
    getdata() {
      window.$.ajax({
        url: "https://www.apiopen.top/weatherApi?city=北京",
        type: "get",
        dataType: "json",
        success: function(data) {
          window.console.log(data);
        },
        timeout: 3000
      });
    }
  }
};
</script>
