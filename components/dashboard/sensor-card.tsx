"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/app/lib/utils"
import { db } from "@/app/lib/firebase"
import { ref, onValue } from "firebase/database"

interface SensorCardProps {
  title: string
  location: string
  icon: React.ReactNode
  color: string
  baseAngle: number
  sensorId: string
  manualAngle?: number
}

export function SensorCard({ title, location, icon, color, baseAngle, sensorId, manualAngle }: SensorCardProps) {
  const [firebaseAngle, setFirebaseAngle] = useState(baseAngle)
  const [isGood, setIsGood] = useState(true)


  const angle = manualAngle !== undefined ? manualAngle : firebaseAngle

  useEffect(() => {

    const sensorRef = ref(db, `postura/${sensorId}/angle`)
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const val = snapshot.val()
      if (val !== null && manualAngle === undefined) { // Cek manualAngle
        setFirebaseAngle(Number(val))
      }
    })
    return () => unsubscribe()
  }, [sensorId, manualAngle])

  useEffect(() => {
    setIsGood(Math.abs(angle) < 20)
  }, [angle])


  const normalizedAngle = Math.min(Math.max(angle, -45), 45)
  const gaugeRotation = (normalizedAngle / 45) * 90

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
      {/* Background Glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-30"
        style={{ background: color }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{location}</p>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
        </div>
        <div 
          className="p-3 rounded-2xl"
          style={{ background: `${color}20` }}
        >
          <div style={{ color }}>
            {icon}
          </div>
        </div>
      </div>

      {/* Gauge Visualization */}
      <div className="relative flex items-center justify-center mb-6">
        <svg 
          viewBox="0 0 120 80" 
          className="w-full max-w-50"
        >
          <path
            d="M 15 70 A 50 50 0 0 1 105 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-muted/30"
          />
          <path
            d="M 15 70 A 50 50 0 0 1 105 70"
            fill="none"
            stroke={isGood ? "#22c55e" : "#dc2626"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="140"
            strokeDashoffset={140 - (140 * ((normalizedAngle + 45) / 90))}
            className="transition-all duration-500"
          />
          <circle cx="60" cy="70" r="6" fill={color} />
          <line
            x1="60"
            y1="70"
            x2="60"
            y2="30"
            stroke={isGood ? "#22c55e" : "#dc2626"}
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transformOrigin: "60px 70px",
              transform: `rotate(${gaugeRotation}deg)`,
              transition: "transform 0.5s ease-out"
            }}
          />
        </svg>
      </div>

      {/* Angle Display */}
      <div className="text-center relative z-10">
        <div className="inline-flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground tabular-nums">
            {angle.toFixed(1)}
          </span>
          <span className="text-lg text-muted-foreground">°</span>
        </div>
        <div className="mt-2">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
            isGood 
              ? "bg-emerald-500/10 text-emerald-600" 
              : "bg-red-500/10 text-red-600"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              isGood ? "bg-emerald-500" : "bg-red-500"
            )} />
            {isGood ? "Normal Range" : "Needs Correction"}
          </span>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] font-semibold text-muted-foreground uppercase">Live</span>
      </div>
    </div>
  )
}