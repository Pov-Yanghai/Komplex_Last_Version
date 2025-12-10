"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockQuizzes, mockCourses } from "@/lib/mock-data"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export function QuizPlayer({ quizId }: { quizId: string }) {
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30 * 60) // 30 minutes

  const quiz = mockQuizzes.find((q) => q.id === quizId)
  const course = quiz ? mockCourses.find((c) => c.id === quiz.courseId) : null

  // Mock quiz questions
  const quizQuestions: QuizQuestion[] = [
    {
      id: "1",
      question: "What is the capital of Cambodia?",
      options: ["Siem Reap", "Phnom Penh", "Battambang", "Kratie"],
      correctAnswer: 1,
    },
    {
      id: "2",
      question: "Which language is primarily spoken in Cambodia?",
      options: ["Thai", "Vietnamese", "Khmer", "Lao"],
      correctAnswer: 2,
    },
    {
      id: "3",
      question: "What is 15 + 27?",
      options: ["32", "42", "52", "62"],
      correctAnswer: 1,
    },
  ]

  if (!quiz || !course) {
    return <div className="p-6">{t("common.error")}</div>
  }

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0
    answers.forEach((answer, idx) => {
      if (answer === quizQuestions[idx].correctAnswer) {
        correctCount++
      }
    })
    const finalScore = Math.round((correctCount / quizQuestions.length) * 100)
    setScore(finalScore)
    setSubmitted(true)
  }

  const question = quizQuestions[currentQuestion]
  const passed = score >= (quiz.passingScore || 70)

  if (submitted) {
    return (
      <div className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <div className={`inline-block mb-4 p-4 rounded-full ${passed ? "bg-green-100" : "bg-red-100"}`}>
              <div className="text-4xl">{passed ? "✓" : "✗"}</div>
            </div>
            <h2 className={`text-2xl font-bold ${passed ? "text-green-600" : "text-red-600"}`}>
              {passed ? t("quiz.passed") : t("quiz.failed")}
            </h2>
            <p className="text-4xl font-bold text-gray-900 mt-4">{score}%</p>
            <p className="text-gray-600 mt-2">
              You answered {answers.filter((a, idx) => a === quizQuestions[idx].correctAnswer).length} of{" "}
              {quizQuestions.length} questions correctly
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
              {t("quiz.retakeQuiz")}
            </button>
          </CardContent>
        </Card>

        {/* Answer Review */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Answer Review</h3>
          {quizQuestions.map((q, idx) => {
            const isCorrect = answers[idx] === q.correctAnswer
            return (
              <Card key={q.id} className={isCorrect ? "border-green-200" : "border-red-200"}>
                <CardContent className="pt-4">
                  <p className="font-medium text-gray-900 mb-3">
                    {idx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded text-sm ${
                          optIdx === answers[idx] && isCorrect
                            ? "bg-green-100 text-green-700 font-medium"
                            : optIdx === answers[idx] && !isCorrect
                              ? "bg-red-100 text-red-700 font-medium"
                              : optIdx === q.correctAnswer && !isCorrect
                                ? "bg-green-100 text-green-700"
                                : ""
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Quiz Header */}
      <Card>
        <CardContent className="pt-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">{course.title}</p>
          </div>
          <div className={`text-right p-3 rounded ${minutes === 0 && seconds < 300 ? "bg-red-100" : "bg-blue-100"}`}>
            <p className="text-xs text-gray-600">Time Remaining</p>
            <p className={`text-2xl font-bold ${minutes === 0 && seconds < 300 ? "text-red-600" : "text-blue-600"}`}>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Question Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {t("quiz.questionNumber")} {currentQuestion + 1} {t("quiz.of")} {quizQuestions.length}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {answers.filter((a) => a !== null).length}/{quizQuestions.length} answered
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(idx)}
              className={`w-full p-3 rounded border-2 text-left transition-colors ${
                answers[currentQuestion] === idx
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 text-center text-sm font-bold">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2 justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {t("quiz.previousQuestion")}
        </button>

        {currentQuestion === quizQuestions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
          >
            {t("quiz.submitQuiz")}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            {t("quiz.nextQuestion")}
          </button>
        )}
      </div>

      {/* Question Map */}
      <div>
        <p className="text-sm font-medium mb-2">{t("quiz.review")}</p>
        <div className="flex flex-wrap gap-2">
          {quizQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-10 h-10 rounded font-medium ${
                currentQuestion === idx
                  ? "bg-blue-600 text-white"
                  : answers[idx] !== null
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
