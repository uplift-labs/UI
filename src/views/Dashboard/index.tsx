import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AgentDetail } from "@/views/Dashboard/agents"

import { Dock } from "@/views/Dashboard/dock"
import { Hub } from "@/views/Dashboard/hub"
import { links } from "@/config/static"
import { Agent } from '@/services/dashboard/hub/agentService'
import { ScrollArea } from '@/components/ui/scroll-area'

function Dashboard({ id = links[0].href }: { id?: string }) {
  const { id: agentId } = useParams()
  const navigate = useNavigate()

  // Handle agent selection from Hub
  const handleSelectAgent = (agent: Agent) => {
    navigate(`/store/${agent.id}`)
  }

  // Get the current view component
  const getCurrentContent = () => {
    // Check if we're on an agent detail page (store route)
    if (agentId && id === '/store') {
      return (
        <ScrollArea className="h-full">
          <AgentDetail />
        </ScrollArea>
      )
    }

    // Show Hub for /store route (marketplace)
    if (id === '/store') {
      return <Hub onSelectAgent={handleSelectAgent} />
    }

    // Default: render the component from links
    return links.find((view) => view.href === id)?.component
  }

  return (
    <div className="h-[calc(100vh-32px)] flex flex-row">
      {/* Vertical Dock on Left */}
      <div className="flex-shrink-0 border-r border-foreground/5 bg-background/50 backdrop-blur-sm">
        <Dock />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {getCurrentContent()}
      </div>
    </div>
  )
}

export { Dashboard }