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
self.addEventListener('fetch', function (e) {
  // 需要缓存的xhr请求白名单
  var cacheRequestUrls = [
    '/weatherApi'
  ];
  console.log('现在正在请求：' + e.request.url);
  // 判断当前请求是否需要缓存
  var needCache = cacheRequestUrls.some(function (url) {
    return e.request.url.indexOf(url) > -1;
  });
  /**** 这里是对XHR数据缓存的相关操作 ****/
  if (needCache) {
    // 需要缓存
    // 使用fetch请求数据，并将请求结果clone一份缓存到cache
    // 此部分缓存后在browser中使用全局变量caches获取
    caches.open(cacheKey('api')).then(function (cache) {
        return fetch(e.request).then(function (response) {
            cache.put(e.request.url, response.clone());
            return response;
        });
    });
    console.log("需要缓存")
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
