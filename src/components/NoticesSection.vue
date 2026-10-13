<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useNotices } from '../composables/useNotices.js'
import { resolveSiteLink, dateLabel } from '../utils/url.js'
import SiteIcon from './SiteIcon.vue'
// Imágenes editoriales fijas: compiladas por Vite en src/assets.
// Los avisos de n8n mantienen sus URLs dinámicas, sin recompilar.
import imagenOferta from '../assets/imagenes/aviso-oferta.webp'
import imagenAdmisiones from '../assets/imagenes/aviso-admisiones.webp'
import imagenUnisite from '../assets/imagenes/aviso-unisite.webp'

const imagenEditorial = {
  'orientacion-programas': imagenOferta,
  'orientacion-admisiones': imagenAdmisiones,
  'orientacion-unisite': imagenUnisite,
}
const imagenRespaldo = imagenUnisite
function imagenAviso(item) {
  if (!item) return imagenRespaldo
  return imagenEditorial[item.id] || item.imagen || imagenRespaldo
}
function repararImagen(evento) {
  const imagen = evento.currentTarget
  if (imagen.src === new URL(imagenRespaldo, window.location.href).href) return
  imagen.src = imagenRespaldo
}

const { avisos, desdeN8n } = useNotices()
const selected = ref(0)
const active = computed(() => avisos.value[selected.value] || avisos.value[0] || null)
const adjacent = computed(() => avisos.value.filter((_,i) => i !== selected.value).slice(0,3))
watch(avisos, () => { selected.value = 0 })
function step(delta) { if (avisos.value.length) selected.value = (selected.value + delta + avisos.value.length) % avisos.value.length }
function linkFor(item) { return resolveSiteLink(item.enlace || '/#contacto') }
function isExternal(url) { return /^https?:\/\//i.test(url || '') }

// Avance cada cinco segundos, con pausas al interactuar o cambiar de pestaña.
const pausado = ref(false)
let temporizador = null
function siguienteAutomatico() {
  if (!pausado.value && !document.hidden && avisos.value.length > 1 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) step(1)
}
onMounted(() => {
  temporizador = window.setInterval(siguienteAutomatico, 5000)
})
onUnmounted(() => {
  if (temporizador !== null) window.clearInterval(temporizador)
})

</script>
<template>
  <section class="section notices" aria-labelledby="notices-title" @mouseenter="pausado = true" @mouseleave="pausado = false" @focusin="pausado = true" @focusout="pausado = $event.currentTarget.contains($event.relatedTarget)">
    <div class="container">
      <div class="section-title-row">
        <h2 id="notices-title" class="section-title">Avisos y novedades <span class="title-line"></span></h2>
        <div class="section-title-row__actions">
          <RouterLink to="/avisos" class="text-link">Ver todos los avisos</RouterLink>
          <button class="circle-button" type="button" aria-label="Aviso anterior" @click="step(-1)"><SiteIcon name="chevron-left" :size="18" /></button>
          <button class="circle-button" type="button" aria-label="Aviso siguiente" @click="step(1)"><SiteIcon name="chevron-right" :size="18" /></button>
        </div>
      </div>
      <div v-if="active" class="notices-layout">
        <article class="feature-notice">
          <img class="feature-notice__img" :src="imagenAviso(active)" :alt="active.titulo" loading="lazy" @error="repararImagen" />
          <div class="feature-notice__content">
            <span class="kicker">{{active.categoria}}</span>
            <p v-if="dateLabel(active.fecha)" class="notice-date">{{dateLabel(active.fecha)}}</p>
            <h3>{{active.titulo}}</h3>
            <p>{{active.resumen}}</p>
            <a :href="linkFor(active)" :target="isExternal(active.enlace) ? '_blank' : undefined" :rel="isExternal(active.enlace) ? 'noopener noreferrer' : undefined" class="text-link">Conoce más</a>
          </div>
        </article>
        <div class="notices-list" aria-label="Otros avisos">
          <button v-for="item in adjacent" :key="item.id" type="button" class="notice-preview" @click="selected = avisos.indexOf(item)" :aria-label="`Mostrar aviso: ${item.titulo}`">
            <img :src="imagenAviso(item)" :alt="item.titulo" loading="lazy" @error="repararImagen" />
            <span class="notice-preview__body"><span class="kicker">{{item.categoria}}</span><strong>{{item.titulo}}</strong><small>{{item.resumen}}</small></span>
            <SiteIcon name="chevron-right" :size="20" />
          </button>
          <div v-if="adjacent.length === 0" class="notice-preview notice-preview--empty">Próximamente encontrarás aquí nuevos comunicados de UNISITE.</div>
        </div>
      </div>
      <div v-if="avisos.length > 1" class="carousel-dots" role="group" aria-label="Seleccionar aviso"><button v-for="(item,index) in avisos" :key="item.id" type="button" :class="{active:index === selected}" :aria-label="`Ver aviso ${index + 1}`" :aria-pressed="index === selected" @click="selected=index"></button></div>
      <p v-if="!desdeN8n" class="editorial-disclaimer">Información de orientación. Los avisos oficiales aparecerán aquí cuando se publiquen desde el administrador.</p>
    </div>
  </section>
</template>
