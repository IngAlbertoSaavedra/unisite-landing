// Datos documentados en PKS_UNISITE_LANDING.md.
// No publicar RVOE, becas, instalaciones, fechas, testimonios ni modalidades no confirmadas.
export const institution = {
  nombre: 'Universidad UNISITE',
  corto: 'UNISITE',
  telefonoVisible: '(33) 3658 0834',
  telefono: '523336580834',
  correo: 'informes.ventas@csti.edu.mx',
  direccion: 'Federalismo Sur 47, Centro, Guadalajara, Jalisco',
  direccionMaps: 'Calzada Federalismo Sur 47, Centro, Guadalajara, Jalisco, México',
}

export const asset = (filename) => `${import.meta.env.BASE_URL}assets/${filename}`

export const offerTabs = [
  { id: 'licenciaturas', nombre: 'Licenciaturas e ingenierías' },
  { id: 'posgrado', nombre: 'Posgrado' },
  { id: 'otros', nombre: 'Bachillerato y más' },
]

export const programs = [
  { id: 'administracion', tab: 'licenciaturas', nombre: 'Administración de Empresas', formal: 'Licenciatura en Administración de Empresas', imagen: 'programas/administracion.webp' },
  { id: 'derecho', tab: 'licenciaturas', nombre: 'Derecho', formal: 'Licenciatura en Derecho', imagen: 'programas/derecho.webp' },
  { id: 'mercadotecnia', tab: 'licenciaturas', nombre: 'Mercadotecnia', formal: 'Licenciatura en Mercadotecnia', imagen: 'programas/mercadotecnia.webp' },
  { id: 'sistemas', tab: 'licenciaturas', nombre: 'Sistemas Computacionales', formal: 'Ingeniería en Sistemas Computacionales', imagen: 'programas/sistemas.webp' },
  { id: 'negocios', tab: 'licenciaturas', nombre: 'Negocios Internacionales', formal: 'Licenciatura en Negocios Internacionales', imagen: 'programas/negocios.webp' },
  { id: 'arquitectura', tab: 'licenciaturas', nombre: 'Ingeniero Arquitecto', formal: 'Ingeniero Arquitecto', imagen: 'programas/arquitectura.webp' },
  { id: 'diseno', tab: 'licenciaturas', nombre: 'Diseño, Animación y Web', formal: 'Licenciatura en Diseño, Animación y Web', imagen: 'programas/sistemas.webp' },
  { id: 'docencia', tab: 'posgrado', nombre: 'Docencia y Tecnología Educativa', formal: 'Maestría en Docencia y Tecnología Educativa', imagen: 'programas/negocios.webp' },
  { id: 'bachillerato', tab: 'otros', nombre: 'Bachillerato', formal: 'Bachillerato', imagen: 'programas/administracion.webp' },
  { id: 'bachillerato-bis', tab: 'otros', nombre: 'Bachillerato BIS', formal: 'Bachillerato BIS', imagen: 'programas/administracion.webp' },
  { id: 'diplomados', tab: 'otros', nombre: 'Diplomados', formal: 'Diplomados', imagen: 'programas/negocios.webp' },
  { id: 'ceneval', tab: 'otros', nombre: 'Preparación CENEVAL', formal: 'Preparación CENEVAL', imagen: 'programas/derecho.webp' },
]

// Tarjetas de orientación, no anuncios ni noticias reales.
// Solo se muestran si todavía no existen avisos publicados por n8n.
export const editorialNotices = [
  { id: 'orientacion-programas', categoria: 'OFERTA EDUCATIVA', titulo: 'Encuentra el programa para tu siguiente paso', resumen: 'Explora las opciones de estudio disponibles y solicita orientación.', imagen: asset('carrusel/alumnos-estudiando.webp'), enlace: '/#oferta', etiqueta: 'Información' },
  { id: 'orientacion-admisiones', categoria: 'ADMISIONES', titulo: 'Conoce el proceso de admisión', resumen: 'Consulta cómo solicitar información e iniciar tu acercamiento con UNISITE.', imagen: asset('fachada-unisite-real.webp'), enlace: '/admisiones', etiqueta: 'Orientación' },
  { id: 'orientacion-unisite', categoria: 'UNISITE', titulo: 'Conoce la universidad', resumen: 'Consulta los datos de contacto y descubre la oferta educativa.', imagen: asset('carrusel/vida-universitaria.webp'), enlace: '/#nosotros', etiqueta: 'Institucional' },
]
