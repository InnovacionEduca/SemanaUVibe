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
const GUIDE_CATS = ["Primeros pasos", "Inscripción", "Preguntas Frecuentes"];

const GUIDES = [
  { titulo: "Guía completa Semana U-Vibe", destacada: true, cat: "Primeros pasos",
    desc: "Todo en un solo documento: qué es U-Vibe, cómo funciona, las categorías de actividades y cómo completar tus 16 horas.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQDmzq1LQxwsQYH1EAlMFxQOAQKFqVVP7f_-vIvJLpg27r8?e=KOqlpk", paginas: 2 },

  { titulo: "Cómo inscribirte paso a paso", cat: "Inscripción",
    desc: "Ingresa al portal del estudiante UGB y registra tus talleres y conferencias sin errores.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQAHUGRFoQGyTqPOgIQGVWfwAW4WQN0ccdziesmTNnGGAzI?e=SZi0nG", paginas: 2 },

  { titulo: "Cómo consultar el catálogo de actividades", cat: "Primeros pasos",
    desc: "Aprende a combinar talleres según tu horario, tu campus y las habilidades que quieres desarrollar.",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQDcu17QR32bToDAxk4gYIRYAbhXLgqFgKi4BbWevapc6FI?e=gCHl2E", paginas: 2 },

  
  { titulo: "Preguntas frecuentes sobre la Semana U-Vibe", cat: "Preguntas Frecuentes",
    desc: "Resuelve tus dudas sobre las actividades, inscripción, cupos disponibles y cómo completar y verificar tus 16 horas de la Semana U-Vibe",
    url: "https://ugbedu-my.sharepoint.com/:b:/g/personal/smss016224_ugb_edu_sv/IQBCgoyHETIHT5Fj7KavSrpgAYsIF-mBZVA1gb7LiuMEoqc?e=YbHE1b", paginas: 1 },

  /*
  { titulo: "Buenas prácticas y convivencia", cat: "Participación",
    desc: "Lineamientos para participar con respeto y aprovechar al máximo cada espacio de aprendizaje.",
    url: "", paginas: 3, peso: "600 KB" },

  { titulo: "Cómo contestar la encuesta de satisfacción", cat: "Evaluación",
    desc: "Tu opinión nos ayuda a mejorar. Conoce dónde y cuándo responder la encuesta final.",
    url: "", paginas: 2, peso: "500 KB" }*/
];
