const CACHE = 'nosso-financeiro-shell-v3-push';
const SHELL = ['./', './index.html', './app.js', './style.css', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('nosso-financeiro-shell-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.endsWith('/config.js')) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('./index.html')));
    return;
  }
  if (!SHELL.some(path => new URL(path, self.registration.scope).pathname === url.pathname)) return;
  event.respondWith(fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(request, copy)); }
    return response;
  }).catch(() => caches.match(request)));
});

self.addEventListener('push',event=>{let data={};try{data=event.data?.json()||{}}catch{data={body:event.data?.text()||''}}const title=String(data.title||'Nosso Financeiro');const opts={body:String(data.body||'Você tem uma nova atualização.'),icon:'./icons/icon-192.png',badge:'./icons/icon-192.png',tag:String(data.tag||'nosso-financeiro-'+Date.now()),data:{url:self.registration.scope}};event.waitUntil(self.registration.showNotification(title,opts))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(async list=>{for(const client of list){if(client.url.startsWith(self.registration.scope)){await client.focus();return}}await clients.openWindow(self.registration.scope)}))});
