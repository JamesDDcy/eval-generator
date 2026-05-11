"use client"

import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react"
import type { ToastVariant } from "@/components/ToastProvider"

interface ToastProps {
  message: string
  variant: ToastVariant
  onDismiss: () => void
}

const VARIANT_STYLES: Record<ToastVariant, { bg: string; border: string; icon: React.ReactNode }> =
  {
    success: {
      bg: "bg-[#005451] text-white",
      border: "border-[#84d4cf]",
      icon: <CheckCircle size={18} className="shrink-0" />,
    },
    error: {
      bg: "bg-[#ba1a1a] text-white",
      border: "border-[#ffdad6]",
      icon: <AlertCircle size={18} className="shrink-0" />,
    },
    warning: {
      bg: "bg-[#e65100] text-white",
      border: "border-[#ffdcbe]",
      icon: <AlertTriangle size={18} className="shrink-0" />,
    },
  }

export const Toast = ({ message, variant, onDismiss }: ToastProps) => {
  const styles = VARIANT_STYLES[variant]
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles.bg} ${styles.border} animate-in slide-in-from-right-4 duration-300`}
      role="alert"
    >
      {styles.icon}
      <p className="flex-1 text-sm font-medium leading-snug whitespace-pre-line">{message}</p>
      <button
        onClick={onDismiss}
        className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}
