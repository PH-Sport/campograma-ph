# 0003 — La producción es pública, provisionalmente

- **Fecha:** 2026-09-03
- **Estado:** aceptada, con fecha de caducidad

## Contexto

El campograma es una **herramienta interna**: muestra 150 jugadores con club, cesiones y
movimientos pendientes. Está desplegado en `campograma-ph.vercel.app`, equipo `rodz-dev`,
plan Hobby.

Vercel Hobby **no permite proteger despliegues de producción**: la API rechaza
`ssoProtection` con `deploymentType: "all"` (`invalid_sso_protection`). Solo se pudo
activar Vercel Authentication para los *preview*.

## Decisión

Se acepta temporalmente que la URL de producción sea accesible para cualquiera que tenga
el enlace, con `noindex` + `robots.txt` para que al menos no se encuentre sola.

## Riesgo que asumimos

Cualquiera con el enlace ve la cartera completa de la agencia y qué operaciones tiene
abiertas. `noindex` evita que Google lo indexe; **no** evita que se abra.

## Salidas, por orden de preferencia

1. Ruta dentro de `ph-sport-web` detrás del login que ya exista. Requiere revisar el ADR 0001.
2. Vercel Pro (~20 $/mes) → protección por contraseña sobre producción.
3. Desplegar solo como *preview*: queda protegido con Vercel Auth, pero la URL cambia en
   cada despliegue y solo entran miembros del equipo de Vercel. Malo para PH.

**Una contraseña en el propio HTML no sirve**: los 150 registros viajan en el JSON.

## Caducidad

Antes de que el enlace se comparta fuera del equipo de PH.
