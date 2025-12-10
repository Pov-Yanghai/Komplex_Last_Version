"use client"

import React from "react"
import { LessonPlayer } from "@/components/student/lesson-player"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = React.use(params) // ⬅️ unwrap Promise

  return (
    <ProtectedPage requiredRoles={["student"]}>
      <DashboardLayout>
        <LessonPlayer courseId={courseId} lessonId={lessonId} />
      </DashboardLayout>
    </ProtectedPage>
  )
}
