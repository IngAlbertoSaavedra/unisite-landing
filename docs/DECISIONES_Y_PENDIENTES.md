# Decisiones consolidadas para actualizar el MD del proyecto cuando cerremos la etapa

No modifica automáticamente `PKS_UNISITE_LANDING.md`, como se acordó en la conversación.

## Confirmado por PKS

1. **Diseño base:** V3 gris claro como fondo principal, gris oscuro en encabezado/énfasis y azul brillante para llamadas a la acción. Referencia: `UNISITE_HOME_DISENO_APROBADO_V3.png`.
2. **Logo temporal:** propuesta 01 de la U moderna, sin redibujar el símbolo. La marca final depende de la aprobación de UNISITE/IMPI.
3. **Fachada:** usar la imagen real enviada por el usuario en lugar de fachadas ficticias de propuestas anteriores.
4. **Arquitectura:** Vue 3 + Vite + Vue Router, hospedaje temporal `/unisite/`, Home y Admisiones en vistas independientes y reutilización de componentes.
5. **Navegación:** Inicio, Oferta académica, Nosotros, Modalidades, Admisiones y Contacto.
6. **Carrusel:** se entrega desde fase inicial con formulario n8n autenticado y publicación SFTP de imágenes/JSON. No PHP. Google Sheets gestiona estado y contenido. Programación de fechas y actualización sin build.
7. **Captación:** formulario de informes en Home + pre-registro en la vista Admisiones con Cloudflare Turnstile validado en n8n.
8. **Seguridad:** no guardar claves en frontend, no presentar registros ficticios como enviados.
9. **Redacción:** solo oferta conocida/confirmada en el documento fuente; imágenes ilustrativas identificadas internamente.

## Completado en este ZIP

- Proyecto fuente ejecutable al instalar dependencias.
- Home responsive inspirada en V3, sin incrustar el diseño entero como una sola imagen.
- Logo original y derivado desde mockup, sin creación gráfica nueva.
- Fachada real del material facilitado.
- Diseño de UI accesible básico, Vue Router y vista 404.
- Listado de avisos e integración frontend con `/unisite/data/avisos.json`.
- Plantillas de tres workflows n8n.
- Formularios preparados para conectar y validar.
- Guías de configuración y estructura de Sheets.

## Pendiente (no ocultar estos puntos)

- Aprobación de imagen corporativa/logotipo de UNISITE.
- Validar lista definitiva de programas, modalidades, horarios y datos de contacto con la institución.
- Confirmar titularidad y permisos de uso comercial de imágenes de fachada y las ilustraciones del mockup.
- Contar con aviso de privacidad oficial.
- Conectar Sheets y SFTP a la instancia n8n real, ajustar rutas y probar workflows importados.
- Configurar Turnstile con claves reales y verificar validación del servidor.
- Instalar dependencias y correr `npm run build`, pruebas responsive y accesibilidad en el entorno local.
- Publicar y obtener feedback del cliente.

## Lo que NO debe afirmarse

- Que esta versión está ya publicada en producción.
- Que los workflows han sido probados y activados con credenciales reales.
- Que las miniaturas ilustrativas son fotografías reales de estudiantes/campus.
- Que el logo de la U moderna es ya marca oficial registrada por la universidad.
