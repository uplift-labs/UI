import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import { InstalledAgentWithDetails } from '@/services/dashboard/workspace/installedAgentsService'
import { Store, Package, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InstalledAgentSidebarProps {
  installedAgents: InstalledAgentWithDetails[]
  selectedAgentId: string | null
  onSelectAgent: (agentId: string) => void
  isLoading: boolean
  onNavigateToStore: () => void
}

export const InstalledAgentSidebar: React.FC<InstalledAgentSidebarProps> = ({
  installedAgents,
  selectedAgentId,
  onSelectAgent,
  isLoading,
  onNavigateToStore,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <SidebarHeader count={0} onNavigateToStore={onNavigateToStore} />
        <div className="flex-1 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      </div>
    )
  }

  if (installedAgents.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <SidebarHeader count={0} onNavigateToStore={onNavigateToStore} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
            <Package size={24} className="text-foreground/30" />
          </div>
          <p className="text-sm font-medium text-foreground/70 mb-1">No agents installed</p>
          <p className="text-xs text-foreground/40 mb-4 leading-relaxed">
            Browse the store to discover and install agents
          </p>
          <Button
            variant="default"
            size="sm"
            className="gap-2"
            onClick={onNavigateToStore}
          >
            <Sparkles size={14} />
            Explore Store
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader count={installedAgents.length} onNavigateToStore={onNavigateToStore} />
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {installedAgents.map((installedAgent) => (
            <AgentSidebarItem
              key={installedAgent.id}
              installedAgent={installedAgent}
              isSelected={selectedAgentId === installedAgent.agent.id}
              onSelect={() => onSelectAgent(installedAgent.agent.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Header Component
const SidebarHeader: React.FC<{ count: number; onNavigateToStore: () => void }> = ({ 
  count, 
  onNavigateToStore 
}) => (
  <div className="p-4 border-b border-foreground/5">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-foreground">My Agents</h2>
        <p className="text-xs text-foreground/40 mt-0.5">
          {count > 0 ? `${count} installed` : 'Get started'}
        </p>
      </div>
      <button 
        onClick={onNavigateToStore}
        className="p-2 rounded-lg hover:bg-foreground/5 transition-colors group"
        title="Browse Store"
      >
        <Store size={18} className="text-foreground/40 group-hover:text-primary transition-colors" />
      </button>
    </div>
  </div>
)

// Agent Item Component
const AgentSidebarItem: React.FC<{
  installedAgent: InstalledAgentWithDetails
  isSelected: boolean
  onSelect: () => void
}> = ({ installedAgent, isSelected, onSelect }) => {
  const [imageError, setImageError] = useState(false)
  const agent = installedAgent.agent

  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer p-3 rounded-lg transition-all duration-200 group flex items-center gap-3
        ${isSelected
          ? 'bg-primary/10 border border-primary/20'
          : 'hover:bg-foreground/5 border border-transparent'
        }
      `}
    >
      {/* Logo */}
      <div className={`
        w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 
        border transition-colors
        ${isSelected 
          ? 'border-primary/30 bg-primary/5' 
          : 'border-foreground/10 bg-foreground/5 group-hover:border-foreground/20'
        }
      `}>
        {agent.logo_url && !imageError ? (
          <img
            src={agent.logo_url}
            alt={agent.name}
            className="w-full h-full object-contain p-1"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`text-sm font-semibold ${isSelected ? 'text-primary' : 'text-foreground/40'}`}>
            {agent.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate transition-colors ${
          isSelected ? 'text-primary' : 'text-foreground group-hover:text-foreground'
        }`}>
          {agent.name}
        </h3>
        <p className="text-xs text-foreground/40 truncate">
          {agent.author}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight 
        size={16} 
        className={`flex-shrink-0 transition-all ${
          isSelected 
            ? 'text-primary opacity-100' 
            : 'text-foreground/20 opacity-0 group-hover:opacity-100'
        }`}
      />
    </div>
  )
}

