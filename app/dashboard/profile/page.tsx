'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation' // Tambahkan usePathname di sini
import { supabase } from '@/app/lib/supabaseClient'
import { ProfileView } from '@/components/dashboard/profile-view'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  // 1. SEMUA Hook di paling atas
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // 2. Definisi fungsi logic
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/') 
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  // 3. Return kondisional (HANYA BOLEH SATU di sini)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="w-10 h-10 text-blue-900 animate-spin" />
        <p className="text-sm font-medium text-gray-500">Menyiapkan profil Anda...</p>
      </div>
    )
  }

  // 4. Return utama (HANYA BOLEH SATU di sini)
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12">
      <ProfileView user={user} onLogout={handleLogout} />
    </div>
  )
}