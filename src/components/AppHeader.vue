<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink to="/" class="brand-header" aria-label="UNISITE - Inicio">
        <img :src="headerLogo" alt="UNISITE Universidad" width="166" height="47" />
      </RouterLink>
      <nav class="site-header__nav" :class="{ 'is-open': mobileOpen }" aria-label="Menú principal" id="menu-principal">
        <RouterLink v-for="item in nav" :key="item.label" :to="item.to" class="nav-link" :class="{ 'is-active': item.label === 'Admisiones' ? route.path === '/admisiones' : route.path === '/' && route.hash === item.to.hash }">
          {{ item.label }}
        </RouterLink>
        <RouterLink class="header-mobile-cta btn btn-primary" to="/#contacto">Solicita información</RouterLink>
      </nav>
      <RouterLink class="header-cta btn btn-primary" to="/#contacto">Solicita información </RouterLink>
      <button class="menu-toggle" type="button" :aria-expanded="mobileOpen" aria-controls="menu-principal" aria-label="Mostrar menú" @click="mobileOpen = !mobileOpen"><SiteIcon :name="mobileOpen ? 'x' : 'menu'" :size="26" /></button>
    </div>
  </header>
</template>
<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteIcon from './SiteIcon.vue'
import headerLogo from '../assets/logos/logo-cabecera-diseno-v3.png'

const route = useRoute()
const mobileOpen = ref(false)
const nav = [
  { label:'Nosotros', to:{ path:'/', hash:'#nosotros' } },
  { label:'Oferta académica', to:{ path:'/', hash:'#oferta' } },
  { label:'Admisiones', to:{ path:'/admisiones' } },
  { label:'Modalidades', to:{ path:'/', hash:'#modalidades' } },
  { label:'Contacto', to:{ path:'/', hash:'#contacto' } },
]
watch(() => route.fullPath, () => { mobileOpen.value = false })
function onEscape(event) { if (event.key === 'Escape') mobileOpen.value = false }
window.addEventListener('keydown', onEscape)
onBeforeUnmount(() => window.removeEventListener('keydown',onEscape))
</script>
