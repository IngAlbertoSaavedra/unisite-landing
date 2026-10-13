<script setup>
import SiteIcon from '../components/SiteIcon.vue'
</script>
<template><section class="notfound container"><p class="eyebrow">Error 404</p><h1>Esta página no existe</h1><p>La dirección que buscaste no está disponible.</p><RouterLink to="/" class="btn btn-primary">Volver al inicio <SiteIcon name="arrow-right" :size="18" /></RouterLink></section></template>
