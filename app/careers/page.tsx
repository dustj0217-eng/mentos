"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Briefcase, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

const openPositions = [
  {
    id: 1,
    title: "프론트엔드 개발자",
    department: "개발팀",
    type: "정규직",
    location: "서울 강남",
    description: "React/Next.js 기반 웹 서비스 개발",
  },
  {
    id: 2,
    title: "백엔드 개발자",
    department: "개발팀",
    type: "정규직",
    location: "서울 강남",
    description: "Node.js/Python 기반 API 서버 개발",
  },
  {
    id: 3,
    title: "UI/UX 디자이너",
    department: "디자인팀",
    type: "정규직",
    location: "서울 강남",
    description: "서비스 UI/UX 디자인 및 프로토타이핑",
  },
  {
    id: 4,
    title: "콘텐츠 마케터",
    department: "마케팅팀",
    type: "정규직",
    location: "서울 강남",
    description: "SNS 콘텐츠 기획 및 운영",
  },
  {
    id: 5,
    title: "인턴 (마케팅)",
    department: "마케팅팀",
    type: "인턴",
    location: "서울 강남",
    description: "마케팅 캠페인 지원 및 데이터 분석",
  },
]

const benefits = [
  "유연한 재택근무",
  "자기개발비 지원",
  "점심 식대 지원",
  "건강검진 지원",
  "도서 구입비 무제한",
  "최신 장비 지급",
]

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-slate-900 px-4 py-16 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold">멘토스와 함께 성장하세요</h1>
            <p className="mt-4 text-slate-300">대학생들의 더 나은 미래를 만들어가는 여정에 함께해주세요</p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12">
          {/* Benefits */}
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold">복리후생</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border p-4 text-center">
                  {benefit}
                </div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section>
            <h2 className="mb-6 text-xl font-bold">채용 중인 포지션</h2>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <Link
                  key={position.id}
                  href={`/careers/${position.id}`}
                  className="flex items-center justify-between rounded-2xl border p-6 hover:bg-slate-50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{position.title}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{position.type}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{position.description}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
