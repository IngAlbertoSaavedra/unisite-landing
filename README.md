# UNISITE Landing (PKS)

**Proyecto:** Universidad UNISITE / PrismaKore Solutions  
**Base del despliegue:** `https://ajsaavedra.com/unisite/`  
**Stack:** Vue 3 + Vite 7 + Vue Router 4 + CSS modular  
**Administración de avisos:** n8n Form Trigger (autenticado) + Google Sheets + SFTP + JSON público  
**Formularios:** n8n Webhook + Turnstile verificado en backend + Google Sheets  
**PHP:** NO

Este proyecto implementa la **propuesta visual V3 (gris claro, gris oscuro y azul)**. El logo utilizado es la **U moderna** del material compartido por el usuario y la fotografía del Hero se recortó de la captura de la fachada real proporcionada.

## Arranque rápido

1. Instala **Node 20.19 o superior**.
2. Abre esta carpeta en Visual Studio Code o terminal.
3. Ejecuta:

   ```bash
   npm install
   npm run dev
   ```

4. Abre la URL local indicada por Vite (normalmente `http://localhost:5173/unisite/`).

Para crear la versión publicable:

```bash
npm run build
```

Se crea `/dist`. **Sube el contenido de `dist/`**, no la carpeta `dist` como subcarpeta, a `public_html/unisite/`. Verifica que `.htaccess` se encuentre en ese directorio para que Vue Router resuelva `/unisite/admisiones` y `/unisite/avisos`.

> **Estado de la entrega:** código fuente completo, recursos gráficos y tres flujos n8n importables. Los flujos NO están conectados ni activados porque requieren las credenciales y rutas reales del usuario. Esta entrega no incluye `node_modules` ni `dist`; deben generarse con `npm install` / `npm run build`.

## Pantallas entregadas

- **Home:** Header fijo, Hero con la fachada real, franja informativa, carrusel de avisos, oferta por pestañas, beneficios, CTA de admisiones, solicitud de informes y footer.
- **Admisiones:** página independiente, etapas orientativas, pre-registro, CAPTCHA y preguntas frecuentes.
- **Avisos:** listado dinámico de las novedades publicadas.
- **404:** ruta de respaldo para direcciones inexistentes.
- **Responsive:** desktop, tablet y móvil.

El formulario de informes de la Home y el de Admisiones comparten `LeadForm.vue` y se identifican mediante `tipo`.

## Variables (.env.production / .env.local)

Copia `.env.example` y define, cuando estén disponibles:

```dotenv
VITE_N8N_WEBHOOK_URL=https://TU_N8N/webhook/unisite-prospectos
VITE_TURNSTILE_SITE_KEY=CLAVE_PUBLICA_TURNSTILE
VITE_PRIVACY_URL=https://URL_DEL_AVISO_DE_PRIVACIDAD_VALIDADO
```

**Seguridad:** `VITE_*` son variables PÚBLICAS en el bundle. **Jamás escribas aquí el secret key de Turnstile, contraseñas SFTP, claves Google ni tokens internos.** Esas credenciales van en n8n/EasyPanel.

Si no están configuradas las variables, el formulario permanece visible en demostración pero **no finge registrar prospectos**. Al intentar enviarlo explica qué falta. Para publicación real se necesitan las 3 variables y el workflow de prospectos activo.

## Carrusel actualizado sin recompilar

```text
Formulario n8n (Basic Auth)
  → validar datos e imagen
  → (si hay imagen) SFTP a /unisite/avisos/
  → crear o actualizar fila Google Sheets
  → leer avisos y fechas de vigencia
  → SFTP a /unisite/data/avisos.json
  → Vue carga JSON sin nuevo build
```

- El JavaScript de la landing consulta `/unisite/data/avisos.json` al iniciar y cada dos minutos mientras la página está abierta.
- Si el JSON no tiene avisos, muestra **tarjetas editoriales genéricas**, señaladas como orientación (no noticias inventadas).
- Para editar/desactivar un aviso existente, consulta el **ID** en Google Sheets e introdúcelo en el formulario n8n.
- El segundo workflow republica el JSON cada noche a las **00:05 hora de Ciudad de México**, activando y venciendo avisos automáticamente según fecha.
- La carpeta `/unisite/avisos/` no debe borrarse al subir una versión nueva de la web.
- **Los anuncios y sus imágenes sí pueden actualizarse sin `npm run build`.** Cambiar textos o estructura permanente de la Home sigue requiriendo build, como en cualquier SPA estática.

Los flujos a importar están en `n8n/workflows/`. Consulta **`docs/CONFIGURAR_N8N.md`** antes de activarlos.

## Arquitectura

```text
src/
  App.vue                     # Sprite SVG, Header, RouterView, Footer
  main.js
  style.css                   # Paleta gris claro / azul / gris oscuro
  router/index.js             # /, /admisiones, /avisos, 404
  data/unisite.js             # Datos académicos y contacto documentados
  composables/useNotices.js   # Lectura/relectura del feed JSON
  utils/url.js                # URLs seguras y formato de fechas
  components/
    AppHeader.vue
    AppFooter.vue
    HeroSection.vue
    HighlightsStrip.vue
    NoticesSection.vue
    AcademicOffer.vue
    WhyUnisite.vue
    AdmissionsCta.vue
    ContactSection.vue
    LeadForm.vue
    TurnstileWidget.vue
    SiteIcon.vue
  views/
    HomeView.vue
    AdmisionesView.vue
    AvisosView.vue
    NotFoundView.vue
public/
  .htaccess                   # Fallback Apache para Vue Router
  data/avisos.json            # Inicialmente sin avisos
  avisos/.keep                # Carpeta de imágenes a poblar por SFTP
  assets/                     # Logo/fachada/ilustraciones optimizadas
n8n/
  workflows/                  # Tres flujos para importar
  sheets/                     # Encabezados de hojas de Google Sheets
docs/
  CONFIGURAR_N8N.md
  DECISIONES_Y_PENDIENTES.md
  UNISITE_HOME_DISENO_APROBADO_V3.png
```

## Datos y contenido institucional

La oferta académica y los datos de contacto provienen del estado documentado en `PKS_UNISITE_LANDING.md`. **No se incluyen acreditaciones/RVOEs, testimonios, cifras no confirmadas, precios, becas ni fechas ficticias**. Los títulos de botones y textos narrativos son copy de muestra para revisión del cliente. La lista de programas puede actualizarse centralmente en `src/data/unisite.js` cuando UNISITE entregue una versión validada.

**Fotos:** `fachada-unisite-real.webp` proviene de la captura facilitada por el usuario. Las fotos de estudio y miniaturas académicas son recortes ilustrativos del mockup aprobado y **no deben presentarse como fotografías reales de instalaciones o estudiantes de UNISITE**. Antes de publicar comercialmente hay que verificar permisos de uso de la imagen de fachada (la captura proviene de una vista tipo Street View) y reemplazar ilustraciones por fotos propias o con licencia comprobada.

**Logos:** `logo-unisite-01-original.png` conserva el archivo original de la U moderna. La variante horizontal oscura de Header se extrajo de la maqueta V3 ya aprobada. No se redibujaron logos con IA. Confirmación institucional pendiente (incluido posible uso de la marca registrada).

## Comprobación rápida

```bash
npm run check:project
npm run build
```

Revisa también, en navegador real, el acceso directo a `/unisite/admisiones`, la vista móvil y el envío de un formulario usando test keys de Turnstile antes de activar la versión real.

## Reglas

- No inventar noticias ni oferta educativa.
- No habilitar captación sin un aviso de privacidad válido y verificación CAPTCHA **del lado de n8n**.
- No guardar secretos en el frontend.
- No poner una URL de administración pública sin Basic Auth.
- No inventar o redibujar la marca una vez aprobado el logo oficial.
- No introducir PHP.

---

Desarrollado para el proyecto PKS / UNISITE. Versión inicial de código, pendiente de validación y pruebas end-to-end en la infraestructura real.
