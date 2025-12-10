"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const router = useRouter()
  const [profileOpen, setProfileOpen] = useState(false)

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const adminLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/courses", label: "Courses" },
    { href: "/admin/educators", label: "Approvals" },
  ]

  const educatorLinks = [
    { href: "/dashboard", label: t("nav.home") },
    { href: "/educator/courses", label: "Courses" },
    { href: "/educator/quizzes", label: "Quizzes" },
    { href: "/educator/students", label: "Students" },
    { href: "/educator/grades", label: "Grades" },
  ]

  const studentLinks = [
    { href: "/dashboard", label: t("nav.home") },
    { href: "/browse-courses", label: t("nav.browseCourses") },
    { href: "/my-courses", label: t("nav.myCourses") },
    { href: "/my-work", label: t("nav.myWork") },
    { href: "/grades", label: t("nav.gradesStudent") },
  ]

  const analystLinks = [
    { href: "/dashboard/analyst", label: "Analytics" },
    { href: "/admin/analytics", label: "Reports" },
  ]

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "educator"
        ? educatorLinks
        : user.role === "analyst"
          ? analystLinks
          : studentLinks

  const getRoleDisplay = () => {
    switch (user.role) {
      case "admin":
        return "Admin"
      case "educator":
        return t("auth.educator") || "Educator"
      case "analyst":
        return "Analyst"
      default:
        return t("auth.student") || "Student"
    }
  }

  const getRoleBadgeClass = () => {
    switch (user.role) {
      case "admin":
        return "bg-red-100 text-red-700"
      case "educator":
        return "bg-blue-100 text-blue-700"
      case "analyst":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/komplex-logo.png" alt="KOMPLEX" width={160} height={48} className="h-10 w-auto" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex gap-1 bg-muted rounded-lg p-1 border border-border">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                language === "en"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("km")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                language === "km"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              ខ្មែរ
            </button>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-sm font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-semibold text-foreground">
                {user.fullName.split(" ")[0]}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-50">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <p className={`text-xs font-medium mt-2 px-2 py-1 ${getRoleBadgeClass()} rounded w-fit`}>
                    {getRoleDisplay()}
                  </p>
                </div>
                <Link href="/profile" className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                  {t("profile.myProfile")}
                </Link>
                <Link href="/settings" className="block px-4 py-2.5 text-sm hover:bg-muted transition-colors">
                  {t("nav.settings")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors text-destructive border-t border-border rounded-b-lg font-medium"
                >
                  {t("profile.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex gap-1 overflow-x-auto px-4 pb-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap px-3 py-1 text-xs font-medium text-foreground/70 hover:text-primary rounded-md border border-border transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
