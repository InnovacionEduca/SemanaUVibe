/* Semana U-Vibe — chat de U-vi (modal + motor local + Gemini opcional) */
(() => {
  const K = UVI_KNOWLEDGE;
  const $ = (s, c = document) => c.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const DAYS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  const DAY_LABEL = { lunes: "Lunes", martes: "Martes", miercoles: "Miércoles", jueves: "Jueves", viernes: "Viernes", sabado: "Sábado" };
  const CHIPS = [
    "¿Qué es U-Vibe?",
    "¿Qué son los ADN?",
    "¿Cómo me inscribo?",
    "¿Cuántas horas debo cumplir?",
    "¿Es obligatorio participar?",
    "Actividades en San Miguel",
    "Actividades en Usulután"
  ];

  const state = { campus: "", day: "", cat: "", hours: 0, history: [] };
  let lastFocus = null;
  let sending = false;

  /* ---------- Contexto de la pregunta ---------- */
  function parseQuery(raw) {
    const q = norm(raw);
    const found = { campus: "", day: "", cat: "", hours: 0, text: q };

    if (/\busulut/.test(q)) found.campus = "Usulután";
    else if (/\bsan miguel\b|\bsm\b/.test(q)) found.campus = "San Miguel";

    DAYS.forEach(d => { if (q.includes(d)) found.day = DAY_LABEL[d]; });

    if (/\bbien al 100\b|\bbienestar\b|\byoga\b|\bnutricion\b|\bprimeros auxilios\b|\bsalud\b/.test(q)) found.cat = "Bien al 100";
    if (/\bexpress-?arte\b|\bdibujo\b|\bteatro\b|\bmusica\b|\bfotograf|\bcaricatura\b|\barte\b/.test(q)) found.cat = "Express-Arte";
    if (/\bimpulsatech\b|\binteligencia artificial\b|\bexcel\b|\bpaginas web\b|\bcongreso de salud\b|\btecnolog|\bcv\b|\blinkedin\b/.test(q)) found.cat = "ImpulsaTech";
    if (/\bvinculos\b|\bvoluntariado\b|\bingles\b|\bliderazgo\b|\bemprend|\bmedio ambiente\b|\bplaya\b/.test(q)) found.cat = "Vínculos con el mundo";

    const hm = q.match(/\b(4|8|16)\s*h/);
    if (hm) found.hours = +hm[1];
    else if (/\bjornada completa\b|\b16 horas\b/.test(q)) found.hours = 16;

    return found;
  }

  function remember(parsed) {
    if (parsed.campus) state.campus = parsed.campus;
    if (parsed.day) state.day = parsed.day;
    if (parsed.cat) state.cat = parsed.cat;
    if (parsed.hours) state.hours = parsed.hours;
  }

  function filterActivities(parsed) {
    const campus = parsed.campus || state.campus;
    const day = parsed.day || (parsed.campus || parsed.cat || parsed.hours ? "" : state.day);
    const cat = parsed.cat || "";
    const hours = parsed.hours || 0;
    const tokens = parsed.text.split(/\s+/).filter(w => w.length > 3 && !/^(como|cual|cuales|donde|cuando|quiero|necesito|tienen|actividad|actividades|taller|talleres|sobre|para|este|esta|estos|estas|horario|horarios|puedo|debo)$/.test(w));

    return ACTIVITIES.filter(a => {
      if (campus && a.campus !== campus) return false;
      if (day && a.day !== day) return false;
      if (cat && a.cat !== cat) return false;
      if (hours && a.hours !== hours) return false;
      if (tokens.length) {
        const blob = norm(`${a.name} ${a.cat} ${a.place} ${a.campus} ${a.instructor}`);
        return tokens.some(t => blob.includes(t));
      }
      return true;
    });
  }

  function formatAct(a) {
    const t = String(a.time).replace(/\s*-\s*/g, "–").replace(/ ?([ap])\.m\./g, "$1m");
    return `• ${a.name} — ${a.day} ${t} · ${a.hours} h · ${a.seats} cupos (${a.campus})`;
  }

  function listActs(list, max = 3) {
    const shown = list.slice(0, max).map(formatAct).join("\n");
    const more = list.length > max ? `\n…y ${list.length - max} más. Filtra por día, campus o ADN para afinar.` : "";
    return shown + more;
  }

  function hasGemini() { return !!(CONFIG.ai && CONFIG.ai.geminiKey); }
  function hasWhatsApp() {
    const u = (CONFIG.links && CONFIG.links.whatsapp) || "";
    return /^https:\/\/wa\.me\/\d+/.test(u) && !u.includes("50300000000");
  }

  function catalogSummary() {
    return ACTIVITIES.map(a =>
      `${a.name} | ${a.cat} | ${a.day} | ${a.time} | ${a.place} | ${a.campus} | ${a.hours}h | ${a.seats} cupos | ${a.instructor} | ${a.modalidad}`
    ).join("\n");
  }

  function knowledgeBlock() {
    const e = K.event, h = K.hours, i = K.inscription, m = K.modality, el = K.eligibility;
    return [
      `Evento: ${e.name}. ${e.slogan}. ${e.tagline}. Universidad: ${e.university}. Campus: ${e.campuses.join(" y ")}.`,
      e.summary,
      `Estadísticas: ${e.stats.workshops}; ${e.stats.hoursRequired} horas; ${e.stats.skills}.`,
      `Frecuencia: ${e.frequency}`,
      `ADN: ${K.adn.list.map(a => `${a.id} (${a.about})`).join("; ")}.`,
      "Cómo funciona: " + K.howItWorks.map(s => `${s.step}. ${s.title}: ${s.detail}`).join(" "),
      `Horas: ${h.note} Sin puntos: ${h.noPoints} Tope: ${h.cap} Parcial: ${h.partialWarning} Extra: ${h.whyMore} Ponderación: ${h.weighting} Si no se hacen: ${h.noHours}`,
      `Obligatorio: ${K.mandatory.isRequired} ${K.mandatory.noClasses}`,
      `Elegibilidad: ${el.general} Salud: ${el.healthPractices} Virtual: ${el.virtual} Posgrado: ${el.postgrad} Invitados: ${el.guests} Otro campus: ${el.crossCampus}`,
      `Inscripción: ${i.note} Cambios: ${i.changes} Cancelar: ${i.cancel} Múltiples: ${i.multiple} Cruces: ${i.overlap} Otras facultades: ${i.otherFaculty} Sin carrera: ${i.noCareerMatch} Sin cupos: ${i.noSeats} Sin mínimo: ${i.minNotMet} Congelado: ${i.noChangeAfterStart} Emergencia: ${i.emergency}`,
      `Modalidad: ${m.options} Enlaces: ${m.virtualLink} Tarde: ${m.late} Salidas: ${m.fieldTrips}`,
      `Campus: ${K.campus.logistics} Salitre: ${K.campus.salitreFood}`,
      `Materiales: ${K.materials.cost} ${K.materials.extraCosts} ${K.materials.ownMaterials} ${K.materials.specialGear} ${K.materials.whereToBuy} Laptop: ${K.materials.laptop} Tips: ${K.materials.recommendations}`,
      `Asistencia: ${K.attendance.proof} Encuesta: ${K.attendance.survey} ${K.attendance.whySurvey} Error: ${K.attendance.surveyError} Sin conexión: ${K.attendance.lostConnection}`,
      `Especiales: ${K.special.mandatoryCongress} ${K.special.closedGroup} ${K.special.external} ${K.special.organizing} ${K.special.propose}`,
      `Beneficios: ${K.benefits.join(" ")}`,
      `Facultades: ${K.faculties.join(", ")}`,
      K.limits,
      K.extraNotes.join(" "),
      "Catálogo de actividades:\n" + catalogSummary()
    ].join("\n");
  }

  /* ---------- Respuestas cortas (1-3 frases) ---------- */
  const R = {
    general: "U-Vibe es una semana sin clases regulares donde eliges talleres y conferencias para aprender habilidades complementarias. Son +200 talleres y debes completar 16 horas.",
    adn: "Los ADN (Áreas de Desarrollo de Nivel) son 4:\n• Bien al 100: bienestar y salud\n• Express-Arte: arte y cultura\n• ImpulsaTech: tecnología y empleabilidad\n• Vínculos con el mundo: voluntariado, ambiente e inclusión",
    frecuencia: "Se programa dentro de cada ciclo académico. Revisa las redes sociales para las fechas exactas.",
    proponer: "Sí. Al final de cada taller, la encuesta tiene un espacio para proponer talleres nuevos.",
    elegGeneral: "Todos los estudiantes de pregrado, de cualquier carrera, año o sede.",
    elegPractica: "Sí, siempre que las actividades no choquen con tus turnos clínicos.",
    elegVirtual: "Sí, puedes inscribirte en talleres presenciales, pero debes entregar tus tareas virtuales a tiempo.",
    elegPosgrado: "Es solo para pregrado. Posgrado y egresados pueden participar como facilitadores o ponentes.",
    elegInvitados: "No. Es exclusivo para la comunidad estudiantil, con credenciales institucionales.",
    crossCampus: "Sí. Puedes inscribirte en actividades del campus que te quede más cómodo (Usulután o San Miguel), siempre que no choquen con tus clases. La oferta abierta de ambos campus está disponible para todos.",
    ponderacion: "En este ciclo las horas NO tienen ponderación en tus materias. A partir de los próximos ciclos sí contarán con ponderación, así que aprovéchalas desde ya.",
    sinHoras: "Más que una sanción, perderías grandes oportunidades: aprendizaje, networking con profesionales y estudiantes, y el fortalecimiento de habilidades clave para tu vida profesional. La Semana U-Vibe está pensada para que salgas ganando.",
    obligatorio: "Sí, la participación es requerida.",
    sinClases: "No. Esa semana no hay clases ni evaluaciones regulares.",
    horas: "Debes completar 16 horas combinando actividades de 4, 8 o 16 horas. El sistema no permite inscribir más de 16.",
    parcial: "Las 16 horas son indispensables. Si no las alcanzas, avisa a tu docente guía.",
    puntos: "No. Las actividades no dan puntos para tus materias.",
    masHoras: "Algunas acreditan más horas por su nivel de exigencia o trabajo autónomo fuera del horario.",
    inscripcion: "Entra al Portal del Estudiante > Semana U-Vibe, elige talleres que sumen 16 horas sin cruces de horario y confirma. Solo puedes hacerlo mientras el período esté abierto.",
    cambios: "Las inscripciones no se pueden modificar ni cancelar. Verifica cuidadosamente tu elección antes de inscribirte.",
    cancelar: "Escribe al correo de tu docente responsable para liberar tu cupo.",
    multiples: "Sí, siempre que sumen máximo 16 horas, no se crucen y haya cupos.",
    tope: "No. El máximo es 16 horas.",
    otraFacultad: "Sí. El catálogo es abierto para todas las facultades, salvo los de Grupo Cerrado.",
    otraCarrera: "Esa es la meta de U-Vibe: salir de la rutina y ganar competencias interdisciplinarias.",
    cruce: "El sistema bloquea las inscripciones con horarios que se cruzan.",
    sinCupos: "Busca el mismo tema en otro horario, u otra actividad de igual duración, antes de que cierre la inscripción.",
    sinMinimo: "Si se cancela por falta de mínimo, te contactamos para reubicarte sin perder horas.",
    congelado: "No. Al comenzar la semana los cupos quedan congelados.",
    emergencia: "Presenta una justificación por escrito a tu docente responsable antes de que inicie la semana.",
    modalidad: "Depende de la actividad: presencial, virtual (Teams/Meet) o mixta.",
    enlace: "Está en tu Portal del Estudiante, en el detalle de tu horario de Semana U-Vibe. También puede llegar a tu correo institucional.",
    tarde: "Hay 10 a 15 minutos de margen al inicio. Después puedes incorporarte igual.",
    salidas: "En la descripción de la actividad hay un grupo de WhatsApp con puntos de encuentro, horarios y costos.",
    logistica: "Algunas actividades son fuera del campus. Revisa transporte y logística en la planificación del portal.",
    salitre: "En el Campus Salitre habrá productos disponibles. Lleva tu botella de agua.",
    costo: "Todas las actividades son gratuitas. Algunas salidas o prácticas pueden requerir materiales, transporte o comida por tu cuenta.",
    insumos: "Si un taller pide insumos o ropa especial, aparece en su planificación al inscribirte.",
    dondeComprar: "Los materiales básicos están en la UGB Store. Los especializados, consíguelos con anticipación.",
    laptop: "Mira la planificación de la actividad en el portal: indica si es en centro de cómputo o si debes llevar laptop.",
    tips: "Revisa el lugar (laboratorio, aire libre o fuera del campus), lleva tus medicamentos si los necesitas y organiza tu almuerzo si dura todo el día.",
    prueba: "Escanea el QR de la encuesta que comparte el facilitador y complétala al finalizar.",
    encuesta: "Sí. Completar la encuesta (QuestionPro) por QR valida tu asistencia y tus horas.",
    porQueEncuesta: "Ayuda a evaluar la actividad y a proponer talleres nuevos.",
    errorEncuesta: "Solo cuenta si ves “Respuesta enviada con éxito”. Si falló, escanea el QR de nuevo cuanto antes.",
    sinConexion: "Avisa al facilitador por el chat antes de que termine. Si ya terminó, avisa a tu docente responsable con una captura de pantalla.",
    congreso: "Si es parte de U-Vibe, aparece en el portal para inscribirte. Si no, no suma a tus 16 horas.",
    grupoCerrado: "Si tu facultad lo asignó (Grupo Cerrado) debes participar. Si está en la oferta abierta, puedes elegir.",
    externo: "No. Solo cuentan las actividades del catálogo oficial.",
    organizar: "No automáticamente. Confirma con tu club o unidad si fue registrada como actividad U-Vibe; si no, inscríbete en talleres regulares.",
    beneficios: "Ampliarás tu red de contactos, aprenderás habilidades nuevas, fortalecerás tu perfil profesional y vivirás experiencias diferentes.",
    campus: `Hay actividades en ${K.event.campuses.join(" y ")}. Dime cuál prefieres y te muestro opciones.`,
    fallback: "No tengo ese dato. Puedo ayudarte con inscripción, horas, ADN, actividades, materiales o asistencia. Prueba: “talleres el martes en San Miguel”."
  };

  /* ---------- Motor local ---------- */
  let lastOk = true; // false cuando U-vi no supo responder (se usa para las estadísticas)

  function localReply(raw) {
    const parsed = parseQuery(raw);
    remember(parsed);
    lastOk = true;
    const q = parsed.text;
    const name = K.assistant.name;

    /* Saludos y despedidas */
    if (/^(hola|buenas|buen dia|buenos dias|hey|que tal|saludos)\b/.test(q) && q.split(/\s+/).length < 6) {
      return `¡Hola! Soy ${name}. Pregúntame por ADN, horas, inscripción, materiales o actividades.`;
    }
    if (/gracias|muy amable|perfecto|genial|ok$|vale$/.test(q) && q.split(/\s+/).length < 8) {
      return "¡Con gusto! Si quieres, te ayudo a armar tus 16 horas por campus o categoría.";
    }
    if (/^(adios|chao|hasta luego|nos vemos)/.test(q)) {
      return "¡Nos vemos en la Semana U-Vibe!";
    }
    if (/que eres|quien eres/.test(q) || (/\b(uvi|u-vi)\b/.test(q) && /quien|asistente|mascota/.test(q))) {
      return `Soy ${name}, asistente virtual de la Semana U-Vibe en la ${K.event.university}.`;
    }

    /* General */
    if (/\badn\b|areas de desarrollo/.test(q)) return R.adn;
    if (/que es|que significa|para que sirve|consiste|de que trata|filosofia/.test(q) && /uvibe|u-vibe|semana|filosofia|esto/.test(q)) return R.general;
    if (/^(que es|de que trata)\b.*\b(uvibe|u-vibe)\b/.test(q)) return R.general;
    if (/cuando|frecuencia|cada cuanto|proxima edicion|fechas/.test(q) && !/horario|a que hora|que hora/.test(q)) return R.frecuencia;
    if (/proponer|propuesta|idea de taller|sugerir/.test(q)) return R.proponer;

    /* Elegibilidad */
    if (/quienes pueden|quien puede|puedo participar|puedo ir|soy de|elegib|practicas? clinica|turnos? clinic|posgrado|maestria|egresad|(soy|estoy|estudio)\b.*\bvirtual|invitar|mi amigo|mi familiar/.test(q)) {
      if (/practica|clinica|campo clinico|turno/.test(q)) return R.elegPractica;
      if (/virtual|en linea|distancia/.test(q)) return R.elegVirtual;
      if (/maestria|posgrado|egresad/.test(q)) return R.elegPosgrado;
      if (/amigo|familiar|invitad|externo/.test(q)) return R.elegInvitados;
      return R.elegGeneral;
    }

        /* Cross-campus: vivir en un campus y estudiar en otro */
    if (/(vivo|resido|soy de)\b.*(usulut|san miguel)/.test(q) && /(estudio|voy|pertenezco)\b.*(usulut|san miguel)/.test(q)) {
      return R.crossCampus;
    }
    if (/(usulut|san miguel).*(san miguel|usulut)/.test(q) && /(puedo|podre|hay|inscrib|hacer las horas|asistir)/.test(q)) {
      return R.crossCampus;
    }

    /* Obligatorio / clases */
    if (/obligatorio|debo participar|es requerido|es necesaria/.test(q)) return R.obligatorio;
    if (/clases normales|evaluaciones|habra clases|hay clases/.test(q)) return R.sinClases;

    if (/ponderacion|pondera|cuenta para|suma a mis notas|peso en la nota|porcentaje/.test(q)) return R.ponderacion;
    if (/si no hago|si no cumplo|que pasa si no|no completo las horas|no hago las horas|no hago las 16/.test(q)) return R.sinHoras;


    /* Horas */
    if (/cuantas horas|16 hora|acumul|cumplir|completar|duracion|horas requeridas/.test(q)) return R.horas;
    if (/puntos|calificacion|suma a mi promedio|\bnotas?\b/.test(q)) return R.puntos;
    if (/mas horas|por que acredita|nivel de exigencia|trabajo autonomo/.test(q)) return R.masHoras;
    if (/10 o 12 horas|solo complete|no alcance las/.test(q)) return R.parcial;

    /* Inscripción */
    if (/inscri|matricul|portal|como participo|como me anoto|donde me inscribo/.test(q)) return R.inscripcion;
    if (/cambiar|modificar|dar de baja|\bbaja\b|error al seleccionar/.test(q)) return R.cambios;
    if (/cancel|ya no podre|no asistire|imprevisto/.test(q)) return R.cancelar;
    if (/varias actividades|mas de un taller|varios talleres/.test(q)) return R.multiples;
    if (/mas de 16|tope|limite de horas/.test(q)) return R.tope;
    if (/otra facultad|interdisciplinar/.test(q)) return R.otraFacultad;
    if (/otra carrera|no veo nada|no hay de mi carrera|nada de mi carrera/.test(q)) return R.otraCarrera;
    if (/choque|coinciden|mismo horario|cruce de horario|se traslapan/.test(q)) return R.cruce;
    if (/no tiene cupos|se lleno|sin cupos|agotado/.test(q)) return R.sinCupos;
    if (/cupo minimo|no alcanza el minimo|se cancela/.test(q)) return R.sinMinimo;
    if (/cambiar despues|despues de empezar|ya comenzo|congelad/.test(q)) return R.congelado;
    if (/emergencia|fuerza mayor|no puedo participar|estoy enfermo|por trabajo/.test(q)) return R.emergencia;

    /* Modalidad */
    if (/virtual o presencial|presencial o virtual|modalidad|como son los talleres/.test(q)) return R.modalidad;
    if (/enlace|\blink\b|teams|meet|conectarme/.test(q)) return R.enlace;
    if (/llegue tarde|retraso|minutos tarde|llegar tarde/.test(q)) return R.tarde;
    if (/fuera de la universidad|salida|grupo de whatsapp/.test(q)) return R.salidas;

    /* Campus / materiales */
    if (/salitre/.test(q) && /cafeteria|aliment|comida|servicio/.test(q)) return R.salitre;
    if (/transporte|traslado|salida de campo|fuera del campus|logistica/.test(q)) return R.logistica;
    if (/costo|gratis|gratuit|cuota|pagar|precio/.test(q)) return R.costo;
    if (/material|insumo|comprar|traer algo/.test(q)) {
      if (/donde|comprar/.test(q)) return R.dondeComprar;
      if (/laptop|computadora|\bpc\b/.test(q)) return R.laptop;
      return R.insumos;
    }
    if (/laptop|computadora/.test(q)) return R.laptop;
    if (/vestimenta|ropa|uniforme|deportiv/.test(q)) return R.insumos;
    if (/recomendacion|tips|consejo|antes de asistir/.test(q)) return R.tips;

    /* Asistencia */
    if (/como compruebo|comprobar asistencia|valido asistencia|registro de asistencia|asistencia/.test(q)) return R.prueba;
    if (/encuesta|questionpro|\bqr\b/.test(q)) {
      if (/error|no envio|se cerro/.test(q)) return R.errorEncuesta;
      if (/por que|para que/.test(q)) return R.porQueEncuesta;
      return R.encuesta;
    }
    if (/se cayo|internet|conexion/.test(q)) return R.sinConexion;

    /* Especiales */
    if (/congreso|intercambio|grupo cerrado|asignado/.test(q)) {
      if (/obligado|grupo cerrado|asignado/.test(q)) return R.grupoCerrado;
      return R.congreso;
    }
    if (/curso externo|por mi cuenta|homologar|equivalencia/.test(q)) return R.externo;
    if (/\bclub\b|asociacion|organizacion|organizar/.test(q)) return R.organizar;

    /* Beneficios, categorías, campus */
    if (/beneficio|para que me sirve|por que participar|vale la pena/.test(q)) return R.beneficios;
    if (/categor/.test(q) && !parsed.cat) return R.adn;
    if (/campus|sede|ubicacion|donde es|en que lugar|lugares/.test(q) && !parsed.campus && !/actividad|taller/.test(q)) return R.campus;
    if (/cupo|espacio|capacidad/.test(q)) {
      const list = filterActivities(parsed);
      if (list.length) return "Cupos publicados:\n" + list.slice(0, 4).map(a => `• ${a.name}: ${a.seats} (${a.campus})`).join("\n");
      lastOk = false;
      return "Cada actividad tiene cupos limitados. Dime el taller o el campus y te digo la capacidad.";
    }

    /* Listar actividades */
    const wantsList = /actividad|taller|conferenc|horario|que hay|recomend|mostrar|listar|opcion|disponible|buscar/.test(q)
      || parsed.campus || parsed.day || parsed.cat || parsed.hours
      || ACTIVITIES.some(a => q.includes(norm(a.name).slice(0, 12)));

    if (wantsList) {
      let list = filterActivities(parsed);
      if (!list.length && (parsed.campus || parsed.day || parsed.cat || parsed.hours)) {
        list = ACTIVITIES.filter(a =>
          (!parsed.campus || a.campus === parsed.campus) &&
          (!parsed.day || a.day === parsed.day) &&
          (!parsed.cat || a.cat === parsed.cat) &&
          (!parsed.hours || a.hours === parsed.hours));
      }
      if (!list.length) {
        lastOk = false;
        const hint = [parsed.campus, parsed.day, parsed.cat, parsed.hours ? parsed.hours + " h" : ""].filter(Boolean).join(", ");
        return `No encontré actividades${hint ? " para " + hint : ""}. Prueba otro día, campus o categoría.`;
      }
      return `Encontré ${list.length}:\n` + listActs(list, 3);
    }

    lastOk = false;
    return R.fallback;
  }

  async function geminiReply(raw) {
    const key = CONFIG.ai.geminiKey;
    const model = CONFIG.ai.model || "gemini-2.0-flash";
    const turns = state.history.slice(-8).map(m => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));
    const body = {
      systemInstruction: {
        parts: [{
          text: `Eres ${K.assistant.name}. ${K.assistant.role}. ${K.assistant.tone}
Responde en español, directo al dato, en 1 a 3 frases y máximo 50 palabras (sin saludos ni relleno).
Si listas actividades, máximo 3 con viñetas de una línea (nombre, día y hora, campus).
Usa SOLO esta información. Si no está el dato, responde exactamente: "No tengo ese dato. Revisa el portal del estudiante."

${knowledgeBlock()}`
        }]
      },
      contents: turns.concat([{ role: "user", parts: [{ text: raw }] }]),
      generationConfig: { temperature: 0.2, maxOutputTokens: 150 }
    };
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    if (!res.ok) throw new Error("gemini");
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join("").trim();
    if (!text) throw new Error("empty");
    return text;
  }

  async function answer(raw) {
    if (hasGemini()) {
      try {
        const t = await geminiReply(raw);
        remember(parseQuery(raw));
        return { text: t, ok: !/^no tengo ese dato/i.test(t) };
      } catch { }
    }
    const text = localReply(raw);
    return { text, ok: lastOk };
  }

  /* ---------- UI ---------- */
  function panelHtml() {
    const wa = hasWhatsApp()
      ? `<a class="uvi__wa" href="${esc(CONFIG.links.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>` : "";
    return `
      <div class="uvi__back" data-uvi-close></div>
      <section class="uvi__box" role="dialog" aria-modal="true" aria-labelledby="uvi-title">
        <header class="uvi__head">
          <img src="img/viby-chat.webp" alt="" width="44" height="44">
          <div><h2 id="uvi-title">U-vi</h2><p>Asistente Semana U-Vibe</p></div>
          ${wa}
          <button type="button" class="uvi__x" data-uvi-close aria-label="Cerrar chat">×</button>
        </header>
        <div class="uvi__log" id="uvi-log" role="log" aria-live="polite"></div>
        <div class="uvi__chips" id="uvi-chips">${CHIPS.map(c => `<button type="button" class="uvi__chip">${esc(c)}</button>`).join("")}</div>
        <form class="uvi__form" id="uvi-form">
          <label class="skip" for="uvi-input">Mensaje para U-vi</label>
          <input id="uvi-input" type="text" autocomplete="off" maxlength="400" placeholder="Escribe tu pregunta…">
          <button class="btn btn--sm" type="submit">Enviar</button>
        </form>
      </section>`;
  }

  function addMsg(role, text) {
    const log = $("#uvi-log");
    const el = document.createElement("div");
    el.className = "uvi__msg uvi__msg--" + role;
    el.innerHTML = esc(text).replace(/\n/g, "<br>");
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }
  function addTyping() {
    const log = $("#uvi-log");
    const el = document.createElement("div");
    el.className = "uvi__msg uvi__msg--bot uvi__typing";
    el.id = "uvi-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }
  function clearTyping() { $("#uvi-typing")?.remove(); }

  async function send(text) {
    const msg = text.trim();
    if (!msg || sending) return;
    sending = true;
    $("#uvi-input").value = "";
    addMsg("user", msg);
    state.history.push({ role: "user", text: msg });
    addTyping();
    const wait = Math.min(900 + msg.length * 8, 1600);
    const [res] = await Promise.all([answer(msg), new Promise(r => setTimeout(r, wait))]);
    clearTyping();
    addMsg("bot", res.text);
    state.history.push({ role: "bot", text: res.text });
    if (window.UVI_TRACK) UVI_TRACK.question(msg, res.ok); // solo tema + respondida
    sending = false;
    $("#uvi-input")?.focus();
  }

  function openChat(e) {
    e?.preventDefault();
    lastFocus = document.activeElement;
    const root = $("#uvi-root");
    root.hidden = false;
    if (window.UVI_TRACK) UVI_TRACK.event("chat_abierto");
    requestAnimationFrame(() => root.classList.add("is-open"));
    document.body.classList.add("uvi-lock");
    $(".fab").setAttribute("aria-expanded", "true");
    if (!$("#uvi-log").children.length) {
      addMsg("bot", `¡Hola! Soy ${K.assistant.name}. Te ayudo con inscripción, horas, ADN, materiales y actividades. ¿Qué necesitas?`);
    }
    setTimeout(() => $("#uvi-input")?.focus(), 50);
  }
  function closeChat() {
    const root = $("#uvi-root");
    root.classList.remove("is-open");
    document.body.classList.remove("uvi-lock");
    $(".fab").setAttribute("aria-expanded", "false");
    setTimeout(() => { root.hidden = true; lastFocus?.focus(); }, 220);
  }

  function init() {
    const root = document.createElement("div");
    root.id = "uvi-root";
    root.className = "uvi";
    root.hidden = true;
    root.innerHTML = panelHtml();
    document.body.appendChild(root);

    document.addEventListener("click", e => {
      const open = e.target.closest("[data-open-chat]");
      if (open) { e.preventDefault(); openChat(e); return; }
      if (e.target.closest("[data-uvi-close]")) closeChat();
      const chip = e.target.closest(".uvi__chip");
      if (chip) send(chip.textContent);
    });
    $("#uvi-form").addEventListener("submit", e => { e.preventDefault(); send($("#uvi-input").value); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && $("#uvi-root").classList.contains("is-open")) closeChat();
    });
  }
  init();
})();
