"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/charts/stat-card"
import { ProgressChart } from "@/components/charts/progress-chart"
import { LineChartCustom } from "@/components/charts/line-chart-custom"
import { mockCourses, mockEnrollments, mockAssignments } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Trophy, Clock } from "lucide-react"

export function StudentDashboardOverview() {
  const { t } = useLanguage()

  const enrolledCoursesData = mockEnrollments.map((enrollment) => {
    const course = mockCourses.find((c) => c.id === enrollment.courseId)
    return { ...enrollment, course }
  })

  const pendingAssignments = mockAssignments.filter((a) => a.status === "pending")
  const completedAssignments = mockAssignments.filter((a) => a.status === "submitted")

  // Fixed data for graphs
  const learningProgressData = [
    { name: "Week 1", completionRate: 45, assignmentsSubmitted: 3 },
    { name: "Week 2", completionRate: 58, assignmentsSubmitted: 5 },
    { name: "Week 3", completionRate: 68, assignmentsSubmitted: 4 },
    { name: "Week 4", completionRate: 78, assignmentsSubmitted: 6 },
  ]

  const coursePerformanceData = enrolledCoursesData.map((enrollment) => ({
    name: enrollment.course?.category || "Course",
    value: enrollment.progress,
  }))

  const gradeBreakdownData = [
    { name: "Excellent", value: 35 },
    { name: "Good", value: 40 },
    { name: "Average", value: 20 },
    { name: "Need Work", value: 5 },
  ]

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{t("student.dashboard")}</h1>
          <p className="text-muted-foreground mt-2">ផ្ទាំងសិស្ស - Track your learning journey</p>
        </div>
        <Link href="/browse-courses">
          <Button className="gap-2">
            <BookOpen className="w-4 h-4" />
            {t("student.browseMoreCourses")}
          </Button>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={t("student.enrolledCourses")}
          value={enrolledCoursesData.length}
          color="blue"
          subtext="Currently learning"
        />
        <StatCard
          label={t("student.progressOverall")}
          value="78%"
          color="teal"
          trend={{ value: 12, direction: "up" }}
          subtext="This month"
        />
        <StatCard
          label={t("student.pendingAssignments")}
          value={pendingAssignments.length}
          color="orange"
          subtext="Due soon"
        />
        <StatCard
          label={t("student.gradeAverage")}
          value="87%"
          color="green"
          trend={{ value: 3, direction: "up" }}
          subtext="Excellent work"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <ProgressChart
          title="Your Course Progress - ការរីកចម្រើនរបស់អ្នក"
          type="bar"
          data={coursePerformanceData}
          dataKey="value"
          color="#14b8a6"
        />

        {/* Quick Stats Card */}
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">Achievement Summary - សមិទ្ធផល</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-blue-50">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold text-foreground">42</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-green-50">
              <Trophy className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Passed</p>
                <p className="text-2xl font-bold text-foreground">{completedAssignments.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-orange-50">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <p className="text-2xl font-bold text-foreground">28h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress Trend */}
      <LineChartCustom
        title="Your Learning Progress - ការរីកចម្រើនក្នុងការសិក្សា"
        data={learningProgressData}
        lines={[
          { key: "completionRate", color: "#3b82f6", name: "Completion Rate (%)" },
          { key: "assignmentsSubmitted", color: "#f97316", name: "Assignments Submitted" },
        ]}
      />

      {/* In Progress Courses */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">{t("student.enrolledCourses")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCoursesData.map(
            (enrollment) =>
              enrollment.course && (
                <Card
                  key={enrollment.courseId}
                  className="overflow-hidden hover:shadow-lg transition-shadow border border-border"
                >
                  <img
                    src={enrollment.course.image || "/placeholder.svg"}
                    alt={enrollment.course.title}
                    className="w-full h-36 object-cover"
                  />
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-bold text-foreground text-lg">{enrollment.course.title}</h3>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                        {enrollment.progress}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">by {enrollment.course.educatorName}</p>

                    {/* Progress Bar */}
                    <div className="mt-4 mb-4">
                      <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-2">
                        <span>{t("student.progressOverall")}</span>
                        <span>
                          {Math.round((enrollment.progress / 100) * enrollment.course.lessons)}/
                          {enrollment.course.lessons} lessons
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <Link
                      href={`/my-courses/${enrollment.courseId}`}
                      className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition-opacity text-center block"
                    >
                      {t("student.continueLearning")}
                    </Link>
                  </CardContent>
                </Card>
              ),
          )}
        </div>
      </div>

      {/* Upcoming Quizzes & Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        {pendingAssignments.length > 0 && (
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Upcoming Assignments - កិច្ចការរង់ចាំ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingAssignments.map((assignment) => {
                  const course = mockCourses.find((c) => c.id === assignment.courseId)
                  return (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {course?.title} • Due: {assignment.dueDate}
                        </p>
                      </div>
                      <Link href={`/assignment/${assignment.id}`}>
                        <Button size="sm">Start</Button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed Assignments */}
        {completedAssignments.length > 0 && (
          <Card className="border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Completed Work - ការងារបញ្ចប់
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedAssignments.map((assignment) => {
                  const course = mockCourses.find((c) => c.id === assignment.courseId)
                  return (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{course?.title}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-full">
                        {assignment.grade}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
