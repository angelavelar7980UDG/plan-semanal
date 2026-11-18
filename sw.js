// Service worker de Mi Plan Semanal: guarda la app en el teléfono para usarla sin internet.
// La versión cambia sola con cada actualización del código.
const CACHE = "plan-semanal-ac4de3a1";
const ARCHIVOS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-512-maskable.png",
  "fonts/dm-sans-latin.woff2",
  "fonts/unbounded-latin.woff2",
  "fotos/atunCubos.jpg",
  "fotos/atunLata.jpg",
  "fotos/cottage.jpg",
  "fotos/ej-abductores.jpg",
  "fotos/ej-aductores.jpg",
  "fotos/ej-copa-barra.jpg",
  "fotos/ej-core.jpg",
  "fotos/ej-curl-biceps.jpg",
  "fotos/ej-elevacion-lateral.jpg",
  "fotos/ej-extension-pierna.jpg",
  "fotos/ej-femoral-sentado.jpg",
  "fotos/ej-frances.jpg",
  "fotos/ej-hip-thrust.jpg",
  "fotos/ej-jalon-pecho.jpg",
  "fotos/ej-militar.jpg",
  "fotos/ej-pantorrilla.jpg",
  "fotos/ej-patada-gluteo.jpg",
  "fotos/ej-pec-fly.jpg",
  "fotos/ej-peso-muerto-rumano.jpg",
  "fotos/ej-posterior-hombro.jpg",
  "fotos/ej-predicador.jpg",
  "fotos/ej-prensa.jpg",
  "fotos/ej-press-inclinado.jpg",
  "fotos/ej-press-pecho.jpg",
  "fotos/ej-remo-sentado.jpg",
  "fotos/ej-triceps-polea.jpg",
  "fotos/ej-zancada-bulgara.jpg",
  "fotos/ensaladaPollo.jpg",
  "fotos/guacPollo.jpg",
  "fotos/huevosTortillas.jpg",
  "fotos/pescadoPapa.jpg",
  "fotos/pescadoPure.jpg",
  "fotos/polloArroz.jpg",
  "fotos/polloPapa.jpg",
  "fotos/salmonArroz.jpg",
  "fotos/tacos.jpg",
  "fotos/tacosAtun.jpg",
  "fotos/tostadaAguacate.jpg",
  "fotos/tostadasAtun.jpg",
  "fotos/yogurtAvena.jpg",
  "fotos/yogurtFruta.jpg",
  "fotos/yogurtFrutos.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Primero lo guardado (arranca al instante y sin internet); si hay internet, se actualiza en segundo plano.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      const red = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copia = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copia));
          }
          return res;
        })
        .catch(() => hit || (req.mode === "navigate" ? caches.match("index.html") : undefined));
      return hit || red;
    })
  );
});
