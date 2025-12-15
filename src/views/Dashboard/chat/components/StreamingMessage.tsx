import React from 'react'
import { MarkdownMessage } from './MarkdownMessage'

interface StreamingMessageProps {
  content: string
  isLoading: boolean
}

export const StreamingMessage: React.FC<StreamingMessageProps> = ({ 
  content, 
  isLoading 
}) => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-[90%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-bl-md bg-foreground/[0.04] border border-foreground/5 text-foreground/90 backdrop-blur-sm">
        <MarkdownMessage content={content} />
        {isLoading && (
          <span className="inline-block w-0.5 h-4 ml-1 bg-gradient-to-t from-primary to-accent animate-pulse rounded-full align-middle" />
        )}
      </div>
    </div>
  )
}

