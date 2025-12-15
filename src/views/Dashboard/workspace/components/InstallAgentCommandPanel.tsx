import React, { useState } from 'react'
import { Agent } from '@/services/dashboard/hub/agentService'
import { InstalledAgentConfiguration } from './InstalledAgentConfiguration'
import { InstalledAgentActions } from './InstalledAgentActions'
import { cn } from '@/lib/utils'
import { Play, Settings } from 'lucide-react'

interface AgentCommandPanelProps {
    agent: Agent
    onBack: () => void
    onUninstall: () => void
}

export const AgentCommandPanel: React.FC<AgentCommandPanelProps> = ({
    agent,
    onBack,
    onUninstall,
}) => {
    const [activeTab, setActiveTab] = useState<'actions' | 'configuration'>('actions')

    const tabs = [
        { id: 'actions', label: 'Actions', icon: <Play className='h-3.5 w-3.5' /> },
        { id: 'configuration', label: 'Configuration', icon: <Settings className='h-3.5 w-3.5' /> },
    ] as const

    return (
        <div className="flex flex-col w-full h-full">
            {/* Tab Header */}
            <div className="flex items-center gap-1 p-3 border-b border-foreground/5 bg-foreground/[0.01]">
                <div className="flex items-center gap-1 p-1 bg-foreground/5 rounded-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md flex items-center gap-2',
                                activeTab === tab.id
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-foreground/50 hover:text-foreground/70 hover:bg-foreground/5'
                            )}
                        >
                            <span className={activeTab === tab.id ? 'text-primary' : ''}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {activeTab === 'actions' && (
                    <div className="p-4 sm:p-6">
                        <InstalledAgentActions
                            agent={agent}
                            onBack={onBack}
                            onUninstall={onUninstall}
                        />
                    </div>
                )}

                {activeTab === 'configuration' && (
                    <InstalledAgentConfiguration agent={agent} />
                )}
            </div>
        </div>
    )
}

