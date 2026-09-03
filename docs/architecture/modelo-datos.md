# Modelo de datos

`data/jugadores.json`. Valídalo siempre con `npm run validar` antes de desplegar.

```jsonc
{
  "actualizado": "2026-09-03",
  "origen": "CAMPOGRAMA JUGADORES PH.numbers (5 hojas, extracción 2026-09-03)",

  "categorias": [
    {
      "id": "elite",                              // clave estable, no cambiarla
      "nombre": "1ª / 2ªA / Internacional",       // título largo, ficha de jugador
      "corto": "1ª · 2ªA · Intl",                 // pestaña
      "tecnico": "Thomas Christiansen — Selección de Panamá"  // opcional; sale al banquillo
    }
  ],

  "jugadores": [
    {
      "nombre": "Carlos Guirao",   // tal y como lo escribe PH
      "anio": 2003,                // año de nacimiento, 4 dígitos
      "club": "Leganés",           // club PROPIETARIO. null = sin confirmar
      "demarcacion": "MC",         // ver tabla
      "categoria": "elite",        // debe existir en categorias[].id
      "situacion": "ces",          // null | "ces" | "pte"
      "cesionA": "Eldense",        // solo con situacion "ces"
      "foto": null                 // URL de la foto del jugador, o null (ADR 0004)
    }
  ]
}
```

## Demarcaciones

| Código | Significado | | Código | Significado |
|---|---|---|---|---|
| `POR` | Portero | | `MC` | Mediocentro |
| `DFCI` | Central izquierdo | | `MCOI` | Mediapunta izquierda |
| `DFCD` | Central derecho | | `MCOD` | Mediapunta derecha |
| `LI` | Lateral izquierdo | | `EI` | Extremo izquierdo |
| `LD` | Lateral derecho | | `ED` | Extremo derecho |
| | | | `DEL` | Delantero |

## Situación

| Valor | Significado | Se ve como |
|---|---|---|
| `null` | Sin operación abierta | — |
| `"ces"` | Cedido a otro club | Punto ámbar + etiqueta con destino |
| `"pte"` | Movimiento pendiente | Punto turquesa |

## Reglas que el validador comprueba

- Nombre no vacío.
- `demarcacion` dentro de la lista.
- `categoria` existe en `categorias`.
- `anio` entero entre 1930 y 2030.
- `situacion` es `null`, `"ces"` o `"pte"`.
- `foto` es `null` o una cadena no vacía.
- Sin duplicados exactos de `nombre|anio`.

Y avisa (sin fallar) de: cesión sin destino, y club sin confirmar.

## Lo que este modelo todavía NO tiene

- **`division`.** 1ª vs 2ªA, 1RFEF vs 2RFEF. No está en el Numbers original y no se
  inventa. Añadir el campo desde el principio aunque llegue vacío.
- **`clubActual`.** Hoy `club` es el propietario. La web de PH guarda el otro dato
  (dónde juega hoy). Si algún día se fusionan, hacen falta los dos campos.
- **Baja blanda.** `ph-sport-web` usa `hidden: true` + `note`. Aquí no hay nada
  equivalente: los jugadores que se van desaparecen sin rastro.
