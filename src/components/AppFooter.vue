<script setup>
import { institution, asset } from '../data/unisite.js'
import SiteIcon from './SiteIcon.vue'
const privacyUrl = import.meta.env.VITE_PRIVACY_URL || ''
</script>
<template>
  <footer class="site-footer">
    <div class="container footer-top">
      <RouterLink to="/" class="footer-brand"><img :src="asset('brand/logo-unisite-original-recortado.png')" alt="UNISITE Universidad" width="133" height="122" /></RouterLink>
      <p>Formación para tu próximo paso.</p>
      <nav aria-label="Enlaces del pie de página">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/#oferta">Oferta académica</RouterLink>
        <RouterLink to="/admisiones">Admisiones</RouterLink>
        <RouterLink to="/avisos">Avisos</RouterLink>
        <RouterLink to="/#contacto">Contacto</RouterLink>
      </nav>
    </div>
    <div class="container footer-bottom">
      <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(institution.direccionMaps)}`" target="_blank" rel="noopener noreferrer"><SiteIcon name="map-pin" :size="17" /> {{ institution.direccion }}</a>
      <a :href="`tel:+${institution.telefono}`"><SiteIcon name="phone" :size="17" /> {{ institution.telefonoVisible }}</a>
      <a :href="`mailto:${institution.correo}`"><SiteIcon name="mail" :size="17" /> {{ institution.correo }}</a>
    </div>
    <div class="container footer-legal">
      <span>UNISITE Universidad. Sitio de demostración desarrollado por PrismaKore Solutions.</span>
      <a v-if="privacyUrl" :href="privacyUrl" target="_blank" rel="noopener noreferrer">Aviso de privacidad</a>
      <span v-else>Aviso de privacidad pendiente de validación institucional</span>
    </div>
  </footer>
</template>
