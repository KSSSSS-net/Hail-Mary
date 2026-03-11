"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { useSubscriptions, type BillingFrequency, type Subscription } from "@/lib/subscription-context"
import { Loader2 } from "lucide-react"

interface EditSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subscription: Subscription | null
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

export function EditSubscriptionDialog({ open, onOpenChange, subscription }: EditSubscriptionDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [billingFrequency, setBillingFrequency] = useState<BillingFrequency>("monthly")
  const [billingDate, setBillingDate] = useState("")
  const [loading, setLoading] = useState(false)
  const { updateSubscription } = useSubscriptions()

  useEffect(() => {
    if (subscription) {
      setName(subscription.name)
      setAmount(subscription.amount.toString())
      setCategory(subscription.category)
      setBillingFrequency(subscription.billing_frequency || "monthly")
      setBillingDate(subscription.billing_date)
    }
  }, [subscription])

  const handleSubmit = async () => {
    if (!subscription || !name || !amount || !category || !billingDate) return

    setLoading(true)
    try {
      await updateSubscription(subscription.id, {
        name,
        amount: parseFloat(amount),
        category,
        billing_frequency: billingFrequency,
        billing_date: billingDate,
        logo: name.charAt(0).toUpperCase(),
        color: categoryColors[category] || subscription.color,
      })
      
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Subscription</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update your subscription details.
          </DialogDescription>
        </DialogHeader>
        
        <FieldGroup className="py-4">
          <Field>
            <FieldLabel htmlFor="edit-name" className="text-foreground">Subscription Name</FieldLabel>
            <Input
              id="edit-name"
              placeholder="e.g., Netflix, Spotify"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary transition-all duration-200"
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="edit-amount" className="text-foreground">Amount (₹)</FieldLabel>
            <Input
              id="edit-amount"
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
            <FieldLabel htmlFor="edit-billing-frequency" className="text-foreground">Billing Frequency</FieldLabel>
            <Select value={billingFrequency} onValueChange={(value) => setBillingFrequency(value as BillingFrequency)}>
              <SelectTrigger className="bg-secondary/50 border-border focus:border-primary transition-all duration-200">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly (Every 3 months)</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          
          <Field>
            <FieldLabel htmlFor="edit-category" className="text-foreground">Category</FieldLabel>
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
            <FieldLabel htmlFor="edit-billing-date" className="text-foreground">Next Billing Date</FieldLabel>
            <Input
              id="edit-billing-date"
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
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
