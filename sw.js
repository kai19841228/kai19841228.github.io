importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/index.html",
    "revision": "c6e95a018439e36578e8f908a5697f40"
  },
  {
    "url": "/static/css/app.8d8a190cf3c99f618844ba4eb4a97c2a.css",
    "revision": "be8d932f315aa8c970ffc41a4a031df7"
  },
  {
    "url": "/static/js/app.95f997aa31ff15d2b9c0.js",
    "revision": "638a86c13075025077e17886e6366294"
  },
  {
    "url": "/static/js/manifest.ed0433ff21b7a7faf8e0.js",
    "revision": "fec0ef61719088c293000dccdbe1baef"
  },
  {
    "url": "/static/js/vendor.5973cf24864eecc78c48.js",
    "revision": "fc79374f52480a174479bbd132fc35e0"
  },
  {
    "url": "/sw-register.js",
    "revision": "13c8541b27e1989a95d74cb029b1dfbb"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
