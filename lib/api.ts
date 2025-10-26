// API client for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

export interface ChatRequest {
  chatId: string
  message: string
}

export interface ChatResponse {
  role: "assistant"
  content: string
  timestamp: string
}

export async function sendChatMessage(chatId: string, message: string, idToken: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ chatId, message } as ChatRequest),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Network error" }))
    throw new Error(error.error || "Failed to send message")
  }

  return response.json()
}
