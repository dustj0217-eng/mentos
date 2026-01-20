"use client"

import { useState } from "react"
import { Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/* 임시 데이터 */
const posters = [
  { id: 1, title: "2026 대학생 마케팅 공모전", href: "#" },
  { id: 2, title: "청년 창업 아이디어 공모전", href: "#" },
  { id: 3, title: "콘텐츠 기획 챌린지", href: "#" },
  { id: 4, title: "UX/UI 디자인 공모전", href: "#" },
]

const reviews = [
  {
    id: 1,
    name: "김○○",
    result: "대기업 마케팅 직무 합격",
    comment: "멘토스 덕분에 준비 방향이 명확해졌어요.",
  },
  {
    id: 2,
    name: "이○○",
    result: "UX 디자이너 인턴 합격",
    comment: "공모전 정보 정리가 정말 편했습니다.",
  },
  {
    id: 3,
    name: "박○○",
    result: "공기업 서류 합격",
    comment: "시간 아끼는 데 최고였어요.",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 6

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="flex items-center justify-between px-4 py-4 md:px-6">
          <h1 className="text-xl font-semibold">멘토스</h1>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="pt-16">
        {/* Section 1: Main Card */}
        <section className="px-4 py-8">
          <div className="mx-auto">
            <div className="relative mx-auto h-[45vh] max-h-[520px] w-full max-w-[720px] overflow-hidden rounded-3xl bg-slate-100">
              <div className="flex h-full items-center justify-center p-6 text-center">
                <div>
                  <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                    발견하는 즐거움
                  </h2>
                  <p className="text-slate-600">
                    당신을 위한 특별한 콘텐츠를 만나보세요
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-600">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span>
                {currentSlide + 1} / {totalSlides}
              </span>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2: Swipe / Grid */}
        <section className="py-12">
          <h3 className="mb-6 text-center text-xl font-semibold">
            추천 콘텐츠
          </h3>

          <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[78vw] md:min-w-0 md:w-full"
              >
                <div className="overflow-hidden">
                  <div className="aspect-[4/5] rounded-2xl bg-slate-200" />
                  <div className="p-4">
                    <h4 className="font-semibold">
                      콘텐츠 제목 {item}
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      흥미로운 이야기
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Posters */}
        <section className="px-4 py-12 md:px-6">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-6 text-center text-xl font-semibold">
              공모전 포스터
            </h3>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {posters.map((poster) => (
                <a
                  key={poster.id}
                  href={poster.href}
                  className="group overflow-hidden"
                >
                  <div className="aspect-[3/4] rounded-2xl bg-slate-200 transition-transform group-hover:scale-105" />
                  <div className="p-3">
                    <p className="text-sm font-medium line-clamp-2">
                      {poster.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ad Banner */}
        <section className="py-8">
          <div className="mx-auto flex h-[96px] max-w-[960px] items-center justify-center bg-slate-900">
            <h3 className="text-lg font-semibold text-white">
              역량 개발 & 취업 준비, 한 번에
            </h3>
          </div>
        </section>

        {/* Section 5: Reviews */}
        <section className="px-4 py-12 md:px-6">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-6 text-center text-xl font-semibold">
              합격 후기
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-100 p-4"
                >
                  <p className="mb-2 text-sm text-slate-500">
                    {review.result}
                  </p>
                  <p className="mb-3 text-sm">
                    “{review.comment}”
                  </p>
                  <p className="text-xs text-slate-400">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 px-4 py-10 text-sm text-slate-500">
          <div className="mx-auto max-w-5xl">
            © 2026 멘토스. All rights reserved.
          </div>
        </footer>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
