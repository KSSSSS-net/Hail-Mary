"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"

interface AddSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSubscriptionDialog({ open, onOpenChange }: AddSubscriptionDialogProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [billingDate, setBillingDate] = useState("")

  const handleSubmit = () => {
    // Handle subscription creation
    onOpenChange(false)
    setName("")
    setAmount("")
    setCategory("")
    setBillingDate("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Subscription</DialogTitle>
          <DialogDescription>
            Add a new subscription to track your recurring expenses.
          </DialogDescription>
        </DialogHeader>
        
        <FieldGroup className="py-4">
          <Field>
            <FieldLabel htmlFor="name">Subscription Name</FieldLabel>
            <Input
              id="name"
              placeholder="e.g., Netflix, Spotify"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="amount">Monthly Amount</FieldLabel>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Field>
          
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
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
            <FieldLabel htmlFor="billing-date">Billing Date</FieldLabel>
            <Input
              id="billing-date"
              type="date"
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Add Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
