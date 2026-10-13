<script setup>
import { asset, institution } from '../data/unisite.js'
import SiteIcon from './SiteIcon.vue'
import LeadForm from './LeadForm.vue'
</script>
<template>
  <section class="section contact" id="contacto" aria-labelledby="contact-title">
    <div class="container contact__grid">
      <div class="contact__intro">
        <p class="eyebrow">Contáctanos</p>
        <h2 id="contact-title" class="section-title">Solicita <span class="blue">información</span></h2>
        <p>Estamos para ayudarte a conocer los programas y las opciones disponibles para ti.</p>
        <ul class="contact__details">
          <li><SiteIcon name="map-pin" :size="20" /><span>{{institution.direccion}}</span></li>
          <li><SiteIcon name="phone" :size="20" /><a :href="`tel:+${institution.telefono}`">{{institution.telefonoVisible}}</a></li>
          <li><SiteIcon name="mail" :size="20" /><a :href="`mailto:${institution.correo}`">{{institution.correo}}</a></li>
        </ul>
      </div>
      <LeadForm />
      <div class="contact__photo"><img :src="asset('fachada-unisite-detalle.webp')" alt="Fachada real de Universidad UNISITE" loading="lazy" /><div class="contact__photo-overlay">Tu siguiente paso comienza con una pregunta.</div></div>
    </div>
  </section>
</template>
