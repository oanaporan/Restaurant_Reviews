/**
 * Files to cache
 */
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/css/mediumScreens.css',
    '/css/smallScreens.css',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
]
/**
 * Fire the installation event
 */
self.addEventListener('install', (e)=> {
    e.waitUntil(
        caches.open('v1')
        .then(cache => {
           return cache.addAll(cacheFiles);
        })
    );
});

/**
 * Fire the fetch event
 */
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) {
                return response;
            } else {
                return fetch(e.request)
                .then(response => {
                    const clonedResponse = response.clone();
                    caches.open('v1').then(cache => {
                        cache.put(e.request, clonedResponse);
                    })
                    return response;
                })
                .catch(error => {
                    console.error(error);
                })
            }
        })
    )
});

