import { onMounted, onUnmounted, ref } from 'vue'
import { editorialNotices } from '../data/unisite.js'
import { safeUrl } from '../utils/url.js'

const RELOAD_MS = 120000
const maxCount = 16

export function useNotices() {
  const avisos = ref([...editorialNotices])
  const loading = ref(true)
  const desdeN8n = ref(false)
  const error = ref('')
  let interval

  async function refresh() {
    try {
      const url = `${import.meta.env.BASE_URL}data/avisos.json?t=${Date.now()}`
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data.avisos)) throw new Error('El JSON no contiene avisos')
      const published = data.avisos.slice(0, maxCount).filter((n) => n && typeof n.titulo === 'string' && n.titulo.trim())
        .map((n, i) => ({
          id: String(n.id || `aviso-${i}`),
          categoria: String(n.categoria || 'AVISO').slice(0,32),
          titulo: n.titulo.trim().slice(0,110),
          resumen: String(n.resumen || '').slice(0,230),
          imagen: safeUrl(n.imagen, ''),
          enlace: safeUrl(n.enlace, ''),
          fecha: n.fecha || n.inicio || '',
          etiqueta: 'Aviso',
        }))
      avisos.value = published.length ? published : [...editorialNotices]
      desdeN8n.value = published.length > 0
      error.value = ''
    } catch (e) {
      // Degradación elegante si el feed está temporalmente fuera de servicio.
      if (!avisos.value.length) avisos.value = [...editorialNotices]
      error.value = 'Los avisos nuevos no están disponibles temporalmente.'
      console.warn('[UNISITE] Avisos no disponibles:', e.message)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    refresh()
    interval = window.setInterval(() => {
      if (!document.hidden) refresh()
    }, RELOAD_MS)
  })
  onUnmounted(() => window.clearInterval(interval))
  return { avisos, desdeN8n, loading, error, refresh }
}
