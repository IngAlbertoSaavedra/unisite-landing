<script setup>
import { computed, ref } from 'vue'
import { offerTabs, programs } from '../data/unisite.js'

// Recursos estaticos: Vite los procesa desde src/assets/programas.
const imagenes = import.meta.glob('../assets/programas/*.webp', { eager: true, query: '?url', import: 'default' })
const imagenPrograma = (ruta) => imagenes[`../assets/${ruta}`] || ''
import SiteIcon from './SiteIcon.vue'
const tab = ref('licenciaturas')
const visible = computed(() => programs.filter((p) => p.tab === tab.value))
</script>
<template>
  <section class="section academic" id="oferta" aria-labelledby="academic-title">
    <div class="container">
      <div class="section-title-row academic__heading">
        <div><p class="eyebrow">Oferta académica</p><h2 id="academic-title" class="section-title">Programas para continuar tu <span class="blue">formación</span></h2></div>
        <RouterLink to="/#contacto" class="text-link">Solicita orientación <SiteIcon name="arrow-right" :size="16" /></RouterLink>
      </div>
      <div class="program-tabs" role="tablist" aria-label="Categorías de la oferta académica">
        <button v-for="item in offerTabs" :key="item.id" class="program-tab" :class="{ active:tab===item.id }" type="button" role="tab" :aria-selected="tab === item.id" @click="tab=item.id">{{item.nombre}}</button>
      </div>
      <div class="program-grid" role="tabpanel">
        <RouterLink v-for="p in visible" :key="p.id" class="program-card" :to="{ path:'/', hash:'#contacto', query:{ programa:p.formal } }" :aria-label="`Solicitar información sobre ${p.formal}`">
          <div class="program-card__photo"><img :src="imagenPrograma(p.imagen)" :alt="`Imagen ilustrativa del programa de ${p.nombre}`" loading="lazy" /></div>
          <div class="program-card__title"><strong>{{p.nombre}}</strong><SiteIcon name="chevron-right" :size="17" /></div>
        </RouterLink>
      </div>
      <p class="academic__note">Oferta basada en información publicada por UNISITE. La disponibilidad, requisitos y modalidades de cada programa se confirman con Admisiones.</p>
    </div>
  </section>
</template>
