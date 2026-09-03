# 0004 — La foto es del jugador, no de la demarcación

- **Fecha:** 2026-09-03
- **Estado:** aceptada
- **Decide:** Mario

## Contexto

El prototipo dejó preparado un hueco de "cara visible" por demarcación y categoría: PH
elegiría qué jugador representa cada uno de los once puestos en cada categoría (33 caras),
y esa foto saldría en el disco del campo y en la cabecera del panel de la demarcación.
Elegir esas 33 caras era una decisión de la agencia que nunca llegó, y mientras tanto el
hueco vacío aparecía en producción con el texto "Cara visible".

## Decisión

La foto pertenece al jugador y se muestra solo en su ficha. Los discos del campo siguen
siendo demarcaciones con su código y su contador; el panel de la demarcación no lleva foto.

## Consecuencias

- Campo `foto` en `data/jugadores.json`, `null` hasta que haya material. Una URL por
  jugador, sin elegir representantes.
- Desaparece el hook `CARAS` de `app.js` y el hueco "Cara visible" del panel.
- La decisión 4 del handoff de 2026-09-03 (once caras por categoría firmadas por PH) queda
  sin efecto. Si PH quisiera fotos en los discos, sería una decisión nueva.
