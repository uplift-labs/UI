import React from 'react'
import { X } from 'lucide-react'

interface CategoryChipsProps {
  categories: string[]
  selectedType: string | null
  onSelect: (category: string | null) => void
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ 
  categories, 
  selectedType, 
  onSelect 
}) => {
  return (
    <div className="flex items-center gap-2 flex-nowrap">
      {/* All chip */}
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
          selectedType === null
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
            : 'bg-foreground/5 border border-foreground/10 text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
        }`}
      >
        All
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(selectedType === cat ? null : cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
            selectedType === cat
              ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
              : 'bg-foreground/5 border border-foreground/10 text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
          }`}
        >
          {cat}
          {selectedType === cat && (
            <X size={12} className="opacity-70" />
          )}
        </button>
      ))}
    </div>
  )
}

