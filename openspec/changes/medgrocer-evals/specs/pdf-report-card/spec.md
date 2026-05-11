## ADDED Requirements

### Requirement: Client-side ACE Report Card PDF generation
The system SHALL generate the ACE Performance Report Card PDF entirely in the browser using the evaluation form data, without sending evaluation content to the server for rendering.

#### Scenario: PDF generated with all evaluation data
- **WHEN** the supervisor clicks "Finalize & Export" and validation passes
- **THEN** an ACE Performance Report Card PDF is generated client-side containing: evaluator name, evaluatee name and email, evaluation date, per-domain ACE ratings and observations, timing/trigger, support notes, special considerations, and improvement priorities

#### Scenario: PDF generation does not block UI
- **WHEN** the PDF is being generated
- **THEN** the UI shows a loading state and the supervisor cannot submit again until generation completes

### Requirement: PDF matches ACE Report Card visual template
The generated PDF SHALL match the visual layout defined in the wireframe: header with evaluatee name and email, evaluation date, a section per ACE domain with GAINS badge and two-column (Observations / Next Steps) layout, special considerations and improvement priorities sections, evaluator typed signature, and a footer with audit metadata.

#### Scenario: GAINS badge color matches rating
- **WHEN** the PDF is rendered
- **THEN** each domain's GAINS badge uses the correct color associated with its rating (e.g., teal for "Greatly Exceeds", orange for "Above Expectations")

#### Scenario: PDF filename includes evaluatee name and date
- **WHEN** the browser download is triggered
- **THEN** the PDF filename follows the pattern: `ACE-Report-<EvaluateeName>-<YYYYMMDD>.pdf`

### Requirement: Automatic browser PDF download
The system SHALL trigger an automatic browser download of the generated PDF immediately after it is successfully uploaded to Airtable.

#### Scenario: Download triggered after Airtable upload
- **WHEN** the Airtable upload succeeds
- **THEN** the browser automatically downloads the PDF file without requiring an additional supervisor action

#### Scenario: Download triggered even if Airtable upload partially fails
- **WHEN** the Airtable upload fails but PDF generation succeeds
- **THEN** the browser still downloads the PDF and a warning toast informs the supervisor that Airtable upload failed

### Requirement: PDF renderer dynamically loaded
The PDF rendering library SHALL be dynamically imported to prevent it from blocking the initial page load.

#### Scenario: Page loads without PDF library in initial bundle
- **WHEN** the Create Evaluation page first loads
- **THEN** the PDF rendering library is not included in the initial JavaScript bundle
