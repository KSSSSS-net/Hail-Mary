"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, Calendar, DollarSign } from "lucide-react"

const upcomingBills = [
  { name: "Netflix", amount: 15.99, dueDate: "Mar 15", logo: "N", color: "bg-red-500" },
  { name: "Spotify", amount: 9.99, dueDate: "Mar 18", logo: "S", color: "bg-green-500" },
  { name: "iCloud", amount: 2.99, dueDate: "Mar 20", logo: "i", color: "bg-blue-400" },
]

export function ExpenseCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Last Month Expenses Card */}
      <Card className="bg-card border-border overflow-hidden transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Last Month Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">$284.47</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="flex items-center text-sm text-primary">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  12%
                </span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-xs text-muted-foreground">Feb 2026</div>
              <div className="flex gap-1">
                {[40, 65, 45, 80, 55, 70, 50].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 bg-primary/20 rounded-full overflow-hidden"
                    style={{ height: "40px" }}
                  >
                    <div 
                      className="w-full bg-primary rounded-full transition-all duration-500"
                      style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Bills Card */}
      <Card className="bg-card border-border overflow-hidden transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Upcoming Bills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingBills.map((bill) => (
              <div key={bill.name} className="flex items-center justify-between p-2 -mx-2 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${bill.color} flex items-center justify-center text-white text-sm font-bold transition-transform duration-200 ease-out group-hover:scale-110`}>
                    {bill.logo}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{bill.name}</p>
                    <p className="text-xs text-muted-foreground">{bill.dueDate}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">${bill.amount}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total due this week</span>
            <span className="text-lg font-bold text-primary">$28.97</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
