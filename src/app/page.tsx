"use client"

import { useRef, useState } from "react"
import { Brain, ShieldCheck, TrendingUp, Eye } from "lucide-react"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { AceDomainSection } from "@/components/AceDomainSection"
import { PreviewModal } from "@/components/PreviewModal"
import { useEvaluationForm } from "@/hooks/useEvaluationForm"
import { useToast } from "@/components/ToastProvider"
import { ACE_DOMAINS } from "@/utils/aceDomains"
import { validateEvaluationForm } from "@/utils/validateEvaluationForm"

const DOMAIN_ICONS = {
  aptitude: <Brain size={28} />,
  character: <ShieldCheck size={28} />,
  effectiveness: <TrendingUp size={28} />,
}

export default function CreateEvaluationPage() {
  const { formData, updateField, updateDomain, resetForm, saveDraft } = useEvaluationForm()
  const { showToast } = useToast()
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set())
  const [showPreview, setShowPreview] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  const handleCreatePreview = () => {
    const errors = validateEvaluationForm(formData)
    if (errors.length > 0) {
      setFieldErrors(new Set(errors.map((e) => e.field)))
      showToast(errors.map((e) => e.message).join("\n"), "error")
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    setFieldErrors(new Set())
    saveDraft(formData)
    setShowPreview(true)
  }

  const handleClearForm = () => {
    resetForm()
    setFieldErrors(new Set())
    setFormKey((k) => k + 1)
  }

  const handleSubmitSuccess = () => {
    setShowPreview(false)
    resetForm()
    setFormKey((k) => k + 1)
  }

  const inputClass = (field: string) =>
    `w-full h-11 px-4 bg-white border rounded-lg text-[14px] text-[#111c2c] placeholder:text-[#6e7978] focus:outline-none focus:ring-2 focus:ring-[#005451] focus:border-[#005451] transition-all ${
      fieldErrors.has(field) ? "border-[#ba1a1a]" : "border-[#bec9c7]"
    }`

  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      <AppSidebar />
      <AppHeader title="Performance Evaluation" />

      <main className="ml-64 pt-16 min-h-screen pb-32">
        <div className="max-w-[840px] mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-[30px] leading-[38px] font-semibold tracking-tight text-[#111c2c] mb-2">
              Performance Evaluation
            </h2>
            <p className="text-[14px] leading-[20px] text-[#3e4948] mb-2">
              Please take 15–30 minutes to fill out this form to help us better support our teams,
              create next steps, and grow in personal and professional development.
            </p>
            <hr className="mt-6 border-[#bec9c7]" />
          </div>

          <form key={formKey} ref={formRef}>
            {/* Evaluator */}
            <section className="space-y-6 mb-8">
              <h3 className="text-[12px] font-bold text-[#6e7978] uppercase tracking-widest">
                Evaluator
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#111c2c] mb-2">
                    Full Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.evaluatorName}
                    onChange={(e) => updateField("evaluatorName", e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className={inputClass("evaluatorName")}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#111c2c] mb-2">
                    MedGrocer Email <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.evaluatorEmail}
                    onChange={(e) => updateField("evaluatorEmail", e.target.value)}
                    placeholder="yourname@medgrocer.com"
                    className={inputClass("evaluatorEmail")}
                  />
                </div>
              </div>
            </section>

            <hr className="mb-8 border-[#bec9c7]" />

            {/* Evaluatee */}
            <section className="space-y-6 mb-12">
              <h3 className="text-[12px] font-bold text-[#6e7978] uppercase tracking-widest">
                Evaluatee
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#111c2c] mb-2">
                    Full Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.evaluateeName}
                    onChange={(e) => updateField("evaluateeName", e.target.value)}
                    placeholder="e.g. Juan Dela Cruz"
                    className={inputClass("evaluateeName")}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#111c2c] mb-2">
                    Work Email <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.evaluateeEmail}
                    onChange={(e) => updateField("evaluateeEmail", e.target.value)}
                    placeholder="theirname@medgrocer.com"
                    className={inputClass("evaluateeEmail")}
                  />
                </div>
              </div>
            </section>

            {/* ACE Domains */}
            <div className="space-y-10">
              {ACE_DOMAINS.map((domain) => (
                <AceDomainSection
                  key={domain.key}
                  domain={domain}
                  data={formData[domain.key]}
                  onChange={(updated) => updateDomain(domain.key, updated)}
                  icon={DOMAIN_ICONS[domain.key]}
                />
              ))}
            </div>

            {/* Additional Sections */}
            <section className="space-y-6 mt-10">
              <div>
                <label className="block text-[14px] font-bold text-[#111c2c] mb-1">
                  Special considerations
                </label>
                <div className="bg-[#f0f3ff] border border-[#bec9c7] rounded-xl p-6">
                  <p className="text-[14px] text-[#3e4948] mb-4">
                    Include any special considerations such as tenure, recent role changes, or
                    context for significant performance shifts...
                  </p>
                  <textarea
                    value={formData.specialConsiderations}
                    onChange={(e) => updateField("specialConsiderations", e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-white border border-[#bec9c7] rounded-lg text-[14px] text-[#111c2c] focus:outline-none focus:ring-2 focus:ring-[#005451] focus:border-[#005451] resize-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#111c2c] mb-1">
                  Improvement priorities <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="bg-[#f0f3ff] border border-[#bec9c7] rounded-xl p-6">
                  <p className="text-[14px] text-[#3e4948] mb-4">
                    Identify the three lowest criteria that the evaluatee needs to improve upon,
                    along with suggested next steps for each. If there are no ratings of &apos;Not
                    Meeting Goals&apos; or below, please rank the three lowest criteria.
                  </p>
                  <textarea
                    value={formData.improvementPriorities}
                    onChange={(e) => updateField("improvementPriorities", e.target.value)}
                    rows={4}
                    className="w-full p-4 bg-white border border-[#bec9c7] rounded-lg text-[14px] text-[#111c2c] focus:outline-none focus:ring-2 focus:ring-[#005451] focus:border-[#005451] resize-none transition-all"
                  />
                </div>
              </div>
            </section>
          </form>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 right-0 w-[calc(100%-16rem)] bg-white border-t border-[#bec9c7] px-10 py-4 flex justify-between items-center z-50">
        <button
          type="button"
          onClick={handleClearForm}
          className="text-[12px] font-bold text-[#6e7978] px-4 py-2 hover:bg-[#f0f3ff] transition-colors rounded-lg"
        >
          Clear Form
        </button>
        <button
          type="button"
          onClick={handleCreatePreview}
          className="flex items-center gap-2 bg-[#005451] text-white px-8 py-3 rounded-lg text-[12px] font-bold hover:bg-[#0d6e6a] transition-all active:scale-[0.98]"
        >
          <Eye size={16} />
          Create Preview
        </button>
      </footer>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          formData={formData}
          onClose={() => setShowPreview(false)}
          onSubmitSuccess={handleSubmitSuccess}
        />
      )}
    </div>
  )
}
