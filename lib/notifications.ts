"use client"

import type { Subscription } from "./subscription-context"

// Check if notifications are supported
export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    return "denied"
  }
  
  const permission = await Notification.requestPermission()
  return permission
}

// Get current notification permission
export function getNotificationPermission(): NotificationPermission | null {
  if (!isNotificationSupported()) {
    return null
  }
  return Notification.permission
}

// Send a browser notification
export function sendNotification(title: string, options?: NotificationOptions): Notification | null {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return null
  }
  
  return new Notification(title, {
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    ...options,
  })
}

// Calculate days until next billing
export function getDaysUntilBilling(billingDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const billing = new Date(billingDate)
  billing.setHours(0, 0, 0, 0)
  
  // If billing date is in the past, calculate next occurrence
  while (billing < today) {
    billing.setMonth(billing.getMonth() + 1)
  }
  
  const diffTime = billing.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

// Check subscriptions due tomorrow and send notifications
export function checkAndNotifyUpcomingPayments(subscriptions: Subscription[]): void {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return
  }

  const tomorrow = subscriptions.filter(sub => {
    const daysUntil = getDaysUntilBilling(sub.billing_date)
    return daysUntil === 1
  })

  tomorrow.forEach(sub => {
    sendNotification(`Payment Due Tomorrow: ${sub.name}`, {
      body: `Your ${sub.billing_frequency} subscription of ₹${Number(sub.amount).toFixed(2)} is due tomorrow.`,
      tag: `payment-reminder-${sub.id}`,
      requireInteraction: true,
    })
  })
}

// Store notification check timestamp in localStorage
const LAST_CHECK_KEY = "subtrack_last_notification_check"

export function shouldCheckNotifications(): boolean {
  if (typeof window === "undefined") return false
  
  const lastCheck = localStorage.getItem(LAST_CHECK_KEY)
  if (!lastCheck) return true
  
  const lastCheckDate = new Date(lastCheck)
  const today = new Date()
  
  // Check once per day
  return lastCheckDate.toDateString() !== today.toDateString()
}

export function markNotificationCheckDone(): void {
  if (typeof window === "undefined") return
  localStorage.setItem(LAST_CHECK_KEY, new Date().toISOString())
}
