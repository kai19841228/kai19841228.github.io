// 设置相应缓存的名字的前缀和后缀
workbox.core.setCacheNameDetails({
  prefix: 'browse-exp',
  suffix: 'v1.0.0',
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