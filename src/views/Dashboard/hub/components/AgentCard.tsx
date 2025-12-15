import React, { useState, CSSProperties } from 'react'
import { Agent } from '@/services/dashboard/hub/agentService'
import { ChevronRight } from 'lucide-react'

interface AgentCardProps {
  agent: Agent
  onSelectAgent: (agent: Agent) => void
  style?: CSSProperties
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onSelectAgent,
  style
}) => {
  const [imageError, setImageError] = useState(false)
  
  const handleView = () => {
    onSelectAgent(agent)
  }

  // Get description from builds or use author as fallback
  const description = agent.builds?.[0]?.description || agent.author || 'Agent by ' + agent.author

  return (
    <div 
      onClick={handleView} 
      className="group cursor-pointer p-4 flex flex-col gap-3 rounded-xl border border-foreground/5 bg-foreground/[0.02] hover:bg-foreground/5 hover:border-foreground/10 transition-all duration-300 animate-fade-in opacity-0 [animation-fill-mode:forwards]"
      style={style}
    >
      <div className="flex items-start gap-3">
        {/* Logo */}
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-gradient-to-br from-foreground/10 to-foreground/5 p-2 border border-foreground/10 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
          {agent.logo_url && !imageError ? (
            <img 
              src={agent.logo_url} 
              alt={agent.name} 
              className="w-full h-full object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-foreground/40 text-lg font-semibold">
              {agent.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <h3 className="text-base font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {agent.name}
          </h3>
          <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <ChevronRight 
          size={18} 
          className="flex-shrink-0 text-foreground/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-0.5" 
        />
      </div>

      {/* Author tag */}
      {agent.author && (
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-medium">
            by {agent.author}
          </span>
        </div>
      )}
    </div>
  )
}

