import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonSpinner } from '@/components/ui/spinner'

interface InstalledAgentUninstallProps {
  agentName: string
  isUninstalling: boolean
  onUninstall: () => void
}

export const InstalledAgentUninstall: React.FC<InstalledAgentUninstallProps> = ({
  agentName,
  isUninstalling,
  onUninstall,
}) => {
  const handleClick = () => {
    if (!confirm(`Are you sure you want to uninstall ${agentName}?`)) {
      return
    }
    onUninstall()
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <p>Uninstall Agent</p>
        <p className="text-sm text-foreground/60">Uninstall your agent from the operating system</p>
      </div>
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={isUninstalling}
      >
        {isUninstalling ? (
          <>
            <ButtonSpinner className="mr-2" />
            Uninstalling...
          </>
        ) : (
          <>
            Uninstall
          </>
        )}
      </Button>
    </div>
  )
}

