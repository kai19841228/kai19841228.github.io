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
          log('removeOldCache completed.');
      });
}
function cacheKey() {
  return [version, ...arguments].join(':');
}
const version = 'maika_1';
// 1、开启一个缓存
// 2、缓存我们的文件
// 3、确定所有的资源是否要被缓存
self.addEventListener('install', function(e) {
  e.waitUntil(
    // 清理旧版本的一种方法。把老的CacheName删掉。要多刷新几次才能生效
    removeOldCache(),
    caches.open(cacheKey('font')).then(function(cache) {
      return cache.addAll([
        '/A2HS/js/swiper.min.js',
        '/A2HS/js/swiper.animate1.0.3.min.js',
        '/A2HS/css/swiper.min.css',
        '/A2HS/css/animate.min.css',
        '../vconsole.min.js',
        '/A2HS/images/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2'
      ]);
    }).then(function() {
      caches.open(cacheKey('static')).then(function(cache) {
        return cache.addAll([
          '/A2HS/',
          '/A2HS/index.html',
          '/A2HS/style.css',
          '/A2HS/images/fox1.jpg',
          '/A2HS/images/fox2.jpg',
          '/A2HS/images/fox3.jpg',
          '/A2HS/images/fox-icon.png',
          '/A2HS/images/fox4.jpg'
        ]);
      }).then(function() {
        console.log('缓存完毕')
        return self.skipWaiting()
      }).catch(function(e){
        console.log('cache出错')
        console.log(e)
      })
    })
  )
 })
 
//  fetch 用来监听用户的网络请求，并给出回应
self.addEventListener('fetch', function (e) {
    // 需要缓存的xhr请求
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
    /* ******************************* */

    else {
        // 非api请求，直接查询cache
        // 如果有cache则直接返回，否则通过fetch请求
        e.respondWith(
            caches.match(e.request).then(function (cache) {
                return cache || fetch(e.request);
            }).catch(function (err) {
                console.log(err);
                return fetch(e.request);
            })
        );
    }
});

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