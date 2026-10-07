import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const sections = [...source.matchAll(/\b(en|ar): \{([^}]*)\}/g)]
if (sections.length !== 2) throw new Error('Expected en and ar translation sections in App.tsx')
const keys = value => [...value.matchAll(/\b([A-Za-z][A-Za-z0-9]*)\s*:/g)].map(match => match[1]).sort()
const [en, ar] = sections.map(([, , value]) => keys(value))
const missingInAr = en.filter(key => !ar.includes(key))
const missingInEn = ar.filter(key => !en.includes(key))
if (missingInAr.length || missingInEn.length) {
  throw new Error(`Translation keys differ. Missing in ar: ${missingInAr.join(', ') || 'none'}. Missing in en: ${missingInEn.join(', ') || 'none'}.`)
}
console.log(`Translation parity check passed (${en.length} keys).`)
