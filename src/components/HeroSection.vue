<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__visual" :style="{ backgroundImage: `url('${heroImage}')` }" role="img" aria-label="Composición aprobada de estudiantes frente a la fachada de UNISITE"></div>
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--dark">Formación que impulsa<br />tu siguiente nivel</p>
        <h1 id="hero-title">Tu futuro <span>comienza aquí</span></h1>
        <p class="hero__description">En UNISITE formamos profesionales con una visión global, pensamiento crítico y las habilidades que el mundo actual necesita. Educación de calidad, en el corazón de Guadalajara.</p>
        <div class="hero__actions">
          <RouterLink to="/#nosotros" class="btn btn-outline">Sobre UNISITE</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import heroImage from '../assets/imagenes/hero-unisite-composite.webp'
</script>
