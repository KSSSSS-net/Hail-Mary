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
import { MoreHorizontal, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSubscriptions } from "@/lib/subscription-context"

const categoryColors: Record<string, string> = {
  entertainment: "bg-pink-500/20 text-pink-400",
  music: "bg-green-500/20 text-green-400",
  productivity: "bg-blue-500/20 text-blue-400",
  storage: "bg-cyan-500/20 text-cyan-400",
  software: "bg-orange-500/20 text-orange-400",
  gaming: "bg-purple-500/20 text-purple-400",
  fitness: "bg-yellow-500/20 text-yellow-400",
  news: "bg-red-500/20 text-red-400",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function SubscriptionsTable() {
  const { subscriptions, deleteSubscription } = useSubscriptions()

  const handleDelete = async (id: string) => {
    await deleteSubscription(id)
  }

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
                      {sub.logo || sub.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:translate-x-1">{sub.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground transition-colors duration-200 ease-out group-hover:text-foreground">{formatDate(sub.purchase_date)}</TableCell>
                <TableCell className="text-foreground font-medium">{formatDate(sub.billing_date)}</TableCell>
                <TableCell className="font-semibold text-foreground transition-all duration-200 ease-out group-hover:text-primary group-hover:scale-105 origin-left">₹{Number(sub.amount).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${categoryColors[sub.category] || "bg-gray-500/20 text-gray-400"} border-0 font-medium transition-all duration-200 ease-out hover:scale-105 capitalize`}>
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
                      <DropdownMenuItem className="cursor-pointer gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer text-destructive gap-2"
                        onClick={() => handleDelete(sub.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
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
          Monthly total: <span className="text-primary">₹{subscriptions.reduce((acc, sub) => acc + Number(sub.amount), 0).toFixed(2)}</span>
        </span>
      </div>
    </div>
  )
}
