"use client"

import { GainsDropdown } from "@/components/GainsDropdown"
import { ACE_DOMAIN_GUIDES } from "@/utils/aceSubItems"
import type { AceDomain } from "@/utils/aceDomains"
import type { AceDomainData, GainsRating } from "@/types/evaluation"

interface AceDomainSectionProps {
  domain: AceDomain
  data: AceDomainData
  onChange: (updated: AceDomainData) => void
  icon: React.ReactNode
}

export const AceDomainSection = ({
  domain,
  data,
  onChange,
  icon,
}: AceDomainSectionProps) => {
  const updateField = (
    field: "nextSteps" | "timingTrigger" | "supportProvided",
    value: string
  ) => onChange({ ...data, [field]: value })

  const updateSubItem = (code: string, value: GainsRating | "") =>
    onChange({ ...data, subItems: { ...data.subItems, [code]: value } })

  const guide = ACE_DOMAIN_GUIDES.find((g) => g.key === domain.key)

  const textareaClass =
    "w-full p-3 bg-[#f0f3ff] border border-[#bec9c7] rounded-lg text-[13px] leading-[19px] text-[#111c2c] placeholder:text-[#6e7978] focus:outline-none resize-none transition-all"

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = domain.borderColor
      e.currentTarget.style.boxShadow = `0 0 0 2px ${domain.borderColor}40`
    },
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "#bec9c7"
      e.currentTarget.style.boxShadow = "none"
    },
  }

  return (
    <section
      className="rounded-xl p-8 bg-white"
      style={{ border: `2px solid ${domain.borderColor}` }}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <span style={{ color: domain.iconColor }}>{icon}</span>
          <h3
            className="text-[20px] leading-[28px] font-bold uppercase tracking-wider"
            style={{ color: domain.iconColor }}
          >
            {domain.name}
          </h3>
        </div>
        <span
          className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter"
          style={{ backgroundColor: domain.badgeBg, color: domain.badgeText }}
        >
          {domain.subtitle.split(" & ")[1] ?? domain.subtitle}
        </span>
      </div>

      <div className="space-y-6">
        {guide && (
          <div>
            <p className="text-[12px] font-semibold text-[#6e7978] uppercase tracking-wider mb-3">
              Criterion ratings
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.subItems.map((item) => (
                <div
                  key={item.code}
                  className="rounded-lg border p-4 bg-[#f9f9ff] flex flex-col gap-3"
                  style={{ borderColor: `${domain.borderColor}30` }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: domain.borderColor, color: "#ffffff" }}
                    >
                      {item.code}
                    </span>
                    <span className="text-[13px] font-bold text-[#111c2c]">{item.title}</span>
                  </div>
                  <ul className="flex-1 space-y-0.5">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-1.5 text-[11px] leading-[15px] text-[#6e7978]"
                      >
                        <span
                          className="mt-[4px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: domain.borderColor }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <GainsDropdown
                    value={data.subItems?.[item.code] ?? ""}
                    onChange={(val) => updateSubItem(item.code, val as GainsRating | "")}
                    accentColor={domain.borderColor}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-[14px] font-bold text-[#111c2c] mb-1">
            Evaluatee to start working on or continue
          </label>
          <p className="text-[12px] text-[#6e7978] mb-2">
            Based on the behaviors listed above, copy and paste three bullet points that highlight
            areas where the team member needs to focus more on.
          </p>
          <textarea
            value={data.nextSteps}
            onChange={(e) => updateField("nextSteps", e.target.value)}
            rows={3}
            placeholder="Define specific actionable next steps..."
            className={textareaClass}
            {...focusHandlers}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-bold text-[#111c2c] mb-2">
              Timing or trigger
            </label>
            <textarea
              value={data.timingTrigger}
              onChange={(e) => updateField("timingTrigger", e.target.value)}
              rows={2}
              placeholder="Specific situations/moments..."
              className={textareaClass}
              {...focusHandlers}
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-[#111c2c] mb-2">
              Support provided
            </label>
            <textarea
              value={data.supportProvided}
              onChange={(e) => updateField("supportProvided", e.target.value)}
              rows={2}
              placeholder="Concrete support offered..."
              className={textareaClass}
              {...focusHandlers}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
