# Configuración n8n | Universidad UNISITE

Los workflows se suministran como **plantillas importables**. Están desactivados y no incluyen credenciales. Fueron preparados para un n8n reciente; después de importarlos, revisa las opciones de nodos si la versión instalada difiere. No se han probado contra tu instancia productiva.

## 1. Preparar las carpetas públicas en el hosting

Ubica el directorio real que SFTP ve como webroot de `https://ajsaavedra.com/unisite/`. Los nodos traen como **ruta de ejemplo**:

```text
/public_html/unisite/avisos/
/public_html/unisite/data/avisos.json
```

**ATENCIÓN:** el SFTP de Hostinger puede tener su raíz asignada de forma distinta (`/home/usuario/domains/.../public_html` o directamente `/`). Ajusta los tres nodos SFTP que aparecen en los workflows, sin asumir que `/public_html` es correcto. Compruébalo con un archivo de prueba.

La carpeta `/unisite/data/` será creada por la aplicación al subir el build inicial y `/unisite/avisos/` se incluye como carpeta reservada. Consérvalas en despliegues posteriores; no borres las imágenes subidas al actualizar la web.

## 2. Preparar un Google Sheets

Crea un archivo (ejemplo: `UNISITE_Administracion`) con dos pestañas:

- **Avisos:** importa solo la primera fila de `n8n/sheets/Avisos.csv`. Columnas: `id,titulo,resumen,categoria,imagen,enlace,inicio,fin,orden,estado,actualizado`.
- **Prospectos:** importa la primera fila de `n8n/sheets/Prospectos.csv`. Columnas: `id,fecha,tipo,nombre,correo,telefono,programa,nivel,modalidad,horario,mensaje,origen,consentimiento,estado`.

Usa encabezados **exactamente iguales y en minúsculas**. No compartas públicamente esta hoja. Los prospectos contienen información personal.

Importa los workflows JSON al editor n8n y sustituye `REEMPLAZAR_ID_DE_GOOGLE_SHEET` en todos los nodos Google Sheets por el ID real de este documento. Asigna las credenciales OAuth de Google Sheets a cada nodo correspondiente.

## 3. Administrador de avisos (workflow 01)

Importa `01-Administrador-Avisos.json`. Después:

1. Asigna credenciales **Basic Auth** al **Form Trigger**. El formulario permite altas, ediciones y desactivaciones: no lo dejes sin autenticación.
2. Asigna credenciales **SFTP** en **Subir imagen SFTP** y **Publicar JSON por SFTP**. Ajusta la ruta completa de cada archivo, no solo la carpeta. Comprueba que la cuenta SFTP solo tiene los permisos necesarios.
3. Configura Google Sheets en **Leer avisos actuales**, **Guardar aviso en Sheets** y **Leer avisos para publicar**.
4. Ensaya con un aviso de prueba, una imagen JPG/WebP y enlace interno como `/admisiones` o `/\u0023oferta`. Verifica que se crea una fila y que la URL pública de la imagen abre en el navegador.
5. Accede a `https://ajsaavedra.com/unisite/data/avisos.json` y comprueba que se actualizó.

> Nota técnica: en el formulario el campo `imagenArchivo` es opcional y n8n proporciona un archivo binario. La función de normalización verifica MIME permitido (JPG, PNG, WebP) y genera un nuevo nombre para evitar colisiones. Configura además un tamaño máximo apropiado (recomendado 3 MB) desde n8n/proxy. No admitas SVG subidos por administradores sin una sanitización específica.

### Acciones

| Acción | Cómo usarla |
|---|---|
| `publicar` | Para crear, deja ID vacío e introduce título y demás datos. Para editar, escribe el ID existente de la fila. |
| `guardar borrador` | Guarda o actualiza, pero no lo expone en el feed público. |
| `desactivar` | Escribe el ID existente. Conserva los datos anteriores y lo elimina del feed público. |

Campos opcionales: resumen, categoría, enlace, imagen, fechas, orden. Para cambiar **la imagen**, súbela nuevamente en el formulario. Si no subes imagen ni indicas otra URL, en una edición se conserva la actual.

La imagen queda publicada en el servidor de UNISITE, **no a través de Google Drive**; Sheets solo guarda su URL. Eso evita URLs de Drive inestables, redirecciones y problemas de permisos.

## 4. Programación automática (workflow 02)

Importa `02-Programacion-Avisos.json` y asigna las credenciales de Sheets y SFTP. Su zona horaria es `America/Mexico_City`, con ejecución prevista **diariamente a las 00:05**.

- Publica cuando `estado=Publicado` y fecha `inicio` sea menor o igual que hoy.
- Oculta al día siguiente de la fecha `fin`.
- Ignora borradores y desactivados.
- Ordena por `orden` y publica como máximo 16 avisos.

Para probar horarios, ejecuta manualmente el flujo y modifica temporalmente la fecha de un aviso de ensayo. Si el cron de tu n8n usa otro formato, selecciona hora y minuto directamente en el Schedule Trigger tras importar.

## 5. Cloudflare Turnstile y formulario de prospectos (workflow 03)

Crea un widget **Turnstile** en Cloudflare para el host `ajsaavedra.com` y obtén dos valores distintos:

- **Site key:** pública, para `VITE_TURNSTILE_SITE_KEY` de Vue.
- **Secret key:** privada, para n8n. Regístrala como variable del entorno del servicio n8n (EasyPanel): `UNISITE_TURNSTILE_SECRET`.

El workflow lee el secret con `$env.UNISITE_TURNSTILE_SECRET`. Asegúrate de que tu n8n permite acceder a esa variable; si la instancia tiene bloqueado `$env`, configura un mecanismo seguro mediante credenciales y ajusta el HTTP Request, **sin pegar la clave dentro de código exportable**.

Importa `03-Prospectos-Turnstile.json` y conecta Google Sheets en el nodo **Guardar prospecto Sheets**. Publica el workflow y copia la URL del Webhook, por ejemplo:

```text
https://tu-instancia-n8n/webhook/unisite-prospectos
```

Configura `.env.production` del frontend:

```dotenv
VITE_N8N_WEBHOOK_URL=https://tu-instancia-n8n/webhook/unisite-prospectos
VITE_TURNSTILE_SITE_KEY=tu_clave_publica
VITE_PRIVACY_URL=https://ruta_real_del_aviso_de_privacidad
```

El workflow **rechaza** las peticiones que carecen de datos requeridos o no pasan la validación en Cloudflare `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Valida también que el `hostname` devuelto sea `ajsaavedra.com`.

Una vez validado, añade la fila a la pestaña `Prospectos` y responde `{"ok":true}`. Si algo falla, el frontend no muestra una confirmación falsa. Se incluye filtrado de caracteres de fórmulas al guardar en Google Sheets.

El Webhook restringe **Allowed Origins (CORS)** a `https://ajsaavedra.com`. Para pruebas con Vite local puede ser necesario incluir temporalmente `http://localhost:5173` en el Webhook/Response. No confíes solo en CORS como medida antispam: Turnstile se valida obligatoriamente en servidor.

### Privacidad

El aviso de privacidad de UNISITE debe ser validado por el responsable antes de habilitar el formulario. No se fabricó una versión jurídica genérica. La implementación solicita contacto, programa y preferencias de admisión; deliberadamente omite tipo de sangre, sexo y fecha de nacimiento, que no se justifican para una primera consulta.

## 6. Lista de prueba antes de producción

- [ ] n8n Form de administración requiere inicio de sesión o Basic Auth.
- [ ] Existe y se puede escribir la carpeta de imágenes por SFTP.
- [ ] Se publica `avisos.json` al crear, editar o desactivar un aviso.
- [ ] Un aviso futuro no aparece antes de su fecha.
- [ ] Un aviso vencido deja de mostrarse tras la actualización programada.
- [ ] El formulario de informes valida Turnstile desde n8n, no solo Vue.
- [ ] Un token inválido devuelve error sin insertar fila.
- [ ] La respuesta del Webhook tiene `ok:true` únicamente tras confirmar el registro.
- [ ] Existe aviso de privacidad oficial validado.
- [ ] La lista `Prospectos` no es de acceso público.
- [ ] El personal responsable de UNISITE revisó permisos de uso de imágenes.
- [ ] Se verificó la ruta SFTP real en Hostinger.

## Enlaces técnicos

- Documentación Form Trigger: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.formtrigger/
- Documentación FTP/SFTP: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ftp/
- Documentación Sheets: https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/
- Turnstile Siteverify: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
