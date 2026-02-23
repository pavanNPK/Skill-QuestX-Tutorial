/* Service worker for Web Push notifications */
self.addEventListener('push', function (event) {
  if (!event.data) return;
  let data = { title: 'Notification', body: '', link: '/', type: '' };
  try {
    data = event.data.json();
  } catch (_) {
    data.body = event.data.text();
  }
  const options = {
    body: data.body || '',
    icon: '/core/logo.svg',
    badge: '/core/logo.svg',
    data: { url: data.link || '/', type: data.type || '' },
    tag: data.type ? 'sqx-' + data.type : 'sqx-push',
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(data.title || 'SkillQuestX', options));
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (windowClients) {
      for (const client of windowClients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
