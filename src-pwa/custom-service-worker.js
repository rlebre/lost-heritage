/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(async function () {
        try {
            var res = await fetch(event.request);
            var cache = await caches.open('cache');
            cache.put(event.request.url, res.clone());
            return res;
        }
        catch (error) {
            return caches.match(event.request);
        }
    }());
});

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('cache').then(function (cache) {
            return cache.addAll([
                "./app/",
                "./app/index.html",
                "./app/style.css",
                "./app/app.js"
            ]);
        })
    );
});