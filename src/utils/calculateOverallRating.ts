import type { EvaluationFormData, GainsRating } from "@/types/evaluation"

const RATING_TO_SCORE: Record<GainsRating, number> = {
  G: 5,
  A: 4,
  I: 3,
  N: 2,
  S: 1,
}

const SCORE_TO_RATING: GainsRating[] = ["S", "S", "N", "I", "A", "G"]

const OVERALL_LABELS: Record<GainsRating, string> = {
  G: "Greatly Exceeds Expectations",
  A: "Usually Above Expectations",
  I: "Usually In Line with Expectations",
  N: "Often Not Meeting Expectations",
  S: "Severely Under-delivering",
}

export interface OverallRating {
  letter: GainsRating
  label: string
  averageScore: number
  ratedCount: number
}

export const calculateOverallRating = (
  formData: EvaluationFormData
): OverallRating | null => {
  const allSubItems = [
    ...Object.values(formData.aptitude.subItems ?? {}),
    ...Object.values(formData.character.subItems ?? {}),
    ...Object.values(formData.effectiveness.subItems ?? {}),
  ].filter((rating): rating is GainsRating => Boolean(rating))

  if (allSubItems.length === 0) return null

  const total = allSubItems.reduce(
    (sum, rating) => sum + RATING_TO_SCORE[rating],
    0
  )
  const averageScore = total / allSubItems.length
  const rounded = Math.max(1, Math.min(5, Math.round(averageScore)))
  const letter = SCORE_TO_RATING[rounded]

  return {
    letter,
    label: OVERALL_LABELS[letter],
    averageScore,
    ratedCount: allSubItems.length,
  }
}
