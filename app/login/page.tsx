"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function LoginPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const dashboardRoute =
        user.role === "student" ? "/dashboard/student" : user.role === "analyst" ? "/dashboard/analyst" : "/dashboard"
      router.push(dashboardRoute)
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image src="/komplex-logo.png" alt="KOMPLEX" width={200} height={60} className="h-16 w-auto" priority />
          </div>
          <p className="mt-2 text-gray-600">Empowering Education in Cambodia</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
