'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Handle login
    }, 1000)
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Handle registration
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Branding & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Postura.ai</h2>
            <div className="h-1 w-16 bg-emerald-500 rounded-full mt-3"></div>
          </div>

          {/* Value Proposition */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Pantau Kesehatan Tulang Belakang Anda</h3>
              <p className="text-lg text-blue-100 leading-relaxed">
                Dengan presisi AI, teknologi kami membantu Anda mendeteksi gangguan postur lebih awal dan mendapatkan panduan kesehatan yang dipersonalisasi.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-8 border-t border-blue-700/50">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Analisis Real-Time</p>
                  <p className="text-sm text-blue-200">Dapatkan hasil deteksi postur secara instan dengan AI canggih</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Riwayat Terlacak</p>
                  <p className="text-sm text-blue-200">Simpan dan pantau perkembangan kesehatan tulang belakang Anda</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Saran Medis Terpersonalisasi</p>
                  <p className="text-sm text-blue-200">Terima rekomendasi kesehatan yang disesuaikan dengan kebutuhan Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="relative z-10 text-sm text-blue-200">
          <p>© 2024 Postura.ai. Memajukan kesehatan tulang belakang melalui teknologi AI.</p>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">Postura.ai</h2>
            <p className="text-gray-600 text-sm">Pantau kesehatan tulang belakang Anda dengan presisi AI</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('login')}
                className={`pb-4 px-2 font-semibold transition-all duration-200 relative ${
                  activeTab === 'login'
                    ? 'text-blue-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Masuk
                {activeTab === 'login' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`pb-4 px-2 font-semibold transition-all duration-200 relative ${
                  activeTab === 'register'
                    ? 'text-blue-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Daftar
                {activeTab === 'register' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            </div>

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan password Anda"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-500" />
                    <span className="text-gray-600">Ingat saya</span>
                  </label>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Lupa password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Masuk
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600">
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Daftar sekarang
                  </button>
                </p>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="Masukkan nama Anda"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Buat password yang kuat"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-500 mt-1 flex-shrink-0" required />
                  <span className="text-sm text-gray-600">
                    Saya setuju dengan{' '}
                    <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Syarat Layanan
                    </a>{' '}
                    dan{' '}
                    <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Kebijakan Privasi
                    </a>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Daftar
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                  Sudah punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    Masuk sekarang
                  </button>
                </p>
              </form>
            )}

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500 font-medium">atau</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Guest Mode Section */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">
                Ingin mencoba tanpa membuat akun?
              </p>
              <Link
                href="/dashboard"
                className="w-full py-2.5 border-2 border-gray-300 hover:border-emerald-500 text-gray-900 hover:text-emerald-600 font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 hover:bg-emerald-50"
              >
                Coba Tanpa Akun (Guest Mode)
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 mt-8">
            Data Anda aman dan terenkripsi. Kami tidak akan pernah membagikan informasi Anda.
          </p>
        </div>
      </div>
    </div>
  )
}
