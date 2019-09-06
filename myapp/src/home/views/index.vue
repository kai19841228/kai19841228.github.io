<template>
  <div class="index">
    <h1>我是home</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "index",
  components: {
    // HelloWorld
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      window.console.log(0);
    }
  }
};
</script>
