"use client"

import { CreditCard, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmptyStateProps {
  onAddClick: () => void
  message?: string
}

export function EmptyState({ onAddClick, message = "Start by adding your first subscription" }: EmptyStateProps) {
  return (
    <Card className="border-border bg-card p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
          <CreditCard className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">No subscriptions yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            {message}
          </p>
        </div>
        <Button
          onClick={onAddClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Subscription
        </Button>
      </div>
    </Card>
  )
}
