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
    "revision": "3a72b13d76892db69b1a54b08f59733c"
  },
  {
    "url": "/static/css/app.229646f7de33d1ee35a4aa0549e7de24.css",
    "revision": "4c8d0503a6d18f7aad90572a802c5c40"
  },
  {
    "url": "/static/js/app.29b0a3ae566274ca7f2c.js",
    "revision": "167a6bf8965ac12d90fd1e87e3808136"
  },
  {
    "url": "/static/js/manifest.ec5c1604a6b436be2d23.js",
    "revision": "39bccc7818a4ed18147d898e7253aced"
  },
  {
    "url": "/static/js/vendor.502a4784ff2a9d0dc783.js",
    "revision": "b956542b7b4db2b4e28d3e8ad1aa6371"
  },
  {
    "url": "/sw-register.js",
    "revision": "6cc2192ff3cef005a9078f4ac474343a"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
