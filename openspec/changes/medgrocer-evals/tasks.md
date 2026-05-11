## 1. Project Bootstrap

- [x] 1.1 Initialize Next.js 14 (App Router) project with TypeScript, Tailwind CSS, and ESLint
- [x] 1.2 Install production dependencies: `airtable`, `@react-pdf/renderer`, `@fission-ai/openspec`
- [x] 1.3 Extend `tailwind.config.ts` with the Material Design 3 color tokens, custom `borderRadius`, and `spacing` values from the wireframe
- [x] 1.4 Configure `src/` directory structure: `app/`, `components/`, `services/`, `utils/`, `types/`
- [x] 1.5 Create `.env.example` documenting `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, `AIRTABLE_EVALUATIONS_TABLE_ID`, `AIRTABLE_EMPLOYEES_TABLE_ID`
- [x] 1.6 Set up `.env.local` with actual values (gitignored)

## 2. Types and Constants

- [x] 2.1 Define `AceRating` type (`"aptitude" | "character" | "effectiveness"`) and `GainsRating` enum in `src/types/evaluation.ts`
- [x] 2.2 Define `EvaluationFormData` interface covering all form fields in `src/types/evaluation.ts`
- [x] 2.3 Define `Employee` interface (`{ id, name, email }`) in `src/types/employee.ts`
- [x] 2.4 Create `GAINS_OPTIONS` constant array with label, value, color, and letter code in `src/utils/gainsOptions.ts`
- [x] 2.5 Create `ACE_DOMAINS` constant array defining each domain's name, icon key, subtitle, description, and key metrics in `src/utils/aceDomains.ts`

## 3. Airtable Service and API Routes

- [x] 3.1 Create `src/services/readEmployees.ts` — server-only function using `airtable` SDK to fetch Employee Directory records with retry logic (3 attempts, exponential backoff)
- [x] 3.2 Create `src/services/createEvaluation.ts` — server-only function to create an Airtable Evaluations record with metadata fields and PDF attachment
- [x] 3.3 Implement `GET /api/employees` Route Handler in `src/app/api/employees/route.ts` with domain-lock check (HTTP 403 for disallowed origins)
- [x] 3.4 Implement `POST /api/evaluations` Route Handler in `src/app/api/evaluations/route.ts` accepting `multipart/form-data` (metadata + PDF blob) with domain-lock check
- [x] 3.5 Add startup environment variable validation in a shared `src/utils/validateEnv.ts` helper imported by both Route Handlers

## 4. Shared UI Components

- [x] 4.1 Create `Toast` component (`src/components/Toast.tsx`) supporting `success`, `error`, and `warning` variants — no native `alert()` calls anywhere
- [x] 4.2 Create `ToastProvider` context and `useToast` hook for global toast dispatch
- [x] 4.3 Create `GainsDropdown` component (`src/components/GainsDropdown.tsx`) rendering the five GAINS options with color-coded indicators
- [x] 4.4 Create `AceDomainSection` component (`src/components/AceDomainSection.tsx`) rendering the GAINS dropdown, observations, timing/trigger, and support fields for a single domain
- [x] 4.5 Create `AppHeader` component (`src/components/AppHeader.tsx`) with navigation links to Create Evaluation and Framework Guide, highlighting the active route
- [x] 4.6 Create `AppSidebar` component (`src/components/AppSidebar.tsx`) matching the wireframe left sidebar with logo, nav items, and Finalize button area

## 5. Evaluation Form Page (Phase 1 MVP)

- [x] 5.1 Build `src/app/page.tsx` as the Create Evaluation page using `AppHeader`, `AppSidebar`, and form layout
- [x] 5.2 Implement evaluator name and email input fields
- [x] 5.3 Implement evaluatee dropdown that calls `GET /api/employees` on mount and auto-populates the email field on selection, with a manual refresh button
- [x] 5.4 Compose three `AceDomainSection` instances for Aptitude, Character, and Effectiveness
- [x] 5.5 Add Special Considerations and Other Feedback free-text fields at the bottom
- [x] 5.6 Implement client-side validation logic in `src/utils/validateEvaluationForm.ts` returning a list of field errors
- [x] 5.7 Wire "Finalize & Export" button to trigger validation → show error toast on failure
- [x] 5.8 Implement `sessionStorage` persistence: serialize form state on every change, restore on mount, clear on successful reset

## 6. PDF Report Card Generation

- [x] 6.1 Create `src/utils/generateReportCard.tsx` with a dynamically imported `@react-pdf/renderer` document component matching the ACE Report Card template
- [x] 6.2 Implement the PDF layout: header (evaluatee name, email, date), per-domain sections (GAINS badge with correct color, Observations, Next Steps columns), Special Considerations, Improvement Priorities, Evaluator typed signature, audit footer
- [x] 6.3 Implement GAINS badge color mapping utility in `src/utils/gainsBadgeColor.ts`
- [x] 6.4 Generate PDF filename following `ACE-Report-<EvaluateeName>-<YYYYMMDD>.pdf` pattern
- [x] 6.5 Export `generatePdfBlob(formData: EvaluationFormData): Promise<Blob>` as the public interface

## 7. Finalization Flow (Submission + Download)

- [x] 7.1 On successful validation: call `generatePdfBlob`, show loading state
- [x] 7.2 POST to `/api/evaluations` with form metadata and PDF Blob as `multipart/form-data`
- [x] 7.3 On Airtable success: trigger browser download via URL.createObjectURL → success toast → reset form → clear sessionStorage
- [x] 7.4 On Airtable failure: still trigger browser PDF download → show warning toast indicating upload failed
- [x] 7.5 Prevent duplicate submissions while a finalization is in progress (disable the button)

## 8. Framework Guide Page (Phase 2)

- [x] 8.1 Create `src/app/framework-guide/page.tsx` as a fully static React Server Component (no `use client`, no API calls)
- [x] 8.2 Render three ACE domain cards using `ACE_DOMAINS` constant with icon, subtitle, description, and key metrics
- [x] 8.3 Render GAINS rating scale panel using `GAINS_OPTIONS` constant with letter code, label, and definition
- [x] 8.4 Render Visual Framework Diagram section with a static image asset and "Download High-Res" button
- [x] 8.5 Implement "Download High-Res" button to trigger a file download of the high-res diagram asset

## 9. Polish and Phase 2 Refinements

- [x] 9.1 Add success animation (e.g., confetti or checkmark) displayed after successful finalization before form reset
- [x] 9.2 Ensure all toast notifications (success, validation error, upload warning) are consistently styled and auto-dismiss after 5 seconds
- [x] 9.3 Verify mobile responsiveness of both pages against wireframe breakpoints
- [x] 9.4 Audit all API routes: confirm no Airtable API key or PII appears in server logs or error responses sent to the client
- [x] 9.5 Add `Content-Security-Policy` headers in `next.config.ts` — no `unsafe-inline` scripts
- [x] 9.6 Write `.env.example` documentation and update `README.md` with setup instructions
