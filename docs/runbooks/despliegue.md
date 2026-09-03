# Despliegue

## Dónde

| | |
|---|---|
| Equipo Vercel | `rodz-dev` |
| Proyecto | `campograma-ph` (minúsculas: Vercel lo exige) |
| URL | `campograma-ph.vercel.app` |
| Plan | Hobby |
| Repositorio | `github.com/PH-Sport/campograma-ph`, **público** (ver «Ojo») |

## Antes de desplegar

```bash
npm run check     # validar datos + build
```

`npm run build` genera `dist/` copiando `src/` y `data/`. No hay bundler.

## Desplegar

El proyecto de Vercel está conectado al repositorio. **No hace falta desplegar a mano:**

```bash
git push origin main       # → producción
git push origin mi-rama    # → preview con su propia URL
```

`vercel.json` fija `buildCommand`, `outputDirectory: dist` y la cabecera
`X-Robots-Tag: noindex, nofollow`.

Los despliegues manuales con `npx vercel --prod` siguen funcionando, pero **evítalos**:
los siete que se hicieron así antes de conectar Git dejaron producción sirviendo el
`index.html` y nada más —`styles.css`, `app.js` y `data/jugadores.json` daban 404—, y
no queda registro de qué contenía cada uno. Con Git, cada despliegue apunta a su commit
y se puede volver atrás desde el panel.

## Comprobar después

1. Abrir la URL y confirmar que las tres pestañas cargan y los contadores cuadran
   (39 / 72 / 48, 159 en total).
2. Abrir un disco y una ficha.
3. En móvil: el panel sube desde abajo, la lupa se despliega, no hay scroll lateral.

Comprobación rápida de que llegó todo, no solo el HTML:

```bash
for p in / /styles.css /app.js /data/jugadores.json; do
  printf "%-24s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "https://campograma-ph.vercel.app$p")"
done
```

Los cuatro tienen que dar 200. Si la página sale sin estilos o con el mensaje de "No se
pudieron cargar los datos", es que `dist/` se quedó a medias: revisa el build del
despliegue en el panel de Vercel y `scripts/build.mjs`.

## Ojo

La producción es pública. Ver `docs/decisions/0003-produccion-publica-provisional.md`
antes de pasar el enlace a nadie fuera del equipo.

**Y el repositorio también es público**, desde el 2026-09-03: el plan Hobby de Vercel no
despliega repositorios privados de una organización, y se optó por abrirlo en vez de
pagar Pro. Eso expone `data/jugadores.json` entero —159 jugadores, 56 de ellos menores—
a cualquiera, con su historial. Decisión de Mario, asumida a sabiendas. Las salidas
siguen siendo las del ADR 0003, más dos: mover el repositorio a una cuenta personal
(Hobby sí admite privados personales) o sacar los datos del repositorio.
