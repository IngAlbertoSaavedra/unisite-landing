<template>
  <div class="highlights-bar" id="modalidades">
    <div class="container highlights-bar__grid">
      <div v-for="feature in highlights" :key="feature.title" class="highlight">
        <img :src="feature.icon" alt="" aria-hidden="true" width="30" height="30" style="width:30px;height:30px;object-fit:contain;flex-shrink:0" />
        <div><strong>{{feature.title}}</strong></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import birrete from '../assets/iconos/birrete.png'
import globalIcon from '../assets/iconos/global.png'
import comunidad from '../assets/iconos/comunidad.png'
import grafico from '../assets/iconos/grafico.png'

const highlights = [
  { icon:birrete, title:'Excelencia académica' },
  { icon:globalIcon, title:'Visión global' },
  { icon:comunidad, title:'Conexión con el futuro' },
  { icon:grafico, title:'Una comunidad que construye' },
]
</script>