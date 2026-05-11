"use client"

import { useCallback, useEffect, useState } from "react"
import { initialFormData } from "@/types/evaluation"
import type { EvaluationFormData, AceRating, AceDomainData } from "@/types/evaluation"

const STORAGE_KEY = "medgrocer_eval_form_draft"

export const useEvaluationForm = () => {
  const [formData, setFormData] = useState<EvaluationFormData>(initialFormData)

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const updateField = useCallback(
    <K extends keyof EvaluationFormData>(field: K, value: EvaluationFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const updateDomain = useCallback((domain: AceRating, updated: AceDomainData) => {
    setFormData((prev) => ({ ...prev, [domain]: updated }))
  }, [])

  const resetForm = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setFormData(initialFormData())
  }, [])

  const saveDraft = useCallback((data?: EvaluationFormData) => {
    const payload = data ?? formData
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [formData])

  return { formData, updateField, updateDomain, resetForm, saveDraft }
}
