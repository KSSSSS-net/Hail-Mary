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
        "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200 group",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <div className={cn(
        "p-2 rounded-xl transition-all duration-200",
        isActive && "bg-primary/10"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
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
      <div className="flex items-end gap-1 bg-card/80 backdrop-blur-xl border border-border rounded-2xl px-3 py-2 shadow-2xl shadow-black/50">
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
        
        {/* Center Add Button */}
        <div className="relative -mt-4 mx-2">
          <button 
            onClick={onAddClick}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-7 h-7" />
          </button>
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
