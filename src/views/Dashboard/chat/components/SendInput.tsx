import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { ButtonSpinner } from '@/components/ui/spinner'
import { useChatStore } from '@/store/chatStore'

export const SendInput: React.FC = () => {
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const { sendMessage, isLoading } = useChatStore()

  const handleSend = async () => {
    const userMessage = input.trim()
    if (!userMessage || isLoading) return

    setInput('')
    await sendMessage(userMessage)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const hasInput = input.trim().length > 0

  return (
    <div className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-5">
      <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
        {/* Glowing container */}
        <div className="relative">
          {/* Glow effect */}
          <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 blur-md transition-opacity duration-300 ${
            isFocused ? 'opacity-30' : 'opacity-0'
          }`} />
          
          {/* Input container */}
          <div className={`relative flex items-end gap-2 p-2 sm:p-2.5 rounded-xl bg-foreground/[0.05] border transition-all duration-300 backdrop-blur-sm ${
            isFocused ? 'border-primary/30 bg-foreground/[0.07]' : 'border-foreground/10'
          }`}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Message..."
              maxRows={6}
              minRows={1}
              direction="top"
              className="flex-1 min-h-[36px] bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/25 border-0 focus-visible:ring-0 resize-none px-2 py-1.5"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !hasInput}
              className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                hasInput && !isLoading
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95' 
                  : 'text-foreground/20 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <Send size={16} className={hasInput ? 'translate-x-0.5 -translate-y-0.5' : ''} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

