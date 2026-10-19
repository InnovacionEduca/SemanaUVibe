# Analítica de Semana U-Vibe (gratis)

Qué se registra, sin datos personales:
- **Visitas** al sitio (Clarity + panel propio).
- **Temas** de las preguntas al chatbot (inscripción, horas, materiales...) y si U-vi pudo responder o no.
- **Búsquedas** en el filtro de actividades y clics en categorías.

Del chat **nunca se guarda el texto** que escribe el estudiante, solo el tema.

## Paso 1. Microsoft Clarity (5 minutos) — visitas, mapas de calor, grabaciones
1. Entra a https://clarity.microsoft.com con tu cuenta institucional.
2. Crea un proyecto y pon la URL de GitHub Pages (ej. `https://usuario.github.io/semana-u-vibe`).
3. Copia el **Project ID** (Settings > Overview).
4. En `js/data.js` reemplaza `TU_ID_CLARITY` por ese ID.
5. Sube los cambios a GitHub. En unos minutos verás datos en Clarity.

Cómo ver las preguntas del chat en Clarity:
- **Dashboard > Filters > Custom tags**: filtra por `tema_chat` (tema) o `chat_respondida` (si/no) y `busqueda` (lo que buscaron).
- **Dashboard > Smart events / Custom events**: aparecen `chat_inscripcion`, `chat_horas`, `chat_sin_respuesta`, `chat_abierto`, `busqueda_actividades`, etc., con su conteo.

## Paso 2. Panel propio: estadisticas.html
Abre `https://TU-USUARIO.github.io/semana-u-vibe/estadisticas.html`.
Sin el paso 3 solo muestra lo hecho en el navegador donde lo abres (modo prueba).
La página no está enlazada desde el sitio ni indexada, pero **es pública para quien tenga el enlace**. Solo muestra totales anónimos.

## Paso 3. Datos de TODOS los estudiantes en el panel (gratis, 10 minutos)
GitHub Pages no tiene servidor, así que se usa una hoja de Google con un pequeño script:
1. Crea una **Hoja de cálculo de Google** nueva (cuenta institucional o una de la unidad).
2. **Extensiones > Apps Script**. Borra el contenido y pega todo `backend/apps-script.gs`. Guarda.
3. **Implementar > Nueva implementación > Tipo: Aplicación web**.
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
4. Autoriza los permisos y copia la **URL de la aplicación web** (termina en `/exec`).
5. En `js/data.js` pega esa URL en `endpoint: ""`. Sube a GitHub.
6. Abre `estadisticas.html`: la fuente debe decir **hoja compartida**.

Notas:
- Los datos quedan en la hoja `eventos` (puedes abrirla, filtrarla o conectarla a Power BI).
- El panel se actualiza cada 5 minutos (caché).
- Con 6,000 estudiantes la hoja aguanta meses; si crece mucho, archiva filas antiguas.
- Cualquiera con la URL podría enviar datos falsos; para un panel interno es aceptable.

## Opcional: ver qué preguntas no supo responder
En `js/data.js` pon `guardarTextoNoRespondido: true`. Se guardará (limpio de correos y números, máx. 80 caracteres) solo el texto de las preguntas SIN respuesta, para mejorar la base de conocimiento. Si lo activas, mantén el aviso de privacidad del pie de página.

## Mejorar las respuestas del chatbot
Las respuestas cortas están en `js/uvi-chat.js` (objeto `R`). Si en el panel aparecen muchas preguntas en "Otros", agrega una respuesta nueva en `R` y una regla en `localReply`.

## Privacidad
El pie de página ya incluye un aviso de estadísticas anónimas. Si la institución exige un banner de cookies, agrégalo antes de publicar.
