// Servidor estático sin dependencias. Sirve src/ en la raíz y data/ en /data.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const PUERTO = Number(process.env.PORT) || 4330;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

function resolver(url) {
  let p = normalize(decodeURIComponent(url.split('?')[0]));
  if (p.includes('..')) return null;
  if (p === '/') p = '/index.html';
  return p.startsWith('/data/') ? join(RAIZ, p) : join(RAIZ, 'src', p);
}

createServer(async (req, res) => {
  const ruta = resolver(req.url);
  if (!ruta) { res.writeHead(400).end('Ruta no válida'); return; }
  try {
    if (!(await stat(ruta)).isFile()) throw new Error('no es un fichero');
    const cuerpo = await readFile(ruta);
    res.writeHead(200, {
      'content-type': TIPOS[extname(ruta)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    }).end(cuerpo);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
       .end(`404 ${req.url}`);
  }
}).listen(PUERTO, () => {
  console.log(`Campograma en http://localhost:${PUERTO}`);
});
