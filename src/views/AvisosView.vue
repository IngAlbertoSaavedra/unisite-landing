<script setup>
import { useNotices } from '../composables/useNotices.js'
import { resolveSiteLink, dateLabel } from '../utils/url.js'
import { asset } from '../data/unisite.js'
import SiteIcon from '../components/SiteIcon.vue'
const { avisos, desdeN8n } = useNotices()
</script>
<template>
  <div class="interior-hero interior-hero--simple"><div class="container"><p class="eyebrow">Comunicación institucional</p><h1>Avisos y <span>novedades</span></h1><p>Información y novedades publicadas en el espacio de comunicación de UNISITE.</p></div></div>
  <section class="section all-notices"><div class="container"><p v-if="!desdeN8n" class="editorial-disclaimer">Por ahora se muestran secciones informativas. Los avisos oficiales se publicarán desde n8n.</p><div class="all-notices-grid"><article v-for="item in avisos" :key="item.id" class="all-notice-card"><img :src="item.imagen || asset('fachada-unisite-real.webp')" :alt="item.titulo" loading="lazy"/><div><span class="kicker">{{item.categoria}}</span><time v-if="dateLabel(item.fecha)">{{dateLabel(item.fecha)}}</time><h2>{{item.titulo}}</h2><p>{{item.resumen}}</p><a :href="resolveSiteLink(item.enlace || '/#contacto')" class="text-link">Conoce más <SiteIcon name="arrow-right" :size="18" /></a></div></article></div></div></section>
</template>
