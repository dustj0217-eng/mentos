"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMentorById } from "@/lib/mentors"

export default function MentorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const mentor = getMentorById(Number(params.id))

  if (!mentor) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-slate-600">존재하지 않는 멘토입니다</p>
          <Button onClick={() => router.push("/mentoring")}>목록으로</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-24">
        {/* 뒤로가기 - sticky로 고정 */}
        <div className="sticky top-0 border-b bg-white px-4 py-4">
          <div className="mx-auto max-w-4xl">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </div>
        </div>

        {/* 멘토 프로필 */}
        <section className="px-4 py-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
              {/* 프로필 이미지 */}
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-4 border-slate-200 bg-slate-100 text-4xl font-bold text-slate-700">
                {mentor.name.slice(0, 1)}
              </div>

              {/* 기본 정보 */}
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold">{mentor.name}</h1>
                <p className="mb-1 text-lg text-slate-700">
                  {mentor.company} · {mentor.role}
                </p>
                <p className="mb-4 text-sm text-slate-500">
                  {mentor.school} · {mentor.experience}
                </p>

                {/* 뱃지 */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {mentor.badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* 평점 */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold">{mentor.rating}</span>
                    <span className="text-slate-500">({mentor.reviews}개 후기)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    {mentor.availableTime}
                  </div>
                </div>
              </div>
            </div>

            {/* 소개 */}
            <div className="mb-8 rounded-xl border p-6">
              <h3 className="mb-3 font-bold">소개</h3>
              <p className="text-slate-700">{mentor.intro}</p>
            </div>

            {/* 경력 */}
            {mentor.career && mentor.career.length > 0 && (
              <div className="mb-8 rounded-xl border p-6">
                <h3 className="mb-4 font-bold">경력</h3>
                <div className="space-y-3">
                  {mentor.career.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                      <p className="text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 멘토링 주제 */}
            {mentor.topics && mentor.topics.length > 0 && (
              <div className="mb-8 rounded-xl border p-6">
                <h3 className="mb-4 font-bold">멘토링 가능 주제</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.topics.map((topic) => (
                    <span key={topic} className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 후기 */}
            {mentor.reviewList && mentor.reviewList.length > 0 && (
              <div className="mb-8 rounded-xl border p-6">
                <h3 className="mb-4 font-bold">후기 ({mentor.reviews})</h3>
                <div className="space-y-4">
                  {mentor.reviewList.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{review.author}</span>
                        <span className="text-xs text-slate-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-slate-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-4">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">50분 기준</p>
              <p className="font-bold text-xl">{mentor.price.toLocaleString()}원</p>
            </div>
            <Button size="lg" onClick={() => setShowModal(true)} className="px-5">
              멘토링 신청하기
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      {/* 준비중 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="mx-4 max-w-sm rounded-xl border bg-white p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-6 text-lg font-medium">아직 준비 중인 기능입니다</p>
            <Button onClick={() => setShowModal(false)} className="w-full">
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
