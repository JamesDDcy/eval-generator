import { NextRequest, NextResponse } from "next/server"
import { validateEnv } from "@/utils/validateEnv"
import { createEvaluation } from "@/services/createEvaluation"
import type { EvaluationFormData } from "@/types/evaluation"

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL ?? "",
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean)

const isDomainAllowed = (request: NextRequest): boolean => {
  const origin = request.headers.get("origin") ?? ""
  const referer = request.headers.get("referer") ?? ""
  if (!origin && !referer) return true
  return ALLOWED_ORIGINS.some(
    (allowed) => origin.startsWith(allowed) || referer.startsWith(allowed)
  )
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  if (!isDomainAllowed(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    validateEnv()
    const evaluationData = (await request.json()) as EvaluationFormData

    if (!evaluationData || typeof evaluationData !== "object") {
      return NextResponse.json(
        { error: "Missing evaluation payload" },
        { status: 400 }
      )
    }

    const recordId = await createEvaluation(evaluationData)
    return NextResponse.json({ success: true, recordId })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Submission failed"
    console.error("[POST /api/evaluations]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
