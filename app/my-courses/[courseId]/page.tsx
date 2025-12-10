"use client"

import React from "react"
import { CourseView } from "@/components/student/course-view"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = React.use(params)

  return (
    <ProtectedPage requiredRoles={["student"]}>
      <DashboardLayout>
        <CourseView courseId={courseId} />
      </DashboardLayout>
    </ProtectedPage>
  )
}
