"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart as PieChartIcon, BarChart3, Calendar, ArrowUpRight, ArrowDownRight, Wallet, Target } from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  ComposedChart
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { useSubscriptions } from "@/lib/subscription-context"
import { useMemo } from "react"

const categoryColors: Record<string, string> = {
  entertainment: "#f472b6",
  music: "#22c55e",
  productivity: "#3b82f6",
  storage: "#06b6d4",
  software: "#f97316",
  gaming: "#a855f7",
  fitness: "#eab308",
  news: "#ef4444",
}

const chartConfig = {
  amount: { label: "Amount", color: "hsl(var(--primary))" },
  payments: { label: "Payments", color: "hsl(var(--primary))" },
  thisYear: { label: "2026", color: "hsl(var(--primary))" },
  lastYear: { label: "2025", color: "hsl(var(--muted-foreground))" },
}

export function InsightsPage() {
  const { subscriptions } = useSubscriptions()

  const monthlyTotal = useMemo(() => {
    return subscriptions.reduce((acc, sub) => acc + Number(sub.amount), 0)
  }, [subscriptions])

  const categoryData = useMemo(() => {
    const categories: Record<string, { value: number; count: number }> = {}
    subscriptions.forEach((sub) => {
      if (!categories[sub.category]) {
        categories[sub.category] = { value: 0, count: 0 }
      }
      categories[sub.category].value += Number(sub.amount)
      categories[sub.category].count++
    })
    return Object.entries(categories).map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: data.value,
      color: categoryColors[name] || "#888888",
      subscriptions: data.count,
      percentage: Math.round((data.value / monthlyTotal) * 100) || 0,
    }))
  }, [subscriptions, monthlyTotal])

  const costDistribution = useMemo(() => {
    const ranges = [
      { range: "$0-5", min: 0, max: 5, count: 0 },
      { range: "$5-10", min: 5, max: 10, count: 0 },
      { range: "$10-15", min: 10, max: 15, count: 0 },
      { range: "$15-20", min: 15, max: 20, count: 0 },
      { range: "$20-50", min: 20, max: 50, count: 0 },
      { range: "$50+", min: 50, max: Infinity, count: 0 },
    ]
    subscriptions.forEach((sub) => {
      const amount = Number(sub.amount)
      const range = ranges.find((r) => amount >= r.min && amount < r.max)
      if (range) range.count++
    })
    return ranges
  }, [subscriptions])

  const monthlySpending = useMemo(() => {
    // Generate mock historical data based on current subscriptions
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    return months.map((month, i) => ({
      month,
      amount: Math.max(0, monthlyTotal * (0.7 + Math.random() * 0.6)),
      subscriptions: Math.max(1, subscriptions.length - Math.floor(Math.random() * 3)),
    }))
  }, [monthlyTotal, subscriptions.length])

  const weeklyPayments = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((day) => {
      const daySubscriptions = subscriptions.filter(() => Math.random() > 0.6)
      return {
        day,
        payments: daySubscriptions.length,
        amount: daySubscriptions.reduce((acc, sub) => acc + Number(sub.amount), 0),
      }
    })
  }, [subscriptions])

  const averageCost = subscriptions.length > 0 ? monthlyTotal / subscriptions.length : 0
  const budget = 400
  const budgetUsed = Math.min(100, (monthlyTotal / budget) * 100)

  const stats = [
    { 
      title: "Total Monthly", 
      value: `$${monthlyTotal.toFixed(2)}`, 
      change: subscriptions.length > 0 ? "-12%" : "0%", 
      trend: "down",
      icon: DollarSign,
      subtitle: "recurring charges"
    },
    { 
      title: "Active Subscriptions", 
      value: subscriptions.length.toString(), 
      change: subscriptions.length > 0 ? "+2" : "0", 
      trend: "up",
      icon: CreditCard,
      subtitle: "services tracked"
    },
    { 
      title: "Avg. Cost", 
      value: `$${averageCost.toFixed(2)}`, 
      change: subscriptions.length > 0 ? "-8%" : "0%", 
      trend: "down",
      icon: Wallet,
      subtitle: "per subscription"
    },
    { 
      title: "Budget Left", 
      value: `$${Math.max(0, budget - monthlyTotal).toFixed(2)}`, 
      change: `${(100 - budgetUsed).toFixed(0)}%`, 
      trend: budgetUsed < 80 ? "up" : "down",
      icon: Target,
      subtitle: `of $${budget} monthly`
    },
  ]

  if (subscriptions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-xl">
        <p className="text-muted-foreground">Add subscriptions to see insights</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 transition-all duration-200 ease-out group-hover:scale-105">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className={`flex items-center text-xs font-medium transition-all duration-200 ease-out group-hover:scale-105 ${stat.trend === "up" ? "text-primary" : "text-primary"}`}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground transition-all duration-200 ease-out group-hover:text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
              <p className="text-xs text-muted-foreground/70">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Progress */}
      <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Monthly Budget</h3>
              <p className="text-sm text-muted-foreground">${monthlyTotal.toFixed(2)} of ${budget} used</p>
            </div>
            <span className={`text-sm font-medium ${budgetUsed >= 80 ? "text-destructive" : "text-primary"}`}>
              {budgetUsed.toFixed(0)}%
            </span>
          </div>
          <Progress value={budgetUsed} className="h-3 transition-all duration-500 ease-out" />
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ComposedChart data={monthlySpending} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill="url(#colorAmount)" 
                  className="transition-all duration-300 ease-out"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-primary" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ChartContainer config={chartConfig} className="w-[200px] h-[200px]">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    className="transition-all duration-300 ease-out"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="transition-all duration-200 ease-out hover:opacity-80"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex-1 space-y-2">
                {categoryData.map((category, index) => (
                  <div 
                    key={category.name} 
                    className="flex items-center justify-between text-sm group cursor-pointer p-1.5 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full transition-transform duration-200 ease-out group-hover:scale-125" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-foreground group-hover:text-primary transition-colors duration-200">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">{category.subscriptions} subs</span>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">${category.value.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Distribution & Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Distribution */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Price Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {costDistribution.map((item, index) => (
                <div key={item.range} className="flex items-center gap-3 group cursor-pointer" style={{ animationDelay: `${index * 50}ms` }}>
                  <span className="text-sm text-muted-foreground w-16">{item.range}</span>
                  <div className="flex-1 bg-secondary/50 rounded-full h-6 overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out group-hover:opacity-80 flex items-center justify-end pr-2"
                      style={{ width: `${Math.max(5, (item.count / Math.max(...costDistribution.map(c => c.count), 1)) * 100)}%` }}
                    >
                      {item.count > 0 && <span className="text-xs font-medium text-primary-foreground">{item.count}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Payment Activity */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Weekly Payment Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={weeklyPayments} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="amount" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-200 ease-out hover:opacity-80"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Spending & Upcoming Renewals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spending */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Top Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions
                .sort((a, b) => Number(b.amount) - Number(a.amount))
                .slice(0, 5)
                .map((sub, index) => (
                  <div 
                    key={sub.id} 
                    className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 group cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${sub.color} flex items-center justify-center text-white text-sm font-bold transition-all duration-200 ease-out group-hover:scale-110`}>
                        {sub.logo || sub.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">{sub.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{sub.category}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-all duration-200">${Number(sub.amount).toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Renewals */}
        <Card className="bg-card border-border transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Upcoming Renewals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subscriptions
                .sort((a, b) => new Date(a.billing_date).getTime() - new Date(b.billing_date).getTime())
                .slice(0, 5)
                .map((sub, index) => {
                  const daysUntil = Math.ceil((new Date(sub.billing_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  const urgency = daysUntil <= 3 ? "text-destructive" : daysUntil <= 7 ? "text-yellow-500" : "text-primary"
                  return (
                    <div 
                      key={sub.id} 
                      className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 group cursor-pointer"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${sub.color} flex items-center justify-center text-white text-sm font-bold transition-all duration-200 ease-out group-hover:scale-110`}>
                          {sub.logo || sub.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">{sub.name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(sub.billing_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${urgency} transition-all duration-200`}>
                        {daysUntil <= 0 ? "Due today" : `${daysUntil} days`}
                      </span>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
