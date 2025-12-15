import React from 'react'
import { Sparkles } from 'lucide-react'

export const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md mx-auto animate-fade-in">
        {/* Glowing orb */}
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
            <Sparkles size={24} className="text-primary animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-lg sm:text-xl text-foreground/80 font-medium">
            How can I help you today?
          </p>
          <p className="text-xs sm:text-sm text-foreground/40">
            Type a message below to get started
          </p>
        </div>
      </div>
    </div>
  )
}

