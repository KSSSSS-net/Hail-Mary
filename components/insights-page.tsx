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
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  Legend,
  ComposedChart
} from "recharts"
import { Progress } from "@/components/ui/progress"

// Monthly spending data for the past 12 months
const monthlySpending = [
  { month: "Apr", amount: 198, subscriptions: 8 },
  { month: "May", amount: 215, subscriptions: 9 },
  { month: "Jun", amount: 245, subscriptions: 10 },
  { month: "Jul", amount: 278, subscriptions: 10 },
  { month: "Aug", amount: 312, subscriptions: 11 },
  { month: "Sep", amount: 289, subscriptions: 10 },
  { month: "Oct", amount: 298, subscriptions: 10 },
  { month: "Nov", amount: 356, subscriptions: 12 },
  { month: "Dec", amount: 342, subscriptions: 12 },
  { month: "Jan", amount: 298, subscriptions: 11 },
  { month: "Feb", amount: 312, subscriptions: 12 },
  { month: "Mar", amount: 284, subscriptions: 12 },
]

// Category breakdown with detailed spending
const categoryData = [
  { name: "Entertainment", value: 89.97, color: "#f472b6", subscriptions: 2, percentage: 35 },
  { name: "Music", value: 32.97, color: "#22c55e", subscriptions: 2, percentage: 13 },
  { name: "Productivity", value: 64.99, color: "#3b82f6", subscriptions: 2, percentage: 25 },
  { name: "Storage", value: 2.99, color: "#06b6d4", subscriptions: 1, percentage: 1 },
  { name: "Development", value: 4.00, color: "#f97316", subscriptions: 1, percentage: 2 },
  { name: "Design", value: 15.00, color: "#a855f7", subscriptions: 1, percentage: 6 },
]

// Weekly payment activity
const weeklyPayments = [
  { day: "Mon", payments: 2, amount: 25.98 },
  { day: "Tue", payments: 0, amount: 0 },
  { day: "Wed", payments: 1, amount: 54.99 },
  { day: "Thu", payments: 3, amount: 35.98 },
  { day: "Fri", payments: 1, amount: 10.00 },
  { day: "Sat", payments: 0, amount: 0 },
  { day: "Sun", payments: 2, amount: 18.98 },
]

// Yearly comparison data
const yearlyComparison = [
  { month: "Jan", lastYear: 245, thisYear: 298 },
  { month: "Feb", lastYear: 268, thisYear: 312 },
  { month: "Mar", lastYear: 312, thisYear: 284 },
  { month: "Apr", lastYear: 198, thisYear: null },
  { month: "May", lastYear: 215, thisYear: null },
  { month: "Jun", lastYear: 245, thisYear: null },
]

// Subscription cost distribution (for histogram)
const costDistribution = [
  { range: "$0-5", count: 2 },
  { range: "$5-10", count: 1 },
  { range: "$10-15", count: 3 },
  { range: "$15-20", count: 1 },
  { range: "$20-50", count: 0 },
  { range: "$50+", count: 1 },
]

// Radial progress for budget
const budgetData = [
  { name: "Used", value: 284.47, fill: "hsl(var(--primary))" },
]

const chartConfig = {
  amount: { label: "Amount", color: "hsl(var(--primary))" },
  payments: { label: "Payments", color: "hsl(var(--primary))" },
  thisYear: { label: "2026", color: "hsl(var(--primary))" },
  lastYear: { label: "2025", color: "hsl(var(--muted-foreground))" },
}

const stats = [
  { 
    title: "Total Monthly", 
    value: "$284.47", 
    change: "-12%", 
    trend: "down",
    icon: DollarSign,
    subtitle: "vs $323.11 last month"
  },
  { 
    title: "Active Subscriptions", 
    value: "8", 
    change: "+1", 
    trend: "up",
    icon: CreditCard,
    subtitle: "1 new this month"
  },
  { 
    title: "Avg. Per Subscription", 
    value: "$35.56", 
    change: "-8%", 
    trend: "down",
    icon: Wallet,
    subtitle: "Better than avg"
  },
  { 
    title: "Budget Remaining", 
    value: "$115.53", 
    change: "71%", 
    trend: "neutral",
    icon: Target,
    subtitle: "of $400 monthly budget"
  },
]

// Top spending subscriptions
const topSubscriptions = [
  { name: "Adobe Creative Cloud", amount: 54.99, change: 0, color: "bg-red-600" },
  { name: "Netflix", amount: 15.99, change: 2, color: "bg-red-500" },
  { name: "Figma", amount: 15.00, change: 0, color: "bg-purple-500" },
  { name: "Disney+", amount: 13.99, change: -1, color: "bg-blue-700" },
]

// Upcoming renewals
const upcomingRenewals = [
  { name: "Adobe CC", daysUntil: 3, amount: 54.99 },
  { name: "Figma", daysUntil: 3, amount: 15.00 },
  { name: "Notion", daysUntil: 7, amount: 10.00 },
  { name: "GitHub Pro", daysUntil: 9, amount: 4.00 },
]

export function InsightsPage() {
  const totalBudget = 400
  const usedBudget = 284.47
  const budgetPercentage = (usedBudget / totalBudget) * 100

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-primary/20">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                {stat.trend !== "neutral" && (
                  <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ease-out ${
                    stat.trend === "down" ? "text-green-500" : "text-primary"
                  }`}>
                    {stat.trend === "down" ? (
                      <ArrowDownRight className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                )}
                {stat.trend === "neutral" && (
                  <div className="text-xs font-medium text-primary">{stat.change} used</div>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground transition-all duration-200 ease-out group-hover:text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1 transition-colors duration-200 group-hover:text-foreground/70">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Budget Progress */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Monthly Budget</h3>
              <p className="text-sm text-muted-foreground">Track your subscription spending</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${usedBudget}</p>
              <p className="text-sm text-muted-foreground">of ${totalBudget}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={budgetPercentage} className="h-3 transition-all duration-500 ease-out" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${usedBudget.toFixed(2)} spent</span>
              <span>${(totalBudget - usedBudget).toFixed(2)} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend Chart */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <TrendingUp className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">12-Month Spending Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <ComposedChart data={monthlySpending} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                  className="text-xs"
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

        {/* Category Distribution */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <PieChartIcon className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">Spending by Category</span>
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
                    className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 hover:translate-x-1 cursor-pointer group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full transition-all duration-200 ease-out group-hover:scale-150 group-hover:shadow-lg"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <span className="text-sm text-foreground block">{category.name}</span>
                        <span className="text-xs text-muted-foreground">{category.subscriptions} subs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">${category.value.toFixed(2)}</span>
                      <span className="text-xs text-muted-foreground block">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Year over Year Comparison */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <Calendar className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">Year-over-Year Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={yearlyComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs"
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                  className="text-xs"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="lastYear" 
                  fill="hsl(var(--muted-foreground))" 
                  radius={[4, 4, 0, 0]}
                  opacity={0.5}
                  className="transition-all duration-300 ease-out"
                />
                <Bar 
                  dataKey="thisYear" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  className="transition-all duration-300 ease-out"
                />
              </BarChart>
            </ChartContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span className="text-xs text-muted-foreground">2025</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Distribution */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <BarChart3 className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">Price Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] w-full">
              <BarChart data={costDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis 
                  type="category" 
                  dataKey="range" 
                  axisLine={false} 
                  tickLine={false}
                  className="text-xs"
                  width={50}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                  className="transition-all duration-300 ease-out"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spending Subscriptions */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <TrendingUp className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">Top Spending</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topSubscriptions.map((sub, index) => (
              <div 
                key={sub.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 transition-all duration-200 ease-out hover:bg-secondary/50 hover:translate-x-1 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${sub.color} flex items-center justify-center text-white font-bold transition-all duration-200 ease-out group-hover:scale-110 group-hover:shadow-lg`}>
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary">{sub.name}</p>
                    <p className="text-xs text-muted-foreground">Monthly</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${sub.amount.toFixed(2)}</p>
                  {sub.change !== 0 && (
                    <p className={`text-xs flex items-center justify-end gap-1 ${sub.change > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {sub.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      ${Math.abs(sub.change).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Renewals */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
              <Calendar className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
              <span className="transition-colors duration-200 group-hover:text-primary">Upcoming Renewals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingRenewals.map((renewal, index) => (
              <div 
                key={renewal.name}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 transition-all duration-200 ease-out hover:bg-secondary/50 hover:translate-x-1 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-200 ease-out group-hover:scale-110 ${
                    renewal.daysUntil <= 3 ? 'bg-red-500/20 text-red-400' : 
                    renewal.daysUntil <= 7 ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-primary/20 text-primary'
                  }`}>
                    {renewal.daysUntil}d
                  </div>
                  <div>
                    <p className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary">{renewal.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {renewal.daysUntil === 1 ? 'Tomorrow' : 
                       renewal.daysUntil <= 3 ? 'In ' + renewal.daysUntil + ' days' :
                       'In ' + renewal.daysUntil + ' days'}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">${renewal.amount.toFixed(2)}</p>
              </div>
            ))}
            <div className="pt-2 border-t border-border flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total upcoming</span>
              <span className="font-semibold text-primary">${upcomingRenewals.reduce((acc, r) => acc + r.amount, 0).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Payments Chart */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 group cursor-default">
            <BarChart3 className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
            <span className="transition-colors duration-200 group-hover:text-primary">Weekly Payment Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={weeklyPayments} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                className="text-xs"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                className="text-xs"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="amount" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300 ease-out"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
