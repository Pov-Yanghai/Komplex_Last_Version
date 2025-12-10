"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/charts/stat-card"
import { LineChartCustom } from "@/components/charts/line-chart-custom"
import { ProgressChart } from "@/components/charts/progress-chart"
import { mockSystemStats, mockUserGrowth, mockCourseStats, mockQuizPerformance } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, BookOpen } from "lucide-react"

export function AnalystDashboardOverview() {
  const { t } = useLanguage()

  const studentActivityHeatmap = [
    { day: "Mon", "00-06": 12, "06-12": 85, "12-18": 142, "18-24": 98 },
    { day: "Tue", "00-06": 15, "06-12": 92, "12-18": 156, "18-24": 105 },
    { day: "Wed", "00-06": 18, "06-12": 88, "12-18": 148, "18-24": 102 },
    { day: "Thu", "00-06": 14, "06-12": 95, "12-18": 165, "18-24": 112 },
    { day: "Fri", "00-06": 16, "06-12": 98, "12-18": 172, "18-24": 128 },
    { day: "Sat", "00-06": 22, "06-12": 78, "12-18": 125, "18-24": 156 },
    { day: "Sun", "00-06": 25, "06-12": 65, "12-18": 98, "18-24": 142 },
  ]

  const engagementMetrics = [
    { metric: "Daily Active Users", value: 342, change: 12 },
    { metric: "Avg Session Duration", value: "28 min", change: 8 },
    { metric: "Quiz Completion Rate", value: "76%", change: 5 },
    { metric: "Content Views", value: 1856, change: 18 },
  ]

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">ផ្ទាំងវិភាគទិន្នន័យ - Deep insights into platform performance</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={mockSystemStats.totalUsers}
          color="blue"
          trend={{ value: 12, direction: "up" }}
          subtext="Active users"
        />
        <StatCard
          label="Total Enrollments"
          value={mockSystemStats.totalEnrollments}
          color="teal"
          trend={{ value: 22, direction: "up" }}
          subtext="Course registrations"
        />
        <StatCard
          label="Avg Completion Rate"
          value="75%"
          color="green"
          trend={{ value: 5, direction: "up" }}
          subtext="Across all courses"
        />
        <StatCard
          label="Avg Quiz Score"
          value="81%"
          color="purple"
          trend={{ value: 3, direction: "up" }}
          subtext="Student performance"
        />
      </div>

      {/* Engagement Metrics */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Engagement Metrics - ការចូលរួមរបស់អ្នកប្រើប្រាស់
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {engagementMetrics.map((metric) => (
              <div key={metric.metric} className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-2">{metric.metric}</p>
                <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                <p className="text-xs text-green-600 font-semibold">+{metric.change}% this week</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Enrollment Analytics */}
        <ProgressChart
          title="Course Enrollments by Subject"
          type="bar"
          data={mockCourseStats}
          dataKey="enrollments"
          color="#3b82f6"
        />

        {/* Quiz Performance Analytics */}
        <ProgressChart
          title="Quiz Performance by Subject"
          type="bar"
          data={mockQuizPerformance}
          dataKey="avgScore"
          color="#8b5cf6"
        />
      </div>

      {/* User Growth Trend */}
      <LineChartCustom
        title="User Growth Analytics - ការរីកចម្រើនអ្នកប្រើប្រាស់"
        data={mockUserGrowth}
        lines={[
          { key: "users", color: "#3b82f6", name: "Total Users" },
          { key: "educators", color: "#8b5cf6", name: "Educators" },
          { key: "students", color: "#14b8a6", name: "Students" },
        ]}
      />

      {/* Student Activity Heatmap */}
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold">Student Activity Heatmap - កម្មវិធីសិក្សា</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 text-sm font-medium text-muted-foreground">Day</th>
                  <th className="p-2 text-sm font-medium text-muted-foreground">00:00-06:00</th>
                  <th className="p-2 text-sm font-medium text-muted-foreground">06:00-12:00</th>
                  <th className="p-2 text-sm font-medium text-muted-foreground">12:00-18:00</th>
                  <th className="p-2 text-sm font-medium text-muted-foreground">18:00-24:00</th>
                </tr>
              </thead>
              <tbody>
                {studentActivityHeatmap.map((row) => (
                  <tr key={row.day} className="border-b">
                    <td className="p-2 font-medium">{row.day}</td>
                    <td className="p-2">
                      <div
                        className="h-12 rounded flex items-center justify-center font-bold text-white"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${Math.min(row["00-06"] / 200, 1)})`,
                        }}
                      >
                        {row["00-06"]}
                      </div>
                    </td>
                    <td className="p-2">
                      <div
                        className="h-12 rounded flex items-center justify-center font-bold text-white"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${Math.min(row["06-12"] / 200, 1)})`,
                        }}
                      >
                        {row["06-12"]}
                      </div>
                    </td>
                    <td className="p-2">
                      <div
                        className="h-12 rounded flex items-center justify-center font-bold text-white"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${Math.min(row["12-18"] / 200, 1)})`,
                        }}
                      >
                        {row["12-18"]}
                      </div>
                    </td>
                    <td className="p-2">
                      <div
                        className="h-12 rounded flex items-center justify-center font-bold text-white"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${Math.min(row["18-24"] / 200, 1)})`,
                        }}
                      >
                        {row["18-24"]}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Peak activity: Thursday 12:00-18:00 with 165 active students
          </p>
        </CardContent>
      </Card>

      {/* Detailed Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Users (This Month)</span>
                <span className="font-bold text-foreground">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">User Retention Rate</span>
                <span className="font-bold text-green-600">88%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. User Lifetime</span>
                <span className="font-bold text-foreground">8.5 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Daily Users</span>
                <span className="font-bold text-foreground">342</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Most Popular Subject</span>
                <span className="font-bold text-foreground">Mathematics</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Highest Completion Rate</span>
                <span className="font-bold text-green-600">Khmer (82%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Course Duration</span>
                <span className="font-bold text-foreground">6.2 weeks</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Content Views</span>
                <span className="font-bold text-foreground">12,458</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
