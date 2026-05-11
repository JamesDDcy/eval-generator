export interface AceSubItem {
  code: string
  title: string
  bullets: string[]
}

export interface AceDomainGuide {
  key: string
  name: string
  headerBg: string
  headerText: string
  cardBg: string
  codeBg: string
  codeText: string
  subItems: AceSubItem[]
}

export const ACE_DOMAIN_GUIDES: AceDomainGuide[] = [
  {
    key: "aptitude",
    name: "Aptitude",
    headerBg: "#6b4bb1",
    headerText: "#ffffff",
    cardBg: "#f3f0ff",
    codeBg: "#6b4bb1",
    codeText: "#ffffff",
    subItems: [
      {
        code: "A1",
        title: "Data-literacy",
        bullets: [
          "Validates raw and source data",
          "Formulates initial hypotheses",
          "Double checks numbers constantly",
        ],
      },
      {
        code: "A2",
        title: "Decision-making",
        bullets: [
          "Prioritizes based on impact and urgency",
          "Presents practical and innovative options with pros and cons",
          "Thinks big picture and long term",
        ],
      },
      {
        code: "A3",
        title: "Comprehension",
        bullets: [
          "Prepares for meetings",
          "Asks questions",
          "Synthesizes content clearly",
        ],
      },
      {
        code: "A4",
        title: "Clarity",
        bullets: [
          "Builds rapport with stakeholders",
          "Reports in a clear, constructive, and concise manner",
          "Gives concrete next steps",
        ],
      },
    ],
  },
  {
    key: "character",
    name: "Character",
    headerBg: "#005451",
    headerText: "#ffffff",
    cardBg: "#e6f7f6",
    codeBg: "#005451",
    codeText: "#ffffff",
    subItems: [
      {
        code: "C1",
        title: "Resilience",
        bullets: [
          "Accepts challenges and setbacks",
          "Identifies and articulates their sources of stress",
          "Manages stress proactively",
        ],
      },
      {
        code: "C2",
        title: "Coachability",
        bullets: [
          "Open to and acts on feedback",
          "Broadens skills beyond current role",
          "Takes evaluations and trainings seriously",
        ],
      },
      {
        code: "C3",
        title: "Teamwork",
        bullets: [
          "Makes and keeps commitments",
          "Reduces others' frustration and boredom",
          "Helps with tasks beyond their role",
        ],
      },
      {
        code: "C4",
        title: "Coaching Ability",
        bullets: [
          "Properly delegates, directs, and demonstrates tasks",
          "Gives constructive and timely feedback to supervisors, peers, and supervisees",
          "Takes evaluations and feedback seriously",
        ],
      },
    ],
  },
  {
    key: "effectiveness",
    name: "Effectiveness",
    headerBg: "#8b5e00",
    headerText: "#ffffff",
    cardBg: "#fff4e6",
    codeBg: "#8b5e00",
    codeText: "#ffffff",
    subItems: [
      {
        code: "E1",
        title: "Process-focus",
        bullets: [
          "Follows standard written and unwritten procedures and practices",
          "Creates and refines checklists and processes",
          "Avoids and flags deviations",
        ],
      },
      {
        code: "E2",
        title: "Planning",
        bullets: [
          "Actively sets and manages calendars",
          "Delivers timely information and escalations through proper channels",
          "Posts works-in-progress early",
        ],
      },
      {
        code: "E3",
        title: "Outcomes",
        bullets: [
          "Tracks metrics and milestones",
          "Delivers consistent quality results",
          "Catalyzes company growth",
        ],
      },
      {
        code: "E4",
        title: "Resourcefulness",
        bullets: [
          "Efficiently uses time, manpower, and funds",
          "Quickly adapts to changes",
          "Proposes cost and time saving measures",
        ],
      },
    ],
  },
]
