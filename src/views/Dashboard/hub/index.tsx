import React from 'react'
import { SearchBar } from './search'
import { Header, FilterSection, AgentsGrid, EmptyState, ResultsCount, Tabs } from './components'
import { useAgentsFilter } from './hooks/useAgentsFilter'
import { useAgentStore } from '@/store/agentStore'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircle, RefreshCw } from 'lucide-react'

export function Hub({ onSelectAgent }: { onSelectAgent?: (agent: any) => void }) {
  const {
    agents,
    filteredAgents,
    categories,
    selectedType,
    searchQuery,
    activeTab,
    setSelectedType,
    setSearchQuery,
    setActiveTab,
  } = useAgentsFilter()
  const { isLoading, error, fetchAgents, fetchInstalledAgents } = useAgentStore()
  const handleSelectAgent = onSelectAgent || (() => { })
  
  const handleRetry = () => {
    fetchAgents()
    fetchInstalledAgents()
  }

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4">
          <Header />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Tabs & Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-foreground/10 pb-4">
          <Tabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
          <FilterSection
            categories={categories}
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-hidden">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size="lg" label="Loading agents" sublabel="Discovering what's available..." />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-5 max-w-sm">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="text-destructive" size={32} />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Unable to Load Agents</h2>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {error}
                </p>
              </div>
              <Button 
                onClick={handleRetry} 
                variant="default"
                className="gap-2"
              >
                <RefreshCw size={16} />
                Try Again
              </Button>
            </div>
          </div>
        ) : filteredAgents.length > 0 ? (
          <>
            <ResultsCount filtered={filteredAgents.length} total={agents.length} />
            <AgentsGrid agents={filteredAgents} onSelectAgent={handleSelectAgent} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
