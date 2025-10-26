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

export interface ChatSession {
  id: string
  title: string
  lastUpdated: any  // Can be Firestore Timestamp object or string
}

export interface ChatHistoryMessage {
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export async function sendChatMessage(chatId: string, message: string, idToken: string): Promise<ChatResponse> {
  console.log("[API] Sending message to:", `${API_BASE_URL}/api/chat`)
  console.log("[API] Request payload:", { chatId, message })
  
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ chatId, message } as ChatRequest),
  })

  console.log("[API] Response status:", response.status)
  console.log("[API] Response headers:", Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[API] Error response:", errorText)
    
    let errorData
    try {
      errorData = JSON.parse(errorText)
    } catch {
      errorData = { error: errorText || "Network error" }
    }
    
    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
  }

  const responseData = await response.json()
  console.log("[API] Success response:", responseData)
  return responseData
}

// Test function to check if the API is reachable
export async function testApiConnection(): Promise<boolean> {
  try {
    console.log("[API] Testing connection to:", API_BASE_URL)
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    console.log("[API] Health check status:", response.status)
    return response.ok
  } catch (error) {
    console.error("[API] Connection test failed:", error)
    return false
  }
}

// Get chat history for the current user
export async function getChatHistory(idToken: string): Promise<ChatSession[]> {
  console.log("[API] Getting chat history")
  
  const response = await fetch(`${API_BASE_URL}/api/chat/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })

  console.log("[API] Chat history response status:", response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[API] Chat history error:", errorText)
    throw new Error(`Failed to get chat history: ${response.statusText}`)
  }

  const data = await response.json()
  console.log("[API] Chat history success:", data)
  return data
}

// Get messages from a specific chat
export async function getChatMessages(chatId: string, idToken: string): Promise<ChatHistoryMessage[]> {
  console.log("[API] Getting chat messages for chatId:", chatId)
  
  const response = await fetch(`${API_BASE_URL}/api/chat/${chatId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })

  console.log("[API] Chat messages response status:", response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error("[API] Chat messages error:", errorText)
    throw new Error(`Failed to get chat messages: ${response.statusText}`)
  }

  const data = await response.json()
  console.log("[API] Chat messages success:", data)
  return data
}
