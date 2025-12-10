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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { mockLessons, mockCourses } from "@/lib/mock-data"
import { ArrowLeft, Plus, Edit, Trash2, GripVertical, Video, FileText, PlayCircle } from "lucide-react"
import Link from "next/link"

type LessonType = (typeof mockLessons)[0] & { type?: "video" | "text" | "pdf" }

export default function AdminCourseLessonsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string

  const course = mockCourses.find((c) => c.id === courseId)
  const [lessons, setLessons] = useState<LessonType[]>(
    mockLessons.filter((l) => l.courseId === courseId).map((l) => ({ ...l, type: "video" })),
  )
  const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video" as "video" | "text" | "pdf",
    videoUrl: "",
    content: "",
  })

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link href="/admin/courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  // Create lesson
  const handleCreateLesson = () => {
    const newLesson: LessonType = {
      id: `lesson-${Date.now()}`,
      courseId,
      title: formData.title,
      description: formData.description,
      type: formData.type,
      videoUrl: formData.videoUrl,
      order: lessons.length + 1,
    }
    setLessons([...lessons, newLesson])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  // Edit lesson
  const handleEditLesson = () => {
    if (!selectedLesson) return
    setLessons(
      lessons.map((l) =>
        l.id === selectedLesson.id
          ? {
              ...l,
              title: formData.title,
              description: formData.description,
              type: formData.type,
              videoUrl: formData.videoUrl,
            }
          : l,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedLesson(null)
    resetForm()
  }

  // Delete lesson
  const handleDeleteLesson = () => {
    if (!selectedLesson) return
    setLessons(lessons.filter((l) => l.id !== selectedLesson.id))
    setIsDeleteDialogOpen(false)
    setSelectedLesson(null)
  }

  // Move lesson up
  const moveLessonUp = (index: number) => {
    if (index === 0) return
    const newLessons = [...lessons]
    ;[newLessons[index - 1], newLessons[index]] = [newLessons[index], newLessons[index - 1]]
    newLessons.forEach((l, i) => (l.order = i + 1))
    setLessons(newLessons)
  }

  // Move lesson down
  const moveLessonDown = (index: number) => {
    if (index === lessons.length - 1) return
    const newLessons = [...lessons]
    ;[newLessons[index], newLessons[index + 1]] = [newLessons[index + 1], newLessons[index]]
    newLessons.forEach((l, i) => (l.order = i + 1))
    setLessons(newLessons)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "video",
      videoUrl: "",
      content: "",
    })
  }

  // Open edit dialog
  const openEditDialog = (lesson: LessonType) => {
    setSelectedLesson(lesson)
    setFormData({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type || "video",
      videoUrl: lesson.videoUrl || "",
      content: "",
    })
    setIsEditDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <Link href="/admin/courses">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground mt-1">Manage lessons for this course</p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Lesson
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Lessons</p>
                  <p className="text-2xl font-bold text-foreground">{lessons.length}</p>
                </div>
                <Video className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Video Lessons</p>
                  <p className="text-2xl font-bold text-foreground">
                    {lessons.filter((l) => l.type === "video").length}
                  </p>
                </div>
                <PlayCircle className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Text/PDF Lessons</p>
                  <p className="text-2xl font-bold text-foreground">
                    {lessons.filter((l) => l.type === "text" || l.type === "pdf").length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons List */}
        <Card>
          <CardHeader>
            <CardTitle>Lessons ({lessons.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {lessons.length === 0 ? (
              <div className="text-center py-12">
                <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No lessons yet</h3>
                <p className="text-muted-foreground mb-4">Add your first lesson to get started</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Add First Lesson</Button>
              </div>
            ) : (
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveLessonUp(index)}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <GripVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {lesson.order}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <Badge
                          variant="outline"
                          className={
                            lesson.type === "video"
                              ? "bg-purple-100 text-purple-700"
                              : lesson.type === "pdf"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                          }
                        >
                          {lesson.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveLessonUp(index)}
                        disabled={index === 0}
                        className="h-8"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveLessonDown(index)}
                        disabled={index === lessons.length - 1}
                        className="h-8"
                      >
                        ↓
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(lesson)} className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedLesson(lesson)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Lesson Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Lesson</DialogTitle>
              <DialogDescription>Create a new lesson for {course.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="lesson-title">Lesson Title</Label>
                <Input
                  id="lesson-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Algebra"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson-description">Description</Label>
                <Textarea
                  id="lesson-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the lesson"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lesson-type">Lesson Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text Content</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.type === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="video-url">Video URL (YouTube or direct link)</Label>
                  <Input
                    id="video-url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              )}
              {(formData.type === "text" || formData.type === "pdf") && (
                <div className="space-y-2">
                  <Label htmlFor="content">Content / File URL</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder={formData.type === "pdf" ? "PDF file URL" : "Lesson text content"}
                    rows={5}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateLesson}>Add Lesson</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Lesson Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Lesson</DialogTitle>
              <DialogDescription>Update lesson information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-lesson-title">Lesson Title</Label>
                <Input
                  id="edit-lesson-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lesson-description">Description</Label>
                <Textarea
                  id="edit-lesson-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-lesson-type">Lesson Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text Content</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.type === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-video-url">Video URL</Label>
                  <Input
                    id="edit-video-url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditLesson}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Lesson Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Lesson</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedLesson?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteLesson}>
                Delete Lesson
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
