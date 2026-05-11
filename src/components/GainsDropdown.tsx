"use client"

import { ChevronDown } from "lucide-react"
import { GAINS_OPTIONS } from "@/utils/gainsOptions"
import type { GainsRating } from "@/types/evaluation"

interface GainsDropdownProps {
  value: GainsRating | ""
  onChange: (value: GainsRating | "") => void
  accentColor: string
  hasError?: boolean
  id?: string
}

export const GainsDropdown = ({
  value,
  onChange,
  accentColor,
  hasError,
  id,
}: GainsDropdownProps) => {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as GainsRating | "")}
        className={`w-full h-11 px-4 pr-10 bg-[#f0f3ff] border rounded-lg appearance-none text-[#111c2c] text-[14px] leading-[20px] focus:outline-none focus:ring-2 transition-all cursor-pointer ${
          hasError
            ? "border-[#ba1a1a] focus:ring-[#ba1a1a]"
            : `border-[#bec9c7] focus:ring-[${accentColor}] focus:border-[${accentColor}]`
        }`}
        style={
          !hasError
            ? ({
                "--tw-ring-color": accentColor,
              } as React.CSSProperties)
            : undefined
        }
      >
        <option value="" hidden></option>
        {GAINS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6e7978]"
      />
    </div>
  )
}
