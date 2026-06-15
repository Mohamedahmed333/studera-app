import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export const config = { api: { bodyParser: false } }

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const sig = req.headers['stripe-signature']!
  const buf = await getRawBody(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  const db = supabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any
      const { userId, plan } = session.metadata
      const subId = session.subscription
      const stripeSub = await stripe.subscriptions.retrieve(subId)
      const periodEnd = new Date(stripeSub.current_period_end * 1000).toISOString()
      await db.from('subscriptions').update({
        plan, status: 'active',
        stripe_subscription_id: subId,
        current_period_end: periodEnd,
      }).eq('user_id', userId)
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as any
      await db.from('subscriptions').update({
        status: sub.status === 'active' ? 'active' : sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      }).eq('stripe_subscription_id', sub.id)
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as any
      await db.from('subscriptions').update({ plan: 'free', status: 'cancelled' }).eq('stripe_subscription_id', sub.id)
      break
    }
  }

  res.json({ received: true })
}
