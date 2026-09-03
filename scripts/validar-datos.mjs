// Comprueba data/jugadores.json antes de desplegar. Falla con código 1.
import { readFile } from 'node:fs/promises';

const DEMARCACIONES = ['POR','DFCI','DFCD','LI','LD','MC','MCOI','MCOD','EI','ED','DEL'];
const SITUACIONES = [null, 'ces', 'pte'];

const src = JSON.parse(await readFile(new URL('../data/jugadores.json', import.meta.url)));
const ids = new Set(src.categorias.map(c => c.id));
const errores = [], avisos = [];

src.jugadores.forEach((p, i) => {
  const donde = `jugadores[${i}] (${p.nombre ?? 'sin nombre'})`;
  if (!p.nombre?.trim()) errores.push(`${donde}: nombre vacío`);
  if (!DEMARCACIONES.includes(p.demarcacion)) errores.push(`${donde}: demarcación "${p.demarcacion}" no válida`);
  if (!ids.has(p.categoria)) errores.push(`${donde}: categoría "${p.categoria}" no existe`);
  if (!Number.isInteger(p.anio) || p.anio < 1930 || p.anio > 2030) errores.push(`${donde}: año "${p.anio}" fuera de rango`);
  if (!SITUACIONES.includes(p.situacion ?? null)) errores.push(`${donde}: situación "${p.situacion}" no válida`);
  if (p.situacion === 'ces' && !p.cesionA) avisos.push(`${donde}: cesión sin club de destino`);
  if (p.foto != null && (typeof p.foto !== 'string' || !p.foto.trim())) errores.push(`${donde}: foto debe ser null o una URL`);
  if (!p.club) avisos.push(`${donde}: club sin confirmar`);
});

const claves = src.jugadores.map(p => `${p.nombre}|${p.anio}`);
new Set(claves.filter((k, i) => claves.indexOf(k) !== i))
  .forEach(k => errores.push(`duplicado exacto: ${k}`));

avisos.forEach(a => console.warn('aviso  ', a));
errores.forEach(e => console.error('ERROR  ', e));
console.log(`\n${src.jugadores.length} jugadores · ${errores.length} errores · ${avisos.length} avisos`);
process.exit(errores.length ? 1 : 0);
