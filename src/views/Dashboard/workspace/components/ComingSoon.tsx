import React from 'react'
import { Shield, Download, Settings, Network, Folder, MessageSquare, HardDrive, Lock, Sparkles } from 'lucide-react'

export const WorkspaceComingSoon: React.FC = () => {
  const features = [
    { 
      icon: Shield, 
      label: 'Isolated Context', 
      desc: 'Session based context' 
    },
    { 
      icon: Download, 
      label: 'Install & Manage', 
      desc: 'Local installation, centralized control' 
    },
    { 
      icon: Settings, 
      label: 'Customize', 
      desc: 'Full configuration control' 
    },
    { 
      icon: Network, 
      label: 'Connect Agents', 
      desc: 'Build powerful agent networks' 
    },
    { 
      icon: Folder, 
      label: 'Projects', 
      desc: 'Organize by workflow needs' 
    },
    { 
      icon: MessageSquare, 
      label: 'Chat Integration', 
      desc: 'Unified communication hub' 
    },
    { 
      icon: HardDrive, 
      label: '100% Local', 
      desc: 'Maximum privacy & control' 
    },
    { 
      icon: Lock, 
      label: 'Permissions', 
      desc: 'Fine-grained access control' 
    },
  ]

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              Work<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">space</span>
            </h2>
            <Sparkles size={18} className="text-accent" />
          </div>
          <p className="text-sm text-foreground/40">
            Your command center for agent orchestration
          </p>
        </div>
        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20">
          Coming Soon
        </span>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <div 
              key={i} 
              className="group relative p-4 rounded-xl border border-foreground/5 bg-foreground/[0.02] hover:border-primary/20 hover:bg-foreground/5 transition-all duration-300 cursor-default animate-fade-in opacity-0 [animation-fill-mode:forwards]"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {feature.label}
                  </h3>
                  <p className="text-xs text-foreground/40 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-foreground/30">
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Build powerful workflows
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-accent" />
            Complete privacy
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-primary" />
            Full control
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-accent" />
            All local
          </span>
        </div>
      </div>
    </div>
  )
}

