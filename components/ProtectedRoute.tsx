"use client"

import { useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const ProtectedRoute = ({ children, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log("[ProtectedRoute] User not authenticated, redirecting to:", redirectTo)
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="size-12 border-4 border-muted border-t-foreground rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Authenticatie controleren...</p>
        </div>
      </div>
    )
  }

  // Don't render children if user is not authenticated
  if (!user) {
    return null
  }

  return <>{children}</>
}