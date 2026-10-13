<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const key = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
const container = ref(null)
const token = ref('')
const failed = ref(false)
let widgetId = null
let closed = false

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve()
  if (window.__unisiteTurnstilePromise) return window.__unisiteTurnstilePromise
  window.__unisiteTurnstilePromise = new Promise((resolve,reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar Turnstile'))
    document.head.appendChild(script)
  })
  return window.__unisiteTurnstilePromise
}

onMounted(async () => {
  if (!key) return
  try {
    await loadTurnstile()
    if (closed || !container.value || !window.turnstile) return
    widgetId = window.turnstile.render(container.value, {
      sitekey: key,
      theme: 'light',
      size: 'flexible',
      callback: (v) => { token.value = v; failed.value = false },
      'expired-callback': () => { token.value = '' },
      'error-callback': () => { token.value = ''; failed.value = true },
    })
  } catch {
    failed.value = true
  }
})

function reset() {
  token.value = ''
  if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId)
}
function getToken() { return token.value }
function isConfigured() { return Boolean(key) && !failed.value }
defineExpose({ reset, getToken, isConfigured })
onBeforeUnmount(() => {
  closed = true
  if (widgetId !== null && window.turnstile) window.turnstile.remove(widgetId)
})
</script>
<template>
  <div class="turnstile-block">
    <div v-if="key" ref="container" class="turnstile-target"></div>
    <p v-if="failed" class="form-note form-note--error">No fue posible cargar la verificación. Revisa tu conexión e inténtalo nuevamente.</p>
  </div>
</template>
