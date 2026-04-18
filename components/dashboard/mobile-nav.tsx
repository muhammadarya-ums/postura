"use client"

import { cn } from "@/app/lib/utils"
import {
  LayoutDashboard,
  History,
  Dumbbell,
  Bell
} from "lucide-react"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "history", label: "History", icon: History },
  { id: "exercises", label: "Exercises", icon: Dumbbell },
  { id: "notifications", label: "Alerts", icon: Bell },
]

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-2"
      style={{
        background: "linear-gradient(to top, rgba(10, 22, 40, 0.98) 60%, transparent)"
      }}
    >
      <div
        className="flex items-center justify-around py-3 px-2 rounded-3xl"
        style={{
          background: "rgba(15, 25, 45, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.3)"
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-blue-500/20"
                  : "hover:bg-sidebar-accent/30"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30" 
                  : ""
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/60"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-semibold",
                isActive ? "text-sidebar-foreground" : "text-sidebar-foreground/50"
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
