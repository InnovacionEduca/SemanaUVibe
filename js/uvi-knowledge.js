/* ============================================================
   BASE DE CONOCIMIENTO DE U-VI
   Fuente: Banco de Preguntas Frecuentes (Word) + Propuestas (Excel)
   ============================================================ */
const UVI_KNOWLEDGE = {
  assistant: {
    name: "U-vi",
    role: "Asistente virtual de la Semana U-Vibe en la Universidad Gerardo Barrios",
    tone: "Amable, cercana, clara y breve. Tutea al estudiante. No inventa datos: si no está en el documento, lo dice."
  },

  event: {
    name: "Semana U-Vibe",
    slogan: "Muchas formas de vivir la U",
    tagline: "Conecta. Aprende. Cuida. Exprésate.",
    university: "Universidad Gerardo Barrios (UGB)",
    campuses: ["San Miguel", "Usulután"],
    summary:
      "Es un espacio universitario diseñado para romper la rutina de tus clases habituales y explorar temáticas de vanguardia. En lugar de tus materias cotidianas, eliges actividades, talleres y conferencias en distintas Áreas de Desarrollo de Nivel (ADN) para aprender habilidades complementarias que potencian tu estatus y crecimiento profesional.",
    stats: {
      workshops: "+200 talleres diferentes",
      hoursRequired: 16,
      skills: "+100 habilidades por descubrir"
    },
    frequency:
      "Se programan estratégicamente dentro de cada ciclo académico. Mantente pendiente de las redes sociales para las fechas exactas de la próxima edición."
  },

  adn: {
    meaning: "Áreas de Desarrollo de Nivel",
    list: [
      { id: "Vínculos con el mundo", about: "Voluntariado, medio ambiente, cambio climático, inclusión y derechos fundamentales." },
      { id: "ImpulsaTech", about: "Ofimática, inteligencia artificial para la productividad, finanzas personales, liderazgo y preparación para el mundo laboral." },
      { id: "Bien al 100", about: "Inteligencia emocional, nutrición, gestión del estrés, deporte y sexualidad responsable." },
      { id: "Express-Arte", about: "Fotografía, danza, teatro, dibujo, instrumentos musicales y canto." }
    ]
  },

  howItWorks: [
    { step: 1, title: "Explora", detail: "Explora las actividades y descubre lo que tenemos para ti." },
    { step: 2, title: "Elige", detail: "Elige los talleres y conferencias que más te interesen." },
    { step: 3, title: "Inscríbete", detail: "Realiza la inscripción desde el portal del estudiante UGB." },
    { step: 4, title: "Participa", detail: "Completa las 16 horas requeridas participando activamente." },
    { step: 5, title: "Evalúa", detail: "Contesta la encuesta de satisfacción al finalizar." }
  ],

  hours: {
    required: 16,
    options: [4, 8, 16],
    note: "Debes acumular un total de 16 horas de participación para validar la semana. Puedes combinar actividades de distinta duración según tu conveniencia.",
    noPoints:
      "Las actividades NO otorgan puntos sumativos para tus asignaturas. El objetivo es tu desarrollo profesional, aprendizaje y libertad para capacitarte en lo que te gusta.",
    partialWarning:
      "Completar las 16 horas es indispensable. Si no alcanzas, debes notificarlo a tu docente guía. Verifica tu carga horaria antes del inicio.",
    whyMore:
      "Algunas actividades acreditan más horas que el horario de clase porque se toma en cuenta el nivel de exigencia, complejidad o trabajo autónomo fuera del horario lectivo.",
    cap: "El sistema está configurado para que inscribas exactamente 16 horas, garantizando acceso equitativo a los cupos. Una vez alcanzadas, no podrás añadir más.",
        weighting:
      "En este ciclo las horas de U-Vibe NO tienen ponderación en tus materias. Sin embargo, a partir de los próximos ciclos sí contarán con ponderación, así que es buena idea tomarle la importancia desde ahora y aprovechar al máximo la experiencia.",
    noHours:
      "Si no completas las horas, más que una sanción perderías grandes oportunidades: aprendizaje real, networking con profesionales y estudiantes de otras carreras, y el fortalecimiento de habilidades que te van a servir en tu vida profesional. La Semana U-Vibe está pensada para que salgas ganando."
  },

  mandatory: {
    isRequired: "La participación es requerida. Está pensada para sumar a tu perfil profesional y personal, no para ser una carga.",
    noClasses:
      "Durante la Semana U-Vibe NO se programarán clases, evaluaciones ni actividades de asignaturas regulares. Esa semana está dedicada exclusivamente a las actividades cocurriculares."
  },

  eligibility: {
    general:
      "Todos los estudiantes de pregrado. Las actividades están pensadas para cualquier estudiante sin importar carrera, año o sede.",
    healthPractices:
      "Si estás en prácticas o turnos clínicos, participas únicamente si los horarios de las actividades NO interfieren con tus jornadas asignadas en el centro de salud.",
    virtual:
      "Si eres de modalidad virtual y vives cerca, puedes inscribirte voluntariamente en talleres presenciales. Pero participar presencialmente NO te exonera de entregar las actividades académicas de tus materias virtuales en sus fechas.",
    postgrad:
      "Las Semanas U-Vibe están diseñadas exclusivamente para estudiantes activos de pregrado. Si eres de posgrado o egresado, pueden invitarte como facilitador o ponente.",
    guests:
      "Los talleres son de uso exclusivo para la comunidad estudiantil. Debes ingresar con tus credenciales institucionales.",
    crossCampus:
    "Sí, puedes hacerlo. Si vives en Usulután y estudias en San Miguel (o al revés), puedes inscribirte en actividades del campus que te quede más cómodo, siempre que no choquen con tus clases. La oferta abierta de ambos campus está disponible para todos los estudiantes."
  },

  inscription: {
    where: "Portal del Estudiante (Sistema Interno, módulo Semana U-Vibe)",
    note: "Proceso en línea en 4 pasos: 1) Ingresa al Portal del Estudiante. 2) Entra al menú Semana U-Vibe. 3) Explora las ADN y selecciona talleres que sumen 16 horas (revisa cruces de horario). 4) Confirma la inscripción.",
    changes:
      "Las inscripciones no se pueden modificar ni cancelar. Verifica cuidadosamente tu elección antes de inscribirte.",
    cancel:
      "Si no podrás asistir, cancela tu inscripción enviando un mensaje a tu docente responsable al correo oficial para liberar el cupo.",
    multiple:
      "Puedes inscribirte a varias actividades siempre que sumes máximo 16 horas, no haya cruces de horario y existan cupos.",
    overlap:
      "El sistema bloquea y no permite inscripciones en horarios que se traslapen.",
    otherFaculty:
      "Puedes inscribirte a talleres de cualquier facultad. Salvo actividades de 'Grupo Cerrado', el catálogo es de acceso general e interdisciplinario.",
    noCareerMatch:
      "¡Esa es la meta de U-Vibe! Se trata de salir de la rutina y adquirir competencias interdisciplinarias.",
    noSeats:
      "Si un taller se llena, revisa si está en otro horario, temática similar u otra opción de duración equivalente antes de que cierren inscripciones.",
    minNotMet:
      "Si una actividad se cancela por no alcanzar el mínimo, te contactaremos al teléfono o correo registrado para reubicarte sin perder horas.",
    noChangeAfterStart:
      "Una vez cerrado el proceso y comenzada la Semana, los cupos quedan congelados. No se permiten cambios de taller.",
    emergency:
      "Si por razones académicas, laborales, de salud o fuerza mayor no puedes participar, presenta justificación por escrito al docente responsable ANTES del inicio de la semana, comprometiéndote a participar en lo posible."
  },

  modality: {
    options: "Presencial en campus, virtual (Teams/Meet) o mixta según la actividad.",
    virtualLink:
      "El enlace de acceso estará en tu Portal del Estudiante, dentro del detalle de tu horario en el módulo Semana U-Vibe. También podría enviarse a tu correo institucional.",
    late:
      "Hay un margen de 10 a 15 minutos al inicio de cada actividad. Después, te incorporas y te pones al corriente.",
    fieldTrips:
      "En la descripción de la actividad encontrarás un enlace a un grupo oficial de WhatsApp donde se coordinan preparativos, puntos de encuentro, horarios y costos."
  },

  campus: {
    logistics:
      "Algunas actividades se desarrollan fuera del campus (Campus Salitre, espacios externos, comunidades). Revisa planificación y observaciones en el portal para transporte y logística.",
    salitreFood:
      "En el Campus Salitre habrá productos e insumos disponibles para consumo. Se recomienda portar botella de agua."
  },

  materials: {
    cost: "Todas las actividades son completamente gratuitas.",
    extraCosts:
      "Algunas actividades prácticas o salidas de campo podrían requerir materiales, transporte o alimentación por tu cuenta. Revisa la planificación de cada actividad antes de inscribirte.",
    ownMaterials:
      "Si un taller requiere insumos propios, se te informará en la planificación de la actividad.",
    specialGear:
      "Si pide ropa cómoda, laptop o material extra, estará indicado en la planificación al inscribirte.",
    whereToBuy:
      "Algunos materiales básicos estarán en la UGB Store. Para insumos especializados, consíguelos por tu cuenta con anticipación.",
    laptop:
      "Para saber si el taller se imparte en centro de cómputo o si debes llevar tu propia laptop, consulta la planificación de la actividad en el portal.",
    recommendations:
      "Revisa: 1) Lugar: si es laboratorio, aire libre o fuera del campus. 2) Salud: lleva tus medicamentos si tienes alergias o condición médica. 3) Alimentación: si la actividad dura todo el día, organiza tu almuerzo o refrigerio."
  },

  attendance: {
    proof:
      "El facilitador compartirá un enlace o código QR de la encuesta de satisfacción. Complétala para validar tu participación.",
    survey:
      "Sí, es indispensable. Completar la encuesta (QuestionPro) vía QR al finalizar la sesión es el medio para validar asistencia y registrar horas.",
    whySurvey:
      "Tus respuestas nos ayudan a evaluar la actividad y a proponer talleres nuevos para la próxima edición.",
    surveyError:
      "La asistencia se valida solo cuando ves la pantalla final 'Respuesta enviada con éxito'. Si hubo error, vuelve a escanear el QR de inmediato; el formulario permanece habilitado solo un tiempo límite.",
    lostConnection:
      "Comunícate con el facilitador o moderador técnico por el chat de la sesión antes de que concluya. Si terminó, notifica a tu Docente Responsable de Grupo con captura de pantalla."
  },

  special: {
    mandatoryCongress:
      "Si el congreso o intercambio fue programado como parte de la Semana U-Vibe, estará disponible para inscripción en el portal. De lo contrario, no sumará a tus 16 horas.",
    closedGroup:
      "Si tu facultad lo catalogó como Grupo Cerrado / Asignado, debes participar. Si está en la oferta abierta, puedes elegir entre el congreso u otros talleres.",
    external:
      "No se homologan ni equivalen actividades externas al programa oficial. Debes inscribirte únicamente en el catálogo oficial.",
    organizing:
      "La labor de organización NO valida automáticamente las 16 horas. Debes coordinar con el responsable de tu club o unidad para verificar si fue registrada como actividad acreditable U-Vibe. Si no, inscríbete a talleres regulares.",
    propose:
      "¡Sí! Al final de cada taller llenas una encuesta donde puedes dejar tu propuesta del taller que te gustaría recibir o facilitar en futuras ediciones."
  },

  categories: [
    { id: "Bien al 100", about: "Bienestar, salud, autocuidado y equilibrio." },
    { id: "Express-Arte", about: "Arte, talento, expresión creativa y cultura." },
    { id: "ImpulsaTech", about: "Tecnología, habilidades digitales y mundo laboral." },
    { id: "Vínculos con el mundo", about: "Idiomas, liderazgo, voluntariado, emprendimiento y proyección social." }
  ],

  benefits: [
    "Amplías tu red de contactos con profesionales y estudiantes.",
    "Aprendes nuevas habilidades saliendo de tu zona de confort.",
    "Fortaleces tu perfil profesional.",
    "Disfrutas experiencias diferentes y sales de lo cotidiano."
  ],

  faculties: [
    "Ciencias de la Salud",
    "Ciencias Empresariales",
    "Ciencias Jurídicas",
    "Ciencias y Humanidades",
    "Ciencia y Tecnología",
    "Ingeniería y Arquitectura"
  ],

  helpTopics: [
    "Información general de U-Vibe",
    "ADN (áreas de desarrollo)",
    "Elegibilidad por carrera y modalidad",
    "Requisitos, horas y evaluación",
    "Proceso de inscripción y cupos",
    "Modificaciones y bajas",
    "Modalidades y logística",
    "Materiales y vestimenta",
    "Asistencia y encuestas",
    "Actividades especiales y congresos"
  ],

  limits:
    "U-vi responde solo sobre la Semana U-Vibe. Si el dato no está en la base, lo dice con honestidad y sugiere revisar el portal del estudiante o el catálogo del sitio.",

  extraNotes: [
    "Hay actividades en campus San Miguel y Usulután.",
    "Los cupos son limitados; cada actividad muestra su capacidad.",
    "El listado de actividades del sitio es la fuente de horarios, lugares y cupos.",
    "Algunas actividades son de Grupo Cerrado; el catálogo abierto excluye estas."
  ]
};
