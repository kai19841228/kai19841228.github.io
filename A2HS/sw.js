class SimpleEvent {
  constructor() {
      this.listenrs = {};
  }

  once(tag, cb) {
      this.listenrs[tag] || (this.listenrs[tag] = []);
      this.listenrs[tag].push(cb);
  }

  trigger(tag, data) {
      this.listenrs[tag] = this.listenrs[tag] || [];
      let listenr;
      while (listenr = this.listenrs[tag].shift()) {
          listenr(data)
      }
  }
}
function removeOldCache() {
  return caches
      .keys()
      .then(keys =>
          Promise.all( // 等待所有旧的资源都清理完成
              keys
              .filter(key => !key.startsWith(version)) // 过滤不需要删除的资源
              .map(key => caches.delete(key)) // 删除旧版本资源，返回为 Promise 对象
          )
      )
      .then(() => {
          console.log('removeOldCache completed.');
      });
}
function cacheKey() {
  return [version, ...arguments].join(':');
}
const version = 'maika_v40';
const ignoreCache = [
  /https?:\/\/hm.baidu.com\//,
  /https?:\/\/cdn.bootcss.com\//,
  /https?:\/\/static.duoshuo.com\//,
  /https?:\/\/www.google-analytics.com\//,
  /https?:\/\/dn-lbstatics.qbox.me\//,
  /https?:\/\/ajax.cloudflare.com\//,
  /https?:\/\/cdn1.lncld.net\//,
  /https?:\/\/api.leancloud.cn\//,
  /https?:\/\/lzw.me\/wp\-admin/,
];
// 1、开启一个缓存
// 2、缓存我们的文件
// 3、确定所有的资源是否要被缓存
self.addEventListener('install', function(e) {
  e.waitUntil(
    // 清理旧版本的一种方法。把老的CacheName删掉。要多刷新几次才能生效
    removeOldCache(),
    self.skipWaiting()
  )
 })
 // 优先从网络请求，失败则使用离线资源替代
function networkedOrOffline(request) {
  return fetch(request)
      .then(response => {
          console.log('(network)', request.method, request.url);
          return response;
      })
      .catch(() => cachedResponse(request));
}
// 从缓存读取或使用离线资源替代
function cachedResponse(request) {
  return caches
      .match(request)
      .then((response) => response );
}
// 优先从 cache 读取，读取失败则从网络请求并缓存。网络请求也失败，则使用离线资源替代
function cachedOrNetworked(request) {
  return caches.match(request)
      .then((response) => {
          console.log(response ? '(cached)' : '(network: cache miss)', request.method, request.url);
          return response ||
              networkedAndCache(request)
      });
}
// 从网络请求，并将请求成功的资源缓存
function networkedAndCache(request) {
  return fetch(request)
      .then(response => {
          const copy = response.clone();

          caches.open(cacheKey('resources'))
              .then(cache => {
                  cache.put(request, copy);
              });

          console.log("(network: cache write)", request.method, request.url);
          return response;
      });
}
// 不需要缓存的请求
function shouldAlwaysFetch(request) {
  return request.method !== 'GET' || ignoreCache.some(regex => request.url.match(regex));
}
// 缓存 html 页面
function shouldFetchAndCache(request) {
  return (/text\/html/i).test(request.headers.get('Accept'));
}
function onFetch(event) {
  const request = event.request;
if(request.url.startsWith('chrome-extension')) { return}
  // 应当永远从网络请求的资源
  // 如果请求失败，则使用离线资源替代
  if (shouldAlwaysFetch(request)) {
      console.log('AlwaysFetch request: ', event.request.url);
      event.respondWith(networkedOrOffline(request));
      return;
  }

  // 应当从网络请求并缓存的资源
  // 如果请求失败，则尝试从缓存读取，读取失败则使用离线资源替代
  if (shouldFetchAndCache(request)) {
      event.respondWith(
          networkedAndCache(request).catch(() => cachedResponse(request))
      );
      return;
  }
var cacheRequestUrls = [
    '/weatherApi'
];
var needCache = cacheRequestUrls.some(function (url) {
  return event.request.url.indexOf(url) > -1;
})
if (needCache) {
  // 需要缓存
  // 使用fetch请求数据，并将请求结果clone一份缓存到cache
  // 此部分缓存后在browser中使用全局变量caches获取
  networkedAndCache(request)
}
  event.respondWith(cachedOrNetworked(request));
}
//  fetch 用来监听用户的网络请求，并给出回应
self.addEventListener('fetch', onFetch);

//  你的 Service worker 总会有要更新的时候。在那时，你需要按照一下步骤来更新：
// 1、更新你 service worker 的 JavaScript 文件。
// 2、更新后的 service worker 启动并触发 install 事件。
// 3、此时，当前页面生效的依然是老版本的 service worker ，新的 service worker 会进入“waitting”状态。
// 4、当页面关闭后，来的 service worker 会被干掉，新的 service worker 接管页面。
// 5、一旦新的 service worker 生效后会触发 active 事件。
self.addEventListener('activate', function (event) { 
  // 监听worker的activate事件
  console.log('activate')
  event.waitUntil(Promise.all([
    // 更新客户端
    self.clients.claim(),
    removeOldCache()
  ]))
});
  
  // 在index。html里注册同步，断网后重连会调用 e.tag 为 sample_sync执行操作。
self.addEventListener('sync', function (e) {
  console.log(`service worker需要进行后台同步，tag: ${e.tag}`);
  var init = {
      method: 'GET'
  };
  if (e.tag === 'sample_sync') {
      // var request = new Request(`https://gw-passenger-wap.01zhuanche.com/gw-passenger-wap/zhuanche-passenger/api/v1/common/group/list?type=1&cid=44&nId=&sId=2`, init);
      // e.waitUntil(
      //     fetch(request).then(function (response) {
      //         response.json().then(console.log.bind(console));
      //         return response;
      //     })
      // );
  }
});

const simpleEvent = new SimpleEvent();
self.addEventListener('message', function (e) {
    var data = JSON.parse(e.data);
    var type = data.type;
    var msg = data.msg;
    console.log(`service worker收到消息 type：${type}；msg：${JSON.stringify(msg)}`);

    simpleEvent.trigger(type, msg);
});

// 监听通知 点击关闭  // showNotification 能够设置actions
self.addEventListener('notificationclick', event => {
  // notification click event
  console.log(event.action)
});

self.addEventListener('notificationclose', event => {
  // notification closed event
  console.log(event)
});