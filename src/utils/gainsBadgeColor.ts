import type { GainsRating } from "@/types/evaluation"

export interface GainsBadgeStyle {
  bg: string
  text: string
  label: string
}

const BADGE_STYLES: Record<GainsRating, GainsBadgeStyle> = {
  G: { bg: "#005451", text: "#ffffff", label: "Greatly Exceeds Expectations" },
  A: { bg: "#e65100", text: "#ffffff", label: "Above Expectations" },
  I: { bg: "#546e7a", text: "#ffffff", label: "In Line with Goals" },
  N: { bg: "#f57c00", text: "#ffffff", label: "Not Meeting Goals" },
  S: { bg: "#ba1a1a", text: "#ffffff", label: "Severely Under-delivering" },
}

export const getGainsBadgeStyle = (rating: GainsRating): GainsBadgeStyle =>
  BADGE_STYLES[rating]

export const getGainsPdfLabel = (rating: GainsRating): string =>
  `GAINS: ${BADGE_STYLES[rating].label.toUpperCase()}`
