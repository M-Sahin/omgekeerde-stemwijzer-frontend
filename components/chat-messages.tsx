"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <MessageSquare className="size-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Stel je eerste vraag</h2>
          <p className="text-muted-foreground leading-relaxed">
            Begin een gesprek door hieronder een bericht te typen. Vraag wat je wilt weten over de
            verkiezingsprogramma's van de partijen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              {message.role === "user" ? (
                <User className="size-5 text-muted-foreground" />
              ) : (
                <MessageSquare className="size-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-2 pt-1">
              <p className="text-sm font-semibold">{message.role === "user" ? "Jij" : "Stemwijzer AI"}</p>
              <p className="text-sm leading-relaxed text-pretty">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <MessageSquare className="size-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-2 pt-1">
              <p className="text-sm font-semibold">Stemwijzer AI</p>
              <div className="flex gap-1">
                <div
                  className="size-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="size-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="size-2 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
