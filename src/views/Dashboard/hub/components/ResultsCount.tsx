import React from 'react'

interface ResultsCountProps {
  filtered: number
  total: number
}

export const ResultsCount: React.FC<ResultsCountProps> = ({ filtered, total }) => {
  const isFiltered = filtered !== total

  return (
    <div className="flex items-center gap-2 text-xs text-foreground/40">
      <span>
        {isFiltered ? (
          <>
            Showing <span className="text-foreground/60 font-medium">{filtered}</span> of{' '}
            <span className="text-foreground/60 font-medium">{total}</span> agents
          </>
        ) : (
          <>
            <span className="text-foreground/60 font-medium">{total}</span> agents available
          </>
        )}
      </span>
    </div>
  )
}

