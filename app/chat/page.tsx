"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatMessages } from "@/components/chat-messages"
import { ChatInput } from "@/components/chat-input"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { sendChatMessage } from "@/lib/api"
import type { ChatMessage } from "@/lib/api"

export default function ChatPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [chatId] = useState(() => `chat-${Date.now()}`)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error("Niet ingelogd")
      }

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

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="size-12 border-4 border-muted border-t-foreground rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput value={input} onChange={setInput} onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
