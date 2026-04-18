"use client"

import { cn } from "@/app/lib/utils"
import { Calendar, TrendingUp, TrendingDown, Clock, Target } from "lucide-react"

const historyData = [
  { date: "Today", score: 92, goodHours: 6.5, totalHours: 8, trend: "up" },
  { date: "Yesterday", score: 87, goodHours: 5.8, totalHours: 8, trend: "up" },
  { date: "Jan 24", score: 78, goodHours: 4.2, totalHours: 7, trend: "down" },
  { date: "Jan 23", score: 85, goodHours: 5.5, totalHours: 8, trend: "up" },
  { date: "Jan 22", score: 82, goodHours: 5.0, totalHours: 7.5, trend: "same" },
  { date: "Jan 21", score: 90, goodHours: 6.2, totalHours: 8, trend: "up" },
  { date: "Jan 20", score: 75, goodHours: 3.8, totalHours: 6, trend: "down" },
]

const weeklyStats = {
  avgScore: 84,
  totalGoodHours: 37,
  improvement: 8,
  bestDay: "Today"
}

export function HistoryView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Posture History</h2>
          <p className="text-muted-foreground">Review your posture performance over time</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground font-medium hover:bg-accent transition-colors">
          <Calendar className="w-4 h-4" />
          This Week
        </button>
      </div>

      {/* Weekly Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Avg Score</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{weeklyStats.avgScore}</p>
          <p className="text-sm text-muted-foreground mt-1">out of 100</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-emerald-500/10">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Good Posture</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{weeklyStats.totalGoodHours}h</p>
          <p className="text-sm text-muted-foreground mt-1">this week</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Improvement</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">+{weeklyStats.improvement}%</p>
          <p className="text-sm text-muted-foreground mt-1">vs last week</p>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Best Day</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{weeklyStats.bestDay}</p>
          <p className="text-sm text-muted-foreground mt-1">92 score</p>
        </div>
      </div>

      {/* History List */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Daily Breakdown</h3>
        </div>
        <div className="divide-y divide-border">
          {historyData.map((day, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                  day.score >= 85 
                    ? "bg-emerald-500/10 text-emerald-600" 
                    : day.score >= 75 
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-red-500/10 text-red-600"
                )}>
                  {day.score}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{day.date}</p>
                  <p className="text-sm text-muted-foreground">
                    {day.goodHours}h good / {day.totalHours}h total
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Progress Bar */}
                <div className="hidden sm:block w-32">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all",
                        day.score >= 85 
                          ? "bg-emerald-500" 
                          : day.score >= 75 
                            ? "bg-amber-500"
                            : "bg-red-500"
                      )}
                      style={{ width: `${day.score}%` }}
                    />
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium",
                  day.trend === "up" && "bg-emerald-500/10 text-emerald-600",
                  day.trend === "down" && "bg-red-500/10 text-red-600",
                  day.trend === "same" && "bg-muted text-muted-foreground"
                )}>
                  {day.trend === "up" && <TrendingUp className="w-4 h-4" />}
                  {day.trend === "down" && <TrendingDown className="w-4 h-4" />}
                  {day.trend === "same" && <span>—</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
