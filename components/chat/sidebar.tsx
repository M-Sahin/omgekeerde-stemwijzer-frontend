"use client"

import { Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  selectedChat: string
  onSelectChat: (chat: string) => void
}

// No example chats - keep empty for real chat history
const exampleChats: string[] = []

export function Sidebar({ selectedChat, onSelectChat }: SidebarProps) {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      {/* New Chat Button */}
      <div className="p-3 border-b border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-transparent"
          onClick={() => onSelectChat("Nieuwe Chat")}
        >
          <Plus className="size-4" />
          Nieuwe Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {exampleChats.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">Nog geen gesprekken</p>
            <p className="text-xs">Start een nieuw gesprek hierboven</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium text-muted-foreground px-3 py-2">Gesprekken</p>
            {exampleChats.map((chat) => (
              <button
                key={chat}
                onClick={() => onSelectChat(chat)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  "hover:bg-accent",
                  selectedChat === chat && "bg-accent",
                )}
              >
                {chat}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
          <LogOut className="size-4" />
          Uitloggen
        </Button>
      </div>
    </div>
  )
}
