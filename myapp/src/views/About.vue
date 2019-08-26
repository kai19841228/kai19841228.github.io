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
      Push.create("司机已到达", {
        body: "司机会与你即时取得联系。",
        timeout: 10000,
        requireInteraction: true
      });
    }
  }
};
</script>
