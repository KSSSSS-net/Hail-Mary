"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface Subscription {
  id: string
  user_id: string
  name: string
  amount: number
  category: string
  billing_date: string
  purchase_date: string
  logo: string | null
  color: string
  created_at: string
  updated_at: string
}

interface SubscriptionContextType {
  subscriptions: Subscription[]
  loading: boolean
  user: User | null
  addSubscription: (subscription: Omit<Subscription, "id" | "user_id" | "created_at" | "updated_at">) => Promise<void>
  updateSubscription: (id: string, subscription: Partial<Subscription>) => Promise<void>
  deleteSubscription: (id: string) => Promise<void>
  refreshSubscriptions: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .order("billing_date", { ascending: true })

      if (!error && data) {
        setSubscriptions(data)
      }
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchSubscriptions()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchSubscriptions()
      } else if (event === "SIGNED_OUT") {
        setSubscriptions([])
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchSubscriptions, supabase.auth])

  const addSubscription = async (subscription: Omit<Subscription, "id" | "user_id" | "created_at" | "updated_at">) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("subscriptions")
      .insert([{ ...subscription, user_id: user.id }])
      .select()
      .single()

    if (!error && data) {
      setSubscriptions((prev) => [...prev, data])
    }
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    const { data, error } = await supabase
      .from("subscriptions")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (!error && data) {
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === id ? data : sub))
      )
    }
  }

  const deleteSubscription = async (id: string) => {
    const { error } = await supabase.from("subscriptions").delete().eq("id", id)

    if (!error) {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
    }
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        user,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        refreshSubscriptions: fetchSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscriptions must be used within a SubscriptionProvider")
  }
  return context
}
