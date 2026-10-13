<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteIcon from './SiteIcon.vue'
import TurnstileWidget from './TurnstileWidget.vue'
import { programs } from '../data/unisite.js'

const props = defineProps({ type: { type: String, default: 'informes' } })
const route = useRoute()
const isAdmission = computed(() => props.type === 'admisiones')
const form = reactive({ nombre:'', correo:'', telefono:'', programa:'', nivel:'', modalidad:'', horario:'', mensaje:'', consentimiento:false, empresa:'' })
const sending = ref(false)
const result = ref('')
const status = ref('')
const turnstile = ref(null)
const url = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
const privacyUrl = import.meta.env.VITE_PRIVACY_URL || ''
const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''

watch(() => route.query.programa, (v) => { if (typeof v === 'string') form.programa = v }, { immediate:true })

function validate() {
  if (!form.nombre.trim() || form.nombre.trim().length < 3) return 'Escribe tu nombre completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.trim())) return 'Escribe un correo válido.'
  if (form.telefono.replace(/\D/g,'').length < 10) return 'Escribe un teléfono de al menos 10 dígitos.'
  if (!form.programa) return 'Selecciona el programa que te interesa.'
  if (isAdmission.value && !form.nivel) return 'Selecciona un nivel de estudios.'
  if (!form.consentimiento) return 'Debes aceptar el aviso de privacidad para continuar.'
  if (!url || !siteKey || !privacyUrl) return 'El formulario está en modo demostración. Falta conectar el webhook, Turnstile y/o el aviso de privacidad.'
  if (!turnstile.value?.getToken()) return 'Completa la verificación de seguridad.'
  return ''
}

async function send() {
  result.value = ''
  status.value = ''
  if (form.empresa.trim()) return // honeypot
  const error = validate()
  if (error) { result.value = error; status.value='error'; return }
  sending.value = true
  try {
    // application/x-www-form-urlencoded es un POST CORS-safelisted (no preflight habitual).
    const payload = new URLSearchParams({
      tipo: props.type,
      origen: 'PKS_UNISITE_LANDING',
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
      programa: form.programa,
      nivel: form.nivel,
      modalidad: form.modalidad,
      horario: form.horario,
      mensaje: form.mensaje.trim(),
      consentimiento: 'true',
      turnstileToken: turnstile.value.getToken(),
    })
    const response = await fetch(url, { method: 'POST', body: payload, cache: 'no-store' })
    let data = null
    try { data = await response.json() } catch { /* evita presumir que fue enviada */ }
    if (!response.ok || data?.ok !== true) throw new Error(data?.error || 'No se confirmó la recepción de tu solicitud.')
    result.value = 'Tu solicitud se registró correctamente. El equipo de informes podrá darle seguimiento.'
    status.value = 'success'
    Object.assign(form, { nombre:'', correo:'', telefono:'', programa:'', nivel:'', modalidad:'', horario:'', mensaje:'', consentimiento:false, empresa:'' })
  } catch (error) {
    status.value = 'error'
    result.value = `${error.message || 'No se pudo enviar la solicitud.'} Puedes comunicarte por teléfono o correo.`
  } finally {
    turnstile.value?.reset()
    sending.value = false
  }
}
</script>
<template>
  <form class="lead-form" @submit.prevent="send" novalidate>
    <!-- Trampa antispam accesible solo a bots que completan campos ocultos. -->
    <div class="honeypot" aria-hidden="true"><label>Sitio web <input v-model="form.empresa" type="text" tabindex="-1" autocomplete="off" /></label></div>
    <div class="lead-form__grid">
      <label class="sr-only" :for="`${type}-nombre`">Nombre completo</label>
      <input :id="`${type}-nombre`" v-model="form.nombre" type="text" autocomplete="name" placeholder="Nombre completo *" maxlength="110" required />
      <label class="sr-only" :for="`${type}-correo`">Correo electrónico</label>
      <input :id="`${type}-correo`" v-model="form.correo" type="email" autocomplete="email" placeholder="Correo electrónico *" maxlength="160" required />
      <label class="sr-only" :for="`${type}-telefono`">Teléfono</label>
      <input :id="`${type}-telefono`" v-model="form.telefono" type="tel" autocomplete="tel" placeholder="Teléfono *" maxlength="25" required />
      <label class="sr-only" :for="`${type}-programa`">Programa de interés</label>
      <select :id="`${type}-programa`" v-model="form.programa" required>
        <option value="" disabled>Programa de interés *</option>
        <option v-for="p in programs" :key="p.id" :value="p.formal">{{p.formal}}</option>
        <option value="Por definir">Aún no lo he decidido</option>
      </select>
      <template v-if="isAdmission">
        <label class="sr-only" :for="`${type}-nivel`">Nivel de estudios</label>
        <select :id="`${type}-nivel`" v-model="form.nivel" required><option value="" disabled>Nivel educativo de interés *</option><option>Bachillerato</option><option>Licenciatura / Ingeniería</option><option>Maestría</option><option>Diplomado / otra opción</option></select>
        <label class="sr-only" :for="`${type}-modalidad`">Modalidad de interés</label>
        <select :id="`${type}-modalidad`" v-model="form.modalidad"><option value="">Modalidad de preferencia (opcional)</option><option>En línea</option><option>Presencial</option><option>Consultar opciones</option></select>
        <label class="sr-only" :for="`${type}-horario`">Horario para recibir llamada</label>
        <select :id="`${type}-horario`" v-model="form.horario"><option value="">Horario para recibir llamada (opcional)</option><option>Mañana</option><option>Tarde</option><option>Indistinto</option></select>
      </template>
    </div>
    <label class="sr-only" :for="`${type}-mensaje`">Mensaje</label>
    <textarea :id="`${type}-mensaje`" v-model="form.mensaje" rows="3" maxlength="1200" placeholder="Mensaje o dudas (opcional)"></textarea>
    <label class="privacy-choice"><input v-model="form.consentimiento" type="checkbox" required /><span>He leído y acepto el <a v-if="privacyUrl" :href="privacyUrl" target="_blank" rel="noopener noreferrer">aviso de privacidad</a><span v-else>aviso de privacidad (pendiente de publicación)</span>.</span></label>
    <TurnstileWidget ref="turnstile" />
    <p v-if="status" role="status" class="form-alert" :class="`form-alert--${status}`">{{result}}</p>
    <button type="submit" class="btn btn-primary lead-form__submit" :disabled="sending">{{sending ? 'Enviando...' : isAdmission ? 'Enviar pre-registro' : 'Solicitar información'}} <SiteIcon name="arrow-right" :size="18" /></button>
  </form>
</template>
