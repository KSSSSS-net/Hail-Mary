"use client"

import { LayoutDashboard, Bell, LineChart, Settings, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabType = "overview" | "alerts" | "insights" | "settings"

interface DockItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

function DockItem({ icon, label, isActive, onClick }: DockItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 ease-out group relative",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-secondary/50 group-hover:-translate-y-1 group-active:scale-95",
        isActive && "bg-primary/10 shadow-lg shadow-primary/20"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium transition-all duration-200 ease-out group-hover:translate-y-0.5">{label}</span>
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ease-out" />
      )}
    </button>
  )
}

interface FloatingDockProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  onAddClick: () => void
}

export function FloatingDock({ activeTab, onTabChange, onAddClick }: FloatingDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-1 bg-card/80 backdrop-blur-xl border border-border rounded-2xl px-3 py-2 shadow-2xl shadow-black/50 transition-all duration-300 ease-out hover:shadow-primary/10 hover:border-primary/20">
        <DockItem 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="Overview" 
          isActive={activeTab === "overview"}
          onClick={() => onTabChange("overview")}
        />
        <DockItem 
          icon={<Bell className="w-5 h-5" />} 
          label="Alerts" 
          isActive={activeTab === "alerts"}
          onClick={() => onTabChange("alerts")}
        />
        
        {/* Center Add Button - Elevated above dock */}
        <div className="relative mx-2 -mb-1">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-float">
            <button 
              onClick={onAddClick}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 ease-out group animate-pulse-glow"
            >
              <Plus className="w-7 h-7 transition-transform duration-300 ease-out group-hover:rotate-90" />
            </button>
          </div>
          <div className="w-14 h-6" /> {/* Spacer to maintain dock width */}
        </div>
        
        <DockItem 
          icon={<LineChart className="w-5 h-5" />} 
          label="Insights" 
          isActive={activeTab === "insights"}
          onClick={() => onTabChange("insights")}
        />
        <DockItem 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
          isActive={activeTab === "settings"}
          onClick={() => onTabChange("settings")}
        />
      </div>
    </div>
  )
}
