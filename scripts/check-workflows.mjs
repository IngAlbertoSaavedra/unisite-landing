import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import vm from 'node:vm'
const dir = 'n8n/workflows'
let count = 0
for (const filename of readdirSync(dir).filter(f => f.endsWith('.json'))) {
  const wf = JSON.parse(readFileSync(join(dir, filename),'utf8'))
  const names = new Set(wf.nodes.map(n => n.name))
  if (names.size !== wf.nodes.length) throw new Error(`${filename}: nodos duplicados`)
  for (const [origin, targets] of Object.entries(wf.connections)) {
    if (!names.has(origin)) throw new Error(`${filename}: nodo origen inexistente`)
    for (const group of targets.main) for (const edge of group) if (!names.has(edge.node)) throw new Error(`${filename}: destino inexistente`)
  }
  for (const n of wf.nodes) {
    if (n.type==='n8n-nodes-base.code') {
      new vm.Script(`function wrapped(){\n${n.parameters.jsCode}\n}`)
      count++
    }
    if (n.type==='n8n-nodes-base.ftp') {
      if (!('binaryData' in n.parameters)) throw new Error(`${filename}: parámetro SFTP binaryData ausente`)
      if (!n.parameters.path || n.parameters.path.endsWith('/')) throw new Error(`${filename}: SFTP requiere ruta de archivo completa`)
    }
  }
  console.log(`${filename}: ${wf.nodes.length} nodos válidos`)
}
console.log(`${count} scripts Code de n8n sintácticamente válidos.`)
