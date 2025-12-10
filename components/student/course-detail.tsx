"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCourses } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function CourseDetail({ courseId }: { courseId: string }) {
  const { t } = useLanguage()
  const router = useRouter()
  const [enrolled, setEnrolled] = useState(false)

  const course = mockCourses.find((c) => c.id === courseId)

  if (!course) {
    return <div className="p-6">{t("common.error")}</div>
  }

  const handleEnroll = () => {
    setEnrolled(true)
    // In a real app, this would call an API to enroll the student
    setTimeout(() => {
      router.push(`/my-courses/${courseId}`)
    }, 1000)
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Course Header */}
      <div className="relative rounded-lg overflow-hidden h-64">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">by {course.educatorName}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{t("course.level")}:</span>
            <span className="font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              {course.students} {t("course.students")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              {course.lessons} {t("course.lessons")}
            </span>
          </div>
        </div>

        <p className="text-gray-700 text-lg">{course.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("course.courseName")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <strong>{t("course.lessons")}:</strong> {course.lessons}
              </p>
              <p>
                <strong>{t("course.level")}:</strong> {course.level}
              </p>
              <p>
                <strong>{t("course.students")}:</strong> {course.students}
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="pt-6 space-y-3">
              {enrolled ? (
                <div className="text-center py-4">
                  <p className="text-green-600 font-medium mb-2">✓ {t("course.enrolled")}</p>
                  <button
                    onClick={() => router.push(`/my-courses/${courseId}`)}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                  >
                    {t("student.continueLearning")}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                >
                  {t("course.enroll")}
                </button>
              )}
              <p className="text-xs text-gray-600 text-center">Free enrollment</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
