"use client"

import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()

  if (!user) {
    return null
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const adminLinks = [
    { href: "/dashboard", label: "Admin Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/courses", label: "Manage Courses" },
    { href: "/admin/educators", label: "Educator Approvals" },
    { href: "/admin/analytics", label: "System Analytics" },
    { href: "/admin/settings", label: "System Settings" },
  ]

  const educatorLinks = [
    { href: "/dashboard", label: t("nav.home") },
    { href: "/educator/courses", label: t("nav.myCoursesEd") },
    { href: "/educator/quizzes", label: "My Quizzes" },
    { href: "/educator/students", label: t("nav.students") },
    { href: "/educator/grades", label: t("nav.grades") },
    { href: "/messages", label: t("nav.messages") },
    { href: "/settings", label: t("nav.settings") },
  ]

  const studentLinks = [
    { href: "/dashboard", label: t("nav.home") },
    { href: "/browse-courses", label: t("nav.browseCourses") },
    { href: "/my-courses", label: t("nav.myCourses") },
    { href: "/my-work", label: t("nav.myWork") },
    { href: "/grades", label: t("nav.gradesStudent") },
    { href: "/settings", label: t("nav.settings") },
  ]

  const analystLinks = [
    { href: "/dashboard/analyst", label: "Analytics Dashboard" },
    { href: "/admin/analytics", label: "Detailed Reports" },
    { href: "/settings", label: t("nav.settings") },
  ]

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "educator"
        ? educatorLinks
        : user.role === "analyst"
          ? analystLinks
          : studentLinks

  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r border-border bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(link.href)
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
