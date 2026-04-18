"use client"

import { cn } from "@/app/lib/utils"
import { Play, Clock, Flame, ChevronRight } from "lucide-react"

const exercises = [
  {
    id: 1,
    name: "Neck Stretches",
    description: "Gentle tilts and rotations for cervical relief",
    duration: "5 min",
    calories: 15,
    difficulty: "Easy",
    color: "#3b82f6",
    bgGradient: "from-blue-500/10 to-blue-600/5"
  },
  {
    id: 2,
    name: "Cat-Cow Pose",
    description: "Spinal flexion and extension exercise",
    duration: "8 min",
    calories: 25,
    difficulty: "Easy",
    color: "#8b5cf6",
    bgGradient: "from-violet-500/10 to-violet-600/5"
  },
  {
    id: 3,
    name: "Thoracic Rotation",
    description: "Mid-back mobility improvement routine",
    duration: "10 min",
    calories: 30,
    difficulty: "Medium",
    color: "#06b6d4",
    bgGradient: "from-cyan-500/10 to-cyan-600/5"
  },
  {
    id: 4,
    name: "Lower Back Relief",
    description: "Targeted stretches for lumbar support",
    duration: "12 min",
    calories: 35,
    difficulty: "Medium",
    color: "#10b981",
    bgGradient: "from-emerald-500/10 to-emerald-600/5"
  },
  {
    id: 5,
    name: "Posture Reset",
    description: "Full spine alignment correction routine",
    duration: "15 min",
    calories: 45,
    difficulty: "Hard",
    color: "#f59e0b",
    bgGradient: "from-amber-500/10 to-amber-600/5"
  },
  {
    id: 6,
    name: "Desk Break",
    description: "Quick exercises for office workers",
    duration: "3 min",
    calories: 10,
    difficulty: "Easy",
    color: "#ec4899",
    bgGradient: "from-pink-500/10 to-pink-600/5"
  }
]

export function ExerciseCenter() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Exercise Center</h2>
          <p className="text-muted-foreground">Recommended stretches based on your posture data</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-primary font-semibold hover:underline">
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className={cn(
              "glass-card rounded-3xl p-5 group hover:shadow-xl transition-all duration-300 cursor-pointer",
              `bg-gradient-to-br ${exercise.bgGradient}`
            )}
          >
            {/* Exercise Icon */}
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${exercise.color}20` }}
            >
              <div 
                className="w-6 h-6 rounded-lg"
                style={{ backgroundColor: exercise.color }}
              />
            </div>

            {/* Exercise Info */}
            <h3 className="font-bold text-foreground mb-1 text-balance">{exercise.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{exercise.description}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">{exercise.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-medium">{exercise.calories} cal</span>
              </div>
            </div>

            {/* Difficulty Badge & Start Button */}
            <div className="flex items-center justify-between">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold",
                exercise.difficulty === "Easy" && "bg-emerald-500/10 text-emerald-600",
                exercise.difficulty === "Medium" && "bg-amber-500/10 text-amber-600",
                exercise.difficulty === "Hard" && "bg-red-500/10 text-red-600"
              )}>
                {exercise.difficulty}
              </span>
              
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 group-hover:shadow-lg"
                style={{ 
                  backgroundColor: exercise.color,
                  color: '#fff'
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                Start
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
