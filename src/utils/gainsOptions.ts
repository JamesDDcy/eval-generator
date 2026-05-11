import type { GainsRating } from "@/types/evaluation"

export interface GainsOption {
  value: GainsRating
  label: string
  letter: string
  color: string
  textColor: string
  definition: string
}

export const GAINS_OPTIONS: GainsOption[] = [
  {
    value: "G",
    letter: "G",
    label: "Greatly Exceeds Expectations",
    color: "#005451",
    textColor: "#ffffff",
    definition:
      "Consistently operates at a level significantly higher than the job requirements. A role model for others.",
  },
  {
    value: "A",
    letter: "A",
    label: "Above Expectations",
    color: "#e65100",
    textColor: "#ffffff",
    definition:
      "Regularly performs beyond the standard expectations. Demonstrates strong initiative.",
  },
  {
    value: "I",
    letter: "I",
    label: "In Line with Goals",
    color: "#546e7a",
    textColor: "#ffffff",
    definition:
      "Meets all core requirements of the role reliably. Consistent and stable performance.",
  },
  {
    value: "N",
    letter: "N",
    label: "Not Meeting Goals",
    color: "#f57c00",
    textColor: "#ffffff",
    definition:
      "Performance is inconsistent. Requires active guidance and closer supervision to meet standards.",
  },
  {
    value: "S",
    letter: "S",
    label: "Severely Under-delivering",
    color: "#ba1a1a",
    textColor: "#ffffff",
    definition:
      "Fails to meet basic role requirements. Urgent intervention and corrective action plan required.",
  },
]

export const getGainsOption = (value: GainsRating | ""): GainsOption | undefined =>
  GAINS_OPTIONS.find((opt) => opt.value === value)
