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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { mockCourses } from "@/lib/mock-data"
import Link from "next/link"
import { PlusCircle, Edit, Trash2, BookOpen, Eye, EyeOff } from "lucide-react"

export default function EducatorCoursesPage() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [courses, setCourses] = useState(
    mockCourses.filter((c) => c.educatorId === user?.id || c.educatorId === "educator-1"),
  )
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    category: "Khmer",
    image: "",
    published: true,
  })

  const handleCreate = () => {
    const newCourse = {
      id: Date.now().toString(),
      ...formData,
      educatorId: user?.id || "educator-1",
      educatorName: user?.fullName || "Educator",
      students: 0,
      lessons: 0,
    }
    setCourses([...courses, newCourse])
    setIsCreateOpen(false)
    setFormData({ title: "", description: "", level: "Beginner", category: "Khmer", image: "", published: true })
  }

  const handleUpdate = () => {
    if (!selectedCourse) return
    setCourses(courses.map((c) => (c.id === selectedCourse.id ? { ...c, ...formData } : c)))
    setIsEditOpen(false)
    setSelectedCourse(null)
    setFormData({ title: "", description: "", level: "Beginner", category: "Khmer", image: "", published: true })
  }

  const handleDelete = () => {
    if (!selectedCourse) return
    setCourses(courses.filter((c) => c.id !== selectedCourse.id))
    setIsDeleteOpen(false)
    setSelectedCourse(null)
  }

  const openEditDialog = (course: any) => {
    setSelectedCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      level: course.level,
      category: course.category,
      image: course.image || "",
      published: course.published !== false,
    })
    setIsEditOpen(true)
  }

  const togglePublished = (course: any) => {
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, published: c.published === false ? true : false } : c)))
  }

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6 bg-background min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t("nav.myCoursesEd")}</h1>
              <p className="text-muted-foreground mt-2">Create and manage your courses - បង្កើត និងគ្រប់គ្រងវគ្គសិក្សា</p>
            </div>
            <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Create New Course
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold text-foreground mt-2">{courses.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {courses.reduce((sum, c) => sum + c.students, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Published Courses</p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {courses.filter((c) => c.published !== false).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-border">
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg?height=160&width=400"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => togglePublished(course)}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                  >
                    {course.published === false ? (
                      <EyeOff className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-green-600" />
                    )}
                  </button>
                </div>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-foreground line-clamp-2 flex-1">{course.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : course.level === "Intermediate"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{course.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {course.published === false ? "Unpublished - Draft" : "Published"}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-border">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Students</p>
                      <p className="text-lg font-bold text-primary">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Lessons</p>
                      <p className="text-lg font-bold text-secondary">{course.lessons}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/educator/courses/${course.id}/lessons`}
                      className="flex-1 text-sm py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center font-medium flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Lessons
                    </Link>
                    <Button onClick={() => openEditDialog(course)} size="sm" variant="outline" className="flex-1 gap-1">
                      <Edit className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedCourse(course)
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

          {courses.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">Create your first course to get started</p>
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Create New Course
              </Button>
            </Card>
          )}
        </div>

        {/* Create Course Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Chemistry"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Khmer">Khmer</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level">Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="image">Course Image URL (optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!formData.title || !formData.description}>
                Create Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Course Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Chemistry"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description *</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Khmer">Khmer</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-level">Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-image">Course Image URL (optional)</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!formData.title || !formData.description}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Course</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground py-4">
              Are you sure you want to delete "{selectedCourse?.title}"? This action cannot be undone and will remove
              all lessons and student data associated with this course.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ProtectedPage>
  )
}
