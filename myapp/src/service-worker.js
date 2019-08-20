// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: 'maika',
  suffix: 'v1.1.1',
});
// 让我们的service worker尽快的得到更新和获取页面的控制权
workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 对我们请求的数据进行缓存，这里采用 networkFirst 策略
workbox.routing.registerRoute(
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
