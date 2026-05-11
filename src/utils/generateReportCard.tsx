import type { EvaluationFormData, AceDomainData, AceRating, GainsRating } from "@/types/evaluation"
import { getGainsBadgeStyle } from "@/utils/gainsBadgeColor"
import { ACE_DOMAIN_GUIDES } from "@/utils/aceSubItems"

const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })

const formatFileName = (evaluateeName: string, date: Date): string => {
  const safeName = evaluateeName.replace(/[^a-zA-Z0-9]/g, "_").replace(/__+/g, "_")
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "")
  return `ACE-Report-${safeName}-${dateStr}.pdf`
}

const DOMAIN_LABELS: Record<AceRating, { name: string; color: string }> = {
  aptitude: { name: "Aptitude", color: "#6b4bb1" },
  character: { name: "Character", color: "#005451" },
  effectiveness: { name: "Effectiveness", color: "#6f3f00" },
}

export const generatePdfBlob = async (
  formData: EvaluationFormData
): Promise<{ blob: Blob; fileName: string }> => {
  const { pdf, Document, Page, Text, View, StyleSheet } = await import(
    "@react-pdf/renderer"
  )

  const evaluationDate = new Date()
  const fileName = formatFileName(formData.evaluateeName, evaluationDate)

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      backgroundColor: "#f9f9ff",
      padding: 40,
      fontSize: 9,
      color: "#111c2c",
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: "1.5px solid #bec9c7",
    },
    headerLeft: { flex: 1 },
    reportTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#111c2c", marginBottom: 2 },
    reportSubtitle: { fontSize: 8, color: "#6e7978", letterSpacing: 1, textTransform: "uppercase" },
    headerRight: { alignItems: "flex-end" },
    metaLabel: { fontSize: 7, color: "#6e7978", letterSpacing: 1, textTransform: "uppercase", marginBottom: 1 },
    metaValue: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#111c2c", marginBottom: 6 },
    domainSection: {
      marginBottom: 12,
      borderRadius: 4,
      padding: 12,
    },
    domainHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    domainName: { fontSize: 12, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
    gainsBadge: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 10,
      fontSize: 7,
      fontFamily: "Helvetica-Bold",
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    colsLabel: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 4,
    },
    colLabel: {
      flex: 1,
      fontSize: 7,
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#6e7978",
    },
    colsContent: {
      flexDirection: "row",
      gap: 8,
    },
    col: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 8,
      borderRadius: 2,
      fontSize: 9,
      lineHeight: 1.5,
    },
    sectionBox: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f0f3ff",
      borderRadius: 4,
    },
    sectionTitle: {
      fontSize: 8,
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#6e7978",
      marginBottom: 4,
    },
    sectionText: { fontSize: 9, lineHeight: 1.5 },
    sigRow: {
      flexDirection: "row",
      gap: 24,
      marginTop: 16,
      paddingTop: 12,
      borderTop: "1px solid #bec9c7",
    },
    sigBox: { flex: 1 },
    sigLabel: {
      fontSize: 7,
      fontFamily: "Helvetica-Bold",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#6e7978",
      marginBottom: 6,
    },
    sigName: { fontSize: 14, fontFamily: "Helvetica-Oblique", color: "#111c2c", marginBottom: 4 },
    sigLine: { borderBottom: "1px solid #bec9c7", marginBottom: 3 },
    sigMeta: { fontSize: 8, color: "#3e4948" },
    footer: {
      position: "absolute",
      bottom: 24,
      left: 40,
      right: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTop: "1px solid #bec9c7",
      paddingTop: 6,
    },
    footerText: { fontSize: 7, color: "#6e7978" },
  })

  const formatSubItemsForPdf = (
    key: AceRating,
    subItems: Record<string, GainsRating | "">
  ): string => {
    const guide = ACE_DOMAIN_GUIDES.find((g) => g.key === key)
    if (!guide) return "—"
    const filled = guide.subItems.filter((item) => subItems?.[item.code])
    if (filled.length === 0) return "—"
    return filled
      .map((item) => {
        const rating = subItems[item.code] as GainsRating
        return `[${item.code}] ${item.title}: ${getGainsBadgeStyle(rating).label}`
      })
      .join("\n")
  }

  const domainSection = (key: AceRating, data: AceDomainData) => {
    const hasContent = Object.keys(data.subItems ?? {}).length > 0 || data.nextSteps
    if (!hasContent) return null
    const domain = DOMAIN_LABELS[key]

    return (
      <View
        key={key}
        style={[
          styles.domainSection,
          { borderLeft: `4px solid ${domain.color}`, backgroundColor: "#ffffff" },
        ]}
      >
        <View style={styles.domainHeader}>
          <Text style={[styles.domainName, { color: domain.color }]}>{domain.name}</Text>
        </View>
        <View style={styles.colsLabel}>
          <Text style={styles.colLabel}>Observations</Text>
          <Text style={styles.colLabel}>Next Steps</Text>
        </View>
        <View style={styles.colsContent}>
          <View style={styles.col}>
            <Text>{formatSubItemsForPdf(key, data.subItems ?? {})}</Text>
          </View>
          <View style={styles.col}>
            <Text>{data.nextSteps || "—"}</Text>
          </View>
        </View>
      </View>
    )
  }

  const ReportCard = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.reportTitle}>ACE Performance Report Card</Text>
            <Text style={styles.reportSubtitle}>Confidential Personnel Evaluation</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.metaLabel}>Evaluatee</Text>
            <Text style={styles.metaValue}>{formData.evaluateeName}</Text>
            <Text style={styles.metaLabel}>Email</Text>
            <Text style={styles.metaValue}>{formData.evaluateeEmail}</Text>
            <Text style={styles.metaLabel}>Evaluation Date</Text>
            <Text style={styles.metaValue}>{formatDate(evaluationDate)}</Text>
          </View>
        </View>

        {domainSection("aptitude", formData.aptitude)}
        {domainSection("character", formData.character)}
        {domainSection("effectiveness", formData.effectiveness)}

        {(formData.specialConsiderations || formData.improvementPriorities) && (
          <View style={styles.colsContent}>
            {formData.specialConsiderations ? (
              <View style={[styles.sectionBox, { flex: 1 }]}>
                <Text style={styles.sectionTitle}>Special Considerations</Text>
                <Text style={styles.sectionText}>{formData.specialConsiderations}</Text>
              </View>
            ) : null}
            {formData.improvementPriorities ? (
              <View style={[styles.sectionBox, { flex: 1 }]}>
                <Text style={styles.sectionTitle}>Improvement Priorities</Text>
                <Text style={styles.sectionText}>{formData.improvementPriorities}</Text>
              </View>
            ) : null}
          </View>
        )}

        <View style={styles.sigRow}>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Evaluator Signature</Text>
            <Text style={styles.sigName}>{formData.evaluatorName}</Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigMeta}>
              {formData.evaluatorName} &nbsp; Date: {formatDate(evaluationDate)}
            </Text>
          </View>
          <View style={styles.sigBox}>
            <Text style={styles.sigLabel}>Evaluatee Signature</Text>
            <Text style={[styles.sigName, { color: "#bec9c7" }]}>Signature Required</Text>
            <View style={styles.sigLine} />
            <Text style={styles.sigMeta}>
              {formData.evaluateeName} &nbsp; Date: ___/___/______
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Audit-Ready Documentation | MedGrocer Internal ACE System v2.4
          </Text>
          <Text style={styles.footerText}>Page 01 of 01</Text>
        </View>
      </Page>
    </Document>
  )

  const blob = await pdf(<ReportCard />).toBlob()
  return { blob, fileName }
}
