# 0002 — Los datos viven en JSON, no dentro del HTML

- **Fecha:** 2026-09-03
- **Estado:** aceptada

## Contexto

El prototipo era un único `index.html` de 35 KB con los 150 jugadores como literal de
JavaScript. Corregir el club de un jugador implicaba editar código y volver a subir el
archivo entero.

## Decisión

`data/jugadores.json` es la fuente de verdad. `app.js` lo carga con `fetch` al arrancar.

## Consecuencias

- **Abrir `src/index.html` con doble clic deja de funcionar**: `file://` bloquea `fetch`.
  Hay que usar `npm run dev`. La página muestra un mensaje explicando esto si falla la
  carga, en vez de quedarse en blanco.
- Se puede validar el dato sin ejecutar la página (`npm run validar`), y el día que haya
  una hoja compartida, el importador escribe este JSON y nada más.
- El despliegue copia `data/` a `dist/`, así que el JSON es público en la URL. Mientras
  el sitio siga sin autenticación, eso no cambia nada: los datos ya estaban en el bundle.

## Alternativa descartada

Generar el JS en build a partir del JSON. Evitaría el `fetch` y el requisito de servidor,
pero mete un paso de compilación para ahorrar una petición. No compensa hoy.
