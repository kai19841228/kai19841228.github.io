// 1、开启一个缓存
// 2、缓存我们的文件
// 3、确定所有的资源是否要被缓存
var CacheName = 'demo-store'
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CacheName).then(function(cache) {
      return cache.addAll([
        '/A2HS/',
        '/A2HS/index.html',
        '/A2HS/index.js',
        '/A2HS/style.css',
        '/A2HS/images/fox1.jpg',
        '/A2HS/images/fox2.jpg',
        '/A2HS/images/fox3.jpg',
        '/A2HS/images/fox4.jpg'
      ]);
    })
  );
 });
 
//  fetch 用来监听用户的网络请求，并给出回应
var apiCacheName = 'api-0-1-1';
self.addEventListener('fetch', function (e) {
    // 需要缓存的xhr请求
    var cacheRequestUrls = [
        '/journalismApi'
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
        caches.open(apiCacheName).then(function (cache) {
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
    event.waitUntil( // 延迟activate事件直到
      caches.keys().then(function(keys){
        return Promise.all(keys.map(function(key, i){ // 清除旧版本缓存
          if(key !== CacheName && key !== apiCacheName){
            return caches.delete(keys[i]);
          }
        }))
      })
    )
  });
  
  // 在index。html里注册同步，断网后重连会调用 e.tag 为 sample_sync执行操作。
  self.addEventListener('sync', function (e) {
    console.log(`service worker需要进行后台同步，tag: ${e.tag}`);
    var init = {
        method: 'GET'
    };
    if (e.tag === 'sample_sync') {
        var request = new Request(`https://gw-passenger-wap.01zhuanche.com/gw-passenger-wap/zhuanche-passenger/api/v1/common/group/list?type=1&cid=44&nId=&sId=2`, init);
        e.waitUntil(
            fetch(request).then(function (response) {
                response.json().then(console.log.bind(console));
                return response;
            })
        );
    }
});