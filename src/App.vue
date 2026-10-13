<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <!-- Sprite de iconos propios, sin tipografías externas ni dependencias extra. -->
  <svg xmlns="http://www.w3.org/2000/svg" class="icon-sprite" aria-hidden="true">
    <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" /></symbol>
    <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="m19 12-14 0m6 6-6-6 6-6" /></symbol>
    <symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></symbol>
    <symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.5v3a2 2 0 0 1-2.2 2c-9.7-1-16.3-7.6-17.3-17.3A2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7l.6 3a2 2 0 0 1-.6 1.7L8 9.9a15 15 0 0 0 6.1 6.1l1.5-1.5a2 2 0 0 1 1.7-.6l3 .6a2 2 0 0 1 1.7 2.1Z" /></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7" /></symbol>
    <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-graduation" viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v6c4 3 8 3 12 0v-6M22 9v7"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2m1-15a3 3 0 0 1 0 6m2 3c2.5.6 4 2.3 4 4v2" /></symbol>
    <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20h16M6 17v-5h3v5M11 17V7h3v10M16 17V3h3v14"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M12 6C9 3 6 3 3 4v15c3-1 6-1 9 2 3-3 6-3 9-2V4c-3-1-6-1-9 2Zm0 0v15" /></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18" /></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><path d="M4 21V4h10v17M14 9h6v12M2 21h20M8 8h2m-2 4h2m-2 4h2m8-3h1m-1 4h1"/></symbol>
    <symbol id="i-laptop" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1"/><path d="m2 20 2-4h16l2 4H2Z" /></symbol>
    <symbol id="i-shield-check" viewBox="0 0 24 24"><path d="M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5L12 2Z"/><path d="m8 12 3 3 5-6"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m4 12 5 5L20 6" /></symbol>
    <symbol id="i-megaphone" viewBox="0 0 24 24"><path d="m3 11 13-6v14L3 13v-2ZM16 8l5-2v12l-5-2M6 14l2 6h4l-2-5"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/></symbol>
    <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></symbol>
    <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/></symbol>
  </svg>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <AppHeader />
  <main id="contenido"><RouterView /></main>
  <AppFooter />
</template>
