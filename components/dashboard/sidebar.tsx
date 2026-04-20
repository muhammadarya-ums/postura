"use client"

import { useState, useEffect } from "react" // Tambah useEffect
import { cn } from "@/app/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { supabase } from "@/app/lib/supabaseClient" // Import supabase
import { 
  LayoutDashboard, 
  History, 
  Dumbbell, 
  Bell,
  ChevronLeft,
  Activity,
  User 
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "history", label: "History", icon: History, href: "/dashboard/history" },
  { id: "exercises", label: "Exercises", icon: Dumbbell, href: "/dashboard/exercises" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null) // State untuk cek user login
  const pathname = usePathname()

  // Ambil data user saat komponen dimuat
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen fixed left-0 top-0 z-50",
        "glass transition-all duration-300 ease-out",
        collapsed ? "w-20" : "w-72"
      )}
      style={{
        background: "linear-gradient(180deg, rgba(14, 51, 114, 0.98) 0%, rgba(14, 51, 114, 0.98) 100%)" 
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-sidebar-border">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Activity className="w-6 h-6 text-sidebar-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-sidebar" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-xl font-bold text-sidebar-foreground tracking-tight">PostuRa</span>
            <span className="text-xs text-sidebar-foreground/50 font-medium">Smart Posture Care</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || activeTab === item.id
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200",
                "hover:bg-sidebar-accent/60",
                isActive 
                  ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-sidebar-foreground shadow-lg shadow-blue-500/10" 
                  : "text-sidebar-foreground/60"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30" 
                  : "bg-sidebar-accent/40"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                )} />
              </div>
              {!collapsed && (
                <span className={cn(
                  "font-semibold text-sm",
                  isActive ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                )}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}

        {/* Menu Profile dalam list (Hanya jika login) */}
        {user && (
          <Link
            href="/dashboard/profile"
            onClick={() => setActiveTab("profile")}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 hover:bg-sidebar-accent/60",
              pathname === "/dashboard/profile" ? "text-sidebar-foreground" : "text-sidebar-foreground/60"
            )}
          >
            <div className={cn("p-2 rounded-xl bg-sidebar-accent/40", pathname === "/dashboard/profile" && "bg-blue-600")}>
              <User className="w-5 h-5" />
            </div>
            {!collapsed && <span className="font-semibold text-sm">Profile</span>}
          </Link>
        )}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-all duration-200"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", collapsed && "rotate-180")} />
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>

      {/* User Profile Card (Hanya jika login) */}
      {user && (
        <div
          href="/dashboard/profile"
          onClick={() => setActiveTab('profile')}
          className={cn(
            "p-4 mx-4 mb-4 rounded-2xl border transition-all duration-200 group",
            pathname === "/dashboard/profile"
              ? "bg-blue-600/20 border-blue-500/30"
              : "bg-sidebar-accent/30 border-sidebar-border hover:bg-sidebar-accent/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-sidebar-foreground font-bold text-sm">
              {user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || "US"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user.user_metadata?.full_name || "User Postura"}
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">Premium User</p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  )
} 