import React from 'react'
import { AgentCard } from './AgentCard'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AgentsGridProps {
  agents: any[]
  onSelectAgent: (agent: any) => void
}

export const AgentsGrid: React.FC<AgentsGridProps> = ({
  agents,
  onSelectAgent,
}) => {
  return (
    <ScrollArea className="flex-1 -mx-2 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelectAgent={onSelectAgent}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

