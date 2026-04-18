"use client"

import { useState, useEffect } from "react" // Tambah useEffect
import { cn } from "@/app/lib/utils"
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

// Fungsi generate tetap di luar
const generateData = () => {
  const times = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"]
  return times.map((time) => ({
    time,
    neck: Math.floor(Math.random() * 20) + 5,
    midBack: Math.floor(Math.random() * 15) + 8,
    lowerBack: Math.floor(Math.random() * 18) + 10,
    score: Math.floor(Math.random() * 25) + 75
  }))
}

const periods = ["Today", "Week", "Month"]

export function AnalyticsChart() {
  const [activePeriod, setActivePeriod] = useState("Today")
  const [hoveredData, setHoveredData] = useState<any>(null)
  
  // SOLUSI HYDRATION: Simpan data di state
  const [chartData, setChartData] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Data baru dibuat setelah komponen muncul di browser (client)
    setChartData(generateData())
    setMounted(true)
  }, [])

  // Hitung rata-rata hanya jika data sudah ada
  const avgScore = chartData.length > 0 
    ? Math.round(chartData.reduce((a, b) => a + b.score, 0) / chartData.length) 
    : 0
    
  const isImproving = avgScore >= 85

  // Jika belum mounted, tampilkan placeholder kosong agar tidak bentrok dengan server
  if (!mounted) {
    return <div className="glass-card rounded-3xl p-6 h-[400px] animate-pulse bg-muted/20" />
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Spinal Movement Trends</h3>
          <p className="text-sm text-muted-foreground">Track your posture patterns over time</p>
        </div>
        
        <div className="flex items-center gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                activePeriod === period
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">Avg Score</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-foreground">{avgScore}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">Good Posture</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-emerald-600">78%</span>
          </div>
        </div>
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">Peak Hours</p>
          <span className="text-lg font-bold text-foreground">10AM-2PM</span>
        </div>
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground font-medium mb-1">Trend</p>
          <div className="flex items-center gap-1.5">
            {isImproving ? (
              <>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span className="text-lg font-bold text-emerald-600">+5%</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span className="text-lg font-bold text-red-600">-3%</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData} // Pakai chartData dari state
            onMouseMove={(e: any) => {
              if (e.activePayload) {
                setHoveredData(e.activePayload[0]?.payload)
              }
            }}
            onMouseLeave={() => setHoveredData(null)}
          >
            <defs>
              <linearGradient id="neckGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="midBackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lowerBackGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(100, 116, 139, 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              dx={-10}
              domain={[0, 40]}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip 
              content={({ active, payload }: any) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-xl p-3 shadow-xl">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        {payload[0]?.payload?.time}
                      </p>
                      {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-muted-foreground">{entry.name}:</span>
                          <span className="font-medium text-foreground">{entry.value}°</span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="neck"
              name="Neck"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#neckGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="midBack"
              name="Mid-Back"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#midBackGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="lowerBack"
              name="Lower-Back"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#lowerBackGradient)"
              dot={false}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-muted-foreground">Neck</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-sm text-muted-foreground">Mid-Back</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-sm text-muted-foreground">Lower-Back</span>
        </div>
      </div>
    </div>
  )
}