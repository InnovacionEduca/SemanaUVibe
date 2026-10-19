/* ============================================================
   GUÍAS — para agregar una, copie un bloque { ... } y complete:
     titulo, desc, cat (tema), url (link del PDF), paginas, peso
   url acepta:
     • un PDF subido a su sitio:       "guias/mi-guia.pdf"   (se descarga directo)
     • un link de Google Drive "compartir" (se convierte solo a descarga directa)
     • un link de Dropbox o cualquier URL pública a un PDF
   Si url está vacío "", la tarjeta muestra "Próximamente".
   destacada:true → se muestra grande al inicio (use solo una).
   ============================================================ */
const GUIDE_CATS = ["Primeros pasos", "Inscripción", "Participación", "Evaluación"];

const GUIDES = [
  { titulo: "Guía completa Semana U-Vibe", destacada: true, cat: "Primeros pasos",
    desc: "Todo en un solo documento: qué es U-Vibe, cómo funciona, las categorías de actividades y cómo completar tus 16 horas.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQAsz_RXrMDETJZgwak1I_HzAbmF2NqBdpr5qJGhYCnjr78?e=2JRT6E", paginas: 2, peso: "1 MB" },

  { titulo: "Cómo inscribirte paso a paso", cat: "Inscripción",
    desc: "Ingresa al portal del estudiante UGB y registra tus talleres y conferencias sin errores.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQBL14IX4dZyTZFKNEP7AYseAUVShjoBQ5zaEQP5TvPjBKU?e=LkPfyD", paginas: 6, peso: "1 MB" },

  { titulo: "Cómo elegir tus actividades", cat: "Primeros pasos",
    desc: "Aprende a combinar talleres según tu horario, tu campus y las habilidades que quieres desarrollar.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQCUeIlk6K_fSIenrnOvHEWzAX88RK8kSNVz3E476IEJ3Zk?e=eDK4Qu", paginas: 2, peso: "1 MB" },

  { titulo: "Cómo completar tus 16 horas", cat: "Participación",
    desc: "Control de asistencia, horas acumuladas y recomendaciones para aprovechar cada jornada.",
    url: "", paginas: 4, peso: "800 KB" },

  //{ titulo: "Buenas prácticas y convivencia", cat: "Participación",
  // desc: "Lineamientos para participar con respeto y aprovechar al máximo cada espacio de aprendizaje.",
  // url: "", paginas: 3, peso: "600 KB" },

 // { titulo: "Cómo contestar la encuesta de satisfacción", cat: "Evaluación",
 // desc: "Tu opinión nos ayuda a mejorar. Conoce dónde y cuándo responder la encuesta final.",
 // url: "", paginas: 2, peso: "500 KB" }
];
