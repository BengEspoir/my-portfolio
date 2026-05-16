const fs = require('fs')
const URL = 'https://racxzkmrhkkjoqcpggko.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhY3h6a21yaGtram9xY3BnZ2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1OTMwMzEsImV4cCI6MjA5NDE2OTAzMX0.FjKoqQkZDBBiB9nkrvHkaeeb3Kf1Hlr5VbOhe1O-wns'

async function sync() {
  try {
    const res = await fetch(`${URL}/rest/v1/projects?select=*`, {
      headers: {
        'apikey': KEY,
        'Authorization': `Bearer ${KEY}`
      }
    })
    const data = await res.json()
    const cleanedData = data.map(p => ({
      ...p
    }))
    fs.writeFileSync('c:/Users/PC/Desktop/Porfolio/projects.json', JSON.stringify(cleanedData, null, 2), 'utf-8')
    console.log('Sync complete!')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

sync()
