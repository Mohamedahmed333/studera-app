import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()
  const user = requireAuth(req, res)
  if (!user) return
  const db = supabaseAdmin()
  const { data } = await db.from('subscriptions').select('plan, status, current_period_end').eq('user_id', user.userId).single()
  res.json(data || { plan: 'free', status: 'active' })
}
