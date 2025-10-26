import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function MessageList() {
  // No dummy messages - show empty state instead
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <div className="text-center space-y-4">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto">
          <svg className="size-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
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
