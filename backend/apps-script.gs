/**
 * Semana U-Vibe — Registro anónimo de estadísticas (gratis).
 * Se pega en Google Apps Script, enlazado a una hoja de cálculo.
 * Guarda: fecha, tipo (visit | q | s), tema, respondida y un detalle corto.
 * NUNCA guarda IP, nombre, correo ni carnet.
 */
const HOJA = 'eventos';
const ZONA = 'America/El_Salvador';

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let h = ss.getSheetByName(HOJA);
  if (!h) { h = ss.insertSheet(HOJA); h.appendRow(['fecha', 'tipo', 'tema', 'respondida', 'detalle']); }
  return h;
}

// El sitio envía aquí cada evento
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (['visit', 'q', 's'].indexOf(d.t) === -1) return ContentService.createTextOutput('ignorado');
    hoja_().appendRow([
      new Date(), d.t,
      String(d.topic || '').slice(0, 40),
      d.ok === false ? 'no' : 'si',
      String(d.term || '').slice(0, 80)
    ]);
  } catch (err) {}
  return ContentService.createTextOutput('ok');
}

// El panel estadisticas.html lee aquí los datos ya resumidos
function doGet(e) {
  const dias = Math.min(Math.max(parseInt(e && e.parameter && e.parameter.days) || 14, 1), 90);
  const cache = CacheService.getScriptCache();
  const clave = 'agg_' + dias;
  const guardado = cache.get(clave);
  if (guardado) return json_(guardado);

  const corte = new Date(); corte.setDate(corte.getDate() - dias);
  const filas = hoja_().getDataRange().getValues().slice(1);
  const out = { visits: {}, topics: {}, unanswered: {}, unansweredTexts: {}, searches: {},
                totals: { visits: 0, questions: 0, unanswered: 0, searches: 0 } };
  const inc = (o, k) => { o[k] = (o[k] || 0) + 1; };

  filas.forEach(function (r) {
    const fecha = r[0];
    if (!(fecha instanceof Date) || fecha < corte) return;
    const tipo = r[1], tema = r[2], ok = r[3] !== 'no', detalle = r[4];
    if (tipo === 'visit') { inc(out.visits, Utilities.formatDate(fecha, ZONA, 'yyyy-MM-dd')); out.totals.visits++; }
    else if (tipo === 'q') {
      inc(out.topics, tema); out.totals.questions++;
      if (!ok) { inc(out.unanswered, tema); out.totals.unanswered++; if (detalle) inc(out.unansweredTexts, detalle); }
    } else if (tipo === 's') { inc(out.searches, detalle); out.totals.searches++; }
  });

  const txt = JSON.stringify(out);
  cache.put(clave, txt, 300); // se actualiza cada 5 minutos
  return json_(txt);
}

function json_(txt) {
  return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON);
}
