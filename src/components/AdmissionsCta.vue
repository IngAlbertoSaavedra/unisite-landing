<script setup>
import { asset } from '../data/unisite.js'
import SiteIcon from './SiteIcon.vue'
</script>
<template>
  <section class="admission-cta" aria-labelledby="admission-cta-title">
    <div class="admission-cta__photo" :style="{backgroundImage: `url('${asset('fachada-unisite-cartel.webp')}')`}" role="img" aria-label="Entrada y fachada real de UNISITE"></div>
    <div class="container admission-cta__grid">
      <div class="admission-cta__text"><p class="eyebrow">Admisiones</p><h2 id="admission-cta-title">Da el <span>próximo paso</span></h2><p>Consulta el proceso para solicitar información e iniciar tu acercamiento con Universidad UNISITE.</p><RouterLink to="/admisiones" class="btn btn-primary">Inicia tu proceso de admisión <SiteIcon name="arrow-right" :size="18" /></RouterLink></div>
    </div>
  </section>
</template>
