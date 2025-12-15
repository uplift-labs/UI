import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { CategoryChips } from '../search'

interface FilterSectionProps {
  categories: string[]
  selectedType: string | null
  onSelectType: (type: string | null) => void
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1 -mb-1">
      <div className="flex items-center gap-1.5 flex-shrink-0 text-foreground/40">
        <SlidersHorizontal size={14} />
        <span className="text-xs font-medium hidden sm:inline">Filter</span>
      </div>
      <div className="h-4 w-px bg-foreground/10 flex-shrink-0" />
      <CategoryChips 
        categories={categories} 
        selectedType={selectedType} 
        onSelect={onSelectType} 
      />
    </div>
  )
}

