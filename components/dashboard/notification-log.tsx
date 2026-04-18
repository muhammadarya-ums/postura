"use client"

import { cn } from "@/app/lib/utils"
import { AlertTriangle, CheckCircle2, Info, Bell, ChevronRight, Clock } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Poor posture detected",
    message: "Your neck angle exceeded 20° for 15 minutes",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    type: "success",
    title: "Posture milestone achieved",
    message: "You maintained good posture for 2 consecutive hours!",
    time: "45 min ago",
    read: false
  },
  {
    id: 3,
    type: "info",
    title: "Exercise reminder",
    message: "Time for your scheduled neck stretches routine",
    time: "1 hour ago",
    read: true
  },
  {
    id: 4,
    type: "warning",
    title: "Lower back strain alert",
    message: "Detected unusual lower back curvature pattern",
    time: "2 hours ago",
    read: true
  },
  {
    id: 5,
    type: "success",
    title: "Weekly goal completed",
    message: "You've achieved 85% good posture this week",
    time: "5 hours ago",
    read: true
  },
  {
    id: 6,
    type: "info",
    title: "Device connected",
    message: "PostuRa sensor successfully synced",
    time: "8 hours ago",
    read: true
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case "warning":
      return <AlertTriangle className="w-5 h-5" />
    case "success":
      return <CheckCircle2 className="w-5 h-5" />
    case "info":
      return <Info className="w-5 h-5" />
    default:
      return <Bell className="w-5 h-5" />
  }
}

const getColors = (type: string) => {
  switch (type) {
    case "warning":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-600",
        border: "border-amber-500/20"
      }
    case "success":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-600",
        border: "border-emerald-500/20"
      }
    case "info":
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-600",
        border: "border-blue-500/20"
      }
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
        border: "border-border"
      }
  }
}

export function NotificationLog() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {unreadCount} new
            </span>
          )}
        </div>
        <button className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
          Mark all read
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const colors = getColors(notification.type)
          return (
            <div
              key={notification.id}
              className={cn(
                "glass-card rounded-2xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg",
                !notification.read && "ring-2 ring-primary/20"
              )}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  colors.bg, colors.text
                )}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={cn(
                      "font-semibold text-foreground",
                      !notification.read && "text-foreground"
                    )}>
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{notification.time}</span>
                  </div>
                </div>

                {/* Action */}
                <button className="flex-shrink-0 self-center p-2 rounded-xl hover:bg-muted transition-colors">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Load More */}
      <button className="w-full py-3 rounded-2xl border border-border text-muted-foreground font-semibold hover:bg-muted transition-colors">
        Load older notifications
      </button>
    </div>
  )
}
