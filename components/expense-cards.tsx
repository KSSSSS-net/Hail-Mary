"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Calendar, IndianRupee } from "lucide-react"
import { useSubscriptions } from "@/lib/subscription-context"
import { useMemo } from "react"

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function ExpenseCards() {
  const { subscriptions } = useSubscriptions()

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce((acc, sub) => acc + Number(sub.amount), 0)
  }, [subscriptions])

  const upcomingBills = useMemo(() => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return subscriptions
      .filter((sub) => {
        const billingDate = new Date(sub.billing_date)
        return billingDate >= today && billingDate <= nextWeek
      })
      .sort((a, b) => new Date(a.billing_date).getTime() - new Date(b.billing_date).getTime())
      .slice(0, 3)
  }, [subscriptions])

  const upcomingTotal = useMemo(() => {
    return upcomingBills.reduce((acc, sub) => acc + Number(sub.amount), 0)
  }, [upcomingBills])

  // Generate bar chart heights based on subscriptions
  const barHeights = useMemo(() => {
    if (subscriptions.length === 0) return [20, 30, 25, 40, 35, 45, 30]
    const amounts = subscriptions.slice(0, 7).map(s => Number(s.amount))
    const maxAmount = Math.max(...amounts, 1)
    return amounts.map(a => Math.max(20, (a / maxAmount) * 100))
  }, [subscriptions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Last Month Expenses Card */}
      <Card className="bg-card border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <IndianRupee className="w-4 h-4" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">₹{monthlyTotal.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2">
                {monthlyTotal > 0 ? (
                  <>
                    <span className="flex items-center text-sm text-primary group/trend cursor-pointer">
                      <TrendingDown className="w-4 h-4 mr-1 transition-transform duration-300 ease-out group-hover/trend:-translate-y-0.5" />
                      <span className="transition-all duration-200 ease-out group-hover/trend:font-bold">{subscriptions.length}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">active subscriptions</span>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">No subscriptions yet</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-xs text-muted-foreground">This month</div>
              <div className="flex gap-1 group">
                {barHeights.map((height, i) => (
                  <div
                    key={i}
                    className="w-2 bg-primary/20 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-primary/30"
                    style={{ height: "40px" }}
                  >
                    <div 
                      className="w-full bg-primary rounded-full transition-all duration-500 ease-out hover:opacity-80"
                      style={{ 
                        height: `${height}%`, 
                        marginTop: `${100 - height}%`,
                        transitionDelay: `${i * 50}ms`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bills Card */}
      <Card className="bg-card border-border overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming Bills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingBills.length > 0 ? (
              upcomingBills.map((bill, index) => (
                <div 
                  key={bill.id} 
                  className="flex items-center justify-between p-2 -mx-2 rounded-lg transition-all duration-300 ease-out hover:bg-secondary/50 hover:translate-x-1 cursor-pointer group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${bill.color} flex items-center justify-center text-white text-sm font-bold transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg`}>
                      {bill.logo || bill.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{bill.name}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(bill.billing_date)}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:scale-105">₹{Number(bill.amount).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No bills due this week</p>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center group/total cursor-pointer transition-all duration-200 ease-out hover:bg-secondary/30 -mx-2 px-2 rounded-lg">
            <span className="text-sm text-muted-foreground group-hover/total:text-foreground transition-colors duration-200">Total due this week</span>
            <span className="text-lg font-bold text-primary transition-all duration-200 ease-out group-hover/total:scale-105">₹{upcomingTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
