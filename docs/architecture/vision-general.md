# Visión general

## Qué es

Una página estática. Sin framework, sin bundler, sin dependencias de producción.
Tres archivos en `src/` y un JSON en `data/`.

## Por qué así

El prototipo nació como un único HTML con los 150 jugadores incrustados. Eso servía para
enseñarlo, no para mantenerlo: cada corrección de un dato obligaba a tocar código y a
volver a desplegar el archivo entero.

Lo mínimo que arregla eso es sacar los datos del HTML. Lo demás —framework, build,
tipado— no resuelve ningún problema que tengamos hoy y sí añade superficie que mantener.
Cuando aparezca un problema real que un framework resuelva, se añade y se escribe el ADR.

## Piezas

```
data/jugadores.json     categorías + jugadores. Fuente de verdad.
        │  fetch()
        ▼
src/app.js              carga → agrupa por categoría → render
src/index.html          armazón: cabecera, barra, #view, panel lateral
src/styles.css          tokens de color (claro/oscuro) y componentes
src/fonts/              Söhne, cuando PH tenga licencia. Cae a Geist.
```

`app.js` se ejecuta entero al cargar la página. `cargar()` hace el `fetch`, construye
`DATA` (categorías con su lista de jugadores) y llama a `render()`. A partir de ahí todo
es reactivo a `state`: categoría activa, búsqueda, vista (campo/lista), orden y panel
abierto. Cada cambio de `state` vuelve a pintar `#view` completo.

## Vista Campo

Once discos posicionados en porcentajes sobre un contenedor con `aspect-ratio: 3/4`
(`XY` en `app.js`). El campo se dibuja con un SVG estirado (`preserveAspectRatio="none"`):
el círculo central es una elipse a propósito.

Los discos representan **demarcaciones, no jugadores**. Al pulsar uno se abre el panel
con su lista; desde ahí se entra a la ficha individual, con vuelta atrás.

El entrenador es un disco aparte en la esquina inferior derecha —el banquillo—, con
borde discontinuo y color neutro para que no compita con las once demarcaciones.

## Vista Lista

Tabla ordenable por nombre, año, club y demarcación. Es la herramienta de trabajo real;
el campo es la puerta de entrada.

## Temas

Paleta de PH Sport en tokens CSS (ver ADR 0005). **El tema base es el oscuro**, como la
marca: `:root` define la paleta oscura completa; `prefers-color-scheme: light` y
`[data-theme="light"]` redefinen solo los tokens. Ningún color se declara únicamente
dentro de un bloque de tema.

El marco (fondo, panel, líneas, tinta, césped) va en la escala neutra de PH sobre
`#0d0f12`, y el oro `--acento` viste solo lo interactivo. Los colores de demarcación y
situación son dato, no marca, y quedan fuera de la paleta de PH a propósito.
