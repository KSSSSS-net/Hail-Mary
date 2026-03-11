"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  CreditCard, 
  LogOut, 
  Camera, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  ChevronRight,
  Check,
  Sparkles
} from "lucide-react"

const billingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["Up to 5 subscriptions", "Basic analytics", "Email reminders"],
    current: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    features: ["Unlimited subscriptions", "Advanced analytics", "All notification channels", "Export reports"],
    current: true
  },
  {
    name: "Team",
    price: "$24.99",
    period: "/month",
    features: ["Everything in Pro", "Team sharing", "Admin controls", "Priority support"],
    current: false
  }
]

const settingsOptions = [
  { icon: Bell, label: "Notification Sound", hasToggle: true, defaultValue: true },
  { icon: Moon, label: "Dark Mode", hasToggle: true, defaultValue: true },
  { icon: Shield, label: "Two-Factor Auth", hasToggle: true, defaultValue: false },
  { icon: Globe, label: "Language", value: "English (US)", hasArrow: true },
]

export function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<Record<string, boolean>>({
    "Notification Sound": true,
    "Dark Mode": true,
    "Two-Factor Auth": false,
  })

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <CardContent className="-mt-12 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-card shadow-xl transition-transform duration-300 ease-out group-hover:scale-105">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 ease-out hover:scale-110">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-left-2 duration-300">
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="max-w-xs bg-secondary/50 border-border focus:border-primary transition-all duration-200"
                    placeholder="Your name"
                  />
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="max-w-sm bg-secondary/50 border-border focus:border-primary transition-all duration-200"
                    placeholder="Your email"
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setIsEditing(false)}
                      className="transition-all duration-200 ease-out hover:scale-105"
                    >
                      Save Changes
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setIsEditing(false)}
                      className="transition-all duration-200 ease-out hover:scale-105"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3 transition-all duration-200 ease-out hover:scale-105 hover:border-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-200 ease-out">
              <Sparkles className="w-3 h-3 mr-1" />
              Pro Plan
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Billing Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Billing & Plans
          </CardTitle>
          <CardDescription>Manage your subscription and payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {billingPlans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative p-4 rounded-xl border transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer group ${
                  plan.current 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                    : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.current && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground animate-pulse">
                    Current
                  </Badge>
                )}
                <h3 className="font-semibold text-foreground mb-1">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.current ? "secondary" : "outline"} 
                  className="w-full transition-all duration-200 ease-out hover:scale-[1.02]"
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Preferences
          </CardTitle>
          <CardDescription>Customize your app experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {settingsOptions.map((option, index) => (
            <div 
              key={option.label}
              className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 ease-out hover:bg-secondary/50 cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50 transition-all duration-200 ease-out group-hover:bg-primary/10 group-hover:scale-105">
                  <option.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                </div>
                <span className="text-foreground font-medium">{option.label}</span>
              </div>
              {option.hasToggle ? (
                <Switch 
                  checked={settings[option.label]}
                  onCheckedChange={(checked) => setSettings({ ...settings, [option.label]: checked })}
                  className="transition-all duration-200 ease-out"
                />
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{option.value}</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-destructive/30 hover:shadow-lg hover:shadow-destructive/5 group">
        <CardContent className="p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 ease-out group"
          >
            <LogOut className="w-5 h-5 mr-3 transition-transform duration-200 ease-out group-hover:-translate-x-1" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
