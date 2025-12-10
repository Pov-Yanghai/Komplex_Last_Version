"use client"

import React from "react"
import { CourseDetail } from "@/components/student/course-detail"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) // ⬅️ unwrap the Promise

  return (
    <ProtectedPage requiredRoles={["student"]}>
      <DashboardLayout>
        <CourseDetail courseId={id} />
      </DashboardLayout>
    </ProtectedPage>
  )
}
