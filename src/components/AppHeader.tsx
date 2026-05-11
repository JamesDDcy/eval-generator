"use client"

interface AppHeaderProps {
  title?: string
}

export const AppHeader = ({ title = "Performance Evaluation" }: AppHeaderProps) => {
  return (
    <header className="flex items-center px-10 h-16 w-[calc(100%-16rem)] ml-64 fixed top-0 z-50 bg-white border-b border-[#bec9c7]">
      <span className="text-[24px] leading-[32px] font-bold tracking-tight text-[#005451]">
        {title}
      </span>
    </header>
  )
}
