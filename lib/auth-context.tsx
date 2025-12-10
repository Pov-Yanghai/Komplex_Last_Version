"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "admin" | "educator" | "student" | "analyst"

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  photo?: string
  bio?: string
  status?: "active" | "pending" | "banned"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // <CHANGE> Add check for window to prevent SSR errors
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    // Simulate checking if user is logged in (from localStorage or API)
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    let mockUser: User

    if (email === "admin@komplex.edu") {
      mockUser = {
        id: "admin-1",
        email,
        fullName: "Admin User",
        role: "admin",
        status: "active",
      }
    } else if (email === "analyst@komplex.edu") {
      mockUser = {
        id: "analyst-1",
        email,
        fullName: "Analyst User",
        role: "analyst",
        status: "active",
      }
    } else if (email.includes("educator")) {
      mockUser = {
        id: "educator-1",
        email,
        fullName: "Educator User",
        role: "educator",
        status: "active",
      }
    } else {
      mockUser = {
        id: "student-1",
        email,
        fullName: "Student User",
        role: "student",
        status: "active",
      }
    }

    setUser(mockUser)
    // <CHANGE> Add check for window before localStorage access
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(mockUser))
    }
  }

  const signup = async (email: string, password: string, fullName: string, role: UserRole) => {
    // Simulate signup (in real app, call API)
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      fullName,
      role,
      status: role === "educator" ? "pending" : "active",
    }
    setUser(mockUser)
    // <CHANGE> Add check for window before localStorage access
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(mockUser))
    }
  }

  const logout = () => {
    setUser(null)
    // <CHANGE> Add check for window before localStorage access
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
