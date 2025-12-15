import React from 'react'

export const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="relative">
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-lg opacity-50 animate-pulse" />
        
        {/* Content */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-bl-md bg-foreground/[0.04] border border-foreground/5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-bounce" />
          </div>
          <span className="text-xs text-foreground/40">Thinking</span>
        </div>
      </div>
    </div>
  )
}

