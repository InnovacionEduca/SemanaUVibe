/* Página Guías — depende de data.js (CONFIG) y guias-data.js (GUIDES, GUIDE_CATS) */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const slug = s => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  /* ---- Comportamiento común: enlaces, año, menú móvil ---- */
  document.querySelectorAll('[data-link]').forEach(a => { a.href = CONFIG.links[a.dataset.link]; });
  $('#year').textContent = new Date().getFullYear();
  const burger = $('#burger'), menu = $('#menu');
  burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
  addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 20), { passive: true });

  /* ---- Convierte links de Drive/Dropbox en descarga directa ---- */
  function directUrl(u) {
    if (!u) return '';
    let m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/);
    if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
    if (/dropbox\.com/.test(u)) return u.replace(/([?&])dl=0/, '$1dl=1').replace(/^([^?]*)$/, '$1?dl=1');
    return u;
  }

  /* ---- Guías descargadas (se recuerdan en este navegador) ---- */
  const KEY = 'uvibe_guias_descargadas';
  let done = [];
  try { done = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} };
  GUIDES.forEach(g => { g.id = g.id || slug(g.titulo); });

  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>';
  const dl = '<svg class="dl" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>';

  /* ---- Progreso ---- */
  function progress() {
    const ok = GUIDES.filter(g => g.url), n = ok.filter(g => done.includes(g.id)).length;
    const pct = ok.length ? Math.round(n / ok.length * 100) : 0;
    $('#prog-text').textContent = ok.length ? `Has descargado ${n} de ${ok.length} guías disponibles` : 'Muy pronto tendrás nuevas guías';
    $('#prog-pct').textContent = pct + '%';
    $('#prog-bar').style.width = pct + '%';
  }

  /* ---- Filtros ---- */
  let cat = 'Todas';
  const chips = $('#chips');
  chips.innerHTML = ['Todas', ...GUIDE_CATS].map(c => `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === 'Todas'}">${esc(c)}</button>`).join('');
  chips.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    cat = b.dataset.cat;
    chips.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.cat === cat));
    render();
  });
  $('#g-text').addEventListener('input', render);

  /* ---- Tarjetas ---- */
  function card(g, feat) {
    const url = directUrl(g.url), isDone = done.includes(g.id);
    const meta = [g.paginas && `${g.paginas} páginas`, 'PDF', g.peso].filter(Boolean).join(' · ');
    const btn = url
      ? `<a class="btn" href="${esc(url)}" download="${esc(g.id)}.pdf" target="_blank" rel="noopener" data-id="${esc(g.id)}">${dl}<span>${isDone ? 'Descargar de nuevo' : 'Descargar guía'}</span></a>`
      : `<a class="btn" aria-disabled="true" role="link" tabindex="-1">Próximamente</a>`;
    return `<article class="gcard${feat ? ' gcard--feat' : ''}${isDone ? ' done' : ''}" id="g-${esc(g.id)}">
      ${feat ? `<div class="ico">${icon}</div><div class="gcard__body"><span class="gcard__cat">★ Recomendada · ${esc(g.cat)}</span><h3>${esc(g.titulo)}</h3><p>${esc(g.desc)}</p><div class="gcard__meta">${meta}</div></div>${btn}`
      : `<div class="gcard__top"><div class="ico">${icon}</div><span class="gcard__cat">${esc(g.cat)}</span></div><h3>${esc(g.titulo)}</h3><p>${esc(g.desc)}</p><div class="gcard__meta">${meta}</div>${btn}`}
    </article>`;
  }

  function render() {
    const t = norm($('#g-text').value.trim());
    const list = GUIDES.filter(g => (cat === 'Todas' || g.cat === cat) && (!t || norm(g.titulo + ' ' + g.desc + ' ' + g.cat).includes(t)));
    const plain = cat === 'Todas' && !t;                       // la destacada solo se agranda sin filtros
    list.sort((a, b) => (plain && b.destacada) - (plain && a.destacada));
    $('#g-count').textContent = `${list.length} guía${list.length === 1 ? '' : 's'} ${plain ? 'disponible' : 'encontrada'}${list.length === 1 ? '' : 's'}`;
    $('#ggrid').innerHTML = list.length ? list.map(g => card(g, plain && g.destacada)).join('')
      : '<p class="empty">No encontramos guías con esa búsqueda. Prueba con otra palabra o elige “Todas”.</p>';
  }

  /* ---- Al descargar: marcar, avisar y actualizar progreso ---- */
  let tt;
  $('#ggrid').addEventListener('click', e => {
    const a = e.target.closest('a[data-id]'); if (!a) return;
    const id = a.dataset.id;
    if (!done.includes(id)) done.push(id);
    save(); progress();
    const c = $('#g-' + id); c.classList.add('done'); a.querySelector('span').textContent = 'Descargar de nuevo';
    const toast = $('#toast'); toast.textContent = '✓ Descarga iniciada'; toast.classList.add('show');
    clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2600);
  });

  progress(); render();
  const fab = $('.fab'); setTimeout(() => fab.classList.add('hint'), 2500); setTimeout(() => fab.classList.remove('hint'), 7500);
})();
