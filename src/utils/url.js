/** Aceptar destinos internos o HTTP(S), y bloquear esquemas peligrosos como javascript:. */
export function safeUrl(url, fallback = '') {
  if (typeof url !== 'string') return fallback
  const value = url.trim()
  if (value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/\\')) return value
  try {
    const parsed = new URL(value)
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.toString() : fallback
  } catch { return fallback }
}

export function resolveSiteLink(path) {
  if (!path) return `${import.meta.env.BASE_URL}`
  if (/^https?:\/\//i.test(path)) return path
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}

export function dateLabel(isoDate) {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}/.test(isoDate)) return ''
  const d = new Date(`${isoDate.slice(0,10)}T12:00:00`)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('es-MX',{day:'2-digit',month:'short',year:'numeric'}).format(d)
}
