import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { GAINS_OPTIONS } from "@/utils/gainsOptions"
import { ACE_DOMAIN_GUIDES } from "@/utils/aceSubItems"

export const metadata = {
  title: "Framework Guide | MedGrocer Evals",
}

export default function FrameworkGuidePage() {
  return (
    <div className="min-h-screen bg-[#f9f9ff]">
      <AppSidebar />
      <AppHeader title="Framework Guide" />

      <main className="ml-64 pt-16 min-h-screen pb-16">
        <div className="max-w-[960px] mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-[30px] leading-[38px] font-semibold tracking-tight text-[#111c2c] mb-2">
              ACE Framework Guide
            </h2>
            <p className="text-[14px] leading-[20px] text-[#3e4948] max-w-2xl">
              The MedGrocer Evaluation System is built on the ACE methodology, ensuring consistent,
              clinical-grade assessments across Aptitude, Character, and Effectiveness.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {ACE_DOMAIN_GUIDES.map((domain) => (
              <div
                key={domain.key}
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: domain.headerBg }}
              >
                {/* Domain header row */}
                <div
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ backgroundColor: domain.headerBg }}
                >
                  <span className="text-[16px] font-bold tracking-wide" style={{ color: domain.headerText }}>
                    {domain.name}
                  </span>
                </div>

                {/* 2×2 sub-item grid */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ backgroundColor: domain.cardBg }}
                >
                  {domain.subItems.map((item, index) => (
                    <div
                      key={item.code}
                      className={`p-5 ${
                        index % 2 === 0 ? "sm:border-r" : ""
                      } ${
                        index < 2 ? "border-b" : ""
                      }`}
                      style={{ borderColor: `${domain.headerBg}30` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                          style={{ backgroundColor: domain.codeBg, color: domain.codeText }}
                        >
                          {item.code}
                        </span>
                        <span className="text-[14px] font-bold text-[#111c2c]">
                          {item.title}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[12px] leading-[17px] text-[#3e4948]">
                            <span className="mt-[5px] w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: domain.headerBg }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className="bg-white rounded-xl border border-[#bec9c7] p-6 mb-8">
            <h3 className="text-[16px] font-bold text-[#111c2c] mb-1">GAINS Rating Scale</h3>
            <p className="text-[12px] text-[#6e7978] mb-6">
              Standardized scoring definitions used for every ACE criterion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {GAINS_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-start gap-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: opt.color, color: opt.textColor }}
                  >
                    {opt.letter}
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-[#111c2c]">{opt.label}</p>
                    <p className="text-[12px] leading-[18px] text-[#3e4948]">{opt.definition}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#bec9c7]">
              <p className="text-[11px] italic text-[#6e7978]">
                Note: All ratings must be accompanied by specific ACE observation notes for audit
                transparency.
              </p>
            </div>
          </section>

          <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#6e7978] border-t border-[#bec9c7] pt-6">
            <div className="flex items-center gap-1.5">
              <span className="mx-2">|</span>
              <span>↑</span>
              <span>V 1.0.0</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
