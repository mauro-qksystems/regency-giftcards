const KEY = 'rgc-proto-v1';

const CSV_SEED = [
  { name: 'Ana Lucía Herrera', email: 'ana.herrera@copa.com' },
  { name: 'Carlos Mendoza', email: 'carlos.mendoza@copa.com' },
  { name: 'Yenifer Tejada', email: 'yenifer.tejada@copa.com' },
  { name: 'Andrés Pérez', email: 'andres.perez@copa.com' },
  { name: 'María Gabriela Núñez', email: 'maria.nunez@copa.com' },
  { name: 'Luis Cedeño', email: 'luis.cedeno@copa.com' },
  { name: 'Patricia Quintero', email: 'patricia.quintero@copa.com' },
  { name: 'José del Cid', email: 'jose.delcid@copa.com' },
  { name: 'Fabiola Samaniego', email: 'fabiola.samaniego@copa.com' },
  { name: 'Ricardo Arosemena', email: 'ricardo.arosemena@copa.com' },
  { name: 'Daniela Espinosa', email: 'daniela.espinosa@copa.com' },
  { name: 'Miguel Ángel Tuñón', email: 'miguel.tunon@copa.com' },
];

function seed() {
  return {
    corporates: [
      { id: 'copa', name: 'Copa Airlines', ruc: '155588888-2-2015 DV12', contact: 'Mariana Tejada', role: 'Beneficios y Compensación', email: 'beneficios@copa.com', phone: '+507 217-2672', contract: 50000, used: 18420, status: 'activo', since: '2024-03-12', banners: 'Sportline, Kicks, Bellini' },
      { id: 'banistmo', name: 'Banistmo', ruc: '204-123-456 DV21', contact: 'Jorge Vallarino', role: 'People Experience', email: 'talento@banistmo.com', phone: '+507 206-8000', contract: 80000, used: 41200, status: 'activo', since: '2023-11-02', banners: 'Sportline, World Time' },
      { id: 'bg', name: 'Banco General', ruc: '8-NT-1-21 DV84', contact: 'Laura Chiari', role: 'RR.HH.', email: 'rrhh@bgeneral.com', phone: '+507 800-0000', contract: 120000, used: 67350, status: 'activo', since: '2023-08-18', banners: 'Multi-banner Regency' },
      { id: 'acp', name: 'Autoridad del Canal de Panamá', ruc: '8-NT-1-196 DV01', contact: 'Roberto Alvarado', role: 'Bienestar laboral', email: 'bienestar@pancanal.com', phone: '+507 272-1111', contract: 60000, used: 9200, status: 'activo', since: '2025-01-09', banners: 'Sportline, Kicks' },
      { id: 'tigo', name: 'Tigo Panamá', ruc: '155-998877 DV33', contact: 'Karina De León', role: 'Cultura', email: 'cultura@tigo.com.pa', phone: '+507 269-1111', contract: 35000, used: 28800, status: 'activo', since: '2024-09-01', banners: 'Sportline' },
      { id: 'aes', name: 'AES Panamá', ruc: '155-445566 DV09', contact: 'Emilio Camaño', role: 'Compensación', email: 'compensacion@aes.com', phone: '+507 206-2600', contract: 25000, used: 4100, status: 'activo', since: '2025-04-22', banners: 'Sportline, Bellini' },
      { id: 'melo', name: 'Grupo Melo', ruc: '8-NT-2-88 DV17', contact: 'Sofía Dutary', role: 'RR.HH.', email: 'personas@melo.com', phone: '+507 204-4400', contract: 40000, used: 0, status: 'borrador', since: '2026-08-04', banners: 'Sportline' },
    ],
    orders: [
      { id: 'ORD-1042', corporateId: 'copa', occasion: 'Día del Padre', denom: 25, qty: 40, total: 1000, status: 'distribuida', date: '2026-06-12', note: 'Entrega digital a tripulación de escala PTY.' },
      { id: 'ORD-1018', corporateId: 'copa', occasion: 'Reconocimiento Q1', denom: 50, qty: 20, total: 1000, status: 'redimida-parcial', date: '2026-03-28', note: '' },
      { id: 'ORD-0988', corporateId: 'banistmo', occasion: 'Catorceavo', denom: 100, qty: 180, total: 18000, status: 'distribuida', date: '2026-04-15', note: '' },
      { id: 'ORD-1101', corporateId: 'bg', occasion: 'Aguinaldo 2025', denom: 50, qty: 400, total: 20000, status: 'cerrada', date: '2025-12-02', note: '' },
    ],
    cards: [
      { code: 'RG-4821-K7MP', orderId: 'ORD-1042', corporateId: 'copa', holder: 'Luis Cedeño', email: 'luis.cedeno@copa.com', original: 25, balance: 25, status: 'activa', sent: true },
      { code: 'RG-19QX-8T2A', orderId: 'ORD-1042', corporateId: 'copa', holder: 'Ana Lucía Herrera', email: 'ana.herrera@copa.com', original: 25, balance: 25, status: 'activa', sent: true },
      { code: 'RG-3M0P-44KL', orderId: 'ORD-1018', corporateId: 'copa', holder: 'Carlos Mendoza', email: 'carlos.mendoza@copa.com', original: 50, balance: 12.5, status: 'parcial', sent: true },
    ],
    redemptions: [
      { id: 'TX-9001', code: 'RG-3M0P-44KL', amount: 37.5, store: 'Sportline Multiplaza Pacífico', cashier: 'Karina Morales', at: '2026-04-02T16:12:00' },
    ],
    lastIssued: null,
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return seed();
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function reset() {
  localStorage.removeItem(KEY);
  db = seed();
  save();
  toast('Demo reiniciada');
  location.hash = '#/';
  render();
}

let db = load();
let toastTimer;
let overlayTimer;
let csvLoaded = null;
let posBuffer = '';
let posAmount = '';

function money(n) {
  return 'US$ ' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function moneyShort(n) {
  return 'US$ ' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
  return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'short', year: 'numeric' });
}

function toast(msg) {
  clearTimeout(toastTimer);
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  toastTimer = setTimeout(() => { el.style.display = 'none'; }, 2600);
}

function showOverlay(title, sub, ms, then) {
  const wrap = document.createElement('div');
  wrap.className = 'overlay';
  wrap.innerHTML = `<div class="overlay-card"><div class="spinner"></div><h2>${title}</h2><p class="muted">${sub}</p></div>`;
  document.body.appendChild(wrap);
  overlayTimer = setTimeout(() => {
    wrap.remove();
    then && then();
  }, ms);
}

function chipStatus(s) {
  const map = {
    activo: 'chip-ok',
    borrador: 'chip-warn',
    distribuida: 'chip-ok',
    'redimida-parcial': 'chip-warn',
    cerrada: 'chip-off',
    activa: 'chip-ok',
    parcial: 'chip-warn',
    agotada: 'chip-wine',
  };
  const label = {
    'redimida-parcial': 'Redimida parcial',
    borrador: 'Borrador',
    distribuida: 'Distribuida',
    cerrada: 'Cerrada',
    activo: 'Activo',
    activa: 'Activa',
    parcial: 'Saldo parcial',
    agotada: 'Agotada',
  };
  return `<span class="chip ${map[s] || ''}">${label[s] || s}</span>`;
}

function corp(id) { return db.corporates.find((c) => c.id === id); }
function ordersOf(id) { return db.orders.filter((o) => o.corporateId === id); }
function cardsOf(orderId) { return db.cards.filter((c) => c.code === orderId || c.orderId === orderId); }

function uid(prefix) {
  return prefix + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
}

function makeCode() {
  const a = Math.random().toString(36).slice(2, 6).toUpperCase();
  const b = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RG-${a}-${b}`;
}

function copy(text) {
  navigator.clipboard?.writeText(text).then(() => toast('Código copiado · ' + text)).catch(() => toast(text));
}

function parseHash() {
  const h = (location.hash || '#/').replace(/^#/, '');
  const parts = h.split('/').filter(Boolean);
  return parts;
}

function protoStrip(extra = '') {
  return `<div class="proto-strip">
    <span>Prototipo · <b>regency-giftcards</b> · no conectado a Prism</span>
    <span>${extra} <a href="#/">cambiar portal</a> · <a href="#/" data-reset>reiniciar demo</a></span>
  </div>`;
}

function side(role, active) {
  const brand = role === 'portal'
    ? `<div class="side-brand"><div class="kicker">Portal cliente</div><strong>Copa Airlines</strong><small>Mariana Tejada · Beneficios</small></div>`
    : `<div class="side-brand"><div class="kicker">Regency Retail</div><strong>giftcards</strong><small>Comercial corporativo</small></div>`;

  const links = role === 'portal' ? [
    ['#/portal', 'Inicio', 'home'],
    ['#/portal/ordenes/nueva', 'Nueva orden', 'new'],
    ['#/portal/ordenes', 'Órdenes', 'orders'],
    ['#/portal/beneficiarios', 'Beneficiarios', 'soon'],
    ['#/portal/reportes', 'Reportes', 'soon'],
  ] : [
    ['#/comercial', 'Inicio', 'home'],
    ['#/comercial/corporativos', 'Corporativos', 'corps'],
    ['#/comercial/ordenes', 'Órdenes', 'orders'],
    ['#/comercial/tiendas', 'Tiendas', 'soon'],
    ['#/comercial/reportes', 'Reportes', 'soon'],
  ];

  return `<aside class="side">
    ${brand}
    ${links.map(([href, label, key]) => `<a class="nav-link ${key === 'soon' ? 'soon' : ''} ${active === key ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
    <div class="side-foot">
      Prism · sincronizado<br />
      <a href="#/tienda">Abrir punto de venta</a>
    </div>
  </aside>`;
}

function landing() {
  return `<div class="landing">
    ${protoStrip()}
    <div class="landing-hero">
      <div class="brand-lockup">
        <div class="kicker">Grupo Regency · Panamá</div>
        <h1>regency<br /><em>giftcards</em></h1>
        <p class="sub">Programa corporativo de tarjetas de regalo. Emisión masiva para empresas, redención en Sportline, Kicks, Bellini y el resto de las tiendas del grupo.</p>
      </div>
      <div class="gift-plastic">
        <div class="row"><span>Regency</span><span>Panamá</span></div>
        <div>
          <div class="amt">US$ 25.00</div>
          <div class="code">RG-4821-K7MP</div>
        </div>
        <div class="row"><span>Sportline · Multiplaza</span><span>activa</span></div>
      </div>
    </div>
    <div class="portals">
      <a class="portal-card" href="#/comercial">
        <div class="n">01 · Comercial</div>
        <h2>Gestión de corporativos</h2>
        <p>Altas, contratos y cupos. El equipo comercial de Regency ve el programa entero.</p>
        <div class="go">Entrar →</div>
      </a>
      <a class="portal-card" href="#/portal">
        <div class="n">02 · Cliente</div>
        <h2>Portal Copa Airlines</h2>
        <p>La empresa arma una orden, carga beneficiarios y distribuye las cards por email.</p>
        <div class="go">Entrar →</div>
      </a>
      <a class="portal-card" href="#/tienda">
        <div class="n">03 · Tienda</div>
        <h2>Redención en caja</h2>
        <p>El cajero consulta saldo y redime — inclusive parcial — contra Prism.</p>
        <div class="go">Entrar →</div>
      </a>
    </div>
    <div class="demo-hint">Ruta de demo sugerida: <span>comercial → Copa → portal Copa (nueva orden + CSV) → tienda (código RG-4821-K7MP, redime US$ 18)</span></div>
  </div>`;
}

function comercialHome() {
  const active = db.corporates.filter((c) => c.status === 'activo').length;
  const issued = db.orders.reduce((s, o) => s + o.total, 0);
  const live = db.cards.filter((c) => c.balance > 0).length;
  return `${protoStrip('Comercial')}
  <div class="shell">
    ${side('comercial', 'home')}
    <div class="main">
      <div class="page-head">
        <div>
          <h1>Programa corporativo</h1>
          <p>Panamá · agosto 2026 · source of truth: Retail Pro Prism</p>
        </div>
        <div class="who"><b>Elena Motta</b>Comercial corporativo · Punta Pacífica</div>
      </div>
      <div class="grid-4">
        <div class="stat"><div class="lbl">Empresas activas</div><div class="val">${active}</div><div class="hint">1 contrato en borrador</div></div>
        <div class="stat"><div class="lbl">Emitido YTD</div><div class="val">${moneyShort(issued)}</div><div class="hint">Órdenes corporativas 2026</div></div>
        <div class="stat"><div class="lbl">Cards con saldo</div><div class="val">${live}</div><div class="hint">Listas para caja</div></div>
        <div class="stat"><div class="lbl">Prism</div><div class="val" style="font-size:22px;margin-top:8px;">Online</div><div class="hint">Crear · saldo · redimir</div></div>
      </div>
      <div class="grid-2 mt">
        <div class="panel">
          <h3>Actividad reciente</h3>
          <div class="timeline">
            <div class="tl"><i></i><div>Copa Airlines distribuyó <b>ORD-1042</b> · 40 cards de US$ 25<span>12 jun 2026</span></div></div>
            <div class="tl"><i></i><div>Redención parcial en Sportline Multiplaza · <b>RG-3M0P-44KL</b><span>2 abr 2026 · Karina Morales · Caja 3</span></div></div>
            <div class="tl"><i></i><div>Banistmo cerró catorceavo · <b>ORD-0988</b> · US$ 18,000<span>15 abr 2026</span></div></div>
            <div class="tl"><i></i><div>Grupo Melo quedó en borrador de contrato<span>4 ago 2026</span></div></div>
          </div>
        </div>
        <div class="panel">
          <h3>Por cerrar</h3>
          <p style="font-size:14px;margin-bottom:12px;">Grupo Melo tiene contrato en borrador. Copa tiene cupo disponible para una orden de reconocimiento.</p>
          <div class="flex">
            <a class="btn" href="#/comercial/corporativos">Ver corporativos</a>
            <a class="btn btn-ghost" href="#/portal">Impersonar Copa</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function corporatesList() {
  const rows = db.corporates.map((c) => {
    const pct = c.contract ? Math.round((c.used / c.contract) * 100) : 0;
    return `<tr class="clickable" data-go="#/comercial/corporativos/${c.id}">
      <td><b>${c.name}</b><div class="faint" style="font-size:12px">${c.contact}</div></td>
      <td>${chipStatus(c.status)}</td>
      <td class="mono">${moneyShort(c.used)} / ${moneyShort(c.contract)}</td>
      <td style="width:120px"><div class="progress"><i style="width:${Math.min(pct,100)}%"></i></div></td>
      <td class="muted">${fmtDate(c.since)}</td>
    </tr>`;
  }).join('');
  return `${protoStrip('Comercial')}
  <div class="shell">
    ${side('comercial', 'corps')}
    <div class="main">
      <div class="page-head">
        <div>
          <h1>Corporativos</h1>
          <p>${db.corporates.length} cuentas · contratos y cupos de emisión</p>
        </div>
        <a class="btn btn-copper" href="#/comercial/corporativos/nuevo">Nueva empresa</a>
      </div>
      <div class="panel">
        <table>
          <thead><tr><th>Empresa</th><th>Estado</th><th>Cupo usado</th><th></th><th>Desde</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function corporateDetail(id) {
  const c = corp(id);
  if (!c) return corporatesList();
  const ords = ordersOf(id);
  const pct = c.contract ? Math.round((c.used / c.contract) * 100) : 0;
  const rows = ords.length
    ? ords.map((o) => `<tr class="clickable" data-go="#/portal/ordenes/${o.id}">
        <td class="mono">${o.id}</td>
        <td>${o.occasion}</td>
        <td>${o.qty} × ${moneyShort(o.denom)}</td>
        <td class="mono">${money(o.total)}</td>
        <td>${chipStatus(o.status)}</td>
        <td class="muted">${fmtDate(o.date)}</td>
      </tr>`).join('')
    : `<tr><td colspan="6" class="muted">Todavía no hay órdenes.</td></tr>`;
  return `${protoStrip('Comercial')}
  <div class="shell">
    ${side('comercial', 'corps')}
    <div class="main">
      <div class="page-head">
        <div>
          <p class="muted" style="margin-bottom:6px"><a href="#/comercial/corporativos">Corporativos</a> / ${c.name}</p>
          <h1>${c.name}</h1>
          <p>${c.ruc} · redimible en ${c.banners}</p>
        </div>
        <div class="who">${chipStatus(c.status)}<b style="margin-top:8px">${c.contact}</b>${c.role}</div>
      </div>
      <div class="grid-3">
        <div class="stat"><div class="lbl">Línea de contrato</div><div class="val">${moneyShort(c.contract)}</div><div class="hint">Usado ${moneyShort(c.used)} · ${pct}%</div></div>
        <div class="stat"><div class="lbl">Disponible</div><div class="val">${moneyShort(c.contract - c.used)}</div><div class="hint">Para nuevas órdenes</div></div>
        <div class="stat"><div class="lbl">Órdenes</div><div class="val">${ords.length}</div><div class="hint">${c.email}</div></div>
      </div>
      <div class="grid-2 mt">
        <div class="panel">
          <h3>Contrato</h3>
          <p style="font-size:14px">Vigente desde ${fmtDate(c.since)}. Facturación mensual contra emisión. Las cards se crean en Prism y se notifican por email al beneficiario.</p>
          <div class="mt-sm muted" style="font-size:13px">${c.phone} · ${c.email}</div>
        </div>
        <div class="panel">
          <h3>Usuarios del portal</h3>
          <p style="font-size:14px"><b>${c.contact}</b> · Admin empresa<br /><span class="muted">Puede crear órdenes, cargar CSV y ver saldos. No opera caja.</span></p>
          ${id === 'copa' ? '<a class="btn mt" href="#/portal">Abrir portal Copa</a>' : ''}
        </div>
      </div>
      <div class="panel mt">
        <h3>Órdenes</h3>
        <table>
          <thead><tr><th>ID</th><th>Motivo</th><th>Cards</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function newCorporate() {
  return `${protoStrip('Comercial')}
  <div class="shell">
    ${side('comercial', 'corps')}
    <div class="main">
      <div class="page-head">
        <div>
          <p class="muted" style="margin-bottom:6px"><a href="#/comercial/corporativos">Corporativos</a> / nueva</p>
          <h1>Alta de empresa</h1>
          <p>El contrato habilita el portal. Prism no se toca hasta la primera orden.</p>
        </div>
      </div>
      <form class="panel" id="form-corp" style="max-width:720px">
        <div class="grid-2">
          <label class="field">Razón social<input name="name" value="Cervecería Nacional" required /></label>
          <label class="field">RUC<input name="ruc" value="8-NT-3-12 DV44" required /></label>
          <label class="field">Contacto<input name="contact" value="Paola Correa" required /></label>
          <label class="field">Cargo<input name="role" value="Bienestar" /></label>
          <label class="field">Email<input name="email" type="email" value="bienestar@cerveza.com.pa" required /></label>
          <label class="field">Teléfono<input name="phone" value="+507 305-1000" /></label>
          <label class="field">Línea de contrato (US$)<input name="contract" type="number" value="30000" /></label>
          <label class="field">Banners
            <select name="banners">
              <option>Sportline, Kicks, Bellini</option>
              <option>Sportline</option>
              <option>Multi-banner Regency</option>
            </select>
          </label>
        </div>
        <div class="flex-end mt">
          <a class="btn btn-ghost" href="#/comercial/corporativos">Cancelar</a>
          <button class="btn btn-copper" type="submit">Crear cuenta</button>
        </div>
      </form>
    </div>
  </div>`;
}

function comercialOrders() {
  const rows = [...db.orders].reverse().map((o) => {
    const c = corp(o.corporateId);
    return `<tr class="clickable" data-go="#/portal/ordenes/${o.id}">
      <td class="mono">${o.id}</td>
      <td><b>${c ? c.name : o.corporateId}</b></td>
      <td>${o.occasion}</td>
      <td>${o.qty} × ${moneyShort(o.denom)}</td>
      <td class="mono">${money(o.total)}</td>
      <td>${chipStatus(o.status)}</td>
      <td class="muted">${fmtDate(o.date)}</td>
    </tr>`;
  }).join('');
  return `${protoStrip('Comercial')}
  <div class="shell">
    ${side('comercial', 'orders')}
    <div class="main">
      <div class="page-head">
        <div><h1>Órdenes</h1><p>Emisión corporativa · cada card se crea en Prism</p></div>
      </div>
      <div class="panel"><table>
        <thead><tr><th>ID</th><th>Empresa</th><th>Motivo</th><th>Cards</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
  </div>`;
}

function portalHome() {
  const c = corp('copa');
  const ords = ordersOf('copa');
  const pct = Math.round((c.used / c.contract) * 100);
  return `${protoStrip('Portal Copa')}
  <div class="shell">
    ${side('portal', 'home')}
    <div class="main">
      <div class="page-head">
        <div>
          <h1>Hola, Mariana</h1>
          <p>Copa Airlines · gift cards redimibles en Sportline, Kicks y Bellini</p>
        </div>
        <a class="btn btn-copper" href="#/portal/ordenes/nueva">Nueva orden</a>
      </div>
      <div class="grid-3">
        <div class="stat"><div class="lbl">Cupo del contrato</div><div class="val">${moneyShort(c.contract)}</div><div class="hint">${pct}% usado · ${moneyShort(c.contract - c.used)} libre</div></div>
        <div class="stat"><div class="lbl">Órdenes</div><div class="val">${ords.length}</div><div class="hint">Última ${fmtDate(ords[0] && ords[0].date)}</div></div>
        <div class="stat"><div class="lbl">Cards Copa con saldo</div><div class="val">${db.cards.filter((x) => x.corporateId === 'copa' && x.balance > 0).length}</div><div class="hint">Listas para tienda</div></div>
      </div>
      <div class="panel mt">
        <h3>Últimas órdenes</h3>
        <table>
          <thead><tr><th>ID</th><th>Motivo</th><th>Cards</th><th>Total</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            ${ords.map((o) => `<tr class="clickable" data-go="#/portal/ordenes/${o.id}">
              <td class="mono">${o.id}</td><td>${o.occasion}</td>
              <td>${o.qty} × ${moneyShort(o.denom)}</td>
              <td class="mono">${money(o.total)}</td>
              <td>${chipStatus(o.status)}</td>
              <td class="muted">${fmtDate(o.date)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function portalOrders() {
  const ords = ordersOf('copa');
  return `${protoStrip('Portal Copa')}
  <div class="shell">
    ${side('portal', 'orders')}
    <div class="main">
      <div class="page-head">
        <div><h1>Órdenes Copa</h1><p>Emisión y distribución a colaboradores</p></div>
        <a class="btn btn-copper" href="#/portal/ordenes/nueva">Nueva orden</a>
      </div>
      <div class="panel"><table>
        <thead><tr><th>ID</th><th>Motivo</th><th>Cards</th><th>Total</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>
          ${ords.map((o) => `<tr class="clickable" data-go="#/portal/ordenes/${o.id}">
            <td class="mono">${o.id}</td><td>${o.occasion}</td>
            <td>${o.qty} × ${moneyShort(o.denom)}</td>
            <td class="mono">${money(o.total)}</td>
            <td>${chipStatus(o.status)}</td>
            <td class="muted">${fmtDate(o.date)}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  </div>`;
}

function newOrder() {
  const people = csvLoaded || [];
  const denom = Number(sessionStorage.getItem('rgc-denom') || 25);
  const qty = people.length || Number(sessionStorage.getItem('rgc-qty') || 12);
  return `${protoStrip('Portal Copa')}
  <div class="shell">
    ${side('portal', 'new')}
    <div class="main">
      <div class="page-head">
        <div>
          <h1>Nueva orden</h1>
          <p>Copa Airlines · las cards se crean en Prism y se envían por email</p>
        </div>
      </div>
      <div class="steps">
        <span class="on">1. Denominación</span>
        <span class="${people.length ? 'on' : ''}">2. Beneficiarios</span>
        <span>3. Confirmar</span>
      </div>
      <div class="grid-2">
        <div class="panel">
          <h3>La orden</h3>
          <label class="field">Motivo / ocasión
            <input id="ord-occasion" value="Reconocimiento tripulación agosto" />
          </label>
          <div class="muted" style="font-size:12px;margin-bottom:8px">DENOMINACIÓN</div>
          <div class="denoms" id="denoms">
            ${[10, 25, 50, 100].map((n) => `<button type="button" class="denom ${n === denom ? 'on' : ''}" data-denom="${n}">${moneyShort(n)}</button>`).join('')}
          </div>
          <p class="mt muted" style="font-size:13px">Redimible en Sportline, Kicks y Bellini. Saldo parcial permitido en caja.</p>
        </div>
        <div class="panel">
          <h3>Beneficiarios</h3>
          <div class="drop ${people.length ? 'loaded' : ''}" id="drop-csv">
            <strong>${people.length ? people.length + ' colaboradores cargados' : 'Cargar CSV / Excel'}</strong>
            <span>${people.length ? 'Nombre, email — listo para emitir' : 'Click para simular carga de tripulación Copa (12 filas)'}</span>
          </div>
          ${people.length ? `<table class="mt"><thead><tr><th>Nombre</th><th>Email</th></tr></thead><tbody>
            ${people.slice(0, 6).map((p) => `<tr><td>${p.name}</td><td class="muted">${p.email}</td></tr>`).join('')}
            ${people.length > 6 ? `<tr><td colspan="2" class="muted">+ ${people.length - 6} más</td></tr>` : ''}
          </tbody></table>` : ''}
        </div>
      </div>
      <div class="panel mt space">
        <div>
          <div class="muted" style="font-size:12px;letter-spacing:.1em;text-transform:uppercase">Total a emitir</div>
          <div class="serif" style="font-size:32px;font-weight:600">${money(denom * qty)}</div>
          <div class="muted">${qty} cards × ${moneyShort(denom)}</div>
        </div>
        <button class="btn btn-copper btn-lg" id="btn-emit" ${people.length ? '' : 'disabled'}>Emitir y distribuir</button>
      </div>
    </div>
  </div>`;
}

function orderDetail(id) {
  const o = db.orders.find((x) => x.id === id);
  if (!o) return portalOrders();
  const c = corp(o.corporateId);
  const cards = db.cards.filter((x) => x.orderId === id);
  const shown = cards.length ? cards : [];
  return `${protoStrip('Portal')}
  <div class="shell">
    ${side(o.corporateId === 'copa' ? 'portal' : 'comercial', 'orders')}
    <div class="main">
      <div class="page-head">
        <div>
          <p class="muted" style="margin-bottom:6px">${c ? c.name : ''} / ${o.id}</p>
          <h1>${o.occasion}</h1>
          <p>${o.qty} cards de ${moneyShort(o.denom)} · ${chipStatus(o.status)} · ${fmtDate(o.date)}</p>
        </div>
        <a class="btn btn-ghost" href="#/tienda">Probar en caja</a>
      </div>
      <div class="grid-3">
        ${shown.slice(0, 3).map((card) => `
          <div class="card-face">
            <div class="top"><span>Regency giftcards</span><span>${card.status}</span></div>
            <div>
              <div class="amt">${money(card.balance)}</div>
              <div class="who-name">${card.holder}</div>
            </div>
            <div class="code" data-copy="${card.code}">${card.code} · copiar</div>
          </div>`).join('')}
      </div>
      <div class="panel mt">
        <h3>Cards emitidas ${shown.length ? '· ' + shown.length : ''}</h3>
        ${shown.length ? `<table>
          <thead><tr><th>Código</th><th>Beneficiario</th><th>Saldo</th><th>Email</th><th></th></tr></thead>
          <tbody>${shown.map((card) => `<tr>
            <td class="mono"><a href="#/tienda/${card.code}" style="border-bottom:1px solid var(--line-2)">${card.code}</a></td>
            <td>${card.holder}</td>
            <td class="mono">${money(card.balance)} / ${money(card.original)}</td>
            <td class="muted">${card.sent ? 'Enviado' : 'Pendiente'}</td>
            <td><button class="btn btn-ghost" data-copy="${card.code}" style="padding:6px 10px;font-size:12px">Copiar</button></td>
          </tr>`).join('')}</tbody>
        </table>` : `<p class="muted">Las cards de esta orden viven en Prism. En el prototipo solo materializamos las de demo.</p>`}
        ${o.note ? `<p class="mt muted">${o.note}</p>` : ''}
      </div>
    </div>
  </div>`;
}

function storeView(prefill) {
  const code = (prefill || posBuffer || '').toUpperCase();
  const card = db.cards.find((c) => c.code === code);
  const last = db.lastIssued || 'RG-4821-K7MP';
  return `${protoStrip('Tienda · Sportline Multiplaza Pacífico')}
  <div class="pos">
    <div class="pos-left">
      <div class="pos-top">
        <div class="pos-brand">
          <div class="kicker">Punto de venta</div>
          <h1>Redimir gift card</h1>
        </div>
        <div class="pos-meta">
          <b>Karina Morales · Caja 3</b>
          Sportline · Multiplaza Pacífico<br />
          18 ago 2026 · 17:42
        </div>
      </div>
      <div class="lbl" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#c4784a;margin-bottom:8px">Código</div>
      <input class="pos-input" id="pos-code" placeholder="RG-····-····" value="${code}" autocomplete="off" />
      <div class="flex mt-sm">
        <button class="btn btn-copper" id="pos-lookup">Consultar saldo</button>
        <button class="btn btn-ghost" id="pos-demo" style="color:#efe6d6;border-color:#4a4038">Usar ${last}</button>
      </div>
      <p class="mt muted" style="color:#8a8076;font-size:13px">Prism responde el saldo en vivo. La caja no crea cards: solo consulta y redime.</p>
      ${card ? storeCard(card) : (code && !card ? `<p class="mt" style="color:#e8b4b4">Código no encontrado en el prototipo. Probá ${last}.</p>` : '')}
    </div>
    <div class="pos-right">
      ${card ? storeRedeem(card) : `<div class="pos-card"><div class="lbl">Esperando card</div><p style="color:#b7aa9c;margin-top:10px;font-size:14px">Ingresá un código o usá la última emitida en la demo. Sugerido: <b style="color:#efe6d6">RG-4821-K7MP</b> (Luis Cedeño · Copa · US$ 25.00).</p></div>`}
    </div>
  </div>`;
}

function storeCard(card) {
  const c = corp(card.corporateId);
  return `<div class="pos-card mt">
    <div class="lbl">Saldo disponible</div>
    <div class="amt">${money(card.balance)}</div>
    <div style="color:#d7cbbd;font-size:14px">${card.holder} · ${c ? c.name : ''}</div>
    <div class="mt-sm" style="font-size:12px;letter-spacing:.12em;color:#c4784a">${card.code} · original ${money(card.original)}</div>
  </div>`;
}

function storeRedeem(card) {
  if (card.balance <= 0) {
    return `<div class="pos-card"><div class="lbl">Card agotada</div><p style="margin-top:10px;color:#d7cbbd">Saldo US$ 0.00. No hay nada para redimir.</p><a class="btn mt" href="#/tienda" style="background:#efe6d6;color:#161210;border:0">Nueva consulta</a></div>`;
  }
  const amt = posAmount || '';
  return `<div>
    <div class="lbl" style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#c4784a">Monto a redimir</div>
    <div class="serif" style="font-size:44px;margin:4px 0 12px">${amt ? money(amt) : 'US$ 0.00'}</div>
    <div class="keys" id="keys">
      ${[1,2,3,4,5,6,7,8,9].map((n) => `<button class="key" data-k="${n}">${n}</button>`).join('')}
      <button class="key" data-k=".">.</button>
      <button class="key" data-k="0">0</button>
      <button class="key" data-k="del">⌫</button>
      <button class="key" data-k="25">25</button>
      <button class="key" data-k="18">18</button>
      <button class="key ok" data-k="go">Redimir</button>
    </div>
    <p class="mt" style="color:#8a8076;font-size:12px">Atajo de demo: 18 deja saldo residual (redención parcial).</p>
  </div>`;
}

function ticketView(txId) {
  const tx = db.redemptions.find((t) => t.id === txId);
  const card = tx && db.cards.find((c) => c.code === tx.code);
  if (!tx || !card) return storeView();
  return `${protoStrip('Ticket')}
  <div style="min-height:calc(100vh - 31px);background:var(--night);padding:40px 20px;display:flex;justify-content:center">
    <div style="width:340px">
      <div class="ticket">
        <div style="text-align:center;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--copper)">Sportline · Multiplaza Pacífico</div>
        <h2>regency giftcards</h2>
        <div class="dash"></div>
        <div class="row"><span>Ticket</span><span class="mono">${tx.id}</span></div>
        <div class="row"><span>Caja</span><span>Karina Morales · 3</span></div>
        <div class="row"><span>Fecha</span><span>${new Date(tx.at).toLocaleString('es-PA')}</span></div>
        <div class="dash"></div>
        <div class="row"><span>Card</span><span class="mono">${tx.code}</span></div>
        <div class="row"><span>Titular</span><span>${card.holder}</span></div>
        <div class="row"><span>Redimido</span><span><b>${money(tx.amount)}</b></span></div>
        <div class="row"><span>Saldo restante</span><span>${money(card.balance)}</span></div>
        <div class="dash"></div>
        <p style="text-align:center;font-size:12px;color:var(--muted);margin-top:8px">Prism · Oracle · no se imprime el PIN</p>
      </div>
      <div class="flex mt" style="justify-content:center">
        <a class="btn btn-copper" href="#/tienda">Nueva consulta</a>
        <a class="btn btn-ghost" href="#/" style="color:#efe6d6;border-color:#4a4038">Cerrar demo</a>
      </div>
    </div>
  </div>`;
}

function bind() {
  document.querySelectorAll('[data-reset]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); reset(); });
  });
  document.querySelectorAll('[data-go]').forEach((el) => {
    el.addEventListener('click', () => { location.hash = el.getAttribute('data-go'); });
  });
  document.querySelectorAll('[data-copy]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); copy(el.getAttribute('data-copy')); });
  });

  const form = document.getElementById('form-corp');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const id = 'cn-' + Date.now().toString(36);
      db.corporates.unshift({
        id,
        name: f.get('name'),
        ruc: f.get('ruc'),
        contact: f.get('contact'),
        role: f.get('role'),
        email: f.get('email'),
        phone: f.get('phone'),
        contract: Number(f.get('contract') || 0),
        used: 0,
        status: 'activo',
        since: '2026-08-18',
        banners: f.get('banners'),
      });
      save();
      toast(f.get('name') + ' quedó activa');
      location.hash = '#/comercial/corporativos/' + id;
    });
  }

  document.querySelectorAll('[data-denom]').forEach((el) => {
    el.addEventListener('click', () => {
      sessionStorage.setItem('rgc-denom', el.getAttribute('data-denom'));
      render();
    });
  });

  const drop = document.getElementById('drop-csv');
  if (drop) {
    drop.addEventListener('click', () => {
      csvLoaded = CSV_SEED;
      sessionStorage.setItem('rgc-qty', String(CSV_SEED.length));
      toast('CSV de tripulación Copa cargado');
      render();
    });
  }

  const emit = document.getElementById('btn-emit');
  if (emit) {
    emit.addEventListener('click', () => {
      const denom = Number(sessionStorage.getItem('rgc-denom') || 25);
      const people = csvLoaded || CSV_SEED;
      const occasion = document.getElementById('ord-occasion').value;
      const id = 'ORD-' + (1100 + db.orders.length);
      const total = denom * people.length;
      showOverlay('Emitiendo en Prism', 'Crear gift card × ' + people.length, 1400, () => {
        db.orders.unshift({
          id, corporateId: 'copa', occasion, denom, qty: people.length, total,
          status: 'distribuida', date: '2026-08-18', note: 'Distribución automática por email.',
        });
        const newCards = people.map((p) => ({
          code: makeCode(),
          orderId: id,
          corporateId: 'copa',
          holder: p.name,
          email: p.email,
          original: denom,
          balance: denom,
          status: 'activa',
          sent: true,
        }));
        db.cards = newCards.concat(db.cards);
        db.lastIssued = newCards[0].code;
        const copa = corp('copa');
        copa.used += total;
        csvLoaded = null;
        save();
        toast('12 cards emitidas y enviadas');
        location.hash = '#/portal/ordenes/' + id;
      });
    });
  }

  const lookup = document.getElementById('pos-lookup');
  const input = document.getElementById('pos-code');
  if (lookup && input) {
    const go = () => {
      posBuffer = input.value.trim().toUpperCase();
      posAmount = '';
      render();
    };
    lookup.addEventListener('click', go);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  }
  const demoBtn = document.getElementById('pos-demo');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      posBuffer = db.lastIssued || 'RG-4821-K7MP';
      posAmount = '';
      render();
    });
  }

  const keys = document.getElementById('keys');
  if (keys) {
    keys.addEventListener('click', (e) => {
      const k = e.target.closest('[data-k]');
      if (!k) return;
      const v = k.getAttribute('data-k');
      if (v === 'del') posAmount = posAmount.slice(0, -1);
      else if (v === '18' || v === '25') posAmount = v;
      else if (v === 'go') redeemCurrent();
      else if (v === '.' && posAmount.includes('.')) return;
      else if (v !== 'go') posAmount = (posAmount + v).replace(/^0+(?=\d)/, '');
      render();
      const again = document.getElementById('pos-code');
      if (again) again.blur();
    });
  }
}

function redeemCurrent() {
  const card = db.cards.find((c) => c.code === posBuffer);
  if (!card) return toast('Consultá un código primero');
  const amt = Number(posAmount);
  if (!amt || amt <= 0) return toast('Ingresá un monto');
  if (amt > card.balance + 0.001) return toast('Supera el saldo · ' + money(card.balance));
  const txId = uid('TX');
  showOverlay('Redimiendo', 'Prism · API redimir', 1100, () => {
    card.balance = Math.round((card.balance - amt) * 100) / 100;
    card.status = card.balance <= 0 ? 'agotada' : 'parcial';
    db.redemptions.unshift({
      id: txId,
      code: card.code,
      amount: amt,
      store: 'Sportline Multiplaza Pacífico',
      cashier: 'Karina Morales',
      at: new Date().toISOString(),
    });
    save();
    posAmount = '';
    location.hash = '#/ticket/' + txId;
  });
}

function render() {
  const parts = parseHash();
  const root = document.getElementById('app');
  let html = '';

  if (!parts.length) html = landing();
  else if (parts[0] === 'comercial' && parts[1] === 'corporativos' && parts[2] === 'nuevo') html = newCorporate();
  else if (parts[0] === 'comercial' && parts[1] === 'corporativos' && parts[2]) html = corporateDetail(parts[2]);
  else if (parts[0] === 'comercial' && parts[1] === 'corporativos') html = corporatesList();
  else if (parts[0] === 'comercial' && parts[1] === 'ordenes') html = comercialOrders();
  else if (parts[0] === 'comercial') html = comercialHome();
  else if (parts[0] === 'portal' && parts[1] === 'ordenes' && parts[2] === 'nueva') html = newOrder();
  else if (parts[0] === 'portal' && parts[1] === 'ordenes' && parts[2]) html = orderDetail(parts[2]);
  else if (parts[0] === 'portal' && parts[1] === 'ordenes') html = portalOrders();
  else if (parts[0] === 'portal') html = portalHome();
  else if (parts[0] === 'tienda' && parts[1]) {
    posBuffer = parts[1].toUpperCase();
    html = storeView(posBuffer);
  } else if (parts[0] === 'tienda') html = storeView();
  else if (parts[0] === 'ticket' && parts[1]) html = ticketView(parts[1]);
  else html = landing();

  root.innerHTML = html;
  bind();
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
