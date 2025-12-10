"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/charts/stat-card"
import { LineChartCustom } from "@/components/charts/line-chart-custom"
import { ProgressChart } from "@/components/charts/progress-chart"
import {
  mockSystemStats,
  mockUserGrowth,
  mockRecentActivity,
  mockCourseStats,
  mockQuizPerformance,
  mockUsers,
} from "@/lib/mock-data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, BarChart3, Settings, UserCheck, AlertCircle } from "lucide-react"

export function AdminDashboardOverview() {
  const { t } = useLanguage()

  const pendingEducators = mockUsers.filter((u) => u.role === "educator" && u.status === "pending")

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">ផ្ទាំងគ្រប់គ្រងប្រព័ន្ធ - Complete system oversight and control</p>
        </div>
        <Link href="/admin/settings">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="w-4 h-4" />
            System Settings
          </Button>
        </Link>
      </div>

      {/* Pending Approvals Alert */}
      {pendingEducators.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-1">Pending Educator Approvals</h3>
                <p className="text-sm text-orange-700">
                  {pendingEducators.length} educator{pendingEducators.length > 1 ? "s" : ""} waiting for approval
                </p>
              </div>
              <Link href="/admin/educators">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Review Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={mockSystemStats.totalUsers}
          color="blue"
          trend={{ value: 12, direction: "up" }}
          subtext="Active platform users"
        />
        <StatCard
          label="Educators"
          value={mockSystemStats.totalEducators}
          color="purple"
          trend={{ value: 8, direction: "up" }}
          subtext="Teaching staff"
        />
        <StatCard
          label="Students"
          value={mockSystemStats.totalStudents}
          color="teal"
          trend={{ value: 15, direction: "up" }}
          subtext="Enrolled learners"
        />
        <StatCard
          label="Total Courses"
          value={mockSystemStats.totalCourses}
          color="orange"
          subtext={`${mockSystemStats.activeCourses} active`}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Enrollments"
          value={mockSystemStats.totalEnrollments}
          color="green"
          trend={{ value: 22, direction: "up" }}
          subtext="Course registrations"
        />
        <StatCard
          label="Quizzes Created"
          value={mockSystemStats.totalQuizzes}
          color="blue"
          subtext="Assessment library"
        />
        <StatCard label="System Health" value="98%" color="green" subtext="All services operational" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Enrollments by Subject */}
        <ProgressChart
          title="Enrollments by Subject - ការចុះឈ្មោះតាមមុខវិជ្ជា"
          type="bar"
          data={mockCourseStats}
          dataKey="enrollments"
          color="#3b82f6"
        />

        {/* Quiz Performance by Subject */}
        <ProgressChart
          title="Average Quiz Scores - ពិន្ទុជាមធ្យម"
          type="bar"
          data={mockQuizPerformance}
          dataKey="avgScore"
          color="#14b8a6"
        />
      </div>

      {/* User Growth Trend */}
      <LineChartCustom
        title="User Growth Over Time - ការរីកចម្រើនអ្នកប្រើប្រាស់"
        data={mockUserGrowth}
        lines={[
          { key: "users", color: "#3b82f6", name: "Total Users" },
          { key: "educators", color: "#8b5cf6", name: "Educators" },
          { key: "students", color: "#14b8a6", name: "Students" },
        ]}
      />

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/users">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-border">
            <CardContent className="pt-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Manage Users</h3>
              <p className="text-sm text-muted-foreground mb-3">Create, edit, ban users and reset passwords</p>
              <Button className="w-full">Open Users</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/courses">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-border">
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-bold text-lg mb-2">Manage Courses</h3>
              <p className="text-sm text-muted-foreground mb-3">Oversee all courses and content</p>
              <Button className="w-full">Open Courses</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/educators">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-border">
            <CardContent className="pt-6 text-center">
              <UserCheck className="w-12 h-12 mx-auto mb-3 text-teal-600" />
              <h3 className="font-bold text-lg mb-2">Educator Approvals</h3>
              <p className="text-sm text-muted-foreground mb-3">Review and approve educator accounts</p>
              <Button className="w-full">
                Open Approvals {pendingEducators.length > 0 && `(${pendingEducators.length})`}
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-border">
            <CardContent className="pt-6 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-orange-600" />
              <h3 className="font-bold text-lg mb-2">System Analytics</h3>
              <p className="text-sm text-muted-foreground mb-3">View detailed reports and logs</p>
              <Button className="w-full">Open Analytics</Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">Recent System Activity - សកម្មភាពថ្មីៗ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    <span className="text-primary">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    activity.type === "enrollment"
                      ? "bg-blue-100 text-blue-700"
                      : activity.type === "submission"
                        ? "bg-green-100 text-green-700"
                        : activity.type === "course"
                          ? "bg-purple-100 text-purple-700"
                          : activity.type === "registration"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Overview */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Course Overview by Subject</CardTitle>
            <Link href="/admin/courses">
              <Button variant="outline" size="sm">
                View All Courses
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCourseStats.map((stat) => (
              <div key={stat.subject} className="p-4 rounded-lg bg-muted">
                <h4 className="font-bold text-foreground mb-2">{stat.subject}</h4>
                <p className="text-2xl font-bold text-primary mb-1">{stat.enrollments}</p>
                <p className="text-xs text-muted-foreground">Enrollments</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Completion Rate</span>
                    <span className="font-bold">{stat.completion}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${stat.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
