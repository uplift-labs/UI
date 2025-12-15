import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

export const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/workspace')
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-lg hover:bg-foreground/10 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} className="text-foreground/50" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            Uplift<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Hub</span>
          </h1>
          <Sparkles size={16} className="text-accent" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-foreground/40 ml-10">
        Discover and install agents to supercharge your workflow
      </p>
    </div>
  )
}

