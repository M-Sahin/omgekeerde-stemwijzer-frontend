"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageSquare, Plus, MoreHorizontal, Trash2, Edit2, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/contexts/AuthContext"
import { getChatHistory, type ChatSession } from "@/lib/api"

interface Chat {
  id: string
  title: string
  timestamp: string  // This will be the formatted string for display
}

export function ChatSidebar() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoadingChats, setIsLoadingChats] = useState(false)

  // Load chat history when component mounts and user is available
  useEffect(() => {
    if (user) {
      loadChatHistory()
    }
  }, [user])

  const loadChatHistory = async () => {
    if (!user) return
    
    try {
      setIsLoadingChats(true)
      const idToken = await user.getIdToken()
      const chatSessions = await getChatHistory(idToken)
      
      // Convert ChatSession[] to Chat[] for our component
      const chatData: Chat[] = chatSessions.map((session, index) => {
        console.log("[ChatSidebar] Processing session:", session)
        const formattedTimestamp = formatTimestamp(session.lastUpdated)
        console.log("[ChatSidebar] Formatted timestamp:", formattedTimestamp)
        
        return {
          id: session.id,
          title: session.title || `Chat ${index + 1}`,
          timestamp: formattedTimestamp === "Onbekend" ? "Recent" : formattedTimestamp
        }
      })
      
      setChats(chatData)
      console.log("[ChatSidebar] Loaded chat history:", chatData)
    } catch (error) {
      console.error("[ChatSidebar] Failed to load chat history:", error)
      // Don't show error toast for now - it might be that user has no chats yet
    } finally {
      setIsLoadingChats(false)
    }
  }

  const formatTimestamp = (timestamp: any): string => {
    try {
      console.log("[ChatSidebar] Raw timestamp received:", timestamp, "Type:", typeof timestamp)
      
      let date: Date
      
      if (!timestamp) {
        return "Onbekend"
      }
      
      // Handle Firestore Timestamp object
      if (typeof timestamp === 'object' && timestamp !== null) {
        if (timestamp._seconds !== undefined) {
          // Firestore timestamp with _seconds property
          date = new Date(timestamp._seconds * 1000)
          console.log("[ChatSidebar] Parsed Firestore timestamp (_seconds):", date)
        } else if (timestamp.seconds !== undefined) {
          // Firestore timestamp with seconds property
          date = new Date(timestamp.seconds * 1000)
          console.log("[ChatSidebar] Parsed Firestore timestamp (seconds):", date)
        } else if (timestamp.toDate && typeof timestamp.toDate === 'function') {
          // Firestore Timestamp with toDate method
          date = timestamp.toDate()
          console.log("[ChatSidebar] Parsed Firestore timestamp (toDate):", date)
        } else {
          // Try to parse as Date object
          date = new Date(timestamp)
          console.log("[ChatSidebar] Parsed as Date object:", date)
        }
      } else if (typeof timestamp === 'string') {
        // String timestamp
        date = new Date(timestamp)
        console.log("[ChatSidebar] Parsed string timestamp:", date)
      } else if (typeof timestamp === 'number') {
        // Unix timestamp (seconds or milliseconds)
        if (timestamp.toString().length <= 10) {
          // Seconds
          date = new Date(timestamp * 1000)
        } else {
          // Milliseconds
          date = new Date(timestamp)
        }
        console.log("[ChatSidebar] Parsed numeric timestamp:", date)
      } else {
        console.warn("[ChatSidebar] Unknown timestamp format:", timestamp)
        return "Onbekend"
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("[ChatSidebar] Invalid date created from timestamp:", timestamp)
        return "Onbekend"
      }
      
      const now = new Date()
      const diffInMs = now.getTime() - date.getTime()
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      
      if (diffInMinutes < 1) return "Zojuist"
      if (diffInMinutes < 60) return `${diffInMinutes} min geleden`
      if (diffInHours < 1) return "< 1 uur geleden"
      if (diffInHours < 24) return `${diffInHours} uur geleden`
      if (diffInDays === 1) return "Gisteren"
      if (diffInDays < 7) return `${diffInDays} dagen geleden`
      
      return date.toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'short'
      })
    } catch (error) {
      console.error("[ChatSidebar] Error formatting timestamp:", error, "Original:", timestamp)
      return "Onbekend"
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Uitgelogd",
        description: "Je bent succesvol uitgelogd",
      })
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      toast({
        title: "Fout bij uitloggen",
        description: "Er is een fout opgetreden",
        variant: "destructive",
      })
    }
  }

  // Use user from AuthContext instead of auth.currentUser
  const userEmail = user?.email || "gebruiker@voorbeeld.nl"
  const userInitials = userEmail
    .split("@")[0]
    .split(".")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/logo.jpg" alt="De Omgekeerde Stemwijzer Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-semibold">De Omgekeerde Stemwijzer</span>
          </Link>
          <Button 
            className="w-full justify-start gap-2 bg-foreground text-background hover:bg-foreground/90"
            onClick={() => {
              window.location.reload()
            }}
          >
            <Plus className="size-4" />
            Nieuw gesprek
          </Button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {isLoadingChats ? (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">Chats laden...</p>
              </div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <p className="text-sm">Nog geen gesprekken</p>
                <p className="text-xs">Start een nieuw gesprek hierboven</p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className="group flex items-center gap-2 p-3 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <MessageSquare className="size-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit2 className="size-4 mr-2" />
                        Hernoemen
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="size-4 mr-2" />
                        Verwijderen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-2 border-t border-border">
          <div className="space-y-1">
            <Link href="/how-it-works" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              Hoe het werkt
            </Link>
            <Link href="/about" className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
              Over de maker
            </Link>
          </div>
        </div>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full hover:bg-accent rounded-lg p-2 transition-colors">
                <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">{userInitials}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{userEmail.split("@")[0]}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="size-4 mr-2" />
                Uitloggen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-background/80 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
