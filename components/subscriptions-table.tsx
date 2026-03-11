"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const subscriptions = [
  {
    id: 1,
    name: "Netflix",
    logo: "N",
    color: "bg-red-500",
    purchaseDate: "Jan 15, 2024",
    upcomingPayment: "Mar 15, 2026",
    amount: 15.99,
    category: "Entertainment",
    categoryColor: "bg-pink-500/20 text-pink-400",
  },
  {
    id: 2,
    name: "Spotify",
    logo: "S",
    color: "bg-green-500",
    purchaseDate: "Mar 22, 2023",
    upcomingPayment: "Mar 18, 2026",
    amount: 9.99,
    category: "Music",
    categoryColor: "bg-green-500/20 text-green-400",
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    logo: "A",
    color: "bg-red-600",
    purchaseDate: "Sep 1, 2023",
    upcomingPayment: "Mar 1, 2026",
    amount: 54.99,
    category: "Productivity",
    categoryColor: "bg-blue-500/20 text-blue-400",
  },
  {
    id: 4,
    name: "iCloud+",
    logo: "i",
    color: "bg-blue-400",
    purchaseDate: "Jun 10, 2022",
    upcomingPayment: "Mar 20, 2026",
    amount: 2.99,
    category: "Storage",
    categoryColor: "bg-cyan-500/20 text-cyan-400",
  },
  {
    id: 5,
    name: "GitHub Pro",
    logo: "G",
    color: "bg-gray-700",
    purchaseDate: "Feb 14, 2024",
    upcomingPayment: "Mar 14, 2026",
    amount: 4.00,
    category: "Development",
    categoryColor: "bg-orange-500/20 text-orange-400",
  },
  {
    id: 6,
    name: "Notion",
    logo: "N",
    color: "bg-neutral-800",
    purchaseDate: "Nov 5, 2023",
    upcomingPayment: "Mar 5, 2026",
    amount: 10.00,
    category: "Productivity",
    categoryColor: "bg-blue-500/20 text-blue-400",
  },
  {
    id: 7,
    name: "Disney+",
    logo: "D",
    color: "bg-blue-700",
    purchaseDate: "Dec 25, 2023",
    upcomingPayment: "Mar 25, 2026",
    amount: 13.99,
    category: "Entertainment",
    categoryColor: "bg-pink-500/20 text-pink-400",
  },
  {
    id: 8,
    name: "Figma",
    logo: "F",
    color: "bg-purple-500",
    purchaseDate: "Aug 1, 2023",
    upcomingPayment: "Mar 1, 2026",
    amount: 15.00,
    category: "Design",
    categoryColor: "bg-purple-500/20 text-purple-400",
  },
]

export function SubscriptionsTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 ease-out">
      <div className="px-6 py-4 border-b border-border group/header cursor-default">
        <h2 className="text-lg font-semibold text-foreground transition-all duration-200 ease-out group-hover/header:text-primary">All Subscriptions</h2>
        <p className="text-sm text-muted-foreground transition-all duration-200 ease-out group-hover/header:text-foreground">Manage and track your active subscriptions</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium transition-colors duration-200 ease-out hover:text-foreground cursor-default">Subscription Name</TableHead>
              <TableHead className="text-muted-foreground font-medium transition-colors duration-200 ease-out hover:text-foreground cursor-default">Date of Purchase</TableHead>
              <TableHead className="text-muted-foreground font-medium transition-colors duration-200 ease-out hover:text-foreground cursor-default">Upcoming Payment</TableHead>
              <TableHead className="text-muted-foreground font-medium transition-colors duration-200 ease-out hover:text-foreground cursor-default">Amount</TableHead>
              <TableHead className="text-muted-foreground font-medium transition-colors duration-200 ease-out hover:text-foreground cursor-default">Category</TableHead>
              <TableHead className="text-muted-foreground font-medium w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((sub, index) => (
              <TableRow 
                key={sub.id} 
                className="border-border hover:bg-secondary/50 transition-all duration-300 ease-out group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${sub.color} flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ease-out group-hover:scale-110 group-hover:shadow-xl group-hover:rotate-3`}>
                      {sub.logo}
                    </div>
                    <span className="font-medium text-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:translate-x-1">{sub.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground">{sub.purchaseDate}</TableCell>
                <TableCell className="text-foreground font-medium">{sub.upcomingPayment}</TableCell>
                <TableCell className="font-semibold text-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:scale-105 origin-left">${sub.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${sub.categoryColor} border-0 font-medium transition-all duration-200 ease-out hover:scale-105`}>
                    {sub.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-200 ease-out hover:scale-110 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-destructive">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="px-6 py-4 border-t border-border flex justify-between items-center group/footer cursor-default">
        <span className="text-sm text-muted-foreground transition-all duration-200 ease-out group-hover/footer:text-foreground">{subscriptions.length} active subscriptions</span>
        <span className="text-sm font-semibold text-foreground transition-all duration-200 ease-out group-hover/footer:scale-105 origin-right">
          Monthly total: <span className="text-primary">${subscriptions.reduce((acc, sub) => acc + sub.amount, 0).toFixed(2)}</span>
        </span>
      </div>
    </div>
  )
}
