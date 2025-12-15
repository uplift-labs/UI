import React from 'react'
import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
  sublabel?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
}

const dotSizeClasses = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className,
  label,
  sublabel 
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-foreground/5" />
        {/* Spinning gradient ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/50 animate-spin" />
        {/* Inner glow - only for lg size */}
        {size === 'lg' && (
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
        )}
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn("rounded-full bg-primary animate-pulse", dotSizeClasses[size])} />
        </div>
      </div>
      
      {/* Labels */}
      {(label || sublabel) && (
        <div className="text-center space-y-1">
          {label && <p className="text-sm font-medium text-foreground/70">{label}</p>}
          {sublabel && <p className="text-xs text-foreground/40">{sublabel}</p>}
        </div>
      )}
    </div>
  )
}

// Inline spinner for use inside buttons
interface ButtonSpinnerProps {
  className?: string
}

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ className }) => {
  return (
    <div className={cn("relative w-4 h-4", className)}>
      <div className="absolute inset-0 rounded-full border-2 border-current/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin" />
    </div>
  )
}

