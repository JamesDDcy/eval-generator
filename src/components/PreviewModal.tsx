"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X, Download, RefreshCw, FileText, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ToastProvider"
import type { EvaluationFormData } from "@/types/evaluation"

interface PreviewModalProps {
  formData: EvaluationFormData
  onClose: () => void
  onSubmitSuccess: () => void
}

export const PreviewModal = ({
  formData,
  onClose,
  onSubmitSuccess,
}: PreviewModalProps) => {
  const { showToast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(true)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [fileName, setFileName] = useState<string>("ACE-Report.pdf")
  const [mounted, setMounted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let active = true
    let createdUrl: string | null = null

    const generate = async () => {
      try {
        const { generatePdfBlob } = await import("@/utils/generateReportCard")
        const result = await generatePdfBlob(formData)
        if (!active) return
        createdUrl = URL.createObjectURL(result.blob)
        setPdfBlob(result.blob)
        setFileName(result.fileName)
        setPreviewUrl(createdUrl)
      } catch (error) {
        if (!active) return
        const message =
          error instanceof Error ? error.message : "Failed to generate PDF preview."
        console.error("[PreviewModal] PDF generation failed:", error)
        setGenerationError(message)
      } finally {
        if (active) setGenerating(false)
      }
    }

    generate()

    return () => {
      active = false
      if (createdUrl) URL.revokeObjectURL(createdUrl)
    }
  }, [formData])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose, submitting])

  const downloadPdf = () => {
    if (!previewUrl) return
    const anchor = document.createElement("a")
    anchor.href = previewUrl
    anchor.download = fileName
    anchor.click()
  }

  const handleSubmitAndDownload = async () => {
    if (!pdfBlob) {
      showToast("PDF not ready yet. Please wait for the preview to load.", "error")
      return
    }
    setSubmitting(true)
    try {
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json().catch(() => ({}))

      if (response.ok && result?.success) {
        downloadPdf()
        showToast("Evaluation submitted and PDF downloaded successfully.", "success")
        onSubmitSuccess()
        return
      }

      downloadPdf()
      const errorMessage = result?.error
        ? `Airtable upload failed: ${result.error}. PDF still downloaded.`
        : "Airtable upload failed. PDF still downloaded."
      console.error("[PreviewModal] Submission failed:", result)
      showToast(errorMessage, "warning")
    } catch (error) {
      downloadPdf()
      const message =
        error instanceof Error
          ? `Airtable upload failed: ${error.message}. PDF still downloaded.`
          : "Airtable upload failed. PDF still downloaded."
      console.error("[PreviewModal] Submission failed:", error)
      showToast(message, "warning")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current && !submitting) onClose()
  }

  if (!mounted) return null

  const modalContent = (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Report Card Preview"
    >
      <div className="relative flex flex-col bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#bec9c7] shrink-0">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-[#005451]" />
            <div>
              <p className="text-[14px] font-bold text-[#111c2c]">ACE Report Card Preview</p>
              <p className="text-[11px] text-[#6e7978]">{fileName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-2 rounded-full text-[#6e7978] hover:bg-[#f0f3ff] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Preview */}
        <div className="flex-1 bg-[#e7eeff] overflow-hidden">
          {generating ? (
            <div className="flex items-center justify-center h-full gap-3 text-[#3e4948]">
              <RefreshCw size={20} className="animate-spin" />
              <span className="text-[14px] font-medium">Generating PDF preview...</span>
            </div>
          ) : generationError ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-[#ba1a1a] px-8 text-center">
              <AlertTriangle size={32} />
              <p className="text-[14px] font-bold">Failed to generate preview</p>
              <p className="text-[12px] text-[#3e4948]">{generationError}</p>
            </div>
          ) : (
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="ACE Report Card PDF Preview"
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#bec9c7] bg-white shrink-0">
          <button
            onClick={onClose}
            disabled={submitting}
            className="text-[12px] font-bold text-[#6e7978] px-4 py-2 hover:bg-[#f0f3ff] rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitAndDownload}
            disabled={submitting || generating || !!generationError}
            className="flex items-center gap-2 bg-[#005451] text-white px-8 py-3 rounded-lg text-[12px] font-bold hover:bg-[#0d6e6a] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {submitting ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Download size={15} />
                Submit &amp; Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
