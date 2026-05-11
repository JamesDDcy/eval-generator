"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusSquare, BookOpen } from "lucide-react"

const NAV_ITEMS = [
  { href: "/", label: "Create Evaluation", icon: PlusSquare },
  { href: "/framework-guide", label: "Framework Guide", icon: BookOpen },
]

export const AppSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-[#f0f3ff] border-r border-[#bec9c7] w-64">
      <div className="p-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Image
            src="/medgrocer-square-logo.png"
            alt="MedGrocer Logo"
            width={40}
            height={40}
            className="object-contain rounded-lg"
          />
          <div>
            <h1 className="text-[16px] font-black text-[#005451] leading-tight">
              Supervisor Portal
            </h1>
            <p className="text-[12px] font-medium text-[#3e4948]">ACE Evaluation System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 mt-2 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg my-1 transition-all duration-200 text-[12px] font-bold ${
                isActive
                  ? "bg-[#b291fd] text-[#442189]"
                  : "text-[#3e4948] hover:bg-[#d8e3fa]/50"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#bec9c7]">
        <p className="text-[11px] text-[#6e7978] text-center">
          MedGrocer Internal ACE System v2.4
        </p>
      </div>
    </aside>
  )
}
