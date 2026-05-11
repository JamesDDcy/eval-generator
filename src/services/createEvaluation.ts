import Airtable from "airtable"
import type { Records, FieldSet } from "airtable"
import { getEnv } from "@/utils/validateEnv"
import type { EvaluationFormData, AceDomainData, AceRating, GainsRating } from "@/types/evaluation"
import { getGainsBadgeStyle } from "@/utils/gainsBadgeColor"
import { ACE_DOMAIN_GUIDES } from "@/utils/aceSubItems"

const withRetry = async <T>(
  operation: () => Promise<T>,
  maxAttempts = 3
): Promise<T> => {
  let lastError: Error = new Error("Unknown error")
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      const isRateLimit =
        lastError.message.includes("429") ||
        lastError.message.toLowerCase().includes("rate limit")
      if (!isRateLimit || attempt === maxAttempts) throw lastError
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 500))
    }
  }
  throw lastError
}

const formatSubItems = (
  domainKey: AceRating,
  subItems: Record<string, GainsRating | "">
): string => {
  const guide = ACE_DOMAIN_GUIDES.find((g) => g.key === domainKey)
  if (!guide) return "(none)"
  const filled = guide.subItems.filter((item) => subItems[item.code])
  if (filled.length === 0) return "(none)"
  return filled
    .map((item) => {
      const rating = subItems[item.code] as GainsRating
      const gainsLabel = getGainsBadgeStyle(rating).label
      return `[${item.code}] ${item.title}: ${gainsLabel}`
    })
    .join("\n")
}

const formatDomainBlock = (
  domainKey: AceRating,
  domainName: string,
  data: AceDomainData
): string => {
  const lines = [
    `=== ${domainName.toUpperCase()} ===`,
    "",
    "Criterion Observations:",
    formatSubItems(domainKey, data.subItems ?? {}),
    "",
    "Next Steps:",
    data.nextSteps || "(none)",
  ]

  if (data.timingTrigger) {
    lines.push("", `Timing / Trigger: ${data.timingTrigger}`)
  }
  if (data.supportProvided) {
    lines.push(`Support Provided: ${data.supportProvided}`)
  }

  return lines.join("\n")
}

const formatEvaluationText = (formData: EvaluationFormData): string => {
  const sections = [
    formatDomainBlock("aptitude", "Aptitude", formData.aptitude),
    formatDomainBlock("character", "Character", formData.character),
    formatDomainBlock("effectiveness", "Effectiveness", formData.effectiveness),
  ]

  if (formData.specialConsiderations) {
    sections.push(
      `=== SPECIAL CONSIDERATIONS ===\n${formData.specialConsiderations}`
    )
  }

  if (formData.improvementPriorities) {
    sections.push(
      `=== IMPROVEMENT PRIORITIES ===\n${formData.improvementPriorities}`
    )
  }

  return sections.join("\n\n")
}

export const createEvaluation = async (
  formData: EvaluationFormData
): Promise<string> => {
  const env = getEnv()
  const base = new Airtable({ apiKey: env.airtableApiKey }).base(
    env.airtableBaseId
  )

  const fields: FieldSet = {
    "Evaluator Name": formData.evaluatorName,
    "Evaluator Email": formData.evaluatorEmail,
    "Evaluatee Name": formData.evaluateeName,
    "Evaluatee Email": formData.evaluateeEmail,
    "Evaluation": formatEvaluationText(formData),
  }

  return withRetry(
    () =>
      new Promise<string>((resolve, reject) => {
        base(env.evaluationsTableId).create(
          [{ fields }],
          (err: Error | null, records?: Records<FieldSet>) => {
            if (err) {
              reject(err)
              return
            }
            const created = records?.[0]
            if (!created) {
              reject(new Error("Airtable returned no records."))
              return
            }
            resolve(created.getId())
          }
        )
      })
  )
}
