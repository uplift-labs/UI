import React from 'react'
import { SearchX } from 'lucide-react'

export const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4 max-w-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center">
          <SearchX size={24} className="text-foreground/30" />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground/70">
            No agents found
          </p>
          <p className="text-xs text-foreground/40 leading-relaxed">
            Try adjusting your filters or search terms to discover more agents
          </p>
        </div>
      </div>
    </div>
  )
}

