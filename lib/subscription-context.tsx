"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Subscription {
  id: string
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
  addSubscription: (subscription: Omit<Subscription, "id">) => void
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void
  deleteSubscription: (id: string) => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

// Sample subscriptions for demo
const sampleSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    amount: 15.99,
    category: "Entertainment",
    billing_date: "2026-03-15",
    purchase_date: "2024-01-10",
    logo: "N",
    color: "bg-red-600",
  },
  {
    id: "2",
    name: "Spotify",
    amount: 9.99,
    category: "Music",
    billing_date: "2026-03-20",
    purchase_date: "2023-06-15",
    logo: "S",
    color: "bg-green-600",
  },
  {
    id: "3",
    name: "Adobe CC",
    amount: 54.99,
    category: "Productivity",
    billing_date: "2026-03-25",
    purchase_date: "2024-02-01",
    logo: "Ai",
    color: "bg-orange-600",
  },
  {
    id: "4",
    name: "iCloud",
    amount: 2.99,
    category: "Storage",
    billing_date: "2026-03-18",
    purchase_date: "2022-11-20",
    logo: "iC",
    color: "bg-blue-500",
  },
  {
    id: "5",
    name: "YouTube Premium",
    amount: 13.99,
    category: "Entertainment",
    billing_date: "2026-03-22",
    purchase_date: "2024-03-05",
    logo: "YT",
    color: "bg-red-500",
  },
  {
    id: "6",
    name: "ChatGPT Plus",
    amount: 20.00,
    category: "AI Tools",
    billing_date: "2026-03-28",
    purchase_date: "2024-05-10",
    logo: "GP",
    color: "bg-emerald-600",
  },
]

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(sampleSubscriptions)
  const [loading] = useState(false)

  const addSubscription = (subscription: Omit<Subscription, "id">) => {
    const newSubscription: Subscription = {
      ...subscription,
      id: crypto.randomUUID(),
    }
    setSubscriptions((prev) => [...prev, newSubscription])
  }

  const updateSubscription = (id: string, updates: Partial<Subscription>) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, ...updates } : sub))
    )
  }

  const deleteSubscription = (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        addSubscription,
        updateSubscription,
        deleteSubscription,
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
