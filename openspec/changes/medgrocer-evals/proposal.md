## Why

MedGrocer supervisors currently rely on unstructured, manual notes to conduct performance evaluations, leading to inconsistent assessments and no standardized audit trail. A dedicated portal that enforces the ACE framework and GAINS scale will standardize evaluations and automate the creation of audit-ready PDF records stored in Airtable.

## What Changes

- **New**: Supervisor-facing Next.js portal with two pages — **Create Evaluation** (default) and **Framework Guide**.
- **New**: Structured evaluation form capturing evaluator/evaluatee details, per-domain ACE observations (Aptitude, Character, Effectiveness), GAINS ratings, timing/trigger context, support notes, and special considerations.
- **New**: Evaluatee selection dropdown synced live from an Airtable Employee Directory table.
- **New**: On-demand PDF Report Card generation (client-side) that mirrors the ACE/GAINS structured layout.
- **New**: On finalization — PDF is uploaded as an attachment to an Airtable "Evaluations" table, a browser download is triggered, and the form resets with a success toast.
- **New**: Static Framework Guide page documenting ACE domain definitions and GAINS rating criteria.
- **New**: Client-side form validation preventing submission when mandatory fields (GAINS ratings, ACE observations) are missing, surfacing errors via custom toast notifications (no `alert()`).

## Capabilities

### New Capabilities

- `evaluation-form`: Multi-section form for capturing evaluator/evaluatee identity, per-domain ACE observations, GAINS ratings, contextual fields (timing/trigger, support, other feedback), and special considerations. Includes Airtable-synced evaluatee dropdown and client-side validation.
- `pdf-report-card`: Client-side generation of the ACE Performance Report Card PDF matching the defined visual template, triggered on form finalization with an automatic browser download.
- `airtable-integration`: Server-side Airtable API proxy for (1) reading the Employee Directory to populate the evaluatee dropdown, and (2) writing finalized evaluations with PDF attachments to the Evaluations table.
- `framework-guide`: Static reference page rendering ACE domain definitions, GAINS rating criteria, and a visual framework diagram.

### Modified Capabilities

## Impact

- **New repository**: Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **New server routes**: API routes proxying all Airtable calls server-side to protect the Airtable API key (IT.49.FRM / PII compliance).
- **New dependency**: PDF generation library (e.g., `@react-pdf/renderer` or `jspdf`) for client-side report card output.
- **New dependency**: Airtable JS SDK for Employee Directory reads and Evaluations writes.
- **Environment variables**: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_EVALUATIONS_TABLE_ID`, `AIRTABLE_EMPLOYEES_TABLE_ID` — never exposed to the client.
