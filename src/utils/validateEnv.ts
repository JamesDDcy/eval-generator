const REQUIRED_ENV_VARS = [
  "AIRTABLE_API_KEY",
  "AIRTABLE_BASE_ID",
  "AIRTABLE_EVALUATIONS_TABLE",
] as const

export const validateEnv = (): void => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
        "Check your .env.local file against .env.example."
    )
  }
}

export const getEnv = () => ({
  airtableApiKey: process.env.AIRTABLE_API_KEY!,
  airtableBaseId: process.env.AIRTABLE_BASE_ID!,
  evaluationsTableId: process.env.AIRTABLE_EVALUATIONS_TABLE!,
})
