import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search agents..."
}) => {
  return (
    <div className="w-full sm:w-64 lg:w-80">
      <Input
        leftIcon={<Search size={16} className="text-foreground/40" />}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 text-sm bg-foreground/5 border-foreground/10 focus:border-primary/50 focus:bg-foreground/[0.08] transition-all placeholder:text-foreground/30"
      />
    </div>
  )
}

