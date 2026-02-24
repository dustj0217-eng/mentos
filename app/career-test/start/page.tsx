"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { questions, calculateCareerType } from "@/lib/career-test"

export default function CareerTestStartPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[][]>(Array(questions.length).fill([]))
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = [selectedOption]
    setAnswers(newAnswers)

    if (currentQuestion === questions.length - 1) {
      // 마지막 질문 - 결과 페이지로 이동
      const result = calculateCareerType(newAnswers)
      router.push(`/career-test/result?type=${result.id}`)
    } else {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1][0] ?? null)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Progress Bar */}
        <div className="fixed left-0 right-0 top-16 z-40 bg-white">
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12">
          {/* Question Counter */}
          <div className="mb-8 text-center">
            <p className="text-sm text-slate-500">
              {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="mb-8 text-center text-2xl font-bold leading-relaxed md:text-3xl">
              {question.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full rounded-xl border-2 px-6 py-5 text-left transition-all ${
                    selectedOption === index
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="text-base leading-relaxed">{option.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-6"
            >
              이전
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="px-6"
            >
              {currentQuestion === questions.length - 1 ? "결과 보기" : "다음"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}