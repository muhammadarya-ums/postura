"use client"

import { useState, useEffect } from "react" // Tambah ini
import { supabase } from "@/app/lib/supabaseClient" // Tambah ini
import { cn } from "@/app/lib/utils"
import {
  LayoutDashboard,
  History,
  Dumbbell,
  Bell,
  User // Tambah icon User
} from "lucide-react"

interface MobileNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

// Tambahkan Profile ke dalam navItems
const navItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "history", label: "History", icon: History },
  { id: "exercises", label: "Exercises", icon: Dumbbell },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "profile", label: "Profile", icon: User }, // Ini yang bikin muncul di iPhone
]

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const [user, setUser] = useState<any>(null)

  // Ambil data user buat nampilin inisial/foto kalau perlu
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-2 pb-4 pt-2"
      style={{
        background: "linear-gradient(to top, rgba(10, 22, 40, 0.98) 60%, transparent)"
      }}
    >
      <div
        className="pointer-events-auto flex items-center justify-between py-2 px-1 rounded-3xl"
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
          
          // Logika khusus buat icon Profile (pakai inisial kalau login)
          const isProfile = item.id === "profile" && user

          return (
  <button
    key={item.id}
    onClick={() => setActiveTab(item.id)}
    className={cn(
      "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 flex-1",
      isActive
        ? "bg-blue-500/10"
        : "active:bg-white/5" // Tambah feedback saat disentuh di HP
    )}
  >
    <div className={cn(
      "p-2 rounded-xl transition-all duration-200",
      isActive
        ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30" 
        : "bg-white/5" // Kasih sedikit background biar icon nggak melayang di kegelapan
    )}>
      {isProfile && isActive ? (
        <span className="text-[10px] font-bold text-white">
          {user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "US"}
        </span>
      ) : (
        <Icon className={cn(
          "w-5 h-5 transition-colors",
          // UBAH DI SINI: Dari /60 jadi /80 atau langsung putih
          isActive ? "text-white" : "text-white/80" 
        )} />
      )}
    </div>
    <span className={cn(
      "text-[9px] font-semibold transition-colors",
      // UBAH DI SINI: Dari /50 jadi /70 biar lebih terbaca
      isActive ? "text-blue-400" : "text-white/70" 
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