"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { mockUsers } from "@/lib/mock-data"
import { UserCheck, CheckCircle, XCircle, Clock } from "lucide-react"

type UserType = (typeof mockUsers)[0]

export default function AdminEducatorsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [educators, setEducators] = useState<UserType[]>(mockUsers.filter((u) => u.role === "educator"))
  const [selectedEducator, setSelectedEducator] = useState<UserType | null>(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const pendingEducators = educators.filter((e) => e.status === "pending")
  const activeEducators = educators.filter((e) => e.status === "active")

  // Approve educator
  const handleApprove = () => {
    if (!selectedEducator) return
    setEducators(educators.map((e) => (e.id === selectedEducator.id ? { ...e, status: "active" as const } : e)))
    setIsApproveDialogOpen(false)
    setSelectedEducator(null)
  }

  // Reject educator
  const handleReject = () => {
    if (!selectedEducator) return
    setEducators(educators.filter((e) => e.id !== selectedEducator.id))
    setIsRejectDialogOpen(false)
    setSelectedEducator(null)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Educator Management</h1>
          <p className="text-muted-foreground mt-1">Approve and manage educator accounts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Educators</p>
                  <p className="text-2xl font-bold text-foreground">{educators.length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-foreground">{activeEducators.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-2xl font-bold text-foreground">{pendingEducators.length}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        {pendingEducators.length > 0 && (
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Pending Educator Approvals ({pendingEducators.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingEducators.map((educator) => (
                      <TableRow key={educator.id}>
                        <TableCell className="font-medium">{educator.fullName}</TableCell>
                        <TableCell>{educator.email}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{educator.joinedDate}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-orange-100 text-orange-700">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedEducator(educator)
                                setIsApproveDialogOpen(true)
                              }}
                              className="gap-2 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setSelectedEducator(educator)
                                setIsRejectDialogOpen(true)
                              }}
                              className="gap-2"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
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
        )}

        {/* Active Educators */}
        <Card>
          <CardHeader>
            <CardTitle>Active Educators ({activeEducators.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeEducators.map((educator) => (
                    <TableRow key={educator.id}>
                      <TableCell className="font-medium">{educator.fullName}</TableCell>
                      <TableCell>{educator.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{educator.joinedDate}</TableCell>
                      <TableCell>{educator.courses || 0}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Approve Dialog */}
        <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Approve Educator</DialogTitle>
              <DialogDescription>
                Approve {selectedEducator?.fullName} as an educator? They will be able to create and manage courses.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Educator Application</DialogTitle>
              <DialogDescription>
                Reject {selectedEducator?.fullName}'s educator application? This will remove their application from the
                system.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
