'use client'

import { User, Mail, Shield, LogOut, ArrowLeft, Camera, Edit2 } from 'lucide-react'
import Link from 'next/link'

interface ProfileViewProps {
  user: any;
  onLogout: () => void;
}

export function ProfileView({ user, onLogout }: ProfileViewProps) {
  return (
    // Tambah pb-32 supaya konten tidak terhalang MobileNav di iPhone
    <div className="max-w-3xl mx-auto pb-32"> 
      {/* Tombol Kembali */}
      <Link 
        href="/dashboard" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-900 mb-6 transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
        Kembali ke Dashboard
      </Link>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-40 bg-linear-to-r from-blue-900 via-blue-800 to-indigo-900 relative">
          <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="px-8 pb-10">
          {/* Avatar & Info Utama */}
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center border-[6px] border-white">
                <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-blue-900">
                  <User className="w-16 h-16" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-blue-900 text-white rounded-xl border-4 border-white hover:scale-110 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {user?.user_metadata?.full_name || 'User Postura'}
            </h1>
            {/* Gue sesuaikan sedikit infonya biar sesuai profil kamu */}
            <p className="text-gray-500 font-medium">Informatics Student • Universitas Muhammadiyah</p>
          </div>

          {/* Grid Informasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-50 transition">
                  <Mail className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Alamat Email</p>
                  <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="group p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 hover:bg-white transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-emerald-50 transition">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Status Keamanan</p>
                  <p className="text-sm font-semibold text-emerald-600">Akun Terverifikasi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* Tambah relative z-20 agar tombol diprioritaskan saat diklik */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 relative z-20"> 
            <button className="flex-1 py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition active:scale-95">
              Edit Profil
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
              className="px-8 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition flex items-center justify-center gap-2 active:scale-95 touch-manipulation"
            >
              <LogOut className="w-5 h-5" /> Keluar
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-center text-xs text-gray-400 uppercase tracking-tighter">
        Postura.ai Security System v1.0
      </p>
    </div>
  )
}