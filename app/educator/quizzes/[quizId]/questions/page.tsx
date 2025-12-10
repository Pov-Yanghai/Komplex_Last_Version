"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { mockQuizzes } from "@/lib/mock-data"
import { ArrowLeft, PlusCircle, Edit, Trash2, HelpCircle } from "lucide-react"

interface Question {
  id: string
  question: string
  type: "mcq" | "true-false" | "fill-in" | "short-answer"
  points: number
  choices?: string[]
  correctAnswer?: string | number
}

export default function QuizQuestionsPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.quizId as string

  const quiz = mockQuizzes.find((q) => q.id === quizId)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the chemical symbol for water?",
      type: "mcq",
      points: 10,
      choices: ["H2O", "CO2", "O2", "H2"],
      correctAnswer: 0,
    },
    {
      id: "2",
      question: "Is the earth flat?",
      type: "true-false",
      points: 5,
      correctAnswer: "false",
    },
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [formData, setFormData] = useState({
    question: "",
    type: "mcq" as "mcq" | "true-false" | "fill-in" | "short-answer",
    points: 10,
    choices: ["", "", "", ""],
    correctAnswer: "",
  })

  if (!quiz) {
    return (
      <ProtectedPage requiredRoles={["educator"]}>
        <DashboardLayout>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quiz not found</h2>
            <Button onClick={() => router.push("/educator/quizzes")}>Back to Quizzes</Button>
          </div>
        </DashboardLayout>
      </ProtectedPage>
    )
  }

  const handleCreate = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: formData.question,
      type: formData.type,
      points: formData.points,
    }

    if (formData.type === "mcq") {
      newQuestion.choices = formData.choices.filter((c) => c.trim() !== "")
      newQuestion.correctAnswer = Number.parseInt(formData.correctAnswer) || 0
    } else if (formData.type === "true-false") {
      newQuestion.correctAnswer = formData.correctAnswer
    } else {
      newQuestion.correctAnswer = formData.correctAnswer
    }

    setQuestions([...questions, newQuestion])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!selectedQuestion) return

    const updatedQuestion: Question = {
      ...selectedQuestion,
      question: formData.question,
      type: formData.type,
      points: formData.points,
    }

    if (formData.type === "mcq") {
      updatedQuestion.choices = formData.choices.filter((c) => c.trim() !== "")
      updatedQuestion.correctAnswer = Number.parseInt(formData.correctAnswer) || 0
    } else if (formData.type === "true-false") {
      updatedQuestion.correctAnswer = formData.correctAnswer
    } else {
      updatedQuestion.correctAnswer = formData.correctAnswer
    }

    setQuestions(questions.map((q) => (q.id === selectedQuestion.id ? updatedQuestion : q)))
    setIsEditOpen(false)
    setSelectedQuestion(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!selectedQuestion) return
    setQuestions(questions.filter((q) => q.id !== selectedQuestion.id))
    setIsDeleteOpen(false)
    setSelectedQuestion(null)
  }

  const openEditDialog = (question: Question) => {
    setSelectedQuestion(question)
    setFormData({
      question: question.question,
      type: question.type,
      points: question.points,
      choices: question.choices || ["", "", "", ""],
      correctAnswer: question.correctAnswer?.toString() || "",
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({
      question: "",
      type: "mcq",
      points: 10,
      choices: ["", "", "", ""],
      correctAnswer: "",
    })
  }

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...formData.choices]
    newChoices[index] = value
    setFormData({ ...formData, choices: newChoices })
  }

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "mcq":
        return "Multiple Choice"
      case "true-false":
        return "True/False"
      case "fill-in":
        return "Fill in the Blank"
      case "short-answer":
        return "Short Answer"
      default:
        return type
    }
  }

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push("/educator/quizzes")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
              <p className="text-muted-foreground mt-1">Manage questions - គ្រប់គ្រងសំណួរ</p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Question
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-3xl font-bold text-foreground mt-2">{questions.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {questions.reduce((sum, q) => sum + q.points, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="text-3xl font-bold text-foreground mt-2">{quiz.timeLimit}m</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Pass Score</p>
                <p className="text-3xl font-bold text-foreground mt-2">{quiz.passingScore}%</p>
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
                  <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No questions yet</h3>
                  <p className="text-muted-foreground mb-6">Add your first question to build the quiz</p>
                  <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add First Question
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-semibold text-foreground flex-1">{question.question}</h3>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                                {getQuestionTypeLabel(question.type)}
                              </span>
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                                {question.points} pts
                              </span>
                            </div>
                          </div>

                          {question.type === "mcq" && question.choices && (
                            <div className="space-y-2 mt-3">
                              {question.choices.map((choice, idx) => (
                                <div
                                  key={idx}
                                  className={`text-sm px-3 py-2 rounded border ${
                                    question.correctAnswer === idx
                                      ? "border-green-500 bg-green-50 text-green-900"
                                      : "border-border bg-muted"
                                  }`}
                                >
                                  {String.fromCharCode(65 + idx)}. {choice}
                                  {question.correctAnswer === idx && (
                                    <span className="ml-2 font-semibold text-green-700">(Correct)</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === "true-false" && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Correct Answer:{" "}
                              <span className="font-semibold text-foreground">
                                {question.correctAnswer === "true" ? "True" : "False"}
                              </span>
                            </p>
                          )}

                          {(question.type === "fill-in" || question.type === "short-answer") && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Expected Answer:{" "}
                              <span className="font-semibold text-foreground">{question.correctAnswer}</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button size="sm" variant="outline" onClick={() => openEditDialog(question)}>
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                            onClick={() => {
                              setSelectedQuestion(question)
                              setIsDeleteOpen(true)
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Create Question Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="question">Question *</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter your question..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Question Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value, correctAnswer: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="fill-in">Fill in the Blank</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="points">Points *</Label>
                  <Input
                    id="points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
              </div>

              {formData.type === "mcq" && (
                <div className="space-y-3">
                  <Label>Answer Choices *</Label>
                  {formData.choices.map((choice, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="text-sm font-semibold w-6">{String.fromCharCode(65 + index)}.</span>
                      <Input
                        value={choice}
                        onChange={(e) => updateChoice(index, e.target.value)}
                        placeholder={`Choice ${index + 1}`}
                      />
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="correct">Correct Answer *</Label>
                    <Select
                      value={formData.correctAnswer}
                      onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.choices.map((choice, index) => (
                          <SelectItem key={index} value={index.toString()} disabled={!choice.trim()}>
                            {String.fromCharCode(65 + index)}. {choice || "(empty)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formData.type === "true-false" && (
                <div>
                  <Label htmlFor="tf-correct">Correct Answer *</Label>
                  <Select
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(formData.type === "fill-in" || formData.type === "short-answer") && (
                <div>
                  <Label htmlFor="answer">Expected Answer *</Label>
                  <Input
                    id="answer"
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    placeholder="Enter the expected answer..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.type === "short-answer"
                      ? "Manual grading required for short answer questions"
                      : "Answer will be checked (case-insensitive)"}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.question || !formData.correctAnswer}>
                Add Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Question Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Question</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-question">Question *</Label>
                <Textarea
                  id="edit-question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Question Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="fill-in">Fill in the Blank</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-points">Points *</Label>
                  <Input
                    id="edit-points"
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: Number.parseInt(e.target.value) || 0 })}
                    min="1"
                  />
                </div>
              </div>

              {formData.type === "mcq" && (
                <div className="space-y-3">
                  <Label>Answer Choices *</Label>
                  {formData.choices.map((choice, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <span className="text-sm font-semibold w-6">{String.fromCharCode(65 + index)}.</span>
                      <Input value={choice} onChange={(e) => updateChoice(index, e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="edit-correct">Correct Answer *</Label>
                    <Select
                      value={formData.correctAnswer}
                      onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.choices.map((choice, index) => (
                          <SelectItem key={index} value={index.toString()} disabled={!choice.trim()}>
                            {String.fromCharCode(65 + index)}. {choice || "(empty)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {formData.type === "true-false" && (
                <div>
                  <Label htmlFor="edit-tf-correct">Correct Answer *</Label>
                  <Select
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(formData.type === "fill-in" || formData.type === "short-answer") && (
                <div>
                  <Label htmlFor="edit-answer">Expected Answer *</Label>
                  <Input
                    id="edit-answer"
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!formData.question || !formData.correctAnswer}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Question</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground py-4">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Question
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedPage>
  )
}
