// Rodar uma vez: npx ts-node scripts/migrate-sheets.ts
// Busca dados do n8n e insere no Supabase

import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const db = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
const N8N_URL = 'https://editor.luqz.com.br/webhook/cockpit/performance'

async function run() {
  const res = await fetch(N8N_URL)
  const { data } = await res.json()

  for (const row of data) {
    const { data: client } = await db
      .from('clients')
      .upsert({ name: row.cliente, funnel_type: row.funil, status: row.status, meta_cpa: row.metaCPA ?? null })
      .select()
      .single()

    if (!client) { console.error('Erro ao upsert cliente:', row.cliente); continue }

    await db.from('performance_records').upsert({
      client_id: client.id,
      date: new Date().toISOString().split('T')[0],
      leads: row.leads ?? 0,
      investment: row.investimento ?? 0
    })

    console.log(`✓ ${row.cliente}`)
  }

  console.log('Migração concluída.')
}

run()
