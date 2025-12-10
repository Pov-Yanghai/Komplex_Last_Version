"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Globe, Shield, Bell, Database, Save } from "lucide-react"
import Image from "next/image"

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { language, toggleLanguage } = useLanguage()
  const [settings, setSettings] = useState({
    platformName: "KOMPLEX",
    logoUrl: "/images/untitled-2020.png",
    defaultLanguage: "en",
    allowRegistration: true,
    requireEmailVerification: false,
    autoApproveEducators: false,
    maintenanceMode: false,
    maxFileUploadMB: 50,
    sessionTimeoutMinutes: 60,
    enableNotifications: true,
    enableAnalytics: true,
  })

  // Redirect if not admin
  if (user?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const handleSaveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <p className="text-muted-foreground mt-1">Configure platform settings and preferences</p>
          </div>
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        {/* Platform Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Platform Configuration
            </CardTitle>
            <CardDescription>Basic platform settings and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input
                  id="platformName"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <Label className="mb-2 block">Logo Preview</Label>
              <div className="relative w-48 h-16 bg-muted rounded flex items-center justify-center">
                <Image
                  src={settings.logoUrl || "/placeholder.svg"}
                  alt="Platform Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Localization
            </CardTitle>
            <CardDescription>Manage platform languages and regional settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select
                value={settings.defaultLanguage}
                onValueChange={(value) => setSettings({ ...settings, defaultLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="km">ភាសាខ្មែរ (Khmer)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div className="flex-1">
                <Label htmlFor="current-language" className="font-semibold">
                  Current Session Language
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently using: {language === "en" ? "English" : "ភាសាខ្មែរ (Khmer)"}
                </p>
              </div>
              <Button onClick={toggleLanguage} variant="outline">
                Switch to {language === "en" ? "ភាសាខ្មែរ" : "English"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security & Permissions
            </CardTitle>
            <CardDescription>Configure access control and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="allowRegistration" className="font-semibold">
                  Allow Public Registration
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Enable new users to register on the platform</p>
              </div>
              <Switch
                id="allowRegistration"
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="requireEmailVerification" className="font-semibold">
                  Require Email Verification
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Users must verify email before accessing platform</p>
              </div>
              <Switch
                id="requireEmailVerification"
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="autoApproveEducators" className="font-semibold">
                  Auto-Approve Educators
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Automatically approve educator account requests</p>
              </div>
              <Switch
                id="autoApproveEducators"
                checked={settings.autoApproveEducators}
                onCheckedChange={(checked) => setSettings({ ...settings, autoApproveEducators: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeoutMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, sessionTimeoutMinutes: Number.parseInt(e.target.value) || 0 })
                }
                min="5"
                max="1440"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              System Configuration
            </CardTitle>
            <CardDescription>Advanced system and file management settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="maintenanceMode" className="font-semibold">
                  Maintenance Mode
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Temporarily disable platform access for maintenance
                </p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxFileUpload">Maximum File Upload Size (MB)</Label>
              <Input
                id="maxFileUpload"
                type="number"
                value={settings.maxFileUploadMB}
                onChange={(e) => setSettings({ ...settings, maxFileUploadMB: Number.parseInt(e.target.value) || 0 })}
                min="1"
                max="500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications & Analytics
            </CardTitle>
            <CardDescription>Manage notification and analytics preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="enableNotifications" className="font-semibold">
                  Enable Notifications
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Send notifications to users for important events</p>
              </div>
              <Switch
                id="enableNotifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex-1">
                <Label htmlFor="enableAnalytics" className="font-semibold">
                  Enable Analytics Tracking
                </Label>
                <p className="text-sm text-muted-foreground mt-1">Collect anonymous usage data to improve platform</p>
              </div>
              <Switch
                id="enableAnalytics"
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAnalytics: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} size="lg" className="gap-2">
            <Save className="w-5 h-5" />
            Save All Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
