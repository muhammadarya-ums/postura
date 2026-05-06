"use client"

import { useState, useEffect, useRef } from "react"
import { supabase } from "../lib/supabaseClient"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { SensorCard } from "@/components/dashboard/sensor-card"
import { AnalyticsChart } from "@/components/dashboard/analytics-chart"
import { ExerciseCenter } from "@/components/dashboard/exercise-center"
import { NotificationLog } from "@/components/dashboard/notification-log"
import { HistoryView } from "@/components/dashboard/history-view"
import { ProfileView } from "@/components/dashboard/profile-view"
import { cn } from "@/app/lib/utils"
import { usePostureAI } from "@/hooks/usePostureAI";
import { Activity, Bluetooth, BluetoothConnected, Info } from "lucide-react"

// ... (EDUKASI_DATA dan SensorState tetap sama) ...
const EDUKASI_DATA: Record<string, any> = {
  "Tegak": { kategori: "Normal", exercise_website: ["peregangan-ringan", "yoga"], farmakologis: "Tidak memerlukan obat-obatan.", posisi_tubuh: "Pertahankan posisi telinga sejajar dengan bahu." },
  "Kifosis": { kategori: "Perhatian", exercise_website: ["chest-stretch", "wall-angels"], farmakologis: "Jika nyeri, kompres hangat pada punggung atas.", posisi_tubuh: "Busungkan dada dan tarik belikat ke arah belakang." },
  "Text Neck": { kategori: "Peringatan", exercise_website: ["chin-tucks", "neck-rotation"], farmakologis: "Istirahatkan leher setiap 20 menit dari gadget.", posisi_tubuh: "Angkat layar gadget hingga sejajar dengan mata." },
  "Lordosis": { kategori: "Perhatian", exercise_website: ["pelvic-tilt", "plank"], farmakologis: "Fokus pada penguatan otot inti (core).", posisi_tubuh: "Hindari berdiri terlalu lama dengan punggung melengkung." },
  "Slouching": { kategori: "Peringatan", exercise_website: ["shoulder-rolls", "back-extension"], farmakologis: "Lakukan mobilisasi tulang belakang secara rutin.", posisi_tubuh: "Duduk tegak dengan dukungan pada punggung bawah." }
};

interface SensorState {
  cervical: number;
  thoracic: number;
  lumbar: number;
  status: "DISCONNECTED" | "PAIRING..." | "CONNECTED";
  diagnosis: string;
  confidence: number;
  edukasi?: {
    exercise_website: string[];
    farmakologis: string;
    posisi_tubuh: string;
    kategori: string;
  };
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [user, setUser] = useState<any>(null) // Tambahkan state user
  const { prediction, predictPosture } = usePostureAI(); 
  const lastSavedTime = useRef<number>(0);
  
  const [sensorData, setSensorData] = useState<SensorState>({
    cervical: 0,
    thoracic: 0,
    lumbar: 0,
    status: "DISCONNECTED",
    diagnosis: "Waiting...",
    confidence: 0
  })
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchUser()
  }, [])

  // 2. FUNGSI LOGOUT (Dikirim ke ProfileView)
  const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    // Pake window.location biar state bener-bener bersih total
    window.location.href = "/";
  } catch (err) {
    console.error("Gagal logout:", err);
  }
};
  // 1. REALTIME SUBSCRIPTION (Mendengar perubahan dari Database)
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'riwayat_postur' },
        (payload) => {
          console.log('Data baru masuk ke DB:', payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const connectBLE = async () => {
    const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
    const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

    try {
      setSensorData(prev => ({ ...prev, status: "PAIRING..." }));
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [{ name: "POSTURA" }],
        optionalServices: [SERVICE_UUID]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

      await characteristic.startNotifications();
      setSensorData(prev => ({ ...prev, status: "CONNECTED" }));

      characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = new TextDecoder().decode(event.target.value);
        const parts = value.split(',');
        setSensorData(prev => ({
          ...prev,
          cervical: parseFloat(parts[0]) || 0,
          thoracic: parseFloat(parts[1]) || 0,
          lumbar: parseFloat(parts[2]) || 0,
        }));
      });
    } catch (error) {
      setSensorData(prev => ({ ...prev, status: "DISCONNECTED" }));
    }
  };

  // 2. LOGIC AI & AUTO-SAVE KE SUPABASE
  useEffect(() => {
    if (sensorData.status !== "CONNECTED") return;

    // Jalankan prediksi
    predictPosture(sensorData.cervical, sensorData.thoracic, sensorData.lumbar);
    const infoEdukasi = EDUKASI_DATA[prediction];

    setSensorData(prev => ({
      ...prev,
      diagnosis: prediction,
      edukasi: infoEdukasi || prev.edukasi
    }));

    // --- LOGIKA AUTO-SAVE KE DATABASE ---
    const now = Date.now();
    // Simpan hanya jika sudah lewat 10 detik dari penyimpanan terakhir
    if (now - lastSavedTime.current > 10000 && prediction !== "Waiting...") {
      const saveLog = async () => {
        const { error } = await supabase
          .from('riwayat_postur')
          .insert([{
            angle_cervical: sensorData.cervical,
            angle_thoracic: sensorData.thoracic,
            angle_lumbar: sensorData.lumbar,
            hasil_diagnosa: prediction,
            saran_latihan: infoEdukasi?.exercise_website?.[0] || "General Stretch"
          }]);
        
        if (!error) {
          lastSavedTime.current = now;
          console.log("Riwayat berhasil disimpan!");
        }
      };
      saveLog();
    }
  }, [sensorData.cervical, sensorData.thoracic, sensorData.lumbar, prediction, sensorData.status]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className={cn("min-h-screen transition-all duration-300", "lg:pl-72 pb-24 lg:pb-8")}>
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-4 flex justify-between">
            <h1 className="text-xl font-bold italic text-blue-600">POSTURA.AI</h1>
            <button 
              onClick={connectBLE}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                sensorData.status === "CONNECTED" ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500 text-white shadow-lg"
              )}
            >
              {sensorData.status === "CONNECTED" ? <BluetoothConnected className="w-4 h-4" /> : <Bluetooth className="w-4 h-4" />}
              <span>{sensorData.status === "CONNECTED" ? "Connected" : "Connect Sensor"}</span>
            </button>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === "dashboard" && <DashboardContent data={sensorData} />}
          {activeTab === "history" && <HistoryView />}
          {activeTab === "exercises" && <ExerciseCenter />}
          {activeTab === "notifications" && <NotificationLog />}
          {activeTab === "profile" && (
  <ProfileView user={user} onLogout={handleLogout} />
)}
        </div>
      </main>
    </div>
  )
}

// ... (Sub-komponen DashboardContent tetap sama seperti milikmu) ...
function DashboardContent({ data }: { data: SensorState }) {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="opacity-80 text-sm font-bold uppercase tracking-wider">Hasil Analisis AI</p>
          <h2 className="text-4xl font-black mt-1 uppercase">
            {data.status === "CONNECTED" ? data.diagnosis : "SENSOR DISCONNECTED"}
          </h2>
          {data.edukasi?.kategori && (
            <div className="mt-2 inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/30">
              Tingkat: {data.edukasi.kategori}
            </div>
          )}
        </div>
        <Activity className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SensorCard title="Cervical" location="Neck" sensorId="s1" icon={<Activity className="w-5 h-5"/>} color="#3b82f6" baseAngle={0} manualAngle={data.cervical} />
        <SensorCard title="Thoracic" location="Mid-Back" sensorId="s2" icon={<Activity className="w-5 h-5"/>} color="#8b5cf6" baseAngle={0} manualAngle={data.thoracic} />
        <SensorCard title="Lumbar" location="Lower-Back" sensorId="s3" icon={<Activity className="w-5 h-5"/>} color="#06b6d4" baseAngle={0} manualAngle={data.lumbar} />
      </div>

      {data.status === "CONNECTED" && data.edukasi && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" /> 
              Latihan Khusus Untukmu
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {data.edukasi.exercise_website.map((ex) => (
                <div key={ex} className="p-3 bg-secondary/50 border border-border rounded-xl text-center">
                  <p className="text-sm font-bold capitalize">{ex.replace("-", " ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Saran Medis & Postur
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <p className="text-[10px] font-black text-amber-600 uppercase">Farmakologis:</p>
                <p className="text-sm">{data.edukasi.farmakologis}</p>
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-[10px] font-black text-blue-600 uppercase">Anjuran Posisi:</p>
                <p className="text-xs italic">{data.edukasi.posisi_tubuh}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnalyticsChart />
    </div>
  )
}