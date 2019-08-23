'use strict';

const version = 'v5::';
const staticCacheName = version + 'static';
const pagesCacheName = 'pages';
const imagesCacheName = 'images';
const maxPages = 50;
const maxImages = 100;
const timeout = 3000; // Number of milliseconds before timing out

const cacheList = [
    staticCacheName,
    pagesCacheName,
    imagesCacheName
];

function updateStaticCache() {
    return caches.open(staticCacheName)
    .then( cache => {
        // These items won't block the installation of the Service Worker
        // cache.addAll([
        //     '/skins/default/images/curved.jpg',
        //     '/includes/css/print.css',
        // ]);
        // These items must be cached for the Service Worker to complete installation
        return cache.addAll([
            '/assets/js/main.polyfills_v2.0.0.min.js',
            '/assets/css/main_v2.0.0.min.css',
            '/assets/type/sans/SourceSansPro-Regular-subset.woff2',
            '/assets/type/sans/SourceSansPro-It-subset.woff2',
            '/assets/type/sans/source-sans-pro-v12-latin-600.woff2',
            '/assets/type/sans/source-sans-pro-v12-latin-700.woff2',
            '/offline/'
        ]);
    });
}


// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
    .then( keys => {
        return Promise.all(keys
            .filter(key => !cacheList.includes(key))
            .map(key => caches.delete(key))
        );
    });
}

function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
    .then( cache => {
        cache.keys()
        .then(keys => {
            if (keys.length > maxItems) {
                cache.delete(keys[0])
                .then( () => {
                    trimCache(cacheName, maxItems)
                });
            }
        });
    });
}

addEventListener('install', event => {
    event.waitUntil(
        updateStaticCache()
        .then( () => {
          return skipWaiting()
        })
    );
});

addEventListener('activate', event => {
    event.waitUntil(
        clearOldCaches()
        .then( () => {
            return clients.claim()
        })
    );
});

// Avoid unnecessary delays caused by making duplicated requests
if (registration.navigationPreload) {
    addEventListener('activate', event => {
        event.waitUntil(
            registration.navigationPreload.enable()
        );
    });
}

self.addEventListener('message', event => {
    if (event.data.command == 'trimCaches') {
        trimCache(pagesCacheName, maxPages);
        trimCache(imagesCacheName, maxImages);
    }
});

addEventListener('fetch', event => {
    const request = event.request;

    // Ignore requests to some directories
    if (request.url.includes('/cms')) {
        return;
    }

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    const retrieveFromCache = caches.match(request);

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            new Promise( resolveWithResponse => {

                const timer = setTimeout( () => {
                    // Time out: CACHE
                    retrieveFromCache
                    .then( responseFromCache => {
                        if (responseFromCache) {
                            resolveWithResponse(responseFromCache);
                        }
                    })
                }, timeout);

                const retrieveFromFetch = event.preloadResponse || fetch(request);

                retrieveFromFetch
                .then( responseFromFetch => {
                    // NETWORK
                    clearTimeout(timer);
                    const copy = responseFromFetch.clone();
                    // Stash a copy of this page in the pages cache
                    try {
                        event.waitUntil(
                            caches.open(pagesCacheName)
                            .then( pagesCache => {
                                return pagesCache.put(request, copy);
                            })
                        );
                    } catch (error) {
                        console.error(error);
                    }
                    resolveWithResponse(responseFromFetch);
                })
                .catch( fetchError => {
                    clearTimeout(timer);
                    console.error(fetchError);
                    // CACHE or FALLBACK
                    caches.match(request)
                    .then( responseFromCache => {
                        resolveWithResponse(
                            responseFromCache || caches.match('/offline/')
                        );
                    });
                });

            })
        )
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
        .then(responseFromCache => {
            // CACHE
            return responseFromCache || fetch(request)
            .then( responseFromFetch => {
                // NETWORK
                // If the request is for an image, stash a copy of this image in the images cache
                if (request.url.match(/\.(jpe?g|png|gif|svg|mapbox)/)) {
                    const copy = responseFromFetch.clone();
                    try {
                        event.waitUntil(
                            caches.open(imagesCacheName)
                            .then( imagesCache => {
                                return imagesCache.put(request, copy);
                            })
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
                return responseFromFetch;
            })
            .catch( fetchError => {
                console.error(fetchError);
                // FALLBACK
                // show an offline placeholder
                if (request.url.match(/\.(jpe?g|png|gif|svg|mapbox)/)) {
                    return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store'}});
                }
            });
        })
    );
});
