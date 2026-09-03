# Campograma PH — reglas de trabajo

Campograma interno de la cartera de jugadores de PH Sport. Página estática sin
dependencias: `data/jugadores.json` + `src/{index.html,styles.css,app.js}`.

## Antes de tocar nada

1. `docs/work/active/handoff-2026-09-03.md` — estado, decisiones tomadas con PH, trampas.
2. `docs/architecture/modelo-datos.md` — el esquema, campo a campo.
3. `npm run dev` y mirar la página. Abrir el HTML con doble clic no funciona.

## Reglas

**Datos**

- **No inventar.** Si un club, una división o un año no está en la fuente, va como
  "sin confirmar" y se pregunta a Eva. Un dato inventado en una herramienta de decisión
  es peor que un hueco visible.
- **No deduplicar por nombre.** Hay apellidos repetidos que son personas distintas.
- `npm run validar` antes de cada commit que toque `data/`.
- El mensaje del commit explica **por qué** cambia el dato, no solo qué cambió.
- No fusionar con la cartera de `ph-sport-web`. Esa reconciliación la lleva Mario.

**Código**

- Sin dependencias de producción. Si algo parece necesitar una librería, primero el ADR.
- Los datos no vuelven al HTML.
- Colores solo por tokens CSS. Ningún color declarado únicamente dentro de un bloque de
  tema: rompe el modo sin marcar.
- Los textos de interfaz, en español y sin relleno. PH ya pidió quitar dos frases
  descriptivas por redundantes; no volver a añadirlas.

**Alcance**

- Ejecuta sin preguntar todo lo que esté dentro de lo pedido. Para solo si hace falta
  salirse del alcance.
- La documentación afectada la actualizas tú, no Mario.
- Decisión que cambie el rumbo → ADR nuevo en `docs/decisions/`, numerado. Los ADR
  aceptados no se editan: se superseden.

**Verificación**

- Si tocas el render del campo, la vista Lista o el panel, compruébalo con una captura
  real, no leyendo el código.
- Comprobar siempre en móvil (≤ 820 px): el panel es una hoja inferior y el buscador es
  una lupa que se despliega. Es donde se rompen las cosas.

## Lo que NO se decide desde aquí

- Quién es la cara visible de cada demarcación (11 × 3 fotos). Lo firma PH.
- La división de cada jugador. No está en el origen.
- Si esto acaba dentro de `ph-sport-web`. Ver ADR 0001.
