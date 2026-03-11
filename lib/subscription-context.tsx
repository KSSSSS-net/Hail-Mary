"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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
}

interface SubscriptionContextType {
  subscriptions: Subscription[]
  loading: boolean
  user: User | null
  addSubscription: (subscription: Omit<Subscription, "id" | "user_id">) => Promise<void>
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

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await fetchSubscriptions()
      } else {
        setLoading(false)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchSubscriptions()
      } else {
        setSubscriptions([])
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchSubscriptions = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching subscriptions:", error)
    } else {
      setSubscriptions(data || [])
    }
    setLoading(false)
  }

  const addSubscription = async (subscription: Omit<Subscription, "id" | "user_id">) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("subscriptions")
      .insert([{ ...subscription, user_id: user.id }])
      .select()
      .single()

    if (error) {
      console.error("Error adding subscription:", error)
    } else if (data) {
      setSubscriptions((prev) => [data, ...prev])
    }
  }

  const updateSubscription = async (id: string, updates: Partial<Subscription>) => {
    const { data, error } = await supabase
      .from("subscriptions")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating subscription:", error)
    } else if (data) {
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === id ? data : sub))
      )
    }
  }

  const deleteSubscription = async (id: string) => {
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting subscription:", error)
    } else {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
    }
  }

  const refreshSubscriptions = async () => {
    await fetchSubscriptions()
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
        refreshSubscriptions,
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
