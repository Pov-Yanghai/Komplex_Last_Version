"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { mockQuizzes } from "@/lib/mock-data"
import { ArrowLeft, Plus, Edit, Trash2, HelpCircle } from "lucide-react"
import Link from "next/link"

type QuestionType = {
  id: string
  type: "mcq" | "true-false" | "fill-in"
  question: string
  options?: string[]
  correctAnswer: string
  points: number
}

export default function AdminQuizQuestionsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const quizId = params.quizId as string

  const quiz = mockQuizzes.find((q) => q.id === quizId)
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      id: "q1",
      type: "mcq",
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
      points: 10,
    },
    {
      id: "q2",
      type: "true-false",
      question: "The Earth is flat.",
      correctAnswer: "False",
      points: 5,
    },
  ])
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionType | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState<QuestionType>({
    id: "",
    type: "mcq",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 10,
  })

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  if (!quiz) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Quiz not found</h1>
          <Link href="/admin/quizzes">
            <Button className="mt-4">Back to Quizzes</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  // Create question
  const handleCreateQuestion = () => {
    const newQuestion: QuestionType = {
      ...formData,
      id: `q-${Date.now()}`,
    }
    setQuestions([...questions, newQuestion])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  // Edit question
  const handleEditQuestion = () => {
    if (!selectedQuestion) return
    setQuestions(questions.map((q) => (q.id === selectedQuestion.id ? { ...formData, id: q.id } : q)))
    setIsEditDialogOpen(false)
    setSelectedQuestion(null)
    resetForm()
  }

  // Delete question
  const handleDeleteQuestion = () => {
    if (!selectedQuestion) return
    setQuestions(questions.filter((q) => q.id !== selectedQuestion.id))
    setIsDeleteDialogOpen(false)
    setSelectedQuestion(null)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      id: "",
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 10,
    })
  }

  // Open edit dialog
  const openEditDialog = (question: QuestionType) => {
    setSelectedQuestion(question)
    setFormData({ ...question })
    setIsEditDialogOpen(true)
  }

  // Update option
  const updateOption = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <Link href="/admin/quizzes">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Quizzes
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
              <p className="text-muted-foreground mt-1">Manage questions for this quiz</p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold text-foreground">{questions.length}</p>
                </div>
                <HelpCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-foreground">
                    {questions.reduce((acc, q) => acc + q.points, 0)}
                  </p>
                </div>
                <HelpCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Points/Question</p>
                  <p className="text-2xl font-bold text-foreground">
                    {questions.length > 0
                      ? Math.round(questions.reduce((acc, q) => acc + q.points, 0) / questions.length)
                      : 0}
                  </p>
                </div>
                <HelpCircle className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Questions List */}
        <Card>
          <CardHeader>
            <CardTitle>Questions ({questions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4">Add your first question to get started</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Add First Question</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={
                              question.type === "mcq"
                                ? "bg-blue-100 text-blue-700"
                                : question.type === "true-false"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-green-100 text-green-700"
                            }
                          >
                            {question.type === "mcq"
                              ? "Multiple Choice"
                              : question.type === "true-false"
                                ? "True/False"
                                : "Fill-in"}
                          </Badge>
                          <Badge variant="outline" className="bg-orange-100 text-orange-700">
                            {question.points} pts
                          </Badge>
                        </div>
                        <p className="font-semibold mb-2">{question.question}</p>
                        {question.type === "mcq" && question.options && (
                          <div className="space-y-1 text-sm">
                            {question.options.map((option, i) => (
                              <div
                                key={i}
                                className={`pl-3 ${option === question.correctAnswer ? "text-green-600 font-semibold" : "text-muted-foreground"}`}
                              >
                                {String.fromCharCode(65 + i)}. {option}
                                {option === question.correctAnswer && " ✓"}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === "true-false" && (
                          <p className="text-sm text-muted-foreground">
                            Correct Answer:{" "}
                            <span className="text-green-600 font-semibold">{question.correctAnswer}</span>
                          </p>
                        )}
                        {question.type === "fill-in" && (
                          <p className="text-sm text-muted-foreground">
                            Correct Answer:{" "}
                            <span className="text-green-600 font-semibold">{question.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(question)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedQuestion(question)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Question Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>Create a new question for this quiz</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question-type">Question Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) =>
                    setFormData({
                      ...formData,
                      type: value,
                      options: value === "mcq" ? ["", "", "", ""] : undefined,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="fill-in">Fill-in-the-Blank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="question-text">Question</Label>
                <Textarea
                  id="question-text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter your question here"
                  rows={3}
                />
              </div>
              {formData.type === "mcq" && (
                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {formData.options?.map((option, i) => (
                    <Input
                      key={i}
                      value={option}
                      onChange={(e) => updateOption(i, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    />
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="correct-answer">Correct Answer</Label>
                {formData.type === "mcq" ? (
                  <Select
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.options?.map((option, i) => (
                        <SelectItem key={i} value={option}>
                          {String.fromCharCode(65 + i)}. {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : formData.type === "true-false" ? (
                  <RadioGroup
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="True" id="true" />
                      <Label htmlFor="true">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="False" id="false" />
                      <Label htmlFor="false">False</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Input
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    placeholder="Enter the correct answer"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 0 })}
                  min="1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateQuestion}>Add Question</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Question Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
              <DialogDescription>Update question information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-question-type">Question Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) =>
                    setFormData({
                      ...formData,
                      type: value,
                      options: value === "mcq" ? formData.options || ["", "", "", ""] : undefined,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="fill-in">Fill-in-the-Blank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-question-text">Question</Label>
                <Textarea
                  id="edit-question-text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={3}
                />
              </div>
              {formData.type === "mcq" && (
                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {formData.options?.map((option, i) => (
                    <Input
                      key={i}
                      value={option}
                      onChange={(e) => updateOption(i, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    />
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="edit-correct-answer">Correct Answer</Label>
                {formData.type === "mcq" ? (
                  <Select
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.options?.map((option, i) => (
                        <SelectItem key={i} value={option}>
                          {String.fromCharCode(65 + i)}. {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : formData.type === "true-false" ? (
                  <RadioGroup
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="True" id="edit-true" />
                      <Label htmlFor="edit-true">True</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="False" id="edit-false" />
                      <Label htmlFor="edit-false">False</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Input
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-points">Points</Label>
                <Input
                  id="edit-points"
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 0 })}
                  min="1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditQuestion}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Question Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Question</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this question? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteQuestion}>
                Delete Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
