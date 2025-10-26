"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface AuthGuardProps {
  children: ReactNode
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

export const AuthGuard = ({ 
  children, 
  redirectTo = "/chat", 
  redirectIfAuthenticated = true 
}: AuthGuardProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && redirectIfAuthenticated) {
      console.log("[AuthGuard] User is authenticated, redirecting to:", redirectTo)
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo, redirectIfAuthenticated])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="size-12 border-4 border-muted border-t-foreground rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    )
  }

  // Don't render children if user is authenticated and should be redirected
  if (user && redirectIfAuthenticated) {
    return null
  }

  return <>{children}</>
}