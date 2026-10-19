/* ============================================================
   Semana U-Vibe — Analítica anónima
   - Microsoft Clarity: visitas, mapas de calor y eventos del chat.
   - Contadores propios: visitas, temas del chat y búsquedas
     (se guardan en este navegador y, si hay "endpoint", en una
     hoja compartida para ver el panel estadisticas.html).
   PRIVACIDAD: del chat solo se envía el TEMA y si fue respondida.
   Nunca el texto escrito (salvo que se active a propósito).
   ============================================================ */
(() => {
  const A = (typeof CONFIG !== "undefined" && CONFIG.analytics) || {};
  const KEY = "uvi_stats_v1";
  const MAX_LOCAL = 3000;
  const validId = v => !!v && !/^TU_/i.test(v);
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const today = () => new Date().toLocaleDateString("sv-SE"); // yyyy-mm-dd

  /* ---------- Microsoft Clarity ---------- */
  if (validId(A.clarityId)) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", A.clarityId);
  }
  const clarity = (...args) => { try { if (window.clarity) window.clarity(...args); } catch { } };

  /* ---------- Clasificador de temas (el primero que coincide gana) ---------- */
  const TOPICS = [
    ["saludo", /^(hola|buenas|buen dia|buenos dias|hey|que tal|saludos|gracias|adios|chao|hasta luego)/],
    ["inscripcion", /inscri|matricul|portal|anoto|cupo|dar de baja|\bbaja\b|cancel|cambiar|modificar|cruce|choque|traslap|mismo horario/],
    ["actividades", /actividad|taller|conferenc|lunes|martes|miercoles|jueves|viernes|sabado|recomend|que hay/],
    ["campus_ubicacion", /campus|sede|san miguel|usulut|salitre|ubicacion|donde es|lugar/],
    ["horas", /\bhoras?\b|\b16\b|acumul|puntos|calificacion|promedio|cumplir|completar/],
    ["obligatorio", /obligatori|requerid|habra clases|hay clases|evaluacion/],
    ["elegibilidad", /quienes pueden|puedo participar|elegib|posgrado|maestria|egresad|virtual|practica|clinica|invitad|externo|otra facultad|otra carrera/],
    ["asistencia_encuesta", /asistencia|encuesta|\bqr\b|questionpro|conexion|internet/],
    ["materiales_costos", /costo|gratis|gratuit|precio|pagar|material|insumo|laptop|computadora|ropa|vestimenta|transporte/],
    ["modalidad", /presencial|modalidad|enlace|\blink\b|teams|meet|tarde|retraso/],
    ["especiales", /congreso|intercambio|grupo cerrado|\bclub\b|homolog|proponer|propuesta|equivalencia/],
    ["adn_categorias", /\badn\b|categor|bien al 100|express|impulsatech|vinculos|areas de desarrollo/],
    ["general", /que es|u-?vibe|semana|beneficio|cuando|fechas|frecuencia|que eres|quien eres/]
  ];
  const classify = text => {
    const q = norm(text).trim();
    for (const [topic, re] of TOPICS) if (re.test(q)) return topic;
    return "otros";
  };

  /* ---------- Limpieza de texto (por si se guarda un término) ---------- */
  const clean = (s, max = 60) => norm(s)
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "")   // correos
    .replace(/\d{3,}/g, "")                      // carnets, teléfonos
    .replace(/[^\p{L}\p{N}\s\-]/gu, " ")
    .replace(/\s+/g, " ").trim().slice(0, max);

  /* ---------- Almacenamiento local (este navegador) ---------- */
  const readLocal = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const writeLocal = list => { try { localStorage.setItem(KEY, JSON.stringify(list.slice(-MAX_LOCAL))); } catch { } };

  /* ---------- Envío a la hoja compartida (opcional) ---------- */
  const endpointOn = () => /^https:\/\//.test(A.endpoint || "");
  function push(ev) {
    const list = readLocal(); list.push(ev); writeLocal(list);
    if (!endpointOn()) return;
    const body = JSON.stringify({ t: ev.t, topic: ev.topic, ok: ev.ok, term: ev.term });
    try {
      if (!(navigator.sendBeacon && navigator.sendBeacon(A.endpoint, body))) {
        fetch(A.endpoint, { method: "POST", mode: "no-cors", keepalive: true, body });
      }
    } catch { }
  }

  /* ---------- Eventos ---------- */
  function visit() {
    try { if (sessionStorage.getItem("uvi_visit")) return; sessionStorage.setItem("uvi_visit", "1"); } catch { }
    push({ t: "visit", d: today() });
  }

  function question(text, answered) {
    const topic = classify(text);
    const ok = answered !== false;
    const ev = { t: "q", d: today(), topic, ok };
    if (!ok && A.guardarTextoNoRespondido) ev.term = clean(text, 80);
    push(ev);
    clarity("set", "tema_chat", topic);
    clarity("set", "chat_respondida", ok ? "si" : "no");
    clarity("event", "chat_" + topic);
    if (!ok) clarity("event", "chat_sin_respuesta");
  }

  function search(f) {
    f = f || {};
    const txt = clean(f.text || "", 40);
    const parts = [f.cat, f.day, f.hours ? f.hours + " h" : "", f.campus].filter(Boolean);
    const term = txt || (parts.length ? "filtro: " + parts.join(" · ").toLowerCase() : "");
    if (!term) return;
    push({ t: "s", d: today(), term });
    clarity("set", "busqueda", term);
    clarity("event", "busqueda_actividades");
  }

  function event(name) { clarity("event", String(name).slice(0, 40)); }

  /* ---------- Agregación (misma forma local y en la hoja) ---------- */
  function aggregate(events) {
    const out = { visits: {}, topics: {}, unanswered: {}, unansweredTexts: {}, searches: {}, totals: { visits: 0, questions: 0, unanswered: 0, searches: 0 } };
    const inc = (o, k) => { o[k] = (o[k] || 0) + 1; };
    (events || []).forEach(e => {
      if (e.t === "visit") { inc(out.visits, e.d); out.totals.visits++; }
      else if (e.t === "q") {
        inc(out.topics, e.topic); out.totals.questions++;
        if (e.ok === false) { inc(out.unanswered, e.topic); out.totals.unanswered++; if (e.term) inc(out.unansweredTexts, e.term); }
      } else if (e.t === "s") { inc(out.searches, e.term); out.totals.searches++; }
    });
    return out;
  }

  window.UVI_TRACK = {
    visit, question, search, event, classify, aggregate,
    localEvents: readLocal,
    clearLocal: () => { try { localStorage.removeItem(KEY); } catch { } },
    endpointOn, endpoint: A.endpoint || "",
    clarityOn: validId(A.clarityId)
  };

  if (!/estadisticas/i.test(location.pathname)) visit(); // el panel no cuenta como visita
})();
