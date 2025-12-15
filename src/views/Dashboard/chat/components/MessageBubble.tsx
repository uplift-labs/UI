import React from 'react'
import { MessageContent } from './MessageContent'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  text: string
  toolId?: string | null
  responseStyle?: string
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  role, 
  text, 
  toolId, 
  responseStyle 
}) => {
  const isUser = role === 'user'
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
      style={{ 
        animation: 'slideIn 0.3s ease-out forwards',
      }}
    >
      <div
        className={`max-w-[90%] sm:max-w-[80%] px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] ${
          isUser 
            ? 'bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/10 text-foreground rounded-br-md' 
            : 'bg-foreground/[0.04] border border-foreground/5 text-foreground/90 rounded-bl-md'
        }`}
      >
        <MessageContent 
          text={text} 
          toolId={toolId} 
          responseStyle={responseStyle}
        />
      </div>
    </div>
  )
}

