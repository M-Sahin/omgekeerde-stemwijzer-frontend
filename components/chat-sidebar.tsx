"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MessageSquare, Plus, MoreHorizontal, Trash2, Edit2, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

interface Chat {
  id: string
  title: string
  timestamp: string
}

export function ChatSidebar() {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [chats] = useState<Chat[]>([])  // Empty array - no dummy data

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

  const user = auth.currentUser
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
          <Button className="w-full justify-start gap-2 bg-foreground text-background hover:bg-foreground/90">
            <Plus className="size-4" />
            Nieuw gesprek
          </Button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {chats.length === 0 ? (
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
