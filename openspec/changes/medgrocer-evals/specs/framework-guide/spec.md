## ADDED Requirements

### Requirement: ACE domain definitions display
The Framework Guide page SHALL display the definition, description, and key metrics for each of the three ACE domains: Aptitude (Cognitive & Technical Foundation), Character (Ethical & Cultural Alignment), and Effectiveness (Execution & Output Quality).

#### Scenario: All three domain cards visible
- **WHEN** the supervisor navigates to the Framework Guide page
- **THEN** three domain cards are displayed side-by-side (or stacked on mobile) for Aptitude, Character, and Effectiveness, each with their icon, subtitle, description, and key metric items

### Requirement: GAINS rating scale display
The Framework Guide page SHALL display all five GAINS ratings with their label, letter code, and definition text.

#### Scenario: All GAINS ratings displayed
- **WHEN** the supervisor views the Framework Guide page
- **THEN** the GAINS panel shows five entries: G (Greatly Exceeds), A (Above Expectations), I (In Line with Goals), N (Not Meeting Goals), S (Severely Under-delivering), each with its definition

### Requirement: Visual framework diagram
The Framework Guide page SHALL display a visual diagram illustrating the inter-connectivity of the three ACE domains.

#### Scenario: Diagram renders on page load
- **WHEN** the supervisor loads the Framework Guide page
- **THEN** the visual ACE framework diagram is displayed without requiring any user interaction

#### Scenario: High-resolution diagram download
- **WHEN** the supervisor clicks "Download High-Res"
- **THEN** the browser downloads a high-resolution version of the framework diagram

### Requirement: Static content — no API calls
The Framework Guide page SHALL be fully static and SHALL NOT make any API calls on load.

#### Scenario: Guide loads without network dependency
- **WHEN** the Airtable API is unavailable
- **THEN** the Framework Guide page still loads and displays all content correctly

### Requirement: Navigation between pages
The application SHALL provide persistent navigation allowing the supervisor to switch between Create Evaluation and Framework Guide from any page.

#### Scenario: Navigation links always visible
- **WHEN** the supervisor is on any page of the portal
- **THEN** navigation links to "Create Evaluation" and "Framework Guide" are visible in the header

#### Scenario: Active page highlighted in nav
- **WHEN** the supervisor is on the Framework Guide page
- **THEN** the "Framework Guide" nav link is visually highlighted as the active route
