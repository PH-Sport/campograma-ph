let DATA=[],ALL=[];
const F={POR:'por',DFCI:'def',DFCD:'def',LI:'def',LD:'def',MC:'med',MCOI:'med',MCOD:'med',EI:'ata',ED:'ata',DEL:'ata'};
const LBL={POR:'Portero',DFCI:'Central izq.',DFCD:'Central der.',LI:'Lateral izq.',LD:'Lateral der.',
  MC:'Mediocentro',MCOI:'Mediapunta izq.',MCOD:'Mediapunta der.',EI:'Extremo izq.',ED:'Extremo der.',DEL:'Delantero'};
const SHORT={POR:'POR',DFCI:'DFC-I',DFCD:'DFC-D',LI:'LI',LD:'LD',MC:'MC',MCOI:'MCO-I',MCOD:'MCO-D',EI:'EI',ED:'ED',DEL:'DEL'};
const ORDER=['DEL','EI','ED','MCOI','MCOD','MC','LI','DFCI','DFCD','LD','POR'];
/* coordenadas sobre el campo, en % — ataque hacia arriba */
const XY={DEL:[50,11],EI:[16,27],ED:[84,27],MCOI:[32,41],MCOD:[68,41],MC:[50,56],
  LI:[12,72],DFCI:[37,77],DFCD:[63,77],LD:[88,72],POR:[50,91]};
/* listas que abren los contadores de cabecera */
const SIG={ces:{titulo:'En cesión',f:x=>x.e==='ces'},
  pte:{titulo:'Pendiente de movimiento',f:x=>x.e==='pte'},
  gap:{titulo:'Sin club confirmado',f:x=>!x.c}};


/* quita acentos para que la búsqueda case con o sin tilde */
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

let state={g:null,q:'',v:'campo',sort:{k:'n',d:1},panel:null};

const $=s=>document.querySelector(s);
const grupoJ=()=>DATA.find(g=>g.id===state.g).j;
const grupo=()=>DATA.find(g=>g.id===state.g);
const filtrando=()=>!!state.q;

function visible(x){ return !state.q || x._k.includes(state.q); }
const hits=g=>g.j.filter(visible).length;

/* aviso de "sin resultados" con las otras categorías donde sí hay coincidencias */
function sinResultados(){
  const otros=DATA.filter(g=>g.id!==state.g&&hits(g)>0)
    .map(g=>`<button data-g="${g.id}">${g.corto} <span class="n">${hits(g)}</span></button>`);
  return `<b>Sin resultados en ${grupo().corto}</b>${otros.length?otros.join(''):'Prueba con otro nombre o club.'}`;
}

function montarGrupos(){
  $('#grupos').innerHTML=DATA.map(g=>
    `<button data-g="${g.id}" aria-pressed="${g.id===state.g}">${g.corto}<span class="n">${g.j.length}</span></button>`).join('');
}
$('#grupos').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  state.g=b.dataset.g;cerrar();render();});
$('#vista').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  state.v=b.dataset.v;render();});
$('#q').addEventListener('input',e=>{state.q=norm(e.target.value);$('#qc').hidden=!e.target.value;render();});
$('#qc').addEventListener('click',()=>{$('#q').value='';state.q='';$('#qc').hidden=true;cerrarBusqueda();render();});
$('#qOpen').addEventListener('click',()=>{
  $('#search').classList.add('open');
  $('#qOpen').setAttribute('aria-expanded','true');
  $('#q').focus();
});
function cerrarBusqueda(){
  if($('#q').value)return;
  $('#search').classList.remove('open');
  $('#qOpen').setAttribute('aria-expanded','false');
}
$('#q').addEventListener('blur',cerrarBusqueda);
$('#q').addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  $('#q').value='';state.q='';$('#qc').hidden=true;render();cerrarBusqueda();$('#q').blur();
});

/* ---------- campo ---------- */
function renderCampo(){
  const js=grupoJ(),filt=filtrando();
  const toks=ORDER.map(pos=>{
    const todos=js.filter(x=>x.pos===pos);
    const vis=todos.filter(visible).length;
    const [x,y]=XY[pos];
    const cls=['tok','f-'+F[pos]];
    if(!todos.length)cls.push('vac');
    if(filt&&!vis)cls.push('off');
    if(filt&&vis)cls.push('hit');
    return `<button class="${cls.join(' ')}" style="left:${x}%;top:${y}%" data-pos="${pos}"
      aria-label="${LBL[pos]}, ${todos.length} jugadores">
      <span class="disc"><span class="ini">${SHORT[pos]}</span><span class="cnt"><b>${filt?vis:todos.length}</b></span></span>
      <span class="lab">${LBL[pos]}</span></button>`;
  }).join('');
  const t=grupo().tecnico;
  const ent=t?`<button class="tok tok--ent f-ent" style="left:87%;top:88%" data-ent="1"
      aria-label="Entrenador ${t.split('—')[0].trim()}">
      <span class="disc"><span class="ini">ENT</span></span>
      <span class="lab">${t.split('—')[0].trim()}</span></button>`:'';
  const aviso=filt&&!js.some(visible)?`<div class="none hint">${sinResultados()}</div>`:'';
  return `${aviso}<div class="pitchwrap"><div class="pitch">
    <svg viewBox="0 0 68 105" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="var(--turf-line)" stroke-width=".5">
        <rect x="1.5" y="1.5" width="65" height="102"/>
        <line x1="1.5" y1="52.5" x2="66.5" y2="52.5"/>
        <ellipse cx="34" cy="52.5" rx="9.15" ry="9.15"/>
        <rect x="14" y="1.5" width="40" height="16.5"/><rect x="25" y="1.5" width="18" height="5.5"/>
        <rect x="14" y="87" width="40" height="16.5"/><rect x="25" y="98" width="18" height="5.5"/>
      </g></svg>
    ${toks}${ent}</div></div>`;
}

/* ---------- lista ---------- */
function renderLista(){
  const js=grupoJ().filter(visible);
  const k=state.sort.k,d=state.sort.d;
  const sorted=[...js].sort((x,y)=>{
    let A,B;
    if(k==='pos'){A=ORDER.indexOf(x.pos);B=ORDER.indexOf(y.pos);}
    else if(k==='a'){A=x.anio;B=y.anio;}
    else if(k==='club'){A=norm(x.c);B=norm(y.c);}
    else{A=norm(x.n);B=norm(y.n);}
    return A<B?-d:A>B?d:0;
  });
  if(!sorted.length)return `<div class="tablewrap"><div class="none">${sinResultados()}</div></div>`;
  const ar=d>0?' ↑':' ↓';
  const th=(key,txt)=>`<th><button data-k="${key}">${txt}${k===key?ar:''}</button></th>`;
  return `<div class="tablewrap"><table>
    <thead><tr>${th('n','Jugador')}${th('a','Año')}${th('club','Club')}${th('pos','Demarcación')}<th>Situación</th></tr></thead>
    <tbody>${sorted.map(x=>`<tr data-id="${x.id}">
      <td class="name">${x.n}</td>
      <td class="yr">'${x.a}</td>
      <td class="club${x.c?'':' gap'}">${x.c||'sin confirmar'}</td>
      <td class="pos"><span class="poschip f-${F[x.pos]}">${SHORT[x.pos]}</span></td>
      <td class="st">${x.e?`<span class="stchip sc-${x.e}">${x.e==='ces'?'Cesión'+(x.en?' · '+x.en:''):'Pte. mov.'}</span>`:''}</td>
    </tr>`).join('')}</tbody></table></div>`;
}

function render(){
  document.querySelectorAll('#grupos button').forEach(b=>{
    const g=DATA.find(x=>x.id===b.dataset.g),h=filtrando()?hits(g):g.j.length;
    b.setAttribute('aria-pressed',b.dataset.g===state.g);
    b.querySelector('.n').textContent=h;
    b.querySelector('.n').classList.toggle('hit',filtrando()&&h>0);
  });
  document.querySelectorAll('#vista button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===state.v));

  const js=grupoJ(),vis=js.filter(visible);
  $('#tTot').textContent=vis.length;
  $('#tCes').textContent=vis.filter(x=>x.e==='ces').length;
  $('#tPte').textContent=vis.filter(x=>x.e==='pte').length;
  $('#tGap').textContent=vis.filter(x=>!x.c).length;
  document.querySelectorAll('.tally button').forEach(b=>{b.disabled=b.querySelector('b').textContent==='0';});

  $('#view').innerHTML=state.v==='campo'?renderCampo():renderLista();
}

$('#view').addEventListener('click',e=>{
  const gb=e.target.closest('button[data-g]');
  if(gb){state.g=gb.dataset.g;cerrar();render();return;}
  const th=e.target.closest('th button');
  if(th){const k=th.dataset.k;state.sort=state.sort.k===k?{k,d:-state.sort.d}:{k,d:1};render();return;}
  const tok=e.target.closest('.tok');
  if(tok){tok.dataset.ent?abrirEnt():abrirPos(tok.dataset.pos);return;}
  const row=e.target.closest('tr[data-id]');
  if(row)abrirJugador(row.dataset.id,null);
});

/* ---------- panel ---------- */
function filaJugador(x){
  const cl=x.c?`<span class="cl">${x.c}</span>`:`<span class="cl gap">sin confirmar</span>`;
  const st=x.e?`<span class="st st-${x.e}" title="${x.e==='ces'?'En cesión':'Pendiente de movimiento'}"></span>`:'';
  return `<li><button class="prow f-${F[x.pos]}" data-jug="${x.id}"
    ><span class="nm">${x.n}</span><span class="yr">'${x.a}</span>${cl}${st}</button></li>`;
}

function abrirPos(pos){
  const js=grupoJ().filter(x=>x.pos===pos);
  const muestra=filtrando()?js.filter(visible):js;
  state.panel={t:'pos',pos};
  pintar(`
    <div class="dhead">
      <div>
        <p class="dsub">${grupo().corto}</p>
        <h2 class="dtitle">${LBL[pos]}</h2>
      </div>
      <button class="x" data-cerrar aria-label="Cerrar">×</button>
    </div>
    ${cuenta(muestra.length,js.length)}
    <hr>
    ${muestra.length
      ? `<ul class="plist">${muestra.map(filaJugador).join('')}</ul>`
      : `<p class="pempty">${js.length?'Ningún jugador de esta demarcación cumple el filtro.':'Demarcación vacante en esta categoría.'}</p>`}
  `);
}

function cuenta(n,total){
  return `<p class="dcount"><b>${n}</b> jugador${n===1?'':'es'}${n!==total?` de ${total}`:''}</p>`;
}

function abrirSig(k){
  const js=grupoJ().filter(visible).filter(SIG[k].f);
  state.panel={t:'sig',k};
  pintar(`
    <div class="dhead">
      <div>
        <p class="dsub">${grupo().corto}</p>
        <h2 class="dtitle">${SIG[k].titulo}</h2>
      </div>
      <button class="x" data-cerrar aria-label="Cerrar">×</button>
    </div>
    ${cuenta(js.length,js.length)}
    <hr>
    ${js.length?`<ul class="plist">${js.map(filaJugador).join('')}</ul>`:`<p class="pempty">Ninguno en esta categoría.</p>`}
  `);
}

const tituloPanel=p=>p.t==='pos'?LBL[p.pos]:SIG[p.k].titulo;
function abrirPanel(p){ p.t==='pos'?abrirPos(p.pos):abrirSig(p.k); }

function abrirEnt(){
  const g=grupo(),[nom,rol]=g.tecnico.split('—').map(t=>t.trim());
  state.panel={t:'ent'};
  pintar(`
    <div class="dhead">
      <div>
        <p class="dsub">Cuerpo técnico</p>
        <h2 class="dtitle">${nom}</h2>
      </div>
      <button class="x" data-cerrar aria-label="Cerrar">×</button>
    </div>
    <dl>
      <dt>Rol</dt><dd>Entrenador</dd>
      ${rol?`<dt>Equipo</dt><dd>${rol}</dd>`:''}
      <dt>Categoría</dt><dd>${g.nombre}</dd>
    </dl>`);
}

function abrirJugador(id,volver){
  const x=ALL.find(y=>y.id===id);if(!x)return;
  state.panel={t:'jug',id,volver};
  const notas=[];
  if(x.e==='ces')notas.push(`<p class="note">Cedido${x.en?' en el <b>'+x.en+'</b>':''}.</p>`);
  if(x.e==='pte')notas.push(`<p class="note pte">Pendiente de movimiento.</p>`);
  pintar(`
    <div class="dhead">
      ${volver?`<button class="back" data-volver>← ${tituloPanel(volver)}</button>`:''}
      <button class="x" data-cerrar aria-label="Cerrar">×</button>
    </div>
    <div class="dhero">
      ${x.foto?`<img class="foto" src="${x.foto}" alt="">`:''}
      <h2 class="dtitle">${x.n}</h2>
    </div>
    <dl>
      <dt>Demarcación</dt><dd><span class="poschip f-${F[x.pos]}">${SHORT[x.pos]}</span> ${LBL[x.pos]}</dd>
      <dt>Año</dt><dd class="cifra">${x.anio}</dd>
      <dt>Club</dt><dd>${x.c||'<span style="color:var(--sig-gap);font-style:italic">Sin confirmar</span>'}</dd>
      <dt>Categoría</dt><dd>${x.gn}</dd>
    </dl>
    ${notas.length?'<hr>'+notas.join(''):''}
  `);
}

/* quién tenía el foco antes de abrir el panel, para devolvérselo al cerrar */
let origenFoco=null;
function pintar(html){
  const d=$('#drawer');
  if(d.hidden){
    origenFoco=document.activeElement;
    d.hidden=false;requestAnimationFrame(()=>{d.classList.add('on');$('#scrim').classList.add('on');});
  }
  d.innerHTML=`<span class="grab" aria-hidden="true"></span>`+html;
  d.scrollTop=0;
  d.focus({preventScroll:true});
}
function cerrar(){
  state.panel=null;
  const d=$('#drawer');if(d.hidden)return;
  d.classList.remove('on');$('#scrim').classList.remove('on');
  setTimeout(()=>{if(!state.panel)d.hidden=true;},220);
  if(origenFoco&&document.body.contains(origenFoco))origenFoco.focus({preventScroll:true});
  origenFoco=null;
}
/* el tabulador no sale del panel mientras está abierto */
$('#drawer').addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const d=$('#drawer'),f=[...d.querySelectorAll('button:not([disabled])')];
  if(!f.length)return;
  const a=document.activeElement;
  if(e.shiftKey&&(a===f[0]||a===d)){f[f.length-1].focus();e.preventDefault();}
  else if(!e.shiftKey&&a===f[f.length-1]){f[0].focus();e.preventDefault();}
});

$('#drawer').addEventListener('click',e=>{
  if(e.target.closest('[data-cerrar]'))return cerrar();
  if(e.target.closest('[data-volver]')&&state.panel&&state.panel.volver)return abrirPanel(state.panel.volver);
  const j=e.target.closest('[data-jug]');
  if(j)return abrirJugador(j.dataset.jug,state.panel&&(state.panel.t==='pos'||state.panel.t==='sig')?state.panel:null);
});
document.querySelector('.tally').addEventListener('click',e=>{
  const b=e.target.closest('button[data-sig]');
  if(b&&!b.disabled)abrirSig(b.dataset.sig);
});
$('#scrim').addEventListener('click',cerrar);
document.addEventListener('keydown',e=>{if(e.key==='Escape')cerrar();});

/* arrastrar hacia abajo para cerrar (solo hoja inferior) */
(function(){
  const d=$('#drawer'),hoja=matchMedia('(max-width:820px)');
  let y0=0,dy=0,on=false;
  d.addEventListener('touchstart',e=>{
    if(!hoja.matches||d.scrollTop>0)return;
    y0=e.touches[0].clientY;dy=0;on=true;d.style.transition='none';
  },{passive:true});
  d.addEventListener('touchmove',e=>{
    if(!on)return;
    dy=e.touches[0].clientY-y0;
    if(dy>0)d.style.transform='translateY('+dy+'px)';
  },{passive:true});
  d.addEventListener('touchend',()=>{
    if(!on)return;
    on=false;d.style.transition='';d.style.transform='';
    if(dy>90)cerrar();
  });
})();

/* ---------- carga ---------- */
async function cargar(){
  const r=await fetch('./data/jugadores.json',{cache:'no-store'});
  if(!r.ok)throw new Error('No se pudo cargar data/jugadores.json ('+r.status+')');
  const src=await r.json();
  DATA=src.categorias.map(c=>({...c,j:[]}));
  const porId=Object.fromEntries(DATA.map(c=>[c.id,c]));
  for(const p of src.jugadores){
    const g=porId[p.categoria];
    if(!g){console.warn('Categoría desconocida:',p.categoria,'—',p.nombre);continue;}
    g.j.push({n:p.nombre,anio:p.anio,a:String(p.anio).slice(2),c:p.club||'',
              pos:p.demarcacion,e:p.situacion||null,en:p.cesionA||null,foto:p.foto||null,g:g.id,gn:g.nombre});
  }
  DATA.forEach(g=>g.j.forEach((x,i)=>{x.id=g.id+'-'+i;}));
  ALL=DATA.flatMap(g=>g.j);
  ALL.forEach(x=>{x._k=norm(x.n+' '+x.c+' '+(x.en||''));});
  state.g=DATA[0].id;
  montarGrupos();
  render();
}

cargar().catch(err=>{
  console.error(err);
  document.querySelector('#view').innerHTML=
    '<p class="pempty">No se pudieron cargar los datos.<br>Arranca el servidor con '
    +'<code>npm run dev</code>: abrir el HTML con <code>file://</code> bloquea <code>fetch</code>.</p>';
});
