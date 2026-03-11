"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  Sparkles,
  Loader2
} from "lucide-react"
import { useSubscriptions } from "@/lib/subscription-context"
import { createClient } from "@/lib/supabase/client"

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
  const { user } = useSubscriptions()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    avatar: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<Record<string, boolean>>({
    "Notification Sound": true,
    "Dark Mode": true,
    "Two-Factor Auth": false,
  })

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  }

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
                  {getInitials(profile.name)}
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
                    disabled
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => setIsEditing(false)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-95"
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setIsEditing(false)}
                      className="hover:bg-secondary transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
                    <Badge className="bg-primary/20 text-primary border-0 transition-transform duration-200 hover:scale-105">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{profile.email}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                    className="border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Billing & Plans
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your subscription plan and billing preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {billingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative p-4 rounded-xl border transition-all duration-300 ease-out cursor-pointer group hover:-translate-y-1 ${
                  plan.current 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.current && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-0 shadow-lg transition-transform duration-200 group-hover:scale-110">
                    Current
                  </Badge>
                )}
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <Button 
                    className="w-full mt-4 bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 active:scale-95"
                    size="sm"
                  >
                    Upgrade
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Preferences</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize your app experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {settingsOptions.map((option, index) => (
            <div
              key={option.label}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-all duration-200 ease-out cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 transition-transform duration-200 ease-out group-hover:scale-110">
                  <option.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground group-hover:text-primary transition-colors duration-200">{option.label}</span>
              </div>
              {option.hasToggle ? (
                <Switch 
                  checked={settings[option.label]} 
                  onCheckedChange={(checked) => setSettings({ ...settings, [option.label]: checked })}
                  className="transition-all duration-200"
                />
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-sm">{option.value}</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card className="border-border bg-card transition-all duration-300 ease-out hover:border-destructive/30 hover:shadow-lg hover:shadow-destructive/5">
        <CardContent className="p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 group"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:-translate-x-1" />
            )}
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
