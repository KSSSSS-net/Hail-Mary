"use client"

import { useState, useMemo, useEffect } from "react"
import { X, Bell, IndianRupee } from "lucide-react"
import { useSubscriptions, type Subscription } from "@/lib/subscription-context"
import { cn } from "@/lib/utils"

function isTomorrow(dateString: string): boolean {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const billingDate = new Date(dateString)
  
  return (
    billingDate.getFullYear() === tomorrow.getFullYear() &&
    billingDate.getMonth() === tomorrow.getMonth() &&
    billingDate.getDate() === tomorrow.getDate()
  )
}

export function FloatingBillAlert() {
  const { subscriptions } = useSubscriptions()
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(false)

  const upcomingBills = useMemo(() => {
    return subscriptions.filter(
      (sub) => isTomorrow(sub.billing_date) && !dismissedIds.has(sub.id)
    )
  }, [subscriptions, dismissedIds])

  useEffect(() => {
    if (upcomingBills.length > 0) {
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [upcomingBills.length])

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id))
  }

  const handleDismissAll = () => {
    setDismissedIds((prev) => {
      const newSet = new Set(prev)
      upcomingBills.forEach((bill) => newSet.add(bill.id))
      return newSet
    })
  }

  if (upcomingBills.length === 0) return null

  const totalDue = upcomingBills.reduce((acc, bill) => acc + Number(bill.amount), 0)

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-500 ease-out",
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      )}
    >
      <div className="bg-card/95 backdrop-blur-xl border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-primary/20">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/20 rounded-lg">
              <Bell className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <span className="font-semibold text-foreground">Bill Reminder</span>
          </div>
          {upcomingBills.length > 1 && (
            <button
              onClick={handleDismissAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Dismiss all
            </button>
          )}
        </div>

        {/* Bills List */}
        <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
          {upcomingBills.map((bill, index) => (
            <BillItem
              key={bill.id}
              bill={bill}
              onDismiss={() => handleDismiss(bill.id)}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-secondary/30 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total due tomorrow</span>
          <span className="font-bold text-primary flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5" />
            {totalDue.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

interface BillItemProps {
  bill: Subscription
  onDismiss: () => void
  delay: number
}

function BillItem({ bill, onDismiss, delay }: BillItemProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 rounded-xl bg-secondary/50 transition-all duration-300 ease-out group",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0",
          bill.color || "bg-primary"
        )}
      >
        {bill.logo || bill.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{bill.name}</p>
        <p className="text-xs text-muted-foreground">Due tomorrow</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">₹{Number(bill.amount).toFixed(2)}</span>
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
