"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  userType: string
  companyName: string
  phone: string
}

interface AuthGuardProps {
  children: React.ReactNode
  requiredUserType?: "manufacturer" | "supplier"
}

export default function AuthGuard({ children, requiredUserType }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")

    if (!userData) {
      router.push("/auth/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)

      // Check if user type matches requirement
      if (requiredUserType && parsedUser.userType !== requiredUserType) {
        router.push("/auth/login")
        return
      }

      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("user")
      router.push("/auth/login")
    } finally {
      setLoading(false)
    }
  }, [router, requiredUserType])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
