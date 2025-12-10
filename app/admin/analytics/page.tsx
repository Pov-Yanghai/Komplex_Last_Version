"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChartCustom } from "@/components/charts/line-chart-custom"
import { ProgressChart } from "@/components/charts/progress-chart"
import { StatCard } from "@/components/charts/stat-card"
import {
  mockSystemStats,
  mockUserGrowth,
  mockCourseStats,
  mockQuizPerformance,
  mockRecentActivity,
} from "@/lib/mock-data"
import { Download, TrendingUp, Users, BookOpen, ClipboardList, Award } from "lucide-react"

export default function AdminAnalyticsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("6m")
  const [exportFormat, setExportFormat] = useState("csv")

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  // Export data
  const handleExport = () => {
    if (exportFormat === "csv") {
      const csv = [
        ["Metric", "Value"],
        ["Total Users", mockSystemStats.totalUsers.toString()],
        ["Total Educators", mockSystemStats.totalEducators.toString()],
        ["Total Students", mockSystemStats.totalStudents.toString()],
        ["Total Courses", mockSystemStats.totalCourses.toString()],
        ["Total Enrollments", mockSystemStats.totalEnrollments.toString()],
        ["Total Quizzes", mockSystemStats.totalQuizzes.toString()],
      ].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `komplex-analytics-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
    } else {
      alert("PDF export coming soon!")
    }
  }

  const activeUsers = mockSystemStats.totalUsers - 12
  const activeRate = Math.round((activeUsers / mockSystemStats.totalUsers) * 100)

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Analytics</h1>
            <p className="text-muted-foreground mt-1">Comprehensive platform performance and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport} className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Primary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Users"
            value={mockSystemStats.totalUsers}
            color="blue"
            trend={{ value: 12, direction: "up" }}
            subtext="Active platform users"
          />
          <StatCard
            label="Active Students"
            value={mockSystemStats.totalStudents}
            color="teal"
            trend={{ value: 15, direction: "up" }}
            subtext="Enrolled learners"
          />
          <StatCard
            label="Total Courses"
            value={mockSystemStats.totalCourses}
            color="purple"
            subtext={`${mockSystemStats.activeCourses} active`}
          />
          <StatCard
            label="Total Enrollments"
            value={mockSystemStats.totalEnrollments}
            color="orange"
            trend={{ value: 22, direction: "up" }}
            subtext="Course registrations"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-foreground">{activeUsers}</p>
                </div>
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Rate</span>
                  <span className="font-semibold">{activeRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                    style={{ width: `${activeRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Completion</p>
                  <p className="text-3xl font-bold text-foreground">78%</p>
                </div>
                <ClipboardList className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Score</span>
                  <span className="font-semibold">81%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                    style={{ width: "81%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Course Completion</p>
                  <p className="text-3xl font-bold text-foreground">72%</p>
                </div>
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Certificates Issued</span>
                  <span className="font-semibold">1,243</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Chart */}
        <LineChartCustom
          title="User Growth Over Time - ការរីកចម្រើនអ្នកប្រើប្រាស់"
          data={mockUserGrowth}
          lines={[
            { key: "users", color: "#3b82f6", name: "Total Users" },
            { key: "educators", color: "#8b5cf6", name: "Educators" },
            { key: "students", color: "#14b8a6", name: "Students" },
          ]}
        />

        {/* Course & Quiz Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart
            title="Course Enrollments by Subject"
            type="bar"
            data={mockCourseStats}
            dataKey="enrollments"
            color="#3b82f6"
          />
          <ProgressChart
            title="Average Quiz Scores by Subject"
            type="bar"
            data={mockQuizPerformance}
            dataKey="avgScore"
            color="#14b8a6"
          />
        </div>

        {/* Detailed Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCourseStats.map((stat) => {
                const quizData = mockQuizPerformance.find((q) => q.subject === stat.subject)
                return (
                  <div key={stat.subject} className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{stat.subject}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Enrollments</p>
                          <p className="font-bold text-blue-600">{stat.enrollments}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Completion</p>
                          <p className="font-bold text-green-600">{stat.completion}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-bold text-purple-600">{quizData?.avgScore}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Attempts</p>
                          <p className="font-bold text-orange-600">{quizData?.attempts}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Enrollment Growth</span>
                          <span className="font-bold text-blue-600">+18%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Completion Rate</span>
                          <span className="font-bold text-green-600">{stat.completion}%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stat.completion}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Student Satisfaction</span>
                          <span className="font-bold text-purple-600">92%</span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Key Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">User Growth</p>
                      <p className="text-sm text-muted-foreground">Steady increase in signups</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-green-600">+12%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Course Enrollments</p>
                      <p className="text-sm text-muted-foreground">Strong engagement</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-blue-600">+22%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Completion Rate</p>
                      <p className="text-sm text-muted-foreground">Improving outcomes</p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-purple-600">+8%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockRecentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        <span className="text-primary">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
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
        </div>

        {/* System Health Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Health & Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-green-50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-green-600 mb-1">98%</h4>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-xs text-green-700 mt-2">All services operational</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-blue-50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-blue-600 mb-1">{activeUsers}</h4>
                <p className="text-sm text-muted-foreground">Active Users Today</p>
                <p className="text-xs text-blue-700 mt-2">{activeRate}% engagement rate</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-purple-50">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-purple-600 mb-1">{mockSystemStats.totalEnrollments}</h4>
                <p className="text-sm text-muted-foreground">Total Enrollments</p>
                <p className="text-xs text-purple-700 mt-2">Across all courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
