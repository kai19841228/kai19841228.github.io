<template>
  <div class="hello">
    <h1>我是home----- helllo</h1>
    <img alt="Vue logo" src="../../../public/img/fox-icon.png" />
    <div></div>
    <a href="home.html">跳转home页面</a>
    <a href="/">跳转index页面</a>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Push from "push.js";
import ajaxApi from "../../js/axiosConfig";

export default {
  name: "hello",
  components: {},
  mounted() {
    // this.DexieInit();
    ajaxApi
      .getParam("https://www.apiopen.top/weatherApi?city=北京", {})
      .then(function(data) {
        window.console.log(data.data);
      });
  },
  methods: {
    notifi() {
      Push.create("司机已到达", {
        body: "司机会与你即时取得联系。",
        timeout: 10000,
        requireInteraction: true
      });
    },
    DexieInit() {
      var db = new window.Dexie("FriendDatabase");
      db.version(1).stores({
        friends: "++id,name,age"
      });
      db.open();
      db.friends
        .add({ name: "Josephine", age: 22 })
        .then(function() {
          return db.friends
            .where("age")
            .below(25)
            .toArray();
        })
        .then(function(youngFriends) {
          window.console.log(
            "My young friends: " + JSON.stringify(youngFriends)
          );
        })
        .catch(function(e) {
          window.console.log("Error: " + (e.stack || e));
        });
    }
  }
};
</script>
