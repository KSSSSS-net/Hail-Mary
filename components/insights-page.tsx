"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart as PieChartIcon, BarChart3 } from "lucide-react"
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
  ResponsiveContainer
} from "recharts"

const monthlySpending = [
  { month: "Jan", amount: 245 },
  { month: "Feb", amount: 312 },
  { month: "Mar", amount: 289 },
  { month: "Apr", amount: 356 },
  { month: "May", amount: 298 },
  { month: "Jun", amount: 284 },
]

const categoryData = [
  { name: "Entertainment", value: 89.97, color: "hsl(var(--chart-1))" },
  { name: "Music", value: 32.97, color: "hsl(var(--chart-2))" },
  { name: "Productivity", value: 64.98, color: "hsl(var(--chart-3))" },
  { name: "Cloud", value: 45.97, color: "hsl(var(--chart-4))" },
  { name: "News", value: 19.99, color: "hsl(var(--chart-5))" },
]

const weeklyPayments = [
  { day: "Mon", payments: 2 },
  { day: "Tue", payments: 0 },
  { day: "Wed", payments: 1 },
  { day: "Thu", payments: 3 },
  { day: "Fri", payments: 1 },
  { day: "Sat", payments: 0 },
  { day: "Sun", payments: 2 },
]

const chartConfig = {
  amount: { label: "Amount", color: "hsl(var(--primary))" },
  payments: { label: "Payments", color: "hsl(var(--primary))" },
}

const stats = [
  { 
    title: "Total Monthly", 
    value: "$284.47", 
    change: "-12%", 
    trend: "down",
    icon: DollarSign 
  },
  { 
    title: "Active Subscriptions", 
    value: "12", 
    change: "+2", 
    trend: "up",
    icon: CreditCard 
  },
  { 
    title: "Avg. Per Subscription", 
    value: "$23.70", 
    change: "-5%", 
    trend: "down",
    icon: BarChart3 
  },
  { 
    title: "Categories", 
    value: "5", 
    change: "0", 
    trend: "neutral",
    icon: PieChartIcon 
  },
]

export function InsightsPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.title} 
            className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group"
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
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <TrendingUp className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground transition-all duration-200 ease-out group-hover:text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend Chart */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart data={monthlySpending} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      className="transition-all duration-300 ease-out"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="transition-all duration-200 ease-out hover:opacity-80"
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {categoryData.map((category, index) => (
                  <div 
                    key={category.name} 
                    className="flex items-center justify-between p-2 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 cursor-pointer group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full transition-transform duration-200 ease-out group-hover:scale-125"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-foreground">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">${category.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Payments */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Weekly Payment Activity
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
                className="text-xs"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="payments" 
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
