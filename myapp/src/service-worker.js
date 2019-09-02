// 设置相应缓存的名字的前缀和后缀  这的suffix变更了。也要改下registerServiceWorker。js里
workbox.core.setCacheNameDetails({
  prefix: 'maika',
  suffix: 'v1.2.1',
});
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

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
  new RegExp(''.*\.html'),
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
);*/
