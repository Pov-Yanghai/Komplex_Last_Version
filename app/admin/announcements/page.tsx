"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
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
import { Megaphone, Plus, Edit, Trash2, Send } from "lucide-react"

type Announcement = {
  id: string
  title: string
  message: string
  targetAudience: "all" | "students" | "educators" | "admins"
  priority: "low" | "normal" | "high"
  createdAt: string
  createdBy: string
  status: "draft" | "published"
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Platform Maintenance Scheduled",
    message: "The platform will undergo maintenance on Saturday, January 15, from 2 AM to 4 AM.",
    targetAudience: "all",
    priority: "high",
    createdAt: "2025-01-08",
    createdBy: "Admin Komplex",
    status: "published",
  },
  {
    id: "2",
    title: "New Chemistry Courses Available",
    message: "Explore our newly added Advanced Chemistry courses covering organic chemistry and thermodynamics.",
    targetAudience: "students",
    priority: "normal",
    createdAt: "2025-01-07",
    createdBy: "Admin Komplex",
    status: "published",
  },
  {
    id: "3",
    title: "Educator Training Workshop",
    message: "Join us for a workshop on creating engaging online content. Register by January 20th.",
    targetAudience: "educators",
    priority: "normal",
    createdAt: "2025-01-06",
    createdBy: "Admin Komplex",
    status: "draft",
  },
]

export default function AdminAnnouncementsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    targetAudience: "all" as "all" | "students" | "educators" | "admins",
    priority: "normal" as "low" | "normal" | "high",
    status: "draft" as "draft" | "published",
  })

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  // Create announcement
  const handleCreateAnnouncement = () => {
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: formData.title,
      message: formData.message,
      targetAudience: formData.targetAudience,
      priority: formData.priority,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: user?.fullName || "Admin",
      status: formData.status,
    }
    setAnnouncements([newAnnouncement, ...announcements])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  // Edit announcement
  const handleEditAnnouncement = () => {
    if (!selectedAnnouncement) return
    setAnnouncements(
      announcements.map((a) =>
        a.id === selectedAnnouncement.id
          ? {
              ...a,
              title: formData.title,
              message: formData.message,
              targetAudience: formData.targetAudience,
              priority: formData.priority,
              status: formData.status,
            }
          : a,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedAnnouncement(null)
    resetForm()
  }

  // Delete announcement
  const handleDeleteAnnouncement = () => {
    if (!selectedAnnouncement) return
    setAnnouncements(announcements.filter((a) => a.id !== selectedAnnouncement.id))
    setIsDeleteDialogOpen(false)
    setSelectedAnnouncement(null)
  }

  // Publish announcement
  const handlePublish = (announcementId: string) => {
    setAnnouncements(announcements.map((a) => (a.id === announcementId ? { ...a, status: "published" as const } : a)))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      targetAudience: "all",
      priority: "normal",
      status: "draft",
    })
  }

  // Open edit dialog
  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      message: announcement.message,
      targetAudience: announcement.targetAudience,
      priority: announcement.priority,
      status: announcement.status,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
            <p className="text-muted-foreground mt-1">Create and manage platform-wide announcements</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Announcement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold text-foreground">{announcements.length}</p>
                </div>
                <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold text-foreground">
                    {announcements.filter((a) => a.status === "published").length}
                  </p>
                </div>
                <Send className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold text-foreground">
                    {announcements.filter((a) => a.status === "draft").length}
                  </p>
                </div>
                <Edit className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-foreground">
                    {announcements.filter((a) => a.priority === "high").length}
                  </p>
                </div>
                <Megaphone className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{announcement.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          announcement.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      >
                        {announcement.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          announcement.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : announcement.priority === "normal"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {announcement.priority}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700">
                        {announcement.targetAudience}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{announcement.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>By {announcement.createdBy}</span>
                      <span>•</span>
                      <span>{announcement.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {announcement.status === "draft" && (
                      <Button size="sm" onClick={() => handlePublish(announcement.id)} className="gap-2">
                        <Send className="w-4 h-4" />
                        Publish
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(announcement)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedAnnouncement(announcement)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Announcement Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>Send a message to users on the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Important Update"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your announcement message here..."
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="audience">Audience</Label>
                  <Select
                    value={formData.targetAudience}
                    onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="educators">Educators</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Announcement Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>Update announcement details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-message">Message</Label>
                <Textarea
                  id="edit-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-audience">Audience</Label>
                  <Select
                    value={formData.targetAudience}
                    onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="educators">Educators</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditAnnouncement}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Announcement Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Announcement</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedAnnouncement?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAnnouncement}>
                Delete Announcement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
