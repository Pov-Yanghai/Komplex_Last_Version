"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCourses } from "@/lib/mock-data"
import { Search, Users, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function EducatorStudentsPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const educatorCourses = mockCourses.filter((c) => c.educatorId === user?.id || c.educatorId === "educator-1")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")

  // Mock student data with enrollments
  const mockStudents = [
    {
      id: "1",
      name: "Sokha Khun",
      email: "sokha@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      enrolledDate: "2024-09-01",
      progress: 85,
      lastActive: "2 hours ago",
      quizAvg: 92,
      assignmentsSubmitted: 8,
      assignmentsTotal: 10,
    },
    {
      id: "2",
      name: "Chhoy Rith",
      email: "chhoy@email.com",
      courseId: "2",
      courseName: "Chemistry Basics",
      enrolledDate: "2024-09-05",
      progress: 72,
      lastActive: "1 day ago",
      quizAvg: 85,
      assignmentsSubmitted: 6,
      assignmentsTotal: 8,
    },
    {
      id: "3",
      name: "Mey Dina",
      email: "dina@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      enrolledDate: "2024-09-10",
      progress: 68,
      lastActive: "3 hours ago",
      quizAvg: 78,
      assignmentsSubmitted: 7,
      assignmentsTotal: 10,
    },
    {
      id: "4",
      name: "Visal Chan",
      email: "visal@email.com",
      courseId: "2",
      courseName: "Chemistry Basics",
      enrolledDate: "2024-10-01",
      progress: 45,
      lastActive: "1 week ago",
      quizAvg: 65,
      assignmentsSubmitted: 3,
      assignmentsTotal: 8,
    },
    {
      id: "5",
      name: "Dara Pov",
      email: "dara@email.com",
      courseId: "1",
      courseName: "Khmer Language Fundamentals",
      enrolledDate: "2024-09-15",
      progress: 95,
      lastActive: "30 min ago",
      quizAvg: 98,
      assignmentsSubmitted: 10,
      assignmentsTotal: 10,
    },
  ]

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = selectedCourse === "all" || student.courseId === selectedCourse
    return matchesSearch && matchesCourse
  })

  const totalStudents = mockStudents.length
  const avgProgress = Math.round(mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length)
  const avgQuizScore = Math.round(mockStudents.reduce((sum, s) => sum + s.quizAvg, 0) / mockStudents.length)

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t("nav.students")}</h1>
            <p className="text-muted-foreground mt-2">Monitor student progress - តាមដានវឌ្ឍនភាពសិស្ស</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold text-foreground">{avgProgress}%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
                  <p className="text-2xl font-bold text-foreground">{avgQuizScore}%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex items-center gap-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">My Courses</p>
                  <p className="text-2xl font-bold text-foreground">{educatorCourses.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="pl-10"
                  />
                </div>
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
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Students ({filteredStudents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Course</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Quiz Avg</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Assignments</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Last Active</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-muted transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-sm text-foreground">{student.courseName}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="w-24 bg-muted rounded-full h-2 mb-1">
                              <div
                                className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-semibold ${
                              student.quizAvg >= 90
                                ? "text-green-600"
                                : student.quizAvg >= 70
                                  ? "text-blue-600"
                                  : "text-orange-600"
                            }`}
                          >
                            {student.quizAvg}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-foreground">
                            {student.assignmentsSubmitted}/{student.assignmentsTotal}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-muted-foreground">{student.lastActive}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/educator/students/${student.id}`}>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No students found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  )
}
