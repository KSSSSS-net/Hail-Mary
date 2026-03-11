"use client"

import { useState } from "react"
import { FloatingDock, type TabType } from "@/components/floating-dock"
import { ExpenseCards } from "@/components/expense-cards"
import { SubscriptionsTable } from "@/components/subscriptions-table"
import { AlertsPage } from "@/components/alerts-page"
import { InsightsPage } from "@/components/insights-page"
import { SettingsPage } from "@/components/settings-page"
import { AddSubscriptionDialog } from "@/components/add-subscription-dialog"
import { useSubscriptions } from "@/lib/subscription-context"
import { EmptyState } from "@/components/empty-state"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const { subscriptions, loading } = useSubscriptions()

  const pageTitle = {
    overview: { title: "Overview", description: "Track and manage all your subscriptions" },
    alerts: { title: "Alerts", description: "Manage your notification preferences" },
    insights: { title: "Insights", description: "Analytics and spending trends" },
    settings: { title: "Settings", description: "Configure your account preferences" }
  }

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
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
                <EmptyState onAddClick={() => setShowAddDialog(true)} />
              )}
            </>
          )}

          {activeTab === "alerts" && (
            <AlertsPage />
          )}

          {activeTab === "insights" && (
            hasSubscriptions ? (
              <InsightsPage />
            ) : (
              <EmptyState onAddClick={() => setShowAddDialog(true)} message="Add subscriptions to see insights" />
            )
          )}

          {activeTab === "settings" && (
            <SettingsPage />
          )}
        </div>
      </div>

      {/* Floating Dock Navigation */}
      <FloatingDock 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddClick={() => setShowAddDialog(true)}
      />

      {/* Add Subscription Dialog */}
      <AddSubscriptionDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
      />
    </main>
  )
}
