# 📚 Studera — Smart studieapp för åk 5

Komplett Next.js-app med:
- Auth (email/lösenord + JWT cookies)
- 4 ämnen, 18 kapitel, 130+ frågor
- AI-förklaring per svar (Claude API)
- Freemium (5 frågor/dag gratis)
- Stripe-betalning (99 kr/mån · 699 kr/år)
- Föräldrapanel med statistik och aktivitetsgraf
- Streak-system

---

## 1. Supabase

1. Gå till [supabase.com](https://supabase.com) → New project
2. Gå till SQL Editor → klistra in hela `supabase-schema.sql` → Run
3. Kopiera från Settings → API:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Stripe

1. Gå till [stripe.com](https://stripe.com) → Skapa konto
2. Products → Add product → "Studera Premium"
   - Pris 1: 99 SEK/månad → kopiera Price ID → `STRIPE_MONTHLY_PRICE_ID`
   - Pris 2: 699 SEK/år → kopiera Price ID → `STRIPE_YEARLY_PRICE_ID`
3. Developers → API keys:
   - Secret key → `STRIPE_SECRET_KEY`
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Webhooks → Add endpoint:
   - URL: `https://din-app.replit.app/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Kopiera Signing secret → `STRIPE_WEBHOOK_SECRET`

---

## 3. Anthropic

1. Gå till [console.anthropic.com](https://console.anthropic.com)
2. API Keys → Create key → `ANTHROPIC_API_KEY`

---

## 4. Starta på Replit

1. Skapa ett nytt Replit (Node.js)
2. Ladda upp alla filer (eller importera från GitHub)
3. I Replit Secrets, lägg till ALLA variabler från `.env.local.example`
4. Sätt `NEXT_PUBLIC_APP_URL` till din Replit URL (t.ex. `https://studera.ditt-namn.repl.co`)
5. I Shell:
```bash
npm install
npm run build
npm start
```

---

## Filstruktur

```
studera-app/
├── pages/
│   ├── index.tsx          # Login/Register
│   ├── dashboard.tsx      # Elev-dashboard
│   ├── parent.tsx         # Föräldrapanel
│   ├── upgrade.tsx        # Stripe-betalning
│   ├── subject/[subject].tsx   # Kaplitelval
│   ├── quiz/[subject]/[topic].tsx  # Quiz med AI
│   └── api/
│       ├── auth/          # login, register, me/logout
│       ├── quiz/          # submit, stats
│       ├── stripe/        # checkout, webhook, status
│       └── parent/        # children
├── lib/
│   ├── questions.ts       # Alla 130+ frågor
│   ├── auth.ts            # JWT + cookies
│   ├── supabase.ts        # DB client
│   └── stripe.ts          # Stripe client
├── styles/globals.css
├── supabase-schema.sql    # Kör detta i Supabase
└── .env.local.example     # Kopiera → .env.local
```

---

## Priser att sätta i Stripe (SEK)

| Plan | Pris | Amount (öre) |
|------|------|-------------|
| Månadsvis | 99 kr/mån | 9900 |
| Årsvis | 699 kr/år | 69900 |

---

## Nästa steg efter lansering

- [ ] Skicka veckobrev till föräldrar via email (Resend.com)
- [ ] Lägg till Nationella prov-simulering
- [ ] Push notifications (PWA)
- [ ] B2B: skolpaket med klassrumspanel
