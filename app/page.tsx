'use client'

import { Activity, Weight, Zap, CheckCircle2, ArrowRight, Menu, X, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from './lib/supabaseClient'

export default function LandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null)
  const [loading, setLoading] = useState(false)

  // State Form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  // Fungsi Handle Auth (Login & Register)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (authMode === 'register') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      if (error) alert(error.message)
      else alert("Pendaftaran berhasil! Silakan cek email konfirmasi Anda.")
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        alert("Gagal login: " + error.message)
      } else {
        router.push('/dashboard')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Auth Modal Overlay - Tambahan Baru */}
      {authMode && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-blue-900/20 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
            <button
              onClick={() => setAuthMode(null)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                {authMode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                {authMode === 'login'
                  ? 'Masuk untuk mengakses riwayat kesehatan tulang belakang Anda.' 
                  : 'Daftar untuk mulai memantau postur tubuh dengan AI.'}
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (authMode === 'login' ? 'Masuk' : 'Daftar Sekarang')}
                </button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-sm text-gray-600 hover:text-blue-900 transition"
                >
                  {authMode === 'login' ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Atau</span></div>
                </div>
                <Link href="/dashboard" className="block text-sm font-bold text-emerald-600 hover:text-emerald-700 transition">
                  Lanjut sebagai Tamu (Guest Mode) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-900">Postura.ai</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#causes" className="text-sm text-gray-600 hover:text-gray-900 transition">Tentang</a>
            {/* Navigasi diubah agar memicu Modal */}
            <button onClick={() => setAuthMode('login')} className="text-sm font-semibold text-blue-900 hover:text-blue-700 transition">
              Masuk
            </button>
            <button onClick={() => setAuthMode('register')} className="px-5 py-2 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition">
              Mulai Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              <a href="#causes" className="block text-sm text-gray-600">Tentang</a>
              <button onClick={() => {setAuthMode('login'); setMobileMenuOpen(false)}} className="block w-full text-left text-sm text-blue-900 font-semibold">Masuk</button>
              <button onClick={() => {setAuthMode('register'); setMobileMenuOpen(false)}} className="block w-full text-left text-sm text-blue-900 font-semibold">Mulai Sekarang</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Deteksi Postur Bertenaga AI
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6">
            Deteksi Gangguan Tulang Belakang <span className="text-blue-900">Sebelum Menjadi</span> Serius
          </h1>

          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-10">
            Pantauan postur bertenaga AI yang canggih untuk mendeteksi skoliosis, kifosis, dan lordosis lebih awal. Lindungi kesehatan tulang belakang Anda dengan analisis real-time dan panduan yang dipersonalisasi.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button onClick={() => setAuthMode('register')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-200">
              Mulai Sekarang <ArrowRight className="w-4 h-4" />
            </button>
            <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition duration-200">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Gangguan Tulang Belakang Mempengaruhi Jutaan Orang di Indonesia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="rounded-2xl bg-white border border-gray-200 p-6 hover:border-blue-900 hover:shadow-lg transition duration-300">
              <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><Activity className="w-6 h-6 text-blue-900" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Skoliosis</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">3-5%</p>
              <p className="text-sm text-gray-600">Populasi Indonesia yang terkena kelengkungan tulang belakang</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-6 hover:border-emerald-600 hover:shadow-lg transition duration-300">
              <div className="mb-4 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center"><Zap className="w-6 h-6 text-emerald-600" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Lordosis</h3>
              <p className="text-3xl font-bold text-emerald-600 mb-2">12-18%</p>
              <p className="text-sm text-gray-600">Mengalami kurva tulang belakang yang berlebihan ke dalam</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-6 hover:border-blue-900 hover:shadow-lg transition duration-300">
              <div className="mb-4 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"><Activity className="w-6 h-6 text-blue-900" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Kifosis</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">20-40%</p>
              <p className="text-sm text-gray-600">Mengalami kurva dada berlebihan ke luar</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-6 hover:border-emerald-600 hover:shadow-lg transition duration-300">
              <div className="mb-4 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-emerald-600" /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Deteksi Dini</h3>
              <p className="text-3xl font-bold text-emerald-600 mb-2">80%</p>
              <p className="text-sm text-gray-600">Hasil lebih baik dengan pemantauan pencegahan</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <p className="text-sm text-gray-600 mb-3 font-medium">Dampak Pencegahan</p>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-linear-to-r from-blue-900 to-emerald-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-gray-600">65% kasus dapat dicegah dengan intervensi dini dan manajemen postur yang tepat</p>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section id="causes" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Penyebab Umum Gangguan Tulang Belakang</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Memahami akar penyebab membantu Anda mengambil tindakan pencegahan.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white border border-gray-200 p-8 hover:border-blue-900 hover:shadow-lg transition duration-300">
              <div className="mb-6 w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center"><Activity className="w-8 h-8 text-blue-900" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Postur Buruk</h3>
              <p className="text-gray-700 mb-4 text-sm">Duduk lama dan ergonomi yang buruk membuat tulang belakang tegang.</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-8 hover:border-emerald-600 hover:shadow-lg transition duration-300">
              <div className="mb-6 w-16 h-16 rounded-xl bg-emerald-100 flex items-center justify-center"><Weight className="w-8 h-8 text-emerald-600" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beban Berat</h3>
              <p className="text-gray-700 mb-4 text-sm">Membawa ransel berat memberikan tekanan konstan pada tulang belakang.</p>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-8 hover:border-blue-900 hover:shadow-lg transition duration-300">
              <div className="mb-6 w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center"><Zap className="w-8 h-8 text-blue-900" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Genetika</h3>
              <p className="text-gray-700 mb-4 text-sm">Riwayat keluarga memainkan peran penting dalam kesehatan tulang belakang.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Section (CTA) */}
      <section id="cta" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Mulai Pantau Postur Anda Hari Ini</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            <div className="relative rounded-2xl bg-linear-to-br from-blue-50 to-emerald-50 border-2 border-blue-900 p-8 md:p-10 hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pengalaman Terpersonalisasi</h3>
              <p className="text-gray-700 mb-6 text-sm">Simpan riwayat dan dapatkan saran AI medis.</p>
              <p className="text-gray-700 mb-6 text-sm">
                Buat akun untuk menyimpan riwayat postur Anda, melacak kemajuan dari waktu ke waktu, dan menerima saran medis yang disesuaikan dari sistem AI kami.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Simpan riwayat postur</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Lacak kemajuan & tren</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Rekomendasi terpersonalisasi</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Laporan & wawasan medis</span>
                </li>
              </ul>
              <button onClick={() => setAuthMode('register')} className="w-full px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-200">
                Buat Akun / Masuk
              </button>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-8 md:p-10 hover:border-emerald-600 hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Scan Cepat</h3>
              <p className="text-gray-700 mb-6 text-sm">Coba fitur deteksi segera tanpa akun.</p>
              <p className="text-gray-700 mb-6 text-sm">
                Buat akun untuk menyimpan riwayat postur Anda, melacak kemajuan dari waktu ke waktu, dan menerima saran medis yang disesuaikan dari sistem AI kami.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Simpan riwayat postur</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Lacak kemajuan & tren</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Rekomendasi terpersonalisasi</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Laporan & wawasan medis</span>
                </li>
              </ul>
              <Link href="/dashboard" className="block w-full px-6 py-3 bg-white border border-blue-900 text-blue-900 text-center font-semibold rounded-lg hover:bg-blue-50 transition duration-200">
                Ke Dashboard (Guest Mode)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-600">
        <p>© 2026 Postura.ai. Memajukan kesehatan tulang belakang melalui teknologi AI.</p>
      </footer>
    </div>
  )
}