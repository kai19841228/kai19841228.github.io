self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('demo-store').then(function(cache) {
      console.log(cache)
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
 
 self.addEventListener('fetch', function(e) {
   console.log(e.request.url);
   e.respondWith(
     caches.match(e.request).then(function(response) {
       return response || fetch(e.request);
     })
   );
 });