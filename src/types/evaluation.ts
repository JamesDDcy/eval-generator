export type AceRating = "aptitude" | "character" | "effectiveness"

export type GainsRating = "G" | "A" | "I" | "N" | "S"

export interface AceDomainData {
  subItems: Record<string, GainsRating | "">
  nextSteps: string
  timingTrigger: string
  supportProvided: string
}

export interface EvaluationFormData {
  evaluatorEmail: string
  evaluatorName: string
  evaluateeName: string
  evaluateeEmail: string
  relationship: string
  aptitude: AceDomainData
  character: AceDomainData
  effectiveness: AceDomainData
  specialConsiderations: string
  improvementPriorities: string
}

export const emptyDomain = (): AceDomainData => ({
  subItems: {},
  nextSteps: "",
  timingTrigger: "",
  supportProvided: "",
})

export const initialFormData = (): EvaluationFormData => ({
  evaluatorEmail: "",
  evaluatorName: "",
  evaluateeName: "",
  evaluateeEmail: "",
  relationship: "",
  aptitude: emptyDomain(),
  character: emptyDomain(),
  effectiveness: emptyDomain(),
  specialConsiderations: "",
  improvementPriorities: "",
})
