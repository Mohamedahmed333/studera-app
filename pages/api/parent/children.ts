import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const user = requireAuth(req, res)
  if (!user) return
  if (user.role !== 'parent') return res.status(403).json({ error: 'Endast föräldrar har åtkomst' })

  const db = supabaseAdmin()
  const { data: children } = await db
    .from('users')
    .select('id, name, email, grade, created_at')
    .eq('parent_id', user.userId)

  res.json({ children: children || [] })
}
