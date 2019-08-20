<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted () {
    this.getdata()
  },
  methods: {
    getdata (){
      $.ajax({
          url: 'https://www.apiopen.top/weatherApi?city=北京',
          type: 'get',
          dataType:"json",
          success: function(data) {console.log(data)
        resolve(data)
      },
          timeout: 3000           
      });
    }
  }
};
</script>
