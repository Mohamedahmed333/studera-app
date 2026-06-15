import { NextApiRequest, NextApiResponse } from 'next'
import { clearAuthCookie, requireAuth } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    clearAuthCookie(res)
    return res.json({ ok: true })
  }
  if (req.method === 'GET') {
    const user = requireAuth(req, res)
    if (!user) return
    return res.json({ user })
  }
  res.status(405).end()
}
