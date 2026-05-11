import type { AceRating } from "@/types/evaluation"

export interface AceDomain {
  key: AceRating
  name: string
  subtitle: string
  description: string
  borderColor: string
  badgeBg: string
  badgeText: string
  iconColor: string
  focusColor: string
  metrics: string[]
}

export const ACE_DOMAINS: AceDomain[] = [
  {
    key: "aptitude",
    name: "Aptitude",
    subtitle: "Cognitive & Technical Foundation",
    description:
      "Evaluates the fundamental knowledge base, critical thinking speed, and technical proficiency required for medical-tech roles.",
    borderColor: "#6b4bb1",
    badgeBg: "#eaddff",
    badgeText: "#442189",
    iconColor: "#6b4bb1",
    focusColor: "#6b4bb1",
    metrics: ["Medical Knowledge Accuracy", "Analytical Problem Solving"],
  },
  {
    key: "character",
    name: "Character",
    subtitle: "Ethical & Cultural Alignment",
    description:
      "Assesses integrity, empathy, and professional ethics. This ensures alignment with clinical standards and patient care values.",
    borderColor: "#005451",
    badgeBg: "#a0f1eb",
    badgeText: "#00201e",
    iconColor: "#005451",
    focusColor: "#005451",
    metrics: ["Ethical Decision Making", "Cultural Values Fit"],
  },
  {
    key: "effectiveness",
    name: "Effectiveness",
    subtitle: "Execution & Output Quality",
    description:
      "Measures real-world application, efficiency in task completion, and the overall impact of work on organizational goals.",
    borderColor: "#6f3f00",
    badgeBg: "#ffdcbe",
    badgeText: "#2d1600",
    iconColor: "#6f3f00",
    focusColor: "#6f3f00",
    metrics: ["KPI Achievement Rate", "Operational Efficiency"],
  },
]
