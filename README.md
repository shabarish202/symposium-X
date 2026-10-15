# SYMPOSIUM-X — Registration & Food Pass Demo

A standalone Next.js frontend prototype for a college symposium registration and one-time food verification flow.

## Included in this demo
- Crimson-red / black responsive event interface
- Participant registration form
- ₹500 registration fee display
- Payment success/failure simulation (no real payment)
- QR code sample pass
- Simulated staff verification and one-time food redemption
- Admin dashboard with illustrative sample metrics

## Important limitations
This is a **frontend demo only**. It does not store registrations in a database, collect money, verify Razorpay payments, send emails, authenticate staff, or provide secure real-world QR redemption. All demo state is held in the browser and resets on refresh. Do not use this version for real event entry or food distribution.

## Run locally
Requirements: Node.js 18.18+ (Node.js 20 LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel
1. Push this repository to GitHub.
2. Sign in at https://vercel.com.
3. Select **Add New → Project** and import the `symposium-x` GitHub repository.
4. Keep the framework preset as Next.js.
5. No environment variables are needed for this frontend demo.
6. Click **Deploy** and share the resulting `*.vercel.app` URL.

## Push to an existing GitHub repository
From the project folder:

```bash
git init
git add .
git commit -m "Create SYMPOSIUM-X demo prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/symposium-x.git
git push -u origin main
```

If the GitHub repository already contains a README or other commits, clone that repository first and copy these files into the cloned folder instead of creating an unrelated Git history.

## Next production phase
Before real registration:
- Add Supabase schema, row-level security and server-side authorization.
- Create Razorpay orders server-side and verify signatures and captured payment status.
- Verify Razorpay webhooks and process them idempotently.
- Issue high-entropy QR tokens only after payment is verified.
- Add authenticated staff scanner and atomic one-time redemption.
- Send transactional QR email after confirmed payment.
- Add tests for failed payments, duplicate webhooks, refunds, and concurrent scans.
