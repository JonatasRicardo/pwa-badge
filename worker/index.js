let count = 0;
const setBadge = (...args) => {
    if (navigator.setBadge) {
      return navigator.setBadge(...args);
    } else if (navigator.setExperimentalBadge) {
      return navigator.setExperimentalBadge(...args);
    } else if (navigator.setClientBadge) {
      return navigator.setClientBadge(...args);
    } else if (navigator.setAppBadge) {
      navigator.setAppBadge(...args);
    } else if (navigator.setExperimentalAppBadge) {
      navigator.setExperimentalAppBadge(...args);
    } else if (window.ExperimentalBadge) {
      window.ExperimentalBadge.set(...args);
    }
}

self.addEventListener('fetch', function(e) {
    console.log('SW fetch')
    ++count;
    console.log('SW count', count)
    setBadge(count);
    e.respondWith(fetch(e.request));
});