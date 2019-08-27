<template>
  <div class="about">
    <img alt="Vue logo" src="../../public/img/fox-icon.png" />
    <div>
      <button @click="notifi">通知提醒</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Push from "push.js";

export default {
  name: "home",
  components: {},
  mounted() {
    this.DexieInit();
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
