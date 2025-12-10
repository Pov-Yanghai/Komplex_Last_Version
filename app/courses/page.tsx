"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ProtectedPage } from "@/components/auth/protected-page"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function CoursesPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user?.role === "educator") {
      router.push("/educator/courses")
    }
  }, [user, isLoading, router])

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Redirecting to courses...</p>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  )
}
