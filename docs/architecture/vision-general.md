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

Once discos posicionados en porcentajes sobre el campo. **El campo tiene dos
orientaciones** y se elige por CSS, sin JavaScript reactivo: de pie con el ataque arriba
(`aspect-ratio: 3/4`) hasta 820 px, y tumbado con el ataque a la derecha
(`aspect-ratio: 3/2`) a partir de 821 px.

Cada disco lleva las dos posiciones como variables CSS (`--x/--y` y `--xh/--yh`) y el
media query elige cuál usa. Las horizontales no se escriben a mano: salen de `XY` con
`gira()`, que es una rotación de un cuarto de vuelta. Hay un SVG de líneas por
orientación y el CSS enseña el que toca.

Ambos SVG van estirados (`preserveAspectRatio="none"`): en la vista de pie el círculo
central es una elipse a propósito; en la tumbada el viewBox ya casi cuadra con la caja,
así que sale casi redondo.

Con el panel abierto en vista ancha el campo se encoge para no quedar debajo de él
(`body.con-panel`); si no, el panel taparía el delantero.

Los discos representan **demarcaciones, no jugadores**. Al pulsar uno se abre el panel
con su lista; desde ahí se entra a la ficha individual, con vuelta atrás.

El entrenador vive en el banquillo, **fuera del rectángulo del campo**, colgando de su
esquina inferior derecha: no ocupa demarcación, así que tampoco ocupa sitio en el campo.
Va plegado detrás de una flecha para no competir con los once discos y se despliega hacia
la izquierda, que es hacia donde hay hueco con la flecha pegada al borde derecho.
Desplegado tiene el mismo tamaño de disco que las demarcaciones, con borde discontinuo y
color neutro: fuera del campo, pero no un accesorio.

El hueco que ocupa está reservado siempre (la burbuja se oculta con `visibility`, no con
`display`), así que al desplegarse no salta nada de lo que hay debajo.

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
