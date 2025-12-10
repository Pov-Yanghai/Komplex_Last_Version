"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, UserCheck, BookOpen, ClipboardList, AlertCircle } from "lucide-react"

type LogEntry = {
  id: string
  timestamp: string
  user: string
  action: string
  type: "user" | "course" | "quiz" | "enrollment" | "system" | "error"
  details: string
  ip?: string
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-01-09 10:34:21",
    user: "Chanthy Sok",
    action: "Enrolled in course",
    type: "enrollment",
    details: "Chemistry Basics",
    ip: "192.168.1.1",
  },
  {
    id: "2",
    timestamp: "2025-01-09 10:32:15",
    user: "Sokha Lim",
    action: "Submitted quiz",
    type: "quiz",
    details: "Algebra Fundamentals Quiz - Score: 85%",
    ip: "192.168.1.2",
  },
  {
    id: "3",
    timestamp: "2025-01-09 10:28:43",
    user: "Mrs. Sopheak",
    action: "Created lesson",
    type: "course",
    details: "Khmer Grammar Lesson 5",
    ip: "192.168.1.3",
  },
  {
    id: "4",
    timestamp: "2025-01-09 10:15:02",
    user: "Admin Komplex",
    action: "Approved educator",
    type: "user",
    details: "Approved Dr. Sok as educator",
    ip: "192.168.1.4",
  },
  {
    id: "5",
    timestamp: "2025-01-09 09:58:34",
    user: "System",
    action: "Database backup",
    type: "system",
    details: "Automatic daily backup completed successfully",
    ip: "localhost",
  },
  {
    id: "6",
    timestamp: "2025-01-09 09:45:12",
    user: "Mr. Veasna",
    action: "Published course",
    type: "course",
    details: "Advanced Chemistry course published",
    ip: "192.168.1.5",
  },
  {
    id: "7",
    timestamp: "2025-01-09 09:32:56",
    user: "Student Unknown",
    action: "Failed login attempt",
    type: "error",
    details: "Invalid password - Account: student10@komplex.edu",
    ip: "192.168.1.100",
  },
  {
    id: "8",
    timestamp: "2025-01-09 09:18:29",
    user: "Chanthy Sok",
    action: "Completed lesson",
    type: "course",
    details: "Introduction to Algebra - Progress: 75%",
    ip: "192.168.1.1",
  },
]

export default function AdminLogsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterDate, setFilterDate] = useState<string>("today")

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || log.type === filterType
    return matchesSearch && matchesType
  })

  // Export logs
  const handleExportLogs = () => {
    const csv = [
      ["Timestamp", "User", "Action", "Type", "Details", "IP Address"].join(","),
      ...filteredLogs.map((log) =>
        [log.timestamp, log.user, log.action, log.type, log.details, log.ip || ""].join(","),
      ),
    ].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `komplex-logs-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return <UserCheck className="w-4 h-4" />
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "quiz":
        return <ClipboardList className="w-4 h-4" />
      case "enrollment":
        return <FileText className="w-4 h-4" />
      case "error":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
            <p className="text-muted-foreground mt-1">Track all system activities and user actions</p>
          </div>
          <Button onClick={handleExportLogs} className="gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Logs</p>
                  <p className="text-2xl font-bold text-foreground">{logs.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">User Actions</p>
                  <p className="text-2xl font-bold text-foreground">{logs.filter((l) => l.type === "user").length}</p>
                </div>
                <UserCheck className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Course Actions</p>
                  <p className="text-2xl font-bold text-foreground">{logs.filter((l) => l.type === "course").length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quiz Actions</p>
                  <p className="text-2xl font-bold text-foreground">{logs.filter((l) => l.type === "quiz").length}</p>
                </div>
                <ClipboardList className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-2xl font-bold text-foreground">{logs.filter((l) => l.type === "error").length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs by user, action, or details..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="user">User Actions</SelectItem>
                  <SelectItem value="course">Course Actions</SelectItem>
                  <SelectItem value="quiz">Quiz Actions</SelectItem>
                  <SelectItem value="enrollment">Enrollments</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="error">Errors</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Logs ({filteredLogs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-muted-foreground font-mono">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 w-fit ${
                            log.type === "user"
                              ? "bg-purple-100 text-purple-700"
                              : log.type === "course"
                                ? "bg-teal-100 text-teal-700"
                                : log.type === "quiz"
                                  ? "bg-green-100 text-green-700"
                                  : log.type === "enrollment"
                                    ? "bg-blue-100 text-blue-700"
                                    : log.type === "error"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {getTypeIcon(log.type)}
                          {log.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm max-w-md truncate">{log.details}</TableCell>
                      <TableCell className="text-sm text-muted-foreground font-mono">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
