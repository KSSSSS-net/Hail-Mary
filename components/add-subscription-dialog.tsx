"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { useSubscriptions } from "@/lib/subscription-context"
import { Loader2 } from "lucide-react"

interface AddSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categoryColors: Record<string, string> = {
  entertainment: "bg-red-500",
  music: "bg-green-500",
  productivity: "bg-blue-500",
  storage: "bg-purple-500",
  software: "bg-orange-500",
  gaming: "bg-pink-500",
  fitness: "bg-yellow-500",
  news: "bg-cyan-500",
}

export function AddSubscriptionDialog({ open, onOpenChange }: AddSubscriptionDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [billingDate, setBillingDate] = useState("")
  const [loading, setLoading] = useState(false)
  const { addSubscription } = useSubscriptions()

  const handleSubmit = () => {
    if (!name || !amount || !category || !billingDate) return

    addSubscription({
      name,
      amount: parseFloat(amount),
      category,
      billing_date: billingDate,
      purchase_date: new Date().toISOString().split("T")[0],
      logo: name.charAt(0).toUpperCase(),
      color: categoryColors[category] || "bg-primary",
    })
    
    onOpenChange(false)
    setName("")
    setAmount("")
    setCategory("")
    setBillingDate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Subscription</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new subscription to track your recurring expenses.
          </DialogDescription>
        </DialogHeader>
        
        <FieldGroup className="py-4">
          <Field>
            <FieldLabel htmlFor="name" className="text-foreground">Subscription Name</FieldLabel>
            <Input
              id="name"
              placeholder="e.g., Netflix, Spotify"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary transition-all duration-200"
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="amount" className="text-foreground">Monthly Amount</FieldLabel>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary transition-all duration-200"
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="category" className="text-foreground">Category</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-secondary/50 border-border focus:border-primary transition-all duration-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="news">News</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          
          <Field>
            <FieldLabel htmlFor="billing-date" className="text-foreground">Next Billing Date</FieldLabel>
            <Input
              id="billing-date"
              type="date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary transition-all duration-200"
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-border hover:bg-secondary transition-all duration-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={loading || !name || !amount || !category || !billingDate}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Subscription"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
