<script setup>
import SiteIcon from './SiteIcon.vue'
const reasons = [
  { icon:'graduation', name:'Diversidad académica', description:'Explora carreras, posgrado, bachillerato y otras alternativas de formación.' },
  { icon:'globe', name:'Opciones de estudio', description:'Consulta qué modalidades están disponibles para el programa que te interesa.' },
  { icon:'users', name:'Orientación directa', description:'Habla con el equipo de informes para resolver tus dudas sobre el ingreso.' },
  { icon:'building', name:'En Guadalajara', description:'Ubica las instalaciones de UNISITE en la zona Centro de la ciudad.' },
]
</script>
<template>
  <section class="section reasons" id="nosotros" aria-labelledby="reasons-title">
    <div class="container">
      <div class="section-title-row"><h2 id="reasons-title" class="section-title">¿Por qué estudiar en <span class="blue">UNISITE?</span> <span class="title-line"></span></h2><p class="section-caption">Conoce una alternativa para continuar tu preparación</p></div>
      <div class="reason-grid">
        <div v-for="(item,index) in reasons" :key="item.name" class="reason"><span class="reason__number">0{{index+1}}</span><SiteIcon :name="item.icon" :size="31" /><h3>{{item.name}}</h3><p>{{item.description}}</p></div>
      </div>
    </div>
  </section>
</template>
