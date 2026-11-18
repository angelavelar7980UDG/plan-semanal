# Mi Plan Semanal

App personal de comida y ejercicio (perfiles Angel y Macarena). Se instala en el iPhone como una app y **funciona sin internet**.

## Instalar en el iPhone

1. Abre el enlace de la app en **Safari** (con internet, solo esta primera vez).
2. Toca **Compartir** (el cuadro con la flecha) → **Agregar a pantalla de inicio** → **Agregar**.
3. Abre la app desde el ícono. Espera unos segundos con internet para que se guarde todo.
4. Listo: a partir de ahí abre sin Wi‑Fi ni datos, también en modo avión.

> Importante: instálala desde Safari. Si la instalas desde otro navegador no queda como app independiente.

## Tus datos

- Todo (comidas elegidas, series, pesos, pasos) se guarda **en el teléfono**, por perfil.
- Los datos de la app instalada son independientes de los de cualquier otra versión que hayas abierto en el navegador: empieza desde cero.
- Si borras la app o los datos del sitio en Ajustes, se pierde el historial.

## Actualizar la app

Cuando se suba una versión nueva a GitHub, la app instalada la descarga sola la próxima vez que la abras con internet y la usa la siguiente vez que la abras (cierra la app deslizándola hacia arriba y vuelve a abrirla).

## Pasos de Apple Salud

Una página web no puede leer Salud directamente. Crea un atajo en la app **Atajos**: *Buscar muestras de salud* (Pasos, hoy) → *Calcular estadísticas* (suma) → *Copiar al portapapeles*. Tócalo, abre la app y pega el número en el campo de pasos.

## Para quien mantiene el código

Es un sitio estático (sin build):

| Archivo | Para qué |
| --- | --- |
| `index.html` | La app completa (HTML, CSS y JS) |
| `manifest.webmanifest` | Nombre, íconos y modo "app" |
| `sw.js` | Service worker: guarda todo para usarlo sin conexión |
| `fotos/` | Fotos de comidas y ejercicios |
| `fonts/` | Tipografías (Unbounded y DM Sans) alojadas aquí para no depender de internet |
| `icons/` | Íconos de la app |

Al cambiar cualquier archivo, sube el número de `CACHE` en `sw.js` (por ejemplo `plan-semanal-v2`) para que los teléfonos descarguen la versión nueva. Si agregas fotos o archivos nuevos, añádelos también a la lista `ARCHIVOS` de `sw.js`.

Para probarlo en local (el service worker requiere `http://localhost`, no `file://`):

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000`.
