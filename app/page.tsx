"use client"

import { useState } from "react"
import { FloatingDock, type TabType } from "@/components/floating-dock"
import { ExpenseCards } from "@/components/expense-cards"
import { SubscriptionsTable } from "@/components/subscriptions-table"
import { AlertsPage } from "@/components/alerts-page"
import { AddSubscriptionDialog } from "@/components/add-subscription-dialog"

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const [showAddDialog, setShowAddDialog] = useState(false)

  const pageTitle = {
    overview: { title: "Overview", description: "Track and manage all your subscriptions" },
    alerts: { title: "Alerts", description: "Manage your notification preferences" },
    insights: { title: "Insights", description: "Analytics and spending trends" },
    settings: { title: "Settings", description: "Configure your account preferences" }
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{pageTitle[activeTab].title}</h1>
          <p className="text-muted-foreground mt-1">{pageTitle[activeTab].description}</p>
        </header>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <>
            <section className="mb-8">
              <ExpenseCards />
            </section>
            <section>
              <SubscriptionsTable />
            </section>
          </>
        )}

        {activeTab === "alerts" && (
          <AlertsPage />
        )}

        {activeTab === "insights" && (
          <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">Insights coming soon</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">Settings coming soon</p>
          </div>
        )}
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
