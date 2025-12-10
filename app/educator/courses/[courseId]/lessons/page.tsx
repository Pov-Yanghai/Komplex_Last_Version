"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { mockCourses, mockLessons } from "@/lib/mock-data"
import {
  ArrowLeft,
  PlusCircle,
  Edit,
  Trash2,
  GripVertical,
  Video,
  FileText,
  File,
  MoveUp,
  MoveDown,
} from "lucide-react"

export default function EducatorLessonsPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string

  const course = mockCourses.find((c) => c.id === courseId)
  const [lessons, setLessons] = useState(mockLessons.filter((l) => l.courseId === courseId))
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "video",
    videoUrl: "",
    pdfUrl: "",
    textContent: "",
  })

  if (!course) {
    return (
      <ProtectedPage requiredRoles={["educator"]}>
        <DashboardLayout>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Course not found</h2>
            <Button onClick={() => router.push("/educator/courses")}>Back to Courses</Button>
          </div>
        </DashboardLayout>
      </ProtectedPage>
    )
  }

  const handleCreate = () => {
    const newLesson = {
      id: Date.now().toString(),
      courseId,
      title: formData.title,
      description: formData.description,
      videoUrl: formData.contentType === "video" ? formData.videoUrl : undefined,
      pdfUrl: formData.contentType === "pdf" ? formData.pdfUrl : undefined,
      textContent: formData.contentType === "text" ? formData.textContent : undefined,
      contentType: formData.contentType,
      order: lessons.length + 1,
    }
    setLessons([...lessons, newLesson])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!selectedLesson) return
    setLessons(
      lessons.map((l) =>
        l.id === selectedLesson.id
          ? {
              ...l,
              title: formData.title,
              description: formData.description,
              videoUrl: formData.contentType === "video" ? formData.videoUrl : undefined,
              pdfUrl: formData.contentType === "pdf" ? formData.pdfUrl : undefined,
              textContent: formData.contentType === "text" ? formData.textContent : undefined,
              contentType: formData.contentType,
            }
          : l,
      ),
    )
    setIsEditOpen(false)
    setSelectedLesson(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!selectedLesson) return
    setLessons(lessons.filter((l) => l.id !== selectedLesson.id))
    setIsDeleteOpen(false)
    setSelectedLesson(null)
  }

  const openEditDialog = (lesson: any) => {
    setSelectedLesson(lesson)
    setFormData({
      title: lesson.title,
      description: lesson.description || "",
      contentType: lesson.contentType || "video",
      videoUrl: lesson.videoUrl || "",
      pdfUrl: lesson.pdfUrl || "",
      textContent: lesson.textContent || "",
    })
    setIsEditOpen(true)
  }

  const moveLesson = (lessonId: string, direction: "up" | "down") => {
    const index = lessons.findIndex((l) => l.id === lessonId)
    if ((direction === "up" && index === 0) || (direction === "down" && index === lessons.length - 1)) return

    const newLessons = [...lessons]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    ;[newLessons[index], newLessons[targetIndex]] = [newLessons[targetIndex], newLessons[index]]

    // Update order
    newLessons.forEach((lesson, idx) => {
      lesson.order = idx + 1
    })

    setLessons(newLessons)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      contentType: "video",
      videoUrl: "",
      pdfUrl: "",
      textContent: "",
    })
  }

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case "video":
        return <Video className="w-5 h-5 text-blue-600" />
      case "pdf":
        return <File className="w-5 h-5 text-red-600" />
      case "text":
        return <FileText className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push("/educator/courses")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground mt-1">Manage lessons - គ្រប់គ្រងមេរៀន</p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Add Lesson
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Lessons</p>
                <p className="text-3xl font-bold text-foreground mt-2">{lessons.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Video Lessons</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {lessons.filter((l) => l.contentType === "video" || l.videoUrl).length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">PDF Materials</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {lessons.filter((l) => l.contentType === "pdf" || l.pdfUrl).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lessons List */}
          <Card>
            <CardHeader>
              <CardTitle>Course Lessons ({lessons.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {lessons.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No lessons yet</h3>
                  <p className="text-muted-foreground mb-6">Add your first lesson to start building the course</p>
                  <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add First Lesson
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        {getContentIcon(lesson.contentType || "video")}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{lesson.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveLesson(lesson.id, "up")}
                          disabled={index === 0}
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => moveLesson(lesson.id, "down")}
                          disabled={index === lessons.length - 1}
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditDialog(lesson)}>
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          onClick={() => {
                            setSelectedLesson(lesson)
                            setIsDeleteOpen(true)
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Create Lesson Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Lesson</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Lesson Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Atoms"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the lesson..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Lesson</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="text">Text/HTML Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.contentType === "video" && (
                <div>
                  <Label htmlFor="videoUrl">Video URL *</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">YouTube embed URL or video file URL</p>
                </div>
              )}

              {formData.contentType === "pdf" && (
                <div>
                  <Label htmlFor="pdfUrl">PDF URL *</Label>
                  <Input
                    id="pdfUrl"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="https://example.com/document.pdf"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Direct link to PDF file</p>
                </div>
              )}

              {formData.contentType === "text" && (
                <div>
                  <Label htmlFor="textContent">Text Content *</Label>
                  <Textarea
                    id="textContent"
                    value={formData.textContent}
                    onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                    placeholder="Write your lesson content here... (supports basic HTML)"
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground mt-1">You can use basic HTML formatting</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.title}>
                Add Lesson
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Lesson Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Lesson</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Lesson Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Atoms"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the lesson..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-contentType">Content Type *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Lesson</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="text">Text/HTML Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.contentType === "video" && (
                <div>
                  <Label htmlFor="edit-videoUrl">Video URL *</Label>
                  <Input
                    id="edit-videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              )}

              {formData.contentType === "pdf" && (
                <div>
                  <Label htmlFor="edit-pdfUrl">PDF URL *</Label>
                  <Input
                    id="edit-pdfUrl"
                    value={formData.pdfUrl}
                    onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              )}

              {formData.contentType === "text" && (
                <div>
                  <Label htmlFor="edit-textContent">Text Content *</Label>
                  <Textarea
                    id="edit-textContent"
                    value={formData.textContent}
                    onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                    placeholder="Write your lesson content here..."
                    rows={8}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!formData.title}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Lesson</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground py-4">
              Are you sure you want to delete "{selectedLesson?.title}"? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Lesson
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedPage>
  )
}
