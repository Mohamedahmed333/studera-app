import { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword, signToken, setAuthCookie } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password, name, role = 'child', parentEmail } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Fyll i alla fält' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Lösenordet måste vara minst 6 tecken' })
  }

  const db = supabaseAdmin()

  // Check existing user
  const { data: existing } = await db.from('users').select('id').eq('email', email).single()
  if (existing) return res.status(400).json({ error: 'E-postadressen används redan' })

  // Find parent if linking child to parent
  let parentId = null
  if (role === 'child' && parentEmail) {
    const { data: parent } = await db.from('users').select('id').eq('email', parentEmail).single()
    if (parent) parentId = parent.id
  }

  const password_hash = await hashPassword(password)

  const { data: user, error } = await db
    .from('users')
    .insert({ email, password_hash, name, role, parent_id: parentId, grade: 5 })
    .select()
    .single()

  if (error) return res.status(500).json({ error: 'Kunde inte skapa konto' })

  // Create free subscription
  await db.from('subscriptions').insert({ user_id: user.id, plan: 'free', status: 'active' })

  // Init streak
  await db.from('streaks').insert({ user_id: user.id, current_streak: 0 })

  const token = signToken({ userId: user.id, email: user.email, role: user.role, name: user.name })
  setAuthCookie(res, token)

  res.status(201).json({ user: { id: user.id, email, name, role } })
}
