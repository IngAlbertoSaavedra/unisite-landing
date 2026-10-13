import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const root = process.cwd()
const must = [
  'index.html','vite.config.js','src/main.js','src/App.vue','src/views/HomeView.vue',
  'src/views/AdmisionesView.vue','src/components/LeadForm.vue',
  'public/.htaccess','public/data/avisos.json','public/assets/brand/logo-cabecera-diseno-v3.png',
  'public/assets/fachada-unisite-real.webp',
]
let invalid = false
for (const f of must) {
 if (!existsSync(join(root,f))) { console.error('Falta:',f); invalid = true }
}
const data = JSON.parse(readFileSync(join(root,'public/data/avisos.json'),'utf8'))
if (!Array.isArray(data.avisos)) { console.error('JSON de avisos inválido'); invalid = true }
if (invalid) process.exit(1)
console.log('Estructura y JSON de avisos verificados.')
