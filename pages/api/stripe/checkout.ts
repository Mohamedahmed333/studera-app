import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { stripe, PLANS } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = requireAuth(req, res)
  if (!user) return

  const { plan } = req.body
  if (!PLANS[plan as keyof typeof PLANS]) return res.status(400).json({ error: 'Ogiltigt abonnemang' })

  const db = supabaseAdmin()
  const { data: sub } = await db.from('subscriptions').select('stripe_customer_id').eq('user_id', user.userId).single()

  let customerId = sub?.stripe_customer_id
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email, name: user.name })
    customerId = customer.id
    await db.from('subscriptions').update({ stripe_customer_id: customerId }).eq('user_id', user.userId)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: PLANS[plan as keyof typeof PLANS].priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/upgrade`,
    metadata: { userId: user.userId, plan },
    locale: 'sv',
  })

  res.json({ url: session.url })
}
