<script setup>
import { ref } from 'vue'
import { asset, institution } from '../data/unisite.js'
import SiteIcon from '../components/SiteIcon.vue'
import LeadForm from '../components/LeadForm.vue'
const questions = [
  { q:'¿Cómo puedo conocer los requisitos de ingreso?', a:'Solicita información mediante el formulario o comunícate al teléfono institucional. El equipo de Admisiones podrá indicarte los requisitos correspondientes a tu programa.' },
  { q:'¿Dónde consulto costos y opciones de pago?', a:'Para obtener información vigente sobre colegiaturas y pagos, contacta directamente al área de informes. No publicamos importes sin validación institucional.' },
  { q:'¿Qué modalidades de estudio existen?', a:'La modalidad depende del programa. Puedes indicar tu preferencia al solicitar información para que el equipo confirme las opciones disponibles.' },
  { q:'¿Cómo solicito información de un programa específico?', a:'Selecciona el programa en el pre-registro. También puedes escribir a informes.ventas@csti.edu.mx.' },
]
const openFaq = ref(0)
</script>
<template>
  <div class="interior-hero admission-page-hero">
    <div class="container interior-hero__grid"><div><p class="eyebrow">Universidad UNISITE</p><h1>Admisiones <span>UNISITE</span></h1><p>El siguiente paso de tu formación empieza con información clara. Cuéntanos qué programa te interesa y solicita orientación.</p><a href="#pre-registro" class="btn btn-primary">Completa tu pre-registro <SiteIcon name="arrow-right" :size="18" /></a></div><img :src="asset('fachada-unisite-real.webp')" alt="Fachada real de Universidad UNISITE" /></div>
  </div>
  <section class="section admission-process"><div class="container"><p class="eyebrow">Por dónde empezar</p><h2 class="section-title">Un proceso más <span class="blue">claro</span></h2><div class="process-grid"><article><span>01</span><SiteIcon name="search" :size="32" /><h3>Explora</h3><p>Consulta los programas publicados e identifica el que te interesa.</p></article><article><span>02</span><SiteIcon name="mail" :size="32" /><h3>Solicita orientación</h3><p>Completa tus datos para que el área de informes conozca tu interés.</p></article><article><span>03</span><SiteIcon name="check" :size="32" /><h3>Confirma requisitos</h3><p>Verifica directamente con UNISITE documentos, periodos, costos y modalidad.</p></article></div></div></section>
  <section id="pre-registro" class="section admission-form-section"><div class="container admission-form-section__grid"><div><p class="eyebrow">Pre-registro</p><h2 class="section-title">Cuéntanos sobre tu <span class="blue">próximo paso</span></h2><p>Este formulario reúne tus datos de contacto y preferencias académicas. No solicita información médica ni documentos sensibles.</p><div class="admission-help"><SiteIcon name="phone" :size="22" /><div><strong>¿Prefieres hablar con nosotros?</strong><a :href="`tel:+${institution.telefono}`">{{institution.telefonoVisible}}</a></div></div></div><LeadForm type="admisiones" /></div></section>
  <section class="section admission-faq"><div class="container admission-faq__grid"><div><p class="eyebrow">Preguntas frecuentes</p><h2 class="section-title">Resolvamos tus <span class="blue">dudas</span></h2><p>Las condiciones de admisión se deben confirmar con personal de la universidad.</p></div><div class="faq-list"><div v-for="(item,index) in questions" :key="item.q" class="faq-item"><button type="button" :aria-expanded="openFaq === index" @click="openFaq = openFaq === index ? -1 : index"><span>{{item.q}}</span><SiteIcon :name="openFaq === index ? 'x' : 'chevron-down'" :size="20" /></button><p v-if="openFaq === index">{{item.a}}</p></div></div></div></section>
</template>
