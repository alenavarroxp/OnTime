// service-worker.js

self.addEventListener('push', function(event) {
    const options = event.data ? JSON.parse(event.data.text()) : {};
  
    event.waitUntil(
      self.registration.showNotification('Hora Actualizada', {
        body: options.body,
        icon: '/path-to-your-icon.png',
        badge: '/path-to-your-icon.png',
        timeout: 4000, // Timeout de la notificación
      })
    );
  });
  