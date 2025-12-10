"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/charts/stat-card"
import { ProgressChart } from "@/components/charts/progress-chart"
import { LineChartCustom } from "@/components/charts/line-chart-custom"
import { mockCourses, mockAssignments, mockQuizzes } from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, BookOpen, Users, ClipboardList, GraduationCap } from "lucide-react"

export function EducatorDashboardOverview() {
  const { t } = useLanguage()

  const courseProgressData = mockCourses.slice(0, 4).map((course) => ({
    name: course.category,
    value: Math.floor(Math.random() * 30) + 70,
  }))

  const studentEngagementData = [
    { name: "Week 1", activeStudents: 45, submittedWork: 38 },
    { name: "Week 2", activeStudents: 52, submittedWork: 45 },
    { name: "Week 3", activeStudents: 48, submittedWork: 42 },
    { name: "Week 4", activeStudents: 65, submittedWork: 58 },
  ]

  const pendingCount = mockAssignments.filter((a) => a.status === "pending").length

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">{t("educator.dashboard")}</h1>
          <p className="text-muted-foreground mt-2">ផ្ទាំងគ្រប់គ្រងសម្រាប់គ្រូបង្រៀន - Monitor your courses and students</p>
        </div>
        <Link href="/educator/courses">
          <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            {t("educator.createNewCourse")}
          </Button>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={t("educator.activeCourses")}
          value={mockCourses.length}
          color="blue"
          trend={{ value: 12, direction: "up" }}
          subtext="Your courses"
        />
        <StatCard
          label={t("educator.totalStudents")}
          value={mockCourses.reduce((sum, course) => sum + course.students, 0)}
          color="teal"
          trend={{ value: 8, direction: "up" }}
          subtext="Active learners"
        />
        <StatCard label="Total Quizzes" value={mockQuizzes.length} color="purple" subtext="Assessments created" />
        <StatCard
          label="Avg. Student Grade"
          value="85%"
          color="green"
          trend={{ value: 5, direction: "up" }}
          subtext="Overall performance"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <ProgressChart
          title="Course Completion Rates - អត្រាបញ្ចប់"
          type="bar"
          data={courseProgressData}
          dataKey="value"
          color="#3b82f6"
        />

        {/* Quick Actions */}
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">Quick Actions - សកម្មភាពរហ័ស</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/educator/courses">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <PlusCircle className="w-4 h-4" />
                Create New Course
              </Button>
            </Link>
            <Link href="/educator/courses">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <BookOpen className="w-4 h-4" />
                Manage My Courses
              </Button>
            </Link>
            <Link href="/educator/quizzes">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <GraduationCap className="w-4 h-4" />
                Create Quiz
              </Button>
            </Link>
            <Link href="/educator/students">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Users className="w-4 h-4" />
                View Student Progress
              </Button>
            </Link>
            <Link href="/educator/grades">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <ClipboardList className="w-4 h-4" />
                Grade Submissions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Student Engagement Trend */}
      <LineChartCustom
        title="Student Engagement Over Time - ការចូលរួមរបស់សិស្ស"
        data={studentEngagementData}
        lines={[
          { key: "activeStudents", color: "#3b82f6", name: "Active Students" },
          { key: "submittedWork", color: "#14b8a6", name: "Work Submitted" },
        ]}
      />

      {/* My Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{t("educator.myCourses")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover" />
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-foreground line-clamp-2 flex-1">{course.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-700"
                        : course.level === "Intermediate"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-border">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Students</p>
                    <p className="text-lg font-bold text-primary">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Lessons</p>
                    <p className="text-lg font-bold text-secondary">{course.lessons}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/educator/courses/${course.id}/lessons`}
                    className="flex-1 text-sm py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center font-medium"
                  >
                    Manage Course
                  </Link>
                  <Link
                    href={`/educator/students?course=${course.id}`}
                    className="flex-1 text-sm py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-center font-medium"
                  >
                    View Students
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pending Work Section */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">Pending Submissions - ការដាក់ស្នើរង់ចាំ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAssignments
              .filter((a) => a.status === "pending")
              .map((assignment) => {
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
                    <Link href={`/educator/grades`}>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </Link>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
