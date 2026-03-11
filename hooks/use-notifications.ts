"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  isNotificationSupported, 
  requestNotificationPermission, 
  getNotificationPermission,
  checkAndNotifyUpcomingPayments,
  shouldCheckNotifications,
  markNotificationCheckDone
} from "@/lib/notifications"
import type { Subscription } from "@/lib/subscription-context"

export function useNotifications(subscriptions: Subscription[]) {
  const [permission, setPermission] = useState<NotificationPermission | null>(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported(isNotificationSupported())
    setPermission(getNotificationPermission())
  }, [])

  const requestPermission = useCallback(async () => {
    const newPermission = await requestNotificationPermission()
    setPermission(newPermission)
    return newPermission
  }, [])

  // Check for upcoming payments once per day
  useEffect(() => {
    if (permission === "granted" && subscriptions.length > 0 && shouldCheckNotifications()) {
      checkAndNotifyUpcomingPayments(subscriptions)
      markNotificationCheckDone()
    }
  }, [permission, subscriptions])

  // Manual check function
  const checkUpcomingPayments = useCallback(() => {
    if (permission === "granted") {
      checkAndNotifyUpcomingPayments(subscriptions)
    }
  }, [permission, subscriptions])

  return {
    permission,
    isSupported,
    requestPermission,
    checkUpcomingPayments,
  }
}
