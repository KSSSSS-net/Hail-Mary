"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, Smartphone, Plus, X, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"

interface ContactItem {
  id: string
  value: string
  verified: boolean
}

interface NotificationChannel {
  enabled: boolean
  contacts: ContactItem[]
}

export function AlertsPage() {
  const [pushEnabled, setPushEnabled] = useState(true)
  
  const [emailNotif, setEmailNotif] = useState<NotificationChannel>({
    enabled: true,
    contacts: [
      { id: "1", value: "john@example.com", verified: true },
      { id: "2", value: "john.work@company.com", verified: true },
    ]
  })
  
  const [smsNotif, setSmsNotif] = useState<NotificationChannel>({
    enabled: false,
    contacts: [
      { id: "1", value: "+1 (555) 123-4567", verified: true },
    ]
  })
  
  const [whatsappNotif, setWhatsappNotif] = useState<NotificationChannel>({
    enabled: true,
    contacts: [
      { id: "1", value: "+1 (555) 123-4567", verified: true },
    ]
  })

  const [newEmail, setNewEmail] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [newWhatsapp, setNewWhatsapp] = useState("")
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [showSmsInput, setShowSmsInput] = useState(false)
  const [showWhatsappInput, setShowWhatsappInput] = useState(false)

  const addEmail = () => {
    if (newEmail.trim() && newEmail.includes("@")) {
      setEmailNotif(prev => ({
        ...prev,
        contacts: [...prev.contacts, { id: Date.now().toString(), value: newEmail.trim(), verified: false }]
      }))
      setNewEmail("")
      setShowEmailInput(false)
    }
  }

  const removeEmail = (id: string) => {
    setEmailNotif(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id)
    }))
  }

  const addSms = () => {
    if (newPhone.trim()) {
      setSmsNotif(prev => ({
        ...prev,
        contacts: [...prev.contacts, { id: Date.now().toString(), value: newPhone.trim(), verified: false }]
      }))
      setNewPhone("")
      setShowSmsInput(false)
    }
  }

  const removeSms = (id: string) => {
    setSmsNotif(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id)
    }))
  }

  const addWhatsapp = () => {
    if (newWhatsapp.trim()) {
      setWhatsappNotif(prev => ({
        ...prev,
        contacts: [...prev.contacts, { id: Date.now().toString(), value: newWhatsapp.trim(), verified: false }]
      }))
      setNewWhatsapp("")
      setShowWhatsappInput(false)
    }
  }

  const removeWhatsapp = (id: string) => {
    setWhatsappNotif(prev => ({
      ...prev,
      contacts: prev.contacts.filter(c => c.id !== id)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Push Notifications */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 transition-all duration-200 ease-out group-hover:scale-105">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Push Notifications</CardTitle>
              <CardDescription>Receive alerts directly on your device</CardDescription>
            </div>
            <Switch 
              checked={pushEnabled} 
              onCheckedChange={setPushEnabled}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">
            {pushEnabled 
              ? "You will receive push notifications for upcoming payments and subscription renewals."
              : "Push notifications are disabled. Enable to stay updated on your subscriptions."}
          </p>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 transition-all duration-200 ease-out group-hover:scale-105">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Email Notifications</CardTitle>
              <CardDescription>Get alerts sent to your email addresses</CardDescription>
            </div>
            <Switch 
              checked={emailNotif.enabled} 
              onCheckedChange={(checked) => setEmailNotif(prev => ({ ...prev, enabled: checked }))}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {emailNotif.enabled && (
            <>
              <div className="space-y-2">
                {emailNotif.contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border transition-all duration-200 ease-out hover:bg-secondary hover:border-primary/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{contact.value}</span>
                      {contact.verified ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-0 text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeEmail(contact.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-all duration-200 ease-out hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {showEmailInput ? (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addEmail()}
                    className="flex-1"
                  />
                  <Button onClick={addEmail} size="sm">Add</Button>
                  <Button variant="ghost" size="sm" onClick={() => { setShowEmailInput(false); setNewEmail("") }}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowEmailInput(true)}
                  className="w-full border-dashed transition-all duration-200 ease-out hover:border-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Email Address
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 transition-all duration-200 ease-out group-hover:scale-105">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">SMS Notifications</CardTitle>
              <CardDescription>Receive text message alerts</CardDescription>
            </div>
            <Switch 
              checked={smsNotif.enabled} 
              onCheckedChange={(checked) => setSmsNotif(prev => ({ ...prev, enabled: checked }))}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {smsNotif.enabled && (
            <>
              <div className="space-y-2">
                {smsNotif.contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border transition-all duration-200 ease-out hover:bg-secondary hover:border-primary/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{contact.value}</span>
                      {contact.verified ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-0 text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeSms(contact.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-all duration-200 ease-out hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {showSmsInput ? (
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSms()}
                    className="flex-1"
                  />
                  <Button onClick={addSms} size="sm">Add</Button>
                  <Button variant="ghost" size="sm" onClick={() => { setShowSmsInput(false); setNewPhone("") }}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSmsInput(true)}
                  className="w-full border-dashed transition-all duration-200 ease-out hover:border-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Phone Number
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* WhatsApp Notifications */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 transition-all duration-200 ease-out group-hover:scale-105">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">WhatsApp Notifications</CardTitle>
              <CardDescription>Get alerts via WhatsApp messages</CardDescription>
            </div>
            <Switch 
              checked={whatsappNotif.enabled} 
              onCheckedChange={(checked) => setWhatsappNotif(prev => ({ ...prev, enabled: checked }))}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {whatsappNotif.enabled && (
            <>
              <div className="space-y-2">
                {whatsappNotif.contacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border transition-all duration-200 ease-out hover:bg-secondary hover:border-primary/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{contact.value}</span>
                      {contact.verified ? (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-0 text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeWhatsapp(contact.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-all duration-200 ease-out hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {showWhatsappInput ? (
                <div className="flex gap-2">
                  <Input
                    type="tel"
                    placeholder="Enter WhatsApp number"
                    value={newWhatsapp}
                    onChange={(e) => setNewWhatsapp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addWhatsapp()}
                    className="flex-1"
                  />
                  <Button onClick={addWhatsapp} size="sm">Add</Button>
                  <Button variant="ghost" size="sm" onClick={() => { setShowWhatsappInput(false); setNewWhatsapp("") }}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowWhatsappInput(true)}
                  className="w-full border-dashed transition-all duration-200 ease-out hover:border-primary hover:bg-primary/5"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add WhatsApp Number
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
