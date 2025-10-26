"use client"

import { useState } from "react"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"

interface ChatAreaProps {
  chatTitle: string
}

export function ChatArea({ chatTitle }: ChatAreaProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
    // Placeholder: simulate loading
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">{chatTitle}</h1>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>

      {/* Input */}
      <div className="border-t border-border">
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
