import React from 'react'

type TabType = 'recommended' | 'trending'

interface TabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'recommended' as TabType, label: 'Recommended', icon: '✨' },
    { id: 'trending' as TabType, label: 'Trending', icon: '🔥' },
  ]

  return (
    <div className="flex items-center gap-1 p-1 bg-foreground/5 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md flex items-center gap-2 ${
            activeTab === tab.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-foreground/50 hover:text-foreground/70 hover:bg-foreground/5'
          }`}
        >
          <span className="text-xs">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

