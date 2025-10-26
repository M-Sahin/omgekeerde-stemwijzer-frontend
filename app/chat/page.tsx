"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { useAuth } from "@/contexts/AuthContext"
import { sendChatMessage, testApiConnection, getChatHistory } from "@/lib/api"
import type { ChatMessage } from "@/lib/api"

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatId] = useState(() => `chat-${Date.now()}`)

  useEffect(() => {
    // Test API connection when component mounts and user is available
    const testConnection = async () => {
      if (user) {
        const apiConnected = await testApiConnection()
        console.log("[Chat] API connection test:", apiConnected ? "SUCCESS" : "FAILED")
        
        if (!apiConnected) {
          console.warn("[Chat] API might not be available")
        }
      }
    }
    
    testConnection()
  }, [user])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !user) return

    const userMessage: ChatMessage = {
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get Firebase ID token for authentication
      const idToken = await user.getIdToken()

      // Call backend API
      const response = await sendChatMessage(chatId, content, idToken)

      setMessages((prev) => [...prev, response])
    } catch (error: any) {
      console.error("[v0] Error sending message:", error)

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Er is een fout opgetreden: ${error.message}. Controleer of de backend API draait.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background">
        <ChatSidebar />
        <div className="flex-1 flex flex-col">
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput value={input} onChange={setInput} onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
