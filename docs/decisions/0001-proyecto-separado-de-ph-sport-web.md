# 0001 — El campograma vive en su propio repositorio

- **Fecha:** 2026-09-03
- **Estado:** aceptada
- **Decide:** Mario

## Contexto

`~/Developer/ph-sport-web` (repo `PH-Sport/ph-sport-web`, Astro + Vercel) ya contiene una
cartera de jugadores: `data/jugadores.json` con 129 registros, `data/entrenadores.json`, y
una sección `src/pages/talentos`. El campograma parte de la misma realidad —los jugadores
que representa PH— pero de una fuente distinta: el Numbers interno, con 150 registros.

La opción alternativa era montar el campograma como una ruta de `ph-sport-web`,
reutilizando esa cartera y su control de acceso.

## Decisión

Repositorio separado, por ahora.

## Razones

- El proyecto de la web está activo y las dos carteras **se contradicen** en varios
  puntos (ver `docs/cotejo-con-la-web-de-ph.md`). Mezclarlas ahora mete ruido en los dos
  sitios a la vez.
- La reconciliación de los datos la lleva Mario con el equipo de PH. Es una conversación
  de negocio, no un merge.
- Separado, el campograma puede iterar rápido sin arrastrar el ciclo de despliegue ni las
  revisiones de la web pública.

## Consecuencias que aceptamos

- **Hay dos fuentes de verdad de la cartera de PH.** Van a divergir. Es el coste conocido.
- El control de acceso hay que resolverlo aquí desde cero. Hoy la URL de producción es
  pública (ver ADR 0003).
- Si algún día se fusionan, habrá que hacer el cotejo de todas formas, y será mayor.

## Revisar cuando

Mario cierre la reconciliación con el equipo, o cuando el mantenimiento de las dos
carteras cueste más que la fusión.
