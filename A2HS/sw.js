// 1、开启一个缓存
// 2、缓存我们的文件
// 3、确定所有的资源是否要被缓存

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('demo-store').then(function(cache) {
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
 self.addEventListener('fetch', function(e) {
   console.log(e.request.url);
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });

//  你的 Service worker 总会有要更新的时候。在那时，你需要按照一下步骤来更新：
// 1、更新你 service worker 的 JavaScript 文件。
// 2、更新后的 service worker 启动并触发 install 事件。
// 3、此时，当前页面生效的依然是老版本的 service worker ，新的 service worker 会进入“waitting”状态。
// 4、当页面关闭后，来的 service worker 会被干掉，新的 service worker 接管页面。
// 5、一旦新的 service worker 生效后会触发 active 事件。

 self.addEventListener('activate', function (event) { 
  // 监听worker的activate事件
    event.waitUntil( // 延迟activate事件直到
      caches.keys().then(function(keys){
        return Promise.all(keys.map(function(key, i){ // 清除旧版本缓存
          if(key !== 'demo-store'){
            return caches.delete(keys[i]);
          }
        }))
      })
    )
  });
  