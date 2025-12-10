"use client"

import React from "react"
import { QuizPlayer } from "@/components/student/quiz-player"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = React.use(params) // ⬅ unwrap Promise

  return (
    <ProtectedPage requiredRoles={["student"]}>
      <DashboardLayout>
        <QuizPlayer quizId={quizId} />
      </DashboardLayout>
    </ProtectedPage>
  )
}
