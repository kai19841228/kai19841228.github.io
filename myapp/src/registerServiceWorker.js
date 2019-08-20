/* eslint-disable no-console */

import { register } from "register-service-worker";

function removeOldCache(v) {
  var ver = 'maika-prechace-' + v
  return caches
      .keys()
      .then(keys =>
          Promise.all( // 等待所有旧的资源都清理完成
              keys
              .filter(key => !key.startsWith(ver)) // 过滤不需要删除的资源
              .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
          )
      )
      .then(() => {
          console.log('removeOldCache completed.');
      });
}
if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      removeOldCache('v1.2.1')
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
