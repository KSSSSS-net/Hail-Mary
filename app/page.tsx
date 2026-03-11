import { FloatingDock } from "@/components/floating-dock"
import { ExpenseCards } from "@/components/expense-cards"
import { SubscriptionsTable } from "@/components/subscriptions-table"

export default function OverviewPage() {
  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Overview</h1>
          <p className="text-muted-foreground mt-1">Track and manage all your subscriptions</p>
        </header>

        {/* Expense Summary Cards */}
        <section className="mb-8">
          <ExpenseCards />
        </section>

        {/* Subscriptions Table */}
        <section>
          <SubscriptionsTable />
        </section>
      </div>

      {/* Floating Dock Navigation */}
      <FloatingDock />
    </main>
  )
}
