"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { mockCourses } from "@/lib/mock-data"
import { ClipboardList, CheckCircle, Clock } from "lucide-react"

export default function EducatorGradesPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const educatorCourses = mockCourses.filter((c) => c.educatorId === user?.id || c.educatorId === "educator-1")

  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isGradeOpen, setIsGradeOpen] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [gradeData, setGradeData] = useState({ score: "", feedback: "" })

  // Mock submissions data
  const [submissions, setSubmissions] = useState([
    {
      id: "1",
      studentName: "Sokha Khun",
      studentEmail: "sokha@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      assignmentTitle: "Khmer Essay Writing",
      type: "assignment",
      submittedDate: "2025-01-15",
      dueDate: "2025-01-20",
      status: "pending",
      content: "This is my essay about Khmer language history...",
    },
    {
      id: "2",
      studentName: "Chhoy Rith",
      studentEmail: "chhoy@email.com",
      courseId: "2",
      courseName: "Chemistry Basics",
      assignmentTitle: "Periodic Table Quiz",
      type: "quiz",
      submittedDate: "2025-01-16",
      dueDate: "2025-01-25",
      status: "graded",
      score: 92,
      feedback: "Excellent work! Keep it up.",
    },
    {
      id: "3",
      studentName: "Mey Dina",
      studentEmail: "dina@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      assignmentTitle: "Grammar Assignment",
      type: "assignment",
      submittedDate: "2025-01-17",
      dueDate: "2025-01-22",
      status: "pending",
      content: "Here are my answers to the grammar questions...",
    },
    {
      id: "4",
      studentName: "Dara Pov",
      studentEmail: "dara@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      assignmentTitle: "Reading Comprehension",
      type: "assignment",
      submittedDate: "2025-01-18",
      dueDate: "2025-01-28",
      status: "graded",
      score: 88,
      feedback: "Good understanding. Minor improvements needed.",
    },
  ])

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesCourse = selectedCourse === "all" || sub.courseId === selectedCourse
    const matchesStatus = selectedStatus === "all" || sub.status === selectedStatus
    return matchesCourse && matchesStatus
  })

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const gradedCount = submissions.filter((s) => s.status === "graded").length
  const avgScore =
    gradedCount > 0
      ? Math.round(submissions.filter((s) => s.score).reduce((sum, s) => sum + (s.score || 0), 0) / gradedCount)
      : 0

  const openGradeDialog = (submission: any) => {
    setSelectedSubmission(submission)
    setGradeData({
      score: submission.score?.toString() || "",
      feedback: submission.feedback || "",
    })
    setIsGradeOpen(true)
  }

  const handleGradeSubmit = () => {
    if (!selectedSubmission) return

    setSubmissions(
      submissions.map((sub) =>
        sub.id === selectedSubmission.id
          ? {
              ...sub,
              status: "graded",
              score: Number.parseInt(gradeData.score) || 0,
              feedback: gradeData.feedback,
            }
          : sub,
      ),
    )

    setIsGradeOpen(false)
    setSelectedSubmission(null)
    setGradeData({ score: "", feedback: "" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "graded":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Graded
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grading & Submissions</h1>
            <p className="text-muted-foreground mt-2">Review and grade student work - ពិនិត្យ និងដាក់ពិន្ទុការងារសិស្ស</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-3xl font-bold text-foreground mt-2">{submissions.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Graded</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{gradedCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-foreground mt-2">{avgScore}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full sm:w-[250px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {educatorCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <Card>
            <CardHeader>
              <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <ClipboardList className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground">{submission.assignmentTitle}</h3>
                          {getStatusBadge(submission.status)}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <p>
                            <span className="font-medium">Student:</span> {submission.studentName}
                          </p>
                          <p>
                            <span className="font-medium">Course:</span> {submission.courseName}
                          </p>
                          <p>
                            <span className="font-medium">Submitted:</span> {submission.submittedDate}
                          </p>
                          <p>
                            <span className="font-medium">Due Date:</span> {submission.dueDate}
                          </p>
                        </div>

                        {submission.status === "graded" && submission.score !== undefined && (
                          <div className="p-3 bg-muted rounded-lg mb-3">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground">Score</p>
                                <p className="text-2xl font-bold text-foreground">{submission.score}%</p>
                              </div>
                              {submission.feedback && (
                                <div className="flex-1">
                                  <p className="text-xs text-muted-foreground mb-1">Feedback</p>
                                  <p className="text-sm text-foreground">{submission.feedback}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {submission.content && submission.status === "pending" && (
                          <div className="p-3 bg-muted rounded-lg text-sm text-foreground">
                            <p className="text-xs text-muted-foreground mb-1">Student Response:</p>
                            <p className="line-clamp-2">{submission.content}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {submission.status === "pending" ? (
                          <Button onClick={() => openGradeDialog(submission)}>Grade Now</Button>
                        ) : (
                          <Button variant="outline" onClick={() => openGradeDialog(submission)}>
                            Edit Grade
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No submissions found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Grade Submission Dialog */}
        <Dialog open={isGradeOpen} onOpenChange={setIsGradeOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedSubmission?.status === "graded" ? "Edit Grade" : "Grade Submission"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Student</p>
                <p className="font-semibold text-foreground">{selectedSubmission?.studentName}</p>
                <p className="text-sm text-muted-foreground mt-2">Assignment</p>
                <p className="font-semibold text-foreground">{selectedSubmission?.assignmentTitle}</p>
              </div>

              {selectedSubmission?.content && (
                <div>
                  <Label>Student Response</Label>
                  <div className="p-4 bg-muted rounded-lg text-sm text-foreground mt-2 max-h-48 overflow-y-auto">
                    {selectedSubmission.content}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="score">Score (0-100) *</Label>
                <Input
                  id="score"
                  type="number"
                  value={gradeData.score}
                  onChange={(e) => setGradeData({ ...gradeData, score: e.target.value })}
                  placeholder="Enter score"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="feedback">Feedback (optional)</Label>
                <Textarea
                  id="feedback"
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                  placeholder="Provide feedback to the student..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsGradeOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGradeSubmit} disabled={!gradeData.score}>
                Submit Grade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedPage>
  )
}
