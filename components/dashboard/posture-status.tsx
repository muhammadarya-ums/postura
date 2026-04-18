"use client"

import { useEffect, useState } from "react"
import { cn } from "@/app/lib/utils"
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react"
import { db } from "@/app/lib/firebase" // Import db
import { ref, onValue } from "firebase/database"

export function PostureStatus() {
  const [isGoodPosture, setIsGoodPosture] = useState(true)
  const [score, setScore] = useState(100)

  useEffect(() => {
    const postureRef = ref(db, 'postura')

    const unsubscribe = onValue(postureRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const s1 = data.sensor_1?.angle || 0
        const s2 = data.sensor_2?.angle || 0
        const s3 = data.sensor_3?.angle || 0

        const threshold = 20
        const badSensors = [s1, s2, s3].filter(angle => Math.abs(angle) > threshold).length

        const isFine = badSensors === 0
        setIsGoodPosture(isFine)

        const newScore = 100 - (badSensors * 30)
        setScore(newScore)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 transition-all duration-500",
        isGoodPosture
          ? "bg-linear-to-br from-emerald-500/90 to-emerald-600/90"
          : "bg-linear-to-br from-red-500/90 to-red-600/90 shadow-lg shadow-red-500/20"
      )}
    >
      {/* ... (bagian Animated Background Pattern tetap sama) ... */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-card animate-pulse"
              style={{
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                top: `${10 + i * 15}%`,
                right: `${-10 + i * 8}%`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.3 - i * 0.04
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* 3D-like Spine Illustration */}
        <div className="relative">
          <div className={cn(
            "w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center",
            "bg-card/20 backdrop-blur-sm border border-card/20 transition-all duration-500",
            isGoodPosture ? "" : "scale-110"
          )}>
            <svg viewBox="0 0 80 120" className="w-20 h-28 md:w-24 md:h-32">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g key={i} transform={`translate(0, ${i * 15})`}>
                  <ellipse
                    cx="40" cy="10" rx={18 - i * 0.5} ry="8"
                    fill="white"
                    className="transition-all duration-500"
                    style={{
                      transform: isGoodPosture
                        ? "translateX(0)"
                        : `translateX(${Math.sin(i * 1.5) * 6}px) rotate(${i * 2}deg)`
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="absolute -top-2 -right-2 bg-card rounded-2xl px-3 py-1.5 shadow-xl">
            <span className="text-lg font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            {isGoodPosture ? (
              <CheckCircle2 className="w-6 h-6 text-white" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
            )}
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {isGoodPosture ? "System Optimal" : "Action Required"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {isGoodPosture ? "Excellent Posture" : "Posture Alert!"}
          </h2>

          <p className="text-white/90 text-sm md:text-base mb-4">
            {isGoodPosture
              ? "Your spine alignment is optimal. Keep maintaining this position!"
              : "Warning: Slumping detected in one or more regions. Please sit up straight."
            }
          </p>

          {isGoodPosture && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Live Data Synchronized
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}