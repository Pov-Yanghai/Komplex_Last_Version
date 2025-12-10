"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockQuizzes, mockCourses } from "@/lib/mock-data"
import { ClipboardList, Plus, Edit, Trash2, Search, BarChart, Clock, Target } from "lucide-react"
import Link from "next/link"

type QuizType = (typeof mockQuizzes)[0]

export default function AdminQuizzesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [quizzes, setQuizzes] = useState<QuizType[]>(mockQuizzes)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCourse, setFilterCourse] = useState<string>("all")
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    questions: 10,
    timeLimit: 30,
    passingScore: 70,
  })

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCourse = filterCourse === "all" || q.courseId === filterCourse
    return matchesSearch && matchesCourse
  })

  // Create quiz
  const handleCreateQuiz = () => {
    const newQuiz: QuizType = {
      id: `quiz-${Date.now()}`,
      courseId: formData.courseId,
      title: formData.title,
      questions: formData.questions,
      timeLimit: formData.timeLimit,
      passingScore: formData.passingScore,
    }
    setQuizzes([...quizzes, newQuiz])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  // Edit quiz
  const handleEditQuiz = () => {
    if (!selectedQuiz) return
    setQuizzes(
      quizzes.map((q) =>
        q.id === selectedQuiz.id
          ? {
              ...q,
              title: formData.title,
              courseId: formData.courseId,
              questions: formData.questions,
              timeLimit: formData.timeLimit,
              passingScore: formData.passingScore,
            }
          : q,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedQuiz(null)
    resetForm()
  }

  // Delete quiz
  const handleDeleteQuiz = () => {
    if (!selectedQuiz) return
    setQuizzes(quizzes.filter((q) => q.id !== selectedQuiz.id))
    setIsDeleteDialogOpen(false)
    setSelectedQuiz(null)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      courseId: "",
      questions: 10,
      timeLimit: 30,
      passingScore: 70,
    })
  }

  // Open edit dialog
  const openEditDialog = (quiz: QuizType) => {
    setSelectedQuiz(quiz)
    setFormData({
      title: quiz.title,
      courseId: quiz.courseId,
      questions: quiz.questions,
      timeLimit: quiz.timeLimit,
      passingScore: quiz.passingScore,
    })
    setIsEditDialogOpen(true)
  }

  const getCourseTitle = (courseId: string) => {
    return mockCourses.find((c) => c.id === courseId)?.title || "Unknown Course"
  }

  const getCourseCategory = (courseId: string) => {
    return mockCourses.find((c) => c.id === courseId)?.category || "Unknown"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quiz Management</h1>
            <p className="text-muted-foreground mt-1">Create and manage quizzes for all courses</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Quiz
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                  <p className="text-2xl font-bold text-foreground">{quizzes.length}</p>
                </div>
                <ClipboardList className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold text-foreground">
                    {quizzes.reduce((acc, q) => acc + q.questions, 0)}
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Time Limit</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(quizzes.reduce((acc, q) => acc + q.timeLimit, 0) / quizzes.length || 0)}m
                  </p>
                </div>
                <Clock className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Passing Score</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(quizzes.reduce((acc, q) => acc + q.passingScore, 0) / quizzes.length || 0)}%
                  </p>
                </div>
                <BarChart className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCourse} onValueChange={setFilterCourse}>
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Quizzes ({filteredQuizzes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Time Limit</TableHead>
                    <TableHead>Passing Score</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell className="text-sm">{getCourseTitle(quiz.courseId)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            getCourseCategory(quiz.courseId) === "Mathematics"
                              ? "bg-blue-100 text-blue-700"
                              : getCourseCategory(quiz.courseId) === "Khmer"
                                ? "bg-purple-100 text-purple-700"
                                : getCourseCategory(quiz.courseId) === "Chemistry"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                          }
                        >
                          {getCourseCategory(quiz.courseId)}
                        </Badge>
                      </TableCell>
                      <TableCell>{quiz.questions}</TableCell>
                      <TableCell>{quiz.timeLimit} min</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-teal-100 text-teal-700">
                          {quiz.passingScore}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/quizzes/${quiz.id}/questions`}>
                            <Button variant="ghost" size="sm" className="h-8 gap-2">
                              <Edit className="w-4 h-4" />
                              Questions
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(quiz)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedQuiz(quiz)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Create Quiz Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>Add a new quiz to a course</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input
                  id="quiz-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Final Exam - Algebra"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="questions">Questions</Label>
                  <Input
                    id="questions"
                    type="number"
                    value={formData.questions}
                    onChange={(e) => setFormData({ ...formData, questions: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Time (min)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingScore">Pass %</Label>
                  <Input
                    id="passingScore"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateQuiz}>Create Quiz</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Quiz Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Quiz</DialogTitle>
              <DialogDescription>Update quiz settings</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-quiz-title">Quiz Title</Label>
                <Input
                  id="edit-quiz-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-course">Course</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-questions">Questions</Label>
                  <Input
                    id="edit-questions"
                    type="number"
                    value={formData.questions}
                    onChange={(e) => setFormData({ ...formData, questions: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-timeLimit">Time (min)</Label>
                  <Input
                    id="edit-timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-passingScore">Pass %</Label>
                  <Input
                    id="edit-passingScore"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditQuiz}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Quiz Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedQuiz?.title}"? This will also delete all questions and student
                results. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteQuiz}>
                Delete Quiz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
