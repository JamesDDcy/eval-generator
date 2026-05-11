## ADDED Requirements

### Requirement: Server-side Airtable API proxy
All Airtable API calls SHALL be made via Next.js Route Handlers on the server, never directly from the browser client, to protect the Airtable API key.

#### Scenario: API key not exposed to browser
- **WHEN** the browser inspects network requests to Airtable
- **THEN** no direct requests to `api.airtable.com` originate from the browser; all calls are proxied through `/api/` routes

#### Scenario: Missing environment variables throw at startup
- **WHEN** required environment variables (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, table IDs) are absent
- **THEN** the server throws a descriptive configuration error at startup rather than silently failing at runtime

### Requirement: Employee Directory read for evaluatee dropdown
The system SHALL expose a Route Handler (`GET /api/employees`) that reads all active employee records from the Airtable Employee Directory table and returns name and email fields.

#### Scenario: Employees returned for dropdown
- **WHEN** the Create Evaluation page loads
- **THEN** `GET /api/employees` is called and returns an array of `{ id, name, email }` objects

#### Scenario: Airtable rate limit retry
- **WHEN** Airtable returns a 429 Too Many Requests response
- **THEN** the Route Handler retries up to 3 times with exponential backoff before returning an error to the client

### Requirement: Evaluation submission with PDF attachment to Airtable
The system SHALL expose a Route Handler (`POST /api/evaluations`) that accepts evaluation metadata and a PDF file, creates a new record in the Airtable Evaluations table, and attaches the PDF file to the record's attachment field.

#### Scenario: Evaluation record created with PDF
- **WHEN** the supervisor finalizes a valid evaluation
- **THEN** `POST /api/evaluations` creates an Airtable record containing evaluator name, evaluator email, evaluatee name, evaluatee email, evaluation date, per-domain GAINS ratings, and the PDF as an attachment

#### Scenario: Submission fails gracefully
- **WHEN** the Airtable write fails after all retries
- **THEN** the Route Handler returns a structured error response and the client displays a toast describing the failure without using `alert()`

### Requirement: Domain-locked API routes
The `/api/` Route Handlers SHALL reject requests not originating from the application's own domain.

#### Scenario: Cross-origin requests rejected
- **WHEN** a request to `/api/evaluations` or `/api/employees` arrives from a non-whitelisted origin
- **THEN** the Route Handler returns HTTP 403 Forbidden
