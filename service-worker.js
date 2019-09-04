importScripts("/precache-manifest.781d74c35b09f5892f6adf93aea0816f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 设置相应缓存的名字的前缀和后缀  这的suffix变更了。也要改下registerServiceWorker。js里
const version = 'v1.2.4';

workbox.core.setCacheNameDetails({
  prefix: 'maika',
  suffix: version,
});
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// html的缓存策略
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst()
)
workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.staleWhileRevalidate()
)
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 6000, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
              maxAgeSeconds: 30 * 24 * 60 * 60, // 这只最长缓存时间为 30 天
          }),
      ],
  }),
);

function contain (str, conStr) {
  return str.indexOf(conStr) !== -1
}
function cacheKey() {
  return [version, ...arguments].join(':');
}
function removeOldCache() {
  return caches
      .keys()
      .then(keys =>
          Promise.all( // 等待所有旧的资源都清理完成
              keys
              .filter(key => !contain (key, version)) // 过滤不需要删除的资源
              .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
          )
      )
      .then(() => {
          console.log('removeOldCache completed.');
      });
}
self.addEventListener('install', function(e) {
  console.log('install')
  e.waitUntil(
    // 清理旧版本的一种方法。把老的CacheName删掉。要多刷新几次才能生效
    removeOldCache(),
    self.skipWaiting()
  )
})
self.addEventListener('activate', function (event) { 
  // 监听worker的activate事件
  console.log('activate')
  event.waitUntil(Promise.all([
    // 更新客户端
    self.clients.claim(),
    removeOldCache()
  ]))
});
self.addEventListener('sync', function (e) {
})
// 监听通知 点击关闭  // showNotification 能够设置actions
self.addEventListener('notificationclick', event => {
  // notification click event
  console.log(event.action)
});

self.addEventListener('notificationclose', event => {
  // notification closed event
  console.log(event)
});
// push推送消息
self.addEventListener('push', function (e) {
  var data = e.data;
  console.log(e)
  if (e.data) {
      data = data.json();
      console.log('push的数据为：', data);
      self.registration.showNotification(data);        
  } 
  else {
      console.log('push没有任何数据');
  }
})
// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
/*workbox.routing.registerRoute(
  new RegExp('.\*experiments?.\*'),
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  new RegExp('.\*experiments/\\d'),
  workbox.strategies.networkFirst()
)
workbox.routing.registerRoute(
  new RegExp('.\*experiment\_types.\*'),
  workbox.strategies.networkFirst()
)
workbox.routing.registerRoute(
  new RegExp('/^https:\/\/api/'),
  workbox.strategies.networkFirst()
)
workbox.routing.registerRoute(
  new RegExp('/^https:\/\/cdn/'),
  workbox.strategies.networkFirst()
)*/

// html的缓存策略
/*
workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  workbox.strategies.networkFirst()
)
workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.cacheFirst()
)

workbox.routing.registerRoute(
  new RegExp('https://your\.cdn\.com/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('https://your\.img\.cdn\.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'example:img'
  })
)
workbox.routing.registerRoute(
  new RegExp('/.*\.js/'),
  new RegExp('/.*\.css/'),
  workbox.strategies.cacheFirst({
    cacheName: 'example:img'
  })
)
runtimeCaching: [
    {
      // To match cross-origin requests, use a RegExp that matches
      // the start of the origin:
      urlPattern: new RegExp('^https://api'),
      handler: 'staleWhileRevalidate',
      options: {
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [200]
        }
      }
    },
    {
      urlPattern: new RegExp('^https://cdn'),
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 2 seconds.
        networkTimeoutSeconds: 2,
        cacheableResponse: {
          statuses: [200]
        }
      }
    }
  ]
*/

/*
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  new workbox.strategies.CacheFirst({
      cacheName: 'my-image-cache',
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
              maxAgeSeconds: 30 * 24 * 60 * 60, // 这只最长缓存时间为 30 天
          }),
      ],
  }),
);
*/

