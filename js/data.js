/* ============================================================
   CONFIGURACIÓN Y DATOS — Semana U-Vibe
   Actividades cargadas desde "Propuestas SM (Prior 1 y 2)" y "Propuestas CRU (Prior 1 y 2)"
   ============================================================ */
const CONFIG = {
  links: {
    inscripcion: "#",
    whatsapp: ""
  },
  ai: {
    geminiKey: "",
    model: "gemini-2.0-flash"
  },
  analytics: {
    clarityId: "ywxghytdvt",
    endpoint: "https://script.google.com/macros/s/AKfycbz7a2qU5T1DgLct6VDvV4hMMWxPExKXBUCTpOZ9QhMl4eoy1S9aauWHZMc2V24dSStF7w/exec",
    guardarTextoNoRespondido: false
  }
};

/* Íconos SVG (trazo, heredan color lime) */
const ICONS = {
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  list:'<path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M12 6h8M12 12h8M12 18h8"/>',
  user:'<circle cx="10" cy="8" r="4"/><path d="M3 20c0-4 3-6 7-6M18 14v6M15 17h6"/>',
  users:'<circle cx="12" cy="8" r="3.5"/><circle cx="5" cy="10" r="2.5"/><circle cx="19" cy="10" r="2.5"/><path d="M6 20c0-4 2.5-6 6-6s6 2 6 6"/>',
  clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12l1.5 1.5L13 11M9 17h6"/>',
  puzzle:'<path d="M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v6h-6v-2a2 2 0 1 0-4 0v2H4v-6h2a2 2 0 1 0 0-4H4V6h6z"/>',
  badge:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="11" r="2.5"/><path d="M8 17c1-2 2.5-3 4-3s3 1 4 3"/>',
  book:'<path d="M12 7v13M12 7C10 5 7 5 4 5v13c3 0 6 0 8 2 2-2 5-2 8-2V5c-3 0-6 0-8 2zM9 2.5c1.7-1 4.3-1 6 0"/>',
  heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
  palette:'<path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="8" cy="11" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="10" r="1"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l3.5 2"/>',
  pin:'<path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.2"/>',
  building:'<path d="M4 21h16M6 21V8l6-4 6 4v13M10 11h.01M14 11h.01M10 15h.01M14 15h.01M10 21v-3h4v3"/>',
  teacher:'<path d="M12 2 1 8l11 6 11-6-11-6z"/><path d="M5 12v6c0 2 3 4 7 4s7-2 7-4v-6"/>',
  laptop:'<rect x="4" y="5" width="16" height="11" rx="2"/><path d="M2 20h20"/>'
};

/* Mapa subcategoría → nombre de archivo de imagen (limpio) */
const SUBIMG = {
  "Salud Preventiva y Hábitos Saludables":         "salud_preventiva.jpg",
  "Medio Ambiente, Ecología y Sostenibilidad":     "medio_ambiente.jpg",
  "Voluntariado y Compromiso Social":              "voluntariado.jpg",
  "Empleabilidad, Liderazgo y Marca Personal":     "empleabilidad.jpg",
  "Movilidad Académica y Proyección Global":       "movilidad_academica.jpg",
  "Investigación y Competencias Académicas":       "investigacion.jpg",
  "Innovación Aplicada y Visitas Técnicas":        "innovacion_aplicada.jpg",
  "Inclusión, Diversidad y Empatía Comunitaria":   "inclusion_diversidad.jpg",
  "Literatura, Narrativa y Fomento Lector":        "literatura.jpg",
  "Creatividad Manual y Artes Aplicadas":          "creatividad_manual.jpg"
};

const STEPS = [
  {i:"compass",t:"Explora",d:"Explora las actividades y descubre lo que tenemos para ti."},
  {i:"list",t:"Elige",d:"Elige los talleres y conferencias que más te interesen."},
  {i:"user",t:"Inscríbete",d:"Realiza la inscripción desde el portal del estudiante UGB. Una vez te inscribas, no podrás darte de baja."},
  {i:"users",t:"Participa",d:"Completa las 16 horas requeridas participando activamente."},
  {i:"clip",t:"Evalúa",d:"Contesta la encuesta de satisfacción al finalizar."}
];

const BENEFITS = [
  {i:"user",t:"Red de contactos",d:"Amplía tu red conectando con profesionales y estudiantes."},
  {i:"puzzle",t:"Nuevas habilidades",d:"Aprende nuevas habilidades saliendo de tu zona de confort."},
  {i:"badge",t:"Perfil profesional",d:"Fortalece tu perfil profesional con habilidades transversales clave."},
  {i:"book",t:"Salir de lo cotidiano",d:"Disfruta experiencias diferentes."}
];

const CATEGORIES = [
  {id:"Bien al 100",i:"heart"},
  {id:"Express-Arte",i:"palette"},
  {id:"ImpulsaTech",i:"chip"},
  {id:"Vínculos con el mundo",i:"globe"}
];

/* Constructor de actividad
   A(cat, subcat, name, day, time, place, seats, hours, campus, instructor, modalidad) */
const A = (cat, subcat, name, day, time, place, seats, hours, campus, instructor, modalidad) =>
  ({cat, subcat, name, day, time, place, seats, hours, campus, instructor, modalidad});

const ACTIVITIES = [
  /* ============ PROPUESTAS SM (Prior 1 y 2) ============ */
  A("Bien al 100","Salud Preventiva y Hábitos Saludables","Paso a paso saludable","Lunes","7:00 a.m. - 10:30 a.m.","Campus Salitre",50,4,"San Miguel","Profa. Cecibel Ortega","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","U-Vibe ambiental","Jueves","7:00 a.m. - 4:10 p.m.","Espacio externo",5,8,"San Miguel","Dennys Fuentes","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Una semilla, un nuevo comienzo","Lunes","7:00 a.m. - 4:10 p.m.","Campus Salitre",150,8,"San Miguel","Glenda Rivera","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Raíces que dejan huellas","Miércoles","7:00 a.m. - 4:10 p.m.","Campus Salitre",200,8,"San Miguel","Enrique Marenco","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Experiencia vivencial en el apiario","Jueves","7:00 a.m. - 4:10 p.m.","Espacio externo",30,16,"San Miguel","Ing. Rudy Felipe Henández","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Salitre limpio: unidos por nuestro río","Viernes","7:00 a.m. - 11:30 a.m.","Campus Salitre",50,16,"San Miguel","Ing. Milena Ramírez","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Misión Costa Limpia: recuperación y economía circular","Jueves","7:00 a.m. - 4:10 p.m.","Espacio externo",50,16,"San Miguel","Ing. Wilmer Hernandez","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Desafío U-Salitre","Miércoles","7:00 a.m. - 11:30 a.m.","Campus Salitre",50,8,"San Miguel","Victor Torres","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Desafío U-Salitre","Jueves","7:00 a.m. - 11:30 a.m.","Campus Salitre",50,8,"San Miguel","Victor Torres","Presencial"),
  A("ImpulsaTech","Empleabilidad, Liderazgo y Marca Personal","Conecta en 60 segundos","Miércoles","7:00 a.m. - 4:10 p.m.","Espacio externo",30,16,"San Miguel","Roxana Chévez","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Voluntariado con Huellas","Lunes y Martes (preparación) · Miércoles (visita)","8:00 a.m. - 12:00 p.m.","GB-N2-03 y Espacio externo",15,16,"San Miguel","Roxana Chévez","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Voluntariado con Huellas","Lunes y Martes (preparación) · Jueves (visita)","8:00 a.m. - 12:00 p.m. · 1:00 p.m. - 5:00 p.m.","GB-N2-03 y Espacio externo",15,16,"San Miguel","Roxana Chévez","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Voluntariado con Huellas","Lunes y Martes (preparación) · Viernes (visita)","8:00 a.m. - 12:00 p.m.","GB-N2-03 y Espacio externo",15,16,"San Miguel","Roxana Chévez","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Visita al Chorrerón de San Fernando","Lunes","7:00 a.m. - 4:10 p.m.","Espacio externo",50,16,"San Miguel","José German Ventura","Presencial"),
  A("Vínculos con el mundo","Movilidad Académica y Proyección Global","Periodismo de ciencia","Lunes","8:00 a.m. - 3:30 p.m.","GB-N2-S2 y Campus Salitre",50,8,"San Miguel","Nurian Luna de Quintanilla","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","De carita a carita","Lunes a Jueves (preparación) · Viernes (actividad)","8:50 a.m. - 12:20 p.m. · 12:40 p.m. - 4:10 p.m.","MR-N2-01 y Espacio externo",10,16,"San Miguel","Roxana Chevez","Presencial"),
  A("ImpulsaTech","Investigación y Competencias Académicas","Ciencia que inspira, vocación que transforma","Lunes","8:00 a.m. - 5:00 p.m.","Espacio externo",350,16,"San Miguel","Dra. Milena, Lic. William y Licda Claudia Reyes","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Amigables con la playa","Miércoles","7:00 a.m. - 4:10 p.m.","Espacio externo",118,16,"San Miguel","Lic. William Villegas","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Dev Expedition: más allá del aula","Viernes","7:00 a.m. - 4:10 p.m.","Espacio externo",48,16,"San Miguel","Krissia Orellana","Presencial"),
  A("Vínculos con el mundo","Inclusión, Diversidad y Empatía Comunitaria","Sosteniendo al mundo y su humanidad diversa en nuestras manos","Martes","8:00 a.m. - 12:00 p.m.","Espacio externo",40,8,"San Miguel","Lic. Allison Palacios","Presencial"),
  A("Vínculos con el mundo","Inclusión, Diversidad y Empatía Comunitaria","Sosteniendo al mundo y su humanidad diversa en nuestras manos","Miércoles","1:00 p.m. - 5:00 p.m.","Espacio externo",40,8,"San Miguel","Lic. Allison Palacios","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Jugando, creando y aprendiendo","Lunes","8:00 a.m. - 12:00 p.m.","Espacio externo",65,8,"San Miguel","Lic. Miguel Yanes","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Jugando, creando y aprendiendo","Lunes","8:00 a.m. - 12:00 p.m.","Espacio externo",65,8,"San Miguel","Lic. Miguel Yanes","Presencial"),
  A("Vínculos con el mundo","Inclusión, Diversidad y Empatía Comunitaria","Historias que nos unen","Miércoles","8:00 a.m. - 5:00 p.m.","Espacio externo",30,8,"San Miguel","Lic. Mayra Ferrufino","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Huellas de sabiduría y ternura","Viernes","8:00 a.m. - 5:00 p.m.","Espacio externo",30,8,"San Miguel","Lic. Guadalupe Avelar","Presencial"),
  A("Express-Arte","Literatura, Narrativa y Fomento Lector","Una historia para vivir, imaginar y transformar","Jueves","8:00 a.m. - 12:00 p.m.","Espacio externo",30,4,"San Miguel","Lcda. Blanca Sosa","Presencial"),
  A("Vínculos con el mundo","Movilidad Académica y Proyección Global","Intercambio académico a Barcelona, España","Lunes y Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",11,16,"San Miguel","Ing. Rudy Felipe Henandez","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Eco-Costa: limpieza de playa Punta Chiquirín","Martes","7:00 a.m. - 10:30 a.m.","Espacio externo",24,16,"San Miguel","Ing. Raúl Flores","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Visita técnica a empresa distribuidora","Jueves","7:00 a.m. - 11:30 a.m.","Espacio externo",24,16,"San Miguel","Ing. Raúl Flores","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Guardianes del mar","Lunes","7:00 a.m. - 4:10 p.m.","Espacio externo",25,16,"San Miguel","Arq. Arline Carballo","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Guardianes del mar","Lunes","7:00 a.m. - 4:10 p.m.","Espacio externo",25,16,"San Miguel","Arq. Arline Carballo","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Manos al mar: jornada de limpieza","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,16,"San Miguel","Ing. Rene A. Martinez","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Manos al mar: jornada de limpieza","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,16,"San Miguel","Ing. Rene A. Martinez","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Visita técnica académica al Ingenio Chaparrastique","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,8,"San Miguel","Ing. Dagoberto Ramírez","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","De la teoría a la práctica: visita técnica a empresa Alas Doradas","Viernes","7:00 a.m. - 4:10 p.m.","Espacio externo",30,8,"San Miguel","Ing. Darwin Cruz","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Misión Costa Limpia: recuperación y economía circular","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,16,"San Miguel","Ing. Wilmer Hernandez","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Lagunas de estabilización son la solución","Miércoles","7:00 a.m. - 4:10 p.m.","Espacio externo",35,16,"San Miguel","Inga. Daysi Acosta","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Lagunas de estabilización son la solución","Miércoles","7:00 a.m. - 4:10 p.m.","Espacio externo",35,16,"San Miguel","Inga. Daysi Acosta","Presencial"),
  A("ImpulsaTech","Innovación Aplicada y Visitas Técnicas","Del cemento a la construcción","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,8,"San Miguel","Ing. Elena Quintanilla","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Birdwatching en El Salitre","Miércoles","7:00 a.m. - 10:30 a.m.","Campus Salitre",40,8,"San Miguel","Ariadna Rivas","Presencial"),
  A("Express-Arte","Creatividad Manual y Artes Aplicadas","Expresión creativa a través de la flora","Jueves","7:00 a.m. - 4:10 p.m.","Campus Salitre",40,16,"San Miguel","Ariadna Rivas","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Descubre el rol de tu carrera ante la crisis ambiental","Viernes","7:00 a.m. - 4:10 p.m.","Campus Salitre",40,16,"San Miguel","Ariadna Rivas","Presencial"),
  A("ImpulsaTech","Investigación y Competencias Académicas","Intercambio con Semillero de investigación","Martes","Por definir en el grupo cerrado","Espacio externo",10,16,"San Miguel","Laura Chavarría de Cocar","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","De carita a carita","Lunes a Jueves (preparación) · Viernes (actividad)","8:50 a.m. - 12:20 p.m. · 12:40 p.m. - 4:10 p.m.","MR-N2-01 y Espacio externo",10,16,"San Miguel","Roxana Chevez","Presencial"),

  /* ============ PROPUESTAS CRU (Prior 1 y 2) ============ */
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","U-Vibe ambiental","Jueves","7:00 a.m. - 4:10 p.m.","Espacio externo",5,8,"Usulután","Orlando Castillo","Presencial"),
  A("Vínculos con el mundo","Voluntariado y Compromiso Social","Huellas que inspiran","Lunes, Miércoles y Viernes","8:00 a.m. - 12:00 p.m.","GB_10 y Espacio externo",50,16,"Usulután","Jenny Flores","Presencial"),
  A("Vínculos con el mundo","Medio Ambiente, Ecología y Sostenibilidad","Ríos con vida","Martes","7:00 a.m. - 4:10 p.m.","Espacio externo",40,8,"Usulután","Timotea Menjívar","Presencial"),
  A("ImpulsaTech","Investigación y Competencias Académicas","Ciencia que inspira, vocación que transforma","Lunes","8:00 a.m. - 5:00 p.m.","Espacio externo",150,16,"Usulután","Dra. Milena, Licda Arely","Presencial")
];
