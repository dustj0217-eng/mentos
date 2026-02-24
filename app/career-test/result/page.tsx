"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { careerTypes } from "@/lib/career-test"
import { ArrowLeft, Share2 } from "lucide-react"
import { Suspense } from "react"

function ResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const typeId = searchParams.get("type")

  const result = careerTypes.find((t) => t.id === typeId)

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-slate-600">잘못된 접근입니다</p>
          <Button onClick={() => router.push("/career-test")}>테스트 다시 하기</Button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `나는 ${result.name}`,
          text: result.shortDesc,
          url: window.location.href,
        })
      } catch (err) {
        console.log("공유 취소")
      }
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="border-b bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block rounded-full border-2 border-slate-900 bg-white px-6 py-2 text-sm font-medium">
              진단 결과
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{result.name}</h1>
            <p className="text-xl text-slate-600">{result.shortDesc}</p>

            <div className="mt-8 flex justify-center gap-3">
              <Button variant="outline" onClick={() => router.push("/career-test")} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                다시 하기
              </Button>
              <Button onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                결과 공유
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-4xl space-y-16">
            {/* 전체 설명 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">당신은 이런 사람입니다</h2>
              <p className="text-lg leading-relaxed text-slate-700">{result.fullDesc}</p>
            </div>

            {/* 주요 특성 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">주요 특성</h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {result.traits.map((trait) => (
                  <div key={trait} className="rounded-xl border bg-slate-50 px-4 py-3 text-center">
                    <p className="font-medium">{trait}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 업무 스타일 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">업무 스타일</h2>
              <div className="rounded-2xl border bg-slate-50 p-6">
                <p className="leading-relaxed text-slate-700">{result.workStyle}</p>
              </div>
            </div>

            {/* 적합한 환경 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">적합한 업무 환경</h2>
              <div className="rounded-2xl border bg-slate-50 p-6">
                <p className="leading-relaxed text-slate-700">{result.environment}</p>
              </div>
            </div>

            {/* 추천 직군 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">추천 직군</h2>
              <div className="mb-6 flex flex-wrap gap-2">
                {result.recommendedJobs.map((job) => (
                  <span key={job} className="rounded-full border border-slate-300 bg-white px-4 py-2">
                    {job}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                {result.detailedJobs.map((job, index) => (
                  <div key={index} className="rounded-2xl border bg-white p-6">
                    <h3 className="mb-3 text-lg font-bold">{job.name}</h3>
                    <p className="leading-relaxed text-slate-600">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 강점 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">당신의 강점</h2>
              <div className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl border bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="flex-1 leading-relaxed text-slate-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 주의사항 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">주의해야 할 점</h2>
              <div className="space-y-3">
                {result.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                      !
                    </div>
                    <p className="flex-1 leading-relaxed text-slate-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 커리어 경로 */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">예상 커리어 경로</h2>
              <div className="rounded-2xl border bg-slate-50 p-6">
                <p className="mb-4 leading-relaxed text-slate-700">{result.careerPath}</p>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-600">예상 연봉</p>
                  <p className="mt-1 text-slate-700">{result.salary}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-4 text-2xl font-bold">더 구체적인 커리어 상담이 필요하신가요?</h3>
            <p className="mb-8 text-slate-600">
              현직자 멘토와 함께 당신만의 커리어 로드맵을 만들어보세요
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg" onClick={() => router.push("/mentoring")}>
                멘토 찾아보기
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/")}>
                홈으로
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function CareerTestResultPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">로딩 중...</div>}>
      <ResultContent />
    </Suspense>
  )
}