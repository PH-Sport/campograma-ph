# Actualizar la plantilla

## Flujo

1. Editar `data/jugadores.json`.
2. `npm run validar` — falla con código 1 si hay errores; los avisos no bloquean.
3. `npm run dev` y comprobar a ojo la categoría tocada.
4. Commit con el motivo del cambio, no solo el qué:
   `datos: Guirao vuelve de cesión (confirmado por Eva, 12/09)`.
5. Desplegar (ver `despliegue.md`).

## Casos

**Jugador nuevo** — añadir al array `jugadores`. `club` es el club **propietario**; si está
cedido, `situacion: "ces"` y `cesionA` con el destino.

**Cambio de club** — si es un traspaso, cambiar `club` y limpiar `situacion`/`cesionA`.
Si es una cesión, `club` no cambia: se rellena `situacion` y `cesionA`.

**Fin de cesión** — poner `situacion` y `cesionA` a `null`. El jugador ya estaba con su
club propietario en `club`.

**Jugador que se va de PH** — hoy se borra la entrada, y eso pierde el historial.
`ph-sport-web` usa baja blanda (`hidden: true` + `note` con fecha y motivo); adoptar esa
convención está pendiente. Mientras tanto, **explica la baja en el mensaje del commit**.

**Foto de un jugador** — poner la URL en `foto`. Sale solo en su ficha; con `null` la
ficha se pinta sin foto y no pasa nada.

**Categoría nueva** — añadir a `categorias` con un `id` estable. Los `id` se usan como
prefijo de los identificadores internos; cambiarlos rompe los enlaces del panel.

## Cuidado con

- **Apellidos repetidos que son personas distintas.** `Tomás Mendes` (2007, Torreense) y
  `Tomás Méndez` (2008, Juv. Sevilla). Los hermanos Buyla (Jannick / Hugo). Los Stassin
  (Zeno / Noah). No deduplicar por nombre.
- **`anio` va a cuatro dígitos.** El `'94` del Numbers es 1994, no 2094. Ya hubo un bug
  por esto que mostraba 2098.
- **Club desconocido:** `null`, no `"??"` ni `""`. El validador avisa y la interfaz lo
  pinta como "sin confirmar" en cursiva.
