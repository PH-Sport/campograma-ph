// Copia src/ y data/ a dist/. Sin bundler: el proyecto no lo necesita todavía.
import { cp, rm, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const DIST = join(RAIZ, 'dist');

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(join(RAIZ, 'src'), DIST, { recursive: true });
await cp(join(RAIZ, 'data'), join(DIST, 'data'), { recursive: true });
console.log('dist/ generado');
