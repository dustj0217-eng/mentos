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
import { ChevronLeft, ChevronRight, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Header } from "@/components/header"
import { CommunityPreviewSection } from "../components/community-preview-section"
import { Footer } from "@/components/footer"

import { Megaphone, Users, GraduationCap, Briefcase } from "lucide-react"
import { posts } from "@/lib/posts"

/* =====================
   Mock Data (임시)
   ===================== */

const heroSlides = [
  {
    id: 1,
    type: "image",
    src: "/images/003.png",
    alt: "멘토스 스터디 모집 - 공부하고 돈 받아가자",
    href: "/events/study-recruitment",
  },
  {
    id: 2,
    type: "image",
    src: "/images/002.png",
    alt: "팔로우하고 기프티콘 받자 - 멘토스 인스타그램",
    href: "/events/instagram-follow",
  },
]

const categories = [
  { title: "공모전", href: "/contests", icon: Megaphone },
  { title: "대외활동", href: "/activities", icon: Users },
  { title: "멘토링", href: "/mentoring", icon: GraduationCap },
  { title: "취업", href: "/career", icon: Briefcase },
]

const trendingContents = posts.slice(0, 3)

const posters = [
  { id: 1, title: "2026 대학생 마케팅 공모전", href: "/contests/1" },
  { id: 2, title: "청년 창업 아이디어 공모전", href: "/contests/2" },
  { id: 3, title: "UX/UI 디자인 챌린지", href: "/contests/3" },
  { id: 4, title: "콘텐츠 기획 공모전", href: "/contests/4" },
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
            <Link href={heroSlides[currentSlide].href} className="block">
              <div className="relative aspect-[5/3] overflow-hidden rounded-3xl bg-slate-100 cursor-pointer transition-transform hover:scale-[1.01]">
                <Image
                  src={heroSlides[currentSlide].src || "/placeholder.svg"}
                  alt={heroSlides[currentSlide].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Link>

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
        <section className="px-4 py-3 md:hidden">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-4 gap-1">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <Link
                    key={cat.title}
                    href={cat.href}
                    className="group flex flex-col items-center justify-center p-2"
                  >
                    <div className="flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 p-2">
                      <Icon className="h-6 w-6 text-slate-700" />
                    </div>
                    <span className="text-center text-[11px] font-medium text-slate-800">
                      {cat.title}
                    </span>
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

        <CommunityPreviewSection />
      </main>

      {/* ================= Footer ================= */}
      <Footer />
    </div>
  )
}
