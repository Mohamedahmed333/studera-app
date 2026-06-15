import { NextApiRequest, NextApiResponse } from 'next'
import { comparePassword, signToken, setAuthCookie } from '../../lib/auth'
import { supabaseAdmin } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Fyll i alla fält' })

  const db = supabaseAdmin()
  const { data: user } = await db.from('users').select('*').eq('email', email).single()

  if (!user) return res.status(401).json({ error: 'Fel e-post eller lösenord' })

  const valid = await comparePassword(password, user.password_hash)
  if (!valid) return res.status(401).json({ error: 'Fel e-post eller lösenord' })

  const token = signToken({ userId: user.id, email: user.email, role: user.role, name: user.name })
  setAuthCookie(res, token)

  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}
