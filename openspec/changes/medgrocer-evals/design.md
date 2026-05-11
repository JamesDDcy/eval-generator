## Context

MedGrocer has no existing digital tooling for performance evaluations. Supervisors use unstructured notes that do not enforce the ACE framework or produce consistent, auditable records. This portal is a greenfield Next.js 14 application. All evaluation data is owned by Airtable — there is no in-app database. The sole user persona is the Supervisor; employees do not have access.

Key constraints:
- PII (evaluator/evaluatee identity, performance ratings) must never be logged client-side or exposed via public API routes.
- Airtable is the single source of truth — there is no local persistence beyond `sessionStorage` for form recovery.
- PDF generation must work entirely in-browser (no server-side PDF rendering) to avoid storing sensitive content on the server.
- No existing codebase to migrate from.

## Goals / Non-Goals

**Goals:**
- Two-page Next.js App Router application: Create Evaluation and Framework Guide.
- Server-side Airtable proxy routes to keep the API key off the client.
- Client-side PDF generation that matches the ACE Report Card template.
- Evaluatee dropdown populated from Airtable Employee Directory on page load.
- Toast-based validation feedback (no `alert()`).
- `sessionStorage` form persistence so refreshes don't lose in-progress work.

**Non-Goals:**
- Employee login or employee-facing view.
- In-app history/dashboard for browsing past evaluations.
- Automated transcription or HRIS sync.
- Server-side PDF rendering or PDF storage outside of Airtable.
- Multi-tenant or role-based access control beyond a single Supervisor view.

## Decisions

### Decision 1: Next.js App Router with Server Actions / Route Handlers for Airtable

**Chosen**: API Route Handlers (`/app/api/`) as server-to-server Airtable proxies.

**Rationale**: Route Handlers keep `AIRTABLE_API_KEY` strictly in the server environment. Server Actions were considered but Route Handlers give cleaner separation for retry logic and error handling. Direct client SDK calls to Airtable were rejected because they would expose the API key in the browser bundle.

**Alternatives considered**:
- Server Actions: Simpler colocation, but harder to add middleware-level retry and rate-limit handling.
- Direct Airtable client from browser: Rejected — exposes PII-adjacent API key.

### Decision 2: `@react-pdf/renderer` for Client-Side PDF Generation

**Chosen**: `@react-pdf/renderer` renders the Report Card PDF entirely in the browser and produces a `Blob` for both download and Airtable upload.

**Rationale**: Keeps sensitive evaluation content off the server after submission. The PDF Blob is passed directly to the Airtable proxy upload route as `multipart/form-data`.

**Alternatives considered**:
- `jspdf` + `html2canvas`: Screenshot-based, fragile with fonts and layout.
- Server-side Puppeteer: Requires storing the evaluation payload server-side; adds infrastructure complexity and PII risk.

### Decision 3: Airtable as Sole Persistence Layer

**Chosen**: No in-app database. All evaluations are stored in Airtable; `sessionStorage` is used only for in-progress form recovery.

**Rationale**: Minimizes infrastructure footprint and aligns with the Admin's existing Airtable workflow. The History/Dashboard feature is explicitly out of scope for this phase, so there is no need for a queryable local DB.

### Decision 4: Single-Repo Next.js App (No Separate Backend)

**Chosen**: Monolithic Next.js app with Route Handlers as the "backend."

**Rationale**: Team size and project scope do not warrant a separate API service. Route Handlers provide sufficient server isolation for the two Airtable operations (Employee Directory read, Evaluation write + PDF upload).

### Decision 5: Tailwind CSS with Custom Design Tokens from Wireframe

**Chosen**: Tailwind CSS extended with the Material Design 3 color tokens from the wireframe (`primary: #005451`, `secondary: #6b4bb1`, etc.) and custom `borderRadius` / `spacing` tokens.

**Rationale**: The wireframe is already implemented in Tailwind with a custom theme. Carrying those tokens into the Next.js config ensures pixel-faithful implementation of the reference design.

## Risks / Trade-offs

- **[Risk] Airtable rate limits (5 req/s)** → Mitigation: Server route implements exponential backoff retry (max 3 attempts). Employee Directory is fetched once on page load and cached in-memory for the session.
- **[Risk] PDF Blob size for Airtable attachment upload** → Mitigation: Evaluate max attachment size (Airtable free: 2GB per base). Warn user in UI if upload fails with a descriptive toast (not `alert()`).
- **[Risk] `sessionStorage` is tab-scoped** → Accepted trade-off. Cross-tab persistence would require IndexedDB; overkill for a single-session workflow.
- **[Risk] `@react-pdf/renderer` bundle size (~300 KB gzipped)** → Mitigation: Dynamic import the PDF renderer so it does not block initial page load.
- **[Risk] Evaluatee dropdown stale data** → Mitigation: Add a manual "Refresh" button to re-fetch the Employee Directory without full page reload.

## Migration Plan

1. Set up Next.js 14 repo with Tailwind and custom theme tokens.
2. Configure environment variables (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, table IDs) in `.env.local`; document in `.env.example`.
3. Build Airtable Route Handlers before any UI work to validate connectivity.
4. Build Create Evaluation page (Phase 1 MVP).
5. Build PDF Report Card generation and Airtable upload flow.
6. Build Framework Guide page (Phase 2).
7. Add `sessionStorage` persistence and toast notifications (Phase 2).

**Rollback**: The portal is stateless server-side. Rolling back means reverting the deployment; Airtable data is unaffected.

## Open Questions

- **Q1**: Should the Evaluatee dropdown include all Airtable Employee records, or only active employees filtered by a status field? → Needs confirmation from Admin.
- **Q2**: Is there a specific Airtable field naming convention for the Evaluations table (e.g., does it already exist)? → Admin to provide base schema or confirm a new base is needed.
- **Q3**: The PDF Report Card design shows an "Evaluator Signature" rendered as a typed name. Should there be an actual drawn/uploaded signature, or is the typed name sufficient for audit purposes?
