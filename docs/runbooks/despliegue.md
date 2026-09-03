# Despliegue

## Dónde

| | |
|---|---|
| Equipo Vercel | `rodz-dev` |
| Proyecto | `campograma-ph` (minúsculas: Vercel lo exige) |
| URL | `campograma-ph.vercel.app` |
| Plan | Hobby |

## Antes de desplegar

```bash
npm run check     # validar datos + build
```

`npm run build` genera `dist/` copiando `src/` y `data/`. No hay bundler.

## Desplegar

```bash
npx vercel --prod          # o push a la rama de producción si se conecta el repo a Git
```

`vercel.json` fija `buildCommand`, `outputDirectory: dist` y la cabecera
`X-Robots-Tag: noindex, nofollow`.

## Comprobar después

1. Abrir la URL y confirmar que las tres pestañas cargan y los contadores cuadran
   (39 / 67 / 150 en total).
2. Abrir un disco y una ficha.
3. En móvil: el panel sube desde abajo, la lupa se despliega, no hay scroll lateral.

Si la página sale vacía con el mensaje de "No se pudieron cargar los datos", es que
`data/jugadores.json` no llegó a `dist/`. Revisa `scripts/build.mjs`.

## Ojo

La producción es pública. Ver `docs/decisions/0003-produccion-publica-provisional.md`
antes de pasar el enlace a nadie fuera del equipo.
