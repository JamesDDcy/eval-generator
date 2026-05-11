## ADDED Requirements

### Requirement: Evaluator and evaluatee identity capture
The form SHALL capture the evaluator's name and email, and the evaluatee's name (selected from the Airtable Employee Directory dropdown) and email.

#### Scenario: Evaluatee selected from dropdown
- **WHEN** the supervisor opens the Create Evaluation page
- **THEN** the evaluatee dropdown is populated with names from the Airtable Employee Directory

#### Scenario: Evaluatee email auto-populated
- **WHEN** the supervisor selects an evaluatee from the dropdown
- **THEN** the evaluatee's work email field is auto-populated from the directory record

### Requirement: ACE domain observation fields
The form SHALL include a dedicated section for each of the three ACE domains (Aptitude, Character, Effectiveness), each containing a GAINS rating dropdown, an observations text area, a timing/trigger text field, and a support notes text field.

#### Scenario: All three ACE sections visible
- **WHEN** the supervisor loads the Create Evaluation page
- **THEN** three domain sections are visible: Aptitude, Character, and Effectiveness, each with their own GAINS dropdown, observations area, timing/trigger field, and support field

#### Scenario: GAINS dropdown options
- **WHEN** the supervisor opens a GAINS dropdown for any ACE domain
- **THEN** the options shown are: "Greatly Exceeds", "Above Expectations", "In Line with Goals", "Not Meeting Goals", and "Severely Under-delivering"

### Requirement: Special considerations and other feedback fields
The form SHALL include a free-text "Special Considerations" field and an "Other Feedback" field at the bottom of the form, both of which are optional.

#### Scenario: Optional fields do not block submission
- **WHEN** the supervisor leaves "Special Considerations" and "Other Feedback" blank
- **THEN** the form can still be submitted successfully if all mandatory fields are complete

### Requirement: Mandatory field validation
The form SHALL prevent finalization if any mandatory field is empty. Mandatory fields are: evaluator name, evaluator email, evaluatee selection, and GAINS rating for all three ACE domains.

#### Scenario: Missing GAINS rating blocks submission
- **WHEN** the supervisor clicks "Finalize & Export" with one or more GAINS ratings unselected
- **THEN** a validation error toast is shown identifying the missing fields and submission is blocked

#### Scenario: Missing evaluator name blocks submission
- **WHEN** the supervisor clicks "Finalize & Export" with the evaluator name field empty
- **THEN** a validation error toast is shown and submission is blocked

### Requirement: No browser alert() for notifications
The system SHALL use custom toast notifications exclusively for all validation errors and submission feedback; native browser `alert()`, `confirm()`, or `prompt()` calls are prohibited.

#### Scenario: Validation toast displayed
- **WHEN** validation fails on finalization
- **THEN** a toast notification appears on screen describing the error without blocking the browser UI

### Requirement: sessionStorage form persistence
The form SHALL persist its current state to `sessionStorage` so that a page refresh restores the in-progress evaluation.

#### Scenario: Refresh restores form
- **WHEN** the supervisor refreshes the page mid-form
- **THEN** all previously entered field values are restored from sessionStorage

#### Scenario: Form reset clears sessionStorage
- **WHEN** the form is reset after successful finalization
- **THEN** the sessionStorage entry for the form is cleared

### Requirement: Evaluatee dropdown refresh
The form SHALL provide a manual refresh control to re-fetch the Employee Directory without a full page reload.

#### Scenario: Manual refresh updates dropdown
- **WHEN** the supervisor clicks the refresh control on the evaluatee dropdown
- **THEN** the dropdown is re-populated with the latest records from the Airtable Employee Directory
