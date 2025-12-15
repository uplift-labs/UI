import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getUserInstalledAgentsWithDetails, InstalledAgentWithDetails } from '@/services/dashboard/workspace/installedAgentsService'
import { InstalledAgentSidebar } from './InstalledAgentSidebar'
import { InstalledAgentDetail } from './InstalledAgentDetail'
import { AlertCircle, RefreshCw, Store, Package, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'

export const WorkspaceContent: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [installedAgents, setInstalledAgents] = useState<InstalledAgentWithDetails[]>([])
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInstalledAgents()
  }, [])

  // Handle agent selection from URL query param
  useEffect(() => {
    const agentParam = searchParams.get('agent')
    if (agentParam && installedAgents.find(ia => ia.agent.id === agentParam)) {
      setSelectedAgentId(agentParam)
    }
  }, [searchParams, installedAgents])

  const fetchInstalledAgents = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const agents = await getUserInstalledAgentsWithDetails()
      setInstalledAgents(agents)

      // Check URL param first, then auto-select first agent
      const agentParam = searchParams.get('agent')
      if (agentParam && agents.find(ia => ia.agent.id === agentParam)) {
        setSelectedAgentId(agentParam)
      } else if (agents.length > 0 && !selectedAgentId) {
        // Auto-select first agent if none selected
        setSelectedAgentId(agents[0].agent.id)
      } else if (agents.length === 0) {
        setSelectedAgentId(null)
      }
    } catch (error: any) {
      console.error('Error fetching installed agents:', error)
      // Convert technical errors to friendly messages
      let friendlyError = error?.message || "Looks like I'm unable to connect with your system. Please check your internet connection and try again."

      if (friendlyError.includes('timeout') || friendlyError.includes('Timeout')) {
        friendlyError = "Looks like I'm unable to connect with your system. Please check your internet connection and try again."
      } else if (friendlyError.includes('not authenticated') || friendlyError.includes('401')) {
        friendlyError = "Your session has expired. Please log in again."
      }

      setError(friendlyError)
      setInstalledAgents([]) // Clear agents on error
    } finally {
      setIsLoading(false)
    }
  }

  const selectedInstalledAgent = installedAgents.find(
    ia => ia.agent.id === selectedAgentId
  ) || null

  const handleNavigateToStore = () => {
    navigate('/store') // Navigate to marketplace
  }

  const handleBack = () => {
    setSelectedAgentId(null)
  }

  const hasAgents = installedAgents.length > 0

  // Loading state - full width
  if (isLoading) {
    return (
      <div className="flex w-full h-full bg-background items-center justify-center">
        <Spinner size="lg" label="Loading workspace" sublabel="Fetching your agents..." />
      </div>
    )
  }

  // Error state - full width
  if (error) {
    return (
      <div className="flex w-full h-full bg-background items-center justify-center p-8">
        <div className="text-center space-y-5 max-w-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="text-destructive" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Unable to Load Agents</h2>
            <p className="text-sm text-foreground/50 leading-relaxed">{error}</p>
          </div>
          <Button onClick={fetchInstalledAgents} variant="default" className="gap-2">
            <RefreshCw size={16} />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // No agents - full width empty state
  if (!hasAgents) {
    return (
      <div className="flex w-full h-full bg-background items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
              <Package size={32} className="text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">No Agents Installed</h2>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Get started by browsing the Uplift Store and installing your first agent.
            </p>
          </div>
          <Button onClick={handleNavigateToStore} variant="default" className="gap-2">
            <Sparkles size={16} />
            Explore Uplift Store
          </Button>
        </div>
      </div>
    )
  }

  // Has agents - show sidebar + content
  return (
    <div className="flex w-full h-full bg-background">
      {/* Sidebar - only shown when there are agents */}
      <div className="w-52 lg:w-56 flex-shrink-0 border-r border-foreground/5 bg-foreground/[0.01]">
        <InstalledAgentSidebar
          onNavigateToStore={handleNavigateToStore}
          installedAgents={installedAgents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={setSelectedAgentId}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {selectedInstalledAgent ? (
          <ScrollArea className="h-full">
            <InstalledAgentDetail
              installedAgent={selectedInstalledAgent}
              onBack={handleBack}
              onUninstall={fetchInstalledAgents}
            />
          </ScrollArea>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4 max-w-sm">
              <p className="text-sm text-foreground/50">
                Select an agent from the sidebar to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

