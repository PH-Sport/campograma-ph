# 0005 — La paleta es la de PH Sport, pero los colores de dato no

- **Fecha:** 2026-09-03
- **Estado:** aceptada
- **Decide:** Mario

## Contexto

El campograma nació con una paleta propia: fondos verdosos, tema claro por defecto y
verde como color interactivo. PH Sport tiene un sistema de diseño en
`ph-sport-web/src/styles/global.css`: negro `#0d0f12`, blanco, oro `#D6B25E` y su
versión apagada `#a8893e`. Es monocroma, oscura y con un único acento.

El campograma, en cambio, usa seis colores **con significado**: cuatro por línea
(portero, defensa, medio, ataque) y dos por situación (cesión, pendiente de movimiento).
Seis significados no caben en un acento único sin perder la lectura del campo de un
vistazo, que es justo para lo que sirve la vista Campo.

## Decisión

1. Todo el marco —fondo, panel, líneas, tinta, césped, velo, sombras— pasa a la escala
   neutra de PH, construida sobre `#0d0f12`.
2. El oro es `--acento` y viste **solo lo interactivo**: el eyebrow de marca, el anillo
   de foco, el borde del buscador activo y el número de coincidencias de la búsqueda.
3. Los colores de demarcación y de situación **no se tocan**. Son dato, no marca.
4. El tema base pasa a ser el **oscuro**, como PH. `:root` define la paleta oscura
   completa; `prefers-color-scheme: light` y `[data-theme="light"]` redefinen solo los
   tokens. Se invierte respecto a como estaba, pero la regla de fondo no cambia: ningún
   color se declara únicamente dentro de un bloque de tema.

## Consecuencias

- El césped deja de ser verde y pasa a ser un gris apenas más claro que el fondo. El
  campo se lee por las líneas y por la posición de los discos, no por el color.
- El acento oro (`#D6B25E`) y el ámbar de cesión (`#E0A33E`) son parecidos. Aparecen en
  contextos distintos —marco vs. dato— y no llegan a tocarse, pero si algún día conviven
  en el mismo bloque habrá que separar uno de los dos.
- Si más adelante PH quiere el campograma monocromo del todo, las cuatro líneas tendrán
  que distinguirse por otra vía (trazo, relleno) y eso se supersede con un ADR nuevo.

## Alternativas descartadas

- **Monocromo + oro puro.** Lo más fiel a la marca y lo que peor se lee: cuatro
  demarcaciones sin color distinguible obligan a inventar otra codificación.
- **Recolorear las cuatro líneas para armonizar con el negro y el oro.** Sigue sobre la
  mesa si el conjunto se ve descosido; se descartó por no tocar dato sin necesidad.
