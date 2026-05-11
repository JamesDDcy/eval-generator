# MedGrocer Evals — Supervisor Portal

An ACE Performance Evaluation portal for MedGrocer Supervisors. Built on Next.js 16 with Tailwind CSS v4.

## Overview

Supervisors use this portal to:
1. Fill out structured ACE (Aptitude, Character, Effectiveness) evaluations using the GAINS scale
2. Rate each criterion (A1–A4, C1–C4, E1–E4) individually
3. Generate audit-ready PDF Report Cards
4. Automatically submit evaluations to Airtable for record-keeping
5. Reference the Framework Guide for ACE and GAINS definitions

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 with Material Design 3 color tokens
- **PDF Generation**: `@react-pdf/renderer` (client-side, dynamically imported)
- **Data Layer**: Airtable (Evaluations table)
- **Icons**: Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your Airtable credentials in `.env.local`:

| Variable | Description |
|---|---|
| `AIRTABLE_API_KEY` | Personal Access Token from airtable.com/account |
| `AIRTABLE_BASE_ID` | Base ID (starts with `app`) |
| `AIRTABLE_EVALUATIONS_TABLE` | Exact table name (e.g. `Evaluations`) |
| `NEXT_PUBLIC_APP_URL` | Public URL of the deployed app (for domain-lock) |

### 3. Airtable Table Schema

#### Evaluations Table

| Field Name | Type |
|---|---|
| Evaluator Name | Single line text |
| Evaluator Email | Email |
| Evaluatee Name | Single line text |
| Evaluatee Email | Email |
| Evaluation | Long text |

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── evaluations/route.ts       # POST /api/evaluations — Airtable proxy
│   ├── framework-guide/page.tsx       # Static Framework Guide page
│   ├── layout.tsx                     # Root layout with ToastProvider
│   ├── page.tsx                       # Create Evaluation page (home)
│   └── globals.css                    # Tailwind v4 + MD3 theme tokens
├── components/
│   ├── AceDomainSection.tsx           # ACE domain form section with per-criterion ratings
│   ├── AppHeader.tsx                  # Top header
│   ├── AppSidebar.tsx                 # Left sidebar with nav
│   ├── GainsDropdown.tsx              # GAINS rating select
│   ├── PreviewModal.tsx               # PDF preview + submit modal
│   ├── Toast.tsx                      # Toast notification component
│   └── ToastProvider.tsx              # Toast context + useToast hook
├── hooks/
│   └── useEvaluationForm.ts           # Form state + sessionStorage persistence
├── services/
│   └── createEvaluation.ts            # Server: write to Airtable Evaluations
├── types/
│   └── evaluation.ts                  # EvaluationFormData, GainsRating, etc.
└── utils/
    ├── aceDomains.ts                  # ACE_DOMAINS constant
    ├── aceSubItems.ts                 # Per-criterion sub-item data
    ├── gainsBadgeColor.ts             # GAINS → badge color mapping
    ├── gainsOptions.ts                # GAINS_OPTIONS constant
    ├── generateReportCard.tsx         # PDF generation (dynamic import)
    ├── validateEnv.ts                 # Server env var validation
    └── validateEvaluationForm.ts      # Client form validation
```

## Troubleshooting

### `unable to verify the first certificate` (corporate networks)

This error appears when the dev machine sits behind a corporate proxy that intercepts TLS with its own root CA — and Node's bundled CA list doesn't include it.

**Local dev**: the `dev` and `start` scripts set `NODE_TLS_REJECT_UNAUTHORIZED=0`, which disables TLS verification for the local Node process only. **Never deploy with this flag set.**

**Production fix**: install the corporate root CA on the host and point Node to it:

```bash
NODE_EXTRA_CA_CERTS=/path/to/corp-root.crt npm start
```

## Security Notes

- **API key never reaches the browser** — all Airtable calls go through Next.js Route Handlers (`/api/evaluations`).
- **Domain-lock** — API routes return HTTP 403 for requests not originating from `NEXT_PUBLIC_APP_URL`. Set this to your production domain before deploying.
- **CSP in production** — `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy` headers are applied to all responses in production builds. The CSP uses `unsafe-inline` and `unsafe-eval` for `script-src` because Next.js App Router requires these for streaming hydration.
- **`NODE_TLS_REJECT_UNAUTHORIZED=0`** is set in the `dev` and `start` npm scripts for local corporate network compatibility. This flag **must not be set** on any production host.
- **PDF generation is client-side** — evaluation content is never stored on the app server.

## Deployment

1. Set all four environment variables on your hosting platform (Vercel, etc.)
2. Set `NEXT_PUBLIC_APP_URL` to the exact deployed origin (e.g. `https://evals.medgrocer.com`)
3. Confirm the host does **not** set `NODE_TLS_REJECT_UNAUTHORIZED=0`
4. Do **not** commit `.env.local`
