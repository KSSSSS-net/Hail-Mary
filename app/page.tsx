"use client"

import { useState } from "react"

import { FloatingDock, type TabType } from "@/components/floating-dock"
import { ExpenseCards } from "@/components/expense-cards"
import { SubscriptionsTable } from "@/components/subscriptions-table"
import { AlertsPage } from "@/components/alerts-page"
import { InsightsPage } from "@/components/insights-page"
import { SettingsPage } from "@/components/settings-page"
import { AddSubscriptionDialog } from "@/components/add-subscription-dialog"
import { EmptyState } from "@/components/empty-state"
import { SubscriptionProvider, useSubscriptions } from "@/lib/subscription-context"

const pageTitle: Record<TabType, { title: string; description: string }> = {
  overview: { title: "Overview", description: "Track and manage your subscriptions" },
  alerts: { title: "Alerts", description: "Configure your notification preferences" },
  insights: { title: "Insights", description: "Analyze your subscription spending" },
  settings: { title: "Settings", description: "Manage your account and preferences" },
}

function OverviewPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { subscriptions, loading } = useSubscriptions()

  const hasSubscriptions = subscriptions.length > 0

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground transition-all duration-300 ease-out">{pageTitle[activeTab].title}</h1>
          <p className="text-muted-foreground mt-1 transition-all duration-300 ease-out">{pageTitle[activeTab].description}</p>
        </header>

        {/* Content based on active tab */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out" key={activeTab}>
          {activeTab === "overview" && (
            <>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : hasSubscriptions ? (
                <>
                  <section className="mb-8">
                    <ExpenseCards />
                  </section>
                  <section>
                    <SubscriptionsTable />
                  </section>
                </>
              ) : (
                <EmptyState onAddClick={() => setIsAddDialogOpen(true)} />
              )}
            </>
          )}

          {activeTab === "alerts" && (
            <AlertsPage />
          )}

          {activeTab === "insights" && (
            <InsightsPage />
          )}

          {activeTab === "settings" && (
            <SettingsPage />
          )}
        </div>
      </div>

      <FloatingDock
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddClick={() => setIsAddDialogOpen(true)}
      />

      <AddSubscriptionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </main>
  )
}

export default function Home() {
  return (
    <SubscriptionProvider>
      <OverviewPage />
    </SubscriptionProvider>
  )
}
