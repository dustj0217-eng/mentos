"use client"

/**
 * Mentos HomePage – Full Refactor
 * 목적: 실제 서비스(대학내일/캠픽/링커리어)처럼 보이는 구조
 * - 섹션 역할 명확화
 * - 페이지 이동 구조 암시
 * - 이미지 제작 가이드 주석 포함
 */

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Megaphone, Users, GraduationCap, Briefcase } from "lucide-react"
import { posts } from "@/lib/posts"

/* =====================
   Mock Data (임시)
   ===================== */

const heroSlides = [
  {
    id: 2,
    type: "image",
    src: "/images/003.png",
    alt: "멘토스 스터디 모집 - 공부하고 돈 받아가자",
  },
  {
    id: 3,
    type: "image",
    src: "/images/002.png",
    alt: "팔로우하고 기프티콘 받자 - 멘토스 인스타그램",
  },
]

const categories = [
  { title: "공모전", href: "/contests", icon: Megaphone },
  { title: "대외활동", href: "/activities", icon: Users },
  { title: "멘토링", href: "/mentoring", icon: GraduationCap },
  { title: "취업 콘텐츠", href: "/career", icon: Briefcase },
]

const trendingContents = posts.slice(0, 3)

const posters = [
  { id: 1, title: "2026 대학생 마케팅 공모전", href: "/contests/1" },
  { id: 2, title: "청년 창업 아이디어 공모전", href: "/contests/2" },
  { id: 3, title: "UX/UI 디자인 챌린지", href: "/contests/3" },
  { id: 4, title: "콘텐츠 기획 공모전", href: "/contests/4" },
]

const reviews = [
  {
    id: 1,
    result: "대기업 마케팅 직무 합격",
    comment: "준비 방향이 완전히 정리됐습니다.",
    name: "김○○",
  },
  {
    id: 2,
    result: "UX 디자이너 인턴 합격",
    comment: "정보 신뢰도가 높아서 좋았어요.",
    name: "이○○",
  },
  {
    id: 3,
    result: "공기업 서류 합격",
    comment: "시간을 정말 많이 아꼈습니다.",
    name: "박○○",
  },
]

/* =====================
   Page Component
   ===================== */

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = heroSlides.length

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ================= Header ================= */}
      <Header />

      <main className="pt-20">
        {/* ================= Hero ================= */}
        <section className="px-4">
          <div className="mx-auto max-w-6xl">
            <div className="relative aspect-[5/3] overflow-hidden rounded-3xl bg-slate-100">
              <Image
                src={heroSlides[currentSlide].src || "/placeholder.svg"}
                alt={heroSlides[currentSlide].alt}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevSlide}>
                <ChevronLeft />
              </Button>
              <span className="text-sm text-slate-500">
                {currentSlide + 1} / {totalSlides}
              </span>
              <Button variant="ghost" size="icon" onClick={nextSlide}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </section>

        {/* ================= Categories ================= */}
        <section className="px-2 py-3 md:hidden">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className="group flex h-32 flex-col items-center justify-center rounded-2xl bg-white transition"
                  >
                    <div className="flex items-center justify-center rounded-full bg-slate-100 transition group-hover:bg-slate-200 w-10 h-10 gap-4">
                      <Icon className="text-slate-700 w-5 h-6" />
                    </div>
                    <span className="text-slate-800 text-baseslate-800 text-xs font-semibold">{cat.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================= Trending ================= */}
        <section className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold">지금 뜨는 콘텐츠</h3>
              <Link href="/blog" className="text-sm text-slate-500">
                전체 보기 →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {trendingContents.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-3 font-semibold">{post.title}</h4>
                  <p className="text-sm text-slate-500">{post.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Posters ================= */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-8 text-xl font-semibold text-left">공모전</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {posters.map((p) => (
                <Link key={p.id} href={p.href}>
                  <div className="aspect-[3/4] rounded-2xl bg-slate-200" />
                  {/* TODO: 포스터 이미지
                     - 세로형 3:4
                     - 실제 공모전 포스터 스타일 */}
                  <p className="mt-2 text-sm font-medium line-clamp-2">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Reviews ================= */}
        <section className="bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-8 text-xl font-semibold text-left">합격 후기</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl bg-white p-6">
                  <p className="mb-2 text-sm text-slate-500">{r.result}</p>
                  <p className="mb-4">“{r.comment}”</p>
                  <p className="text-xs text-slate-400">{r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl rounded-2xl bg-slate-50 p-12 text-center">
            <h3 className="mb-3 text-3xl font-bold text-slate-900">지금 바로 시작해 보세요</h3>
            <p className="mb-8 text-slate-600">준비된 정보가 결과를 만듭니다</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  회원가입
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full border-slate-900 sm:w-auto bg-transparent">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ================= Footer ================= */}
      <Footer />
    </div>
  )
}
