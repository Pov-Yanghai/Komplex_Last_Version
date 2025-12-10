"use client"

import React from "react"
import { AssignmentSubmission } from "@/components/student/assignment-submission"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"

export default function AssignmentPage({ params }: { params: Promise<{ assignmentId: string }> }) {
  const { assignmentId } = React.use(params) // ⬅ unwrap the Promise

  return (
    <ProtectedPage requiredRoles={["student"]}>
      <DashboardLayout>
        <AssignmentSubmission assignmentId={assignmentId} />
      </DashboardLayout>
    </ProtectedPage>
  )
}
