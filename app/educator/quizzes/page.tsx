"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { mockCourses, mockQuizzes } from "@/lib/mock-data"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, ClipboardList, Settings } from "lucide-react"

export default function EducatorQuizzesPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const educatorCourses = mockCourses.filter((c) => c.educatorId === user?.id || c.educatorId === "educator-1")
  const [quizzes, setQuizzes] = useState(mockQuizzes.filter((q) => educatorCourses.some((c) => c.id === q.courseId)))
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    courseId: "",
    timeLimit: 30,
    passingScore: 70,
    attemptsAllowed: 3,
    shuffleQuestions: true,
    shuffleChoices: true,
    published: true,
  })

  const handleCreate = () => {
    const course = educatorCourses.find((c) => c.id === formData.courseId)
    if (!course) return

    const newQuiz = {
      id: Date.now().toString(),
      ...formData,
      courseName: course.title,
      questions: 0,
    }
    setQuizzes([...quizzes, newQuiz])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!selectedQuiz) return
    setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? { ...q, ...formData } : q)))
    setIsEditOpen(false)
    setSelectedQuiz(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!selectedQuiz) return
    setQuizzes(quizzes.filter((q) => q.id !== selectedQuiz.id))
    setIsDeleteOpen(false)
    setSelectedQuiz(null)
  }

  const openEditDialog = (quiz: any) => {
    setSelectedQuiz(quiz)
    setFormData({
      title: quiz.title,
      courseId: quiz.courseId,
      timeLimit: quiz.timeLimit || 30,
      passingScore: quiz.passingScore || 70,
      attemptsAllowed: quiz.attemptsAllowed || 3,
      shuffleQuestions: quiz.shuffleQuestions !== false,
      shuffleChoices: quiz.shuffleChoices !== false,
      published: quiz.published !== false,
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      courseId: "",
      timeLimit: 30,
      passingScore: 70,
      attemptsAllowed: 3,
      shuffleQuestions: true,
      shuffleChoices: true,
      published: true,
    })
  }

  const getCourseName = (courseId: string) => {
    return educatorCourses.find((c) => c.id === courseId)?.title || "Unknown Course"
  }

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Quizzes</h1>
              <p className="text-muted-foreground mt-2">Create and manage quizzes - បង្កើត និងគ្រប់គ្រងកម្រងសំណួរ</p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Quiz
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-3xl font-bold text-foreground mt-2">{quizzes.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {quizzes.reduce((sum, q) => sum + (q.questions || 0), 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {quizzes.filter((q) => q.published !== false).length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">My Courses</p>
                <p className="text-3xl font-bold text-foreground mt-2">{educatorCourses.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Quizzes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground line-clamp-2 mb-1">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">{getCourseName(quiz.courseId)}</p>
                    </div>
                    <ClipboardList className="w-6 h-6 text-primary" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4 p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Questions</p>
                      <p className="text-lg font-bold text-foreground">{quiz.questions || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Time Limit</p>
                      <p className="text-lg font-bold text-foreground">{quiz.timeLimit}m</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Pass Score</p>
                      <p className="text-lg font-bold text-foreground">{quiz.passingScore}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Status</p>
                      <p
                        className={`text-sm font-bold ${quiz.published === false ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {quiz.published === false ? "Draft" : "Published"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/educator/quizzes/${quiz.id}/questions`}
                      className="flex-1 text-sm py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center font-medium flex items-center justify-center gap-1"
                    >
                      <Settings className="w-3.5 h-3.5" />
                      Questions
                    </Link>
                    <Button onClick={() => openEditDialog(quiz)} size="sm" variant="outline" className="flex-1 gap-1">
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedQuiz(quiz)
                        setIsDeleteOpen(true)
                      }}
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {quizzes.length === 0 && (
            <Card className="p-12 text-center">
              <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No quizzes yet</h3>
              <p className="text-muted-foreground mb-6">Create your first quiz to assess your students</p>
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Create Quiz
              </Button>
            </Card>
          )}
        </div>

        {/* Create Quiz Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Quiz Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Midterm Chemistry Exam"
                />
              </div>
              <div>
                <Label htmlFor="course">Select Course *</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {educatorCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeLimit">Time Limit (minutes) *</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                    max="300"
                  />
                </div>
                <div>
                  <Label htmlFor="passingScore">Passing Score (%) *</Label>
                  <Input
                    id="passingScore"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="attempts">Attempts Allowed *</Label>
                <Input
                  id="attempts"
                  type="number"
                  value={formData.attemptsAllowed}
                  onChange={(e) => setFormData({ ...formData, attemptsAllowed: Number.parseInt(e.target.value) || 0 })}
                  min="1"
                  max="10"
                />
              </div>

              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffleQuestions" className="cursor-pointer">
                    Shuffle Questions
                  </Label>
                  <Switch
                    id="shuffleQuestions"
                    checked={formData.shuffleQuestions}
                    onCheckedChange={(checked) => setFormData({ ...formData, shuffleQuestions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="shuffleChoices" className="cursor-pointer">
                    Shuffle Answer Choices
                  </Label>
                  <Switch
                    id="shuffleChoices"
                    checked={formData.shuffleChoices}
                    onCheckedChange={(checked) => setFormData({ ...formData, shuffleChoices: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="published" className="cursor-pointer">
                    Publish Immediately
                  </Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.title || !formData.courseId}>
                Create Quiz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Quiz Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Quiz Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-course">Select Course *</Label>
                <Select
                  value={formData.courseId}
                  onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {educatorCourses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-timeLimit">Time Limit (minutes) *</Label>
                  <Input
                    id="edit-timeLimit"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                    max="300"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-passingScore">Passing Score (%) *</Label>
                  <Input
                    id="edit-passingScore"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => setFormData({ ...formData, passingScore: Number.parseInt(e.target.value) || 0 })}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-attempts">Attempts Allowed *</Label>
                <Input
                  id="edit-attempts"
                  type="number"
                  value={formData.attemptsAllowed}
                  onChange={(e) => setFormData({ ...formData, attemptsAllowed: Number.parseInt(e.target.value) || 0 })}
                  min="1"
                  max="10"
                />
              </div>

              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-shuffleQuestions" className="cursor-pointer">
                    Shuffle Questions
                  </Label>
                  <Switch
                    id="edit-shuffleQuestions"
                    checked={formData.shuffleQuestions}
                    onCheckedChange={(checked) => setFormData({ ...formData, shuffleQuestions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-shuffleChoices" className="cursor-pointer">
                    Shuffle Answer Choices
                  </Label>
                  <Switch
                    id="edit-shuffleChoices"
                    checked={formData.shuffleChoices}
                    onCheckedChange={(checked) => setFormData({ ...formData, shuffleChoices: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-published" className="cursor-pointer">
                    Published
                  </Label>
                  <Switch
                    id="edit-published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!formData.title || !formData.courseId}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Quiz</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground py-4">
              Are you sure you want to delete "{selectedQuiz?.title}"? This will permanently remove all questions and
              student results.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Quiz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedPage>
  )
}
