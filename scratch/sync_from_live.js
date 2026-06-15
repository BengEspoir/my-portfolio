const fs = require('fs')
const path = require('path')

const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const OUTPUT_FILE = path.resolve(__dirname, '..', 'projects.json')

if (!URL || !KEY) {
  console.error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before running this script.')
  process.exit(1)
}

async function sync() {
  try {
    const res = await fetch(`${URL}/rest/v1/projects?select=*`, {
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`
      }
    })

    if (!res.ok) {
      throw new Error(`Supabase request failed: ${res.status} ${await res.text()}`)
    }

    const data = await res.json()
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`Sync complete: ${OUTPUT_FILE}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

sync()
