# Campograma PH

Campograma interno de la cartera de jugadores de PH Sport: 150 jugadores repartidos en
once demarcaciones sobre un campo, más una vista de lista ordenable.

**Uso interno.** Muestra cesiones, movimientos pendientes y huecos de datos.

## Arrancar

```bash
npm run dev        # http://localhost:4330
```

Sin dependencias: el servidor de desarrollo es Node puro. No hay `npm install`.

```bash
npm run validar    # comprueba data/jugadores.json
npm run build      # genera dist/
npm run check      # validar + build
```

Abrir `src/index.html` con doble clic **no funciona**: `file://` bloquea `fetch`, y los
datos viven fuera del HTML. Usa `npm run dev`.

## Estructura

```
data/jugadores.json   fuente de verdad actual (150 jugadores + 3 categorías)
src/                  index.html · styles.css · app.js · fonts/
scripts/              dev.mjs · build.mjs · validar-datos.mjs
docs/                 ver docs/README.md
```

## Antes de tocar nada

Lee `CLAUDE.md` y `docs/work/active/handoff-2026-09-03.md`. Hay decisiones tomadas con
PH que no conviene reabrir por accidente, y trampas en los datos que muerden.
