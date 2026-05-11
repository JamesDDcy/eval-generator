import type { EvaluationFormData } from "@/types/evaluation"

export interface FormValidationError {
  field: string
  message: string
}

export const validateEvaluationForm = (
  data: EvaluationFormData
): FormValidationError[] => {
  const errors: FormValidationError[] = []

  if (!data.evaluatorName.trim()) {
    errors.push({ field: "evaluatorName", message: "Your full name is required." })
  }
  if (!data.evaluatorEmail.trim()) {
    errors.push({ field: "evaluatorEmail", message: "Your MedGrocer email is required." })
  }
  if (!data.evaluateeName.trim()) {
    errors.push({ field: "evaluateeName", message: "Evaluatee name is required." })
  }
  if (!data.evaluateeEmail.trim()) {
    errors.push({ field: "evaluateeEmail", message: "Evaluatee email is required." })
  }
  return errors
}
