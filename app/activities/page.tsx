"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Users, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: 1,
    title: "글로벌 대학생 서포터즈",
    organizer: "한국관광공사",
    period: "2026.03 - 2026.12",
    location: "서울/온라인",
    members: "100명",
    category: "서포터즈",
  },
  {
    id: 2,
    title: "청년 봉사단 4기",
    organizer: "적십자사",
    period: "2026.02 - 2026.08",
    location: "전국",
    members: "200명",
    category: "봉사",
  },
  {
    id: 3,
    title: "대학생 기자단",
    organizer: "문화체육관광부",
    period: "2026.03 - 2026.11",
    location: "서울",
    members: "50명",
    category: "기자단",
  },
  {
    id: 4,
    title: "마케팅 서포터즈",
    organizer: "CJ제일제당",
    period: "2026.04 - 2026.10",
    location: "서울",
    members: "30명",
    category: "서포터즈",
  },
  {
    id: 5,
    title: "환경 캠페인 활동단",
    organizer: "환경재단",
    period: "2026.03 - 2026.09",
    location: "전국",
    members: "150명",
    category: "봉사",
  },
  {
    id: 6,
    title: "IT 멘토링 활동",
    organizer: "과학기술정보통신부",
    period: "2026.05 - 2026.12",
    location: "온라인",
    members: "80명",
    category: "멘토링",
  },
]

const categories = ["전체", "서포터즈", "기자단", "봉사", "멘토링", "해외"]

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-slate-900 px-4 py-16 text-white">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">대외활동</h1>
            <p className="text-slate-300">다양한 경험을 쌓을 수 있는 대외활동을 찾아보세요</p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="border-b px-4 py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="대외활동 검색..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <Button key={cat} variant={cat === "전체" ? "default" : "outline"} size="sm" className="shrink-0">
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Activity List */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="group rounded-2xl border p-6 hover:border-slate-300"
                >
                  <div className="mb-4 aspect-[16/9] rounded-xl bg-slate-100" />
                  <span className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                    {activity.category}
                  </span>
                  <h3 className="mb-2 font-semibold group-hover:text-slate-600">{activity.title}</h3>
                  <p className="mb-3 text-sm text-slate-500">{activity.organizer}</p>
                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.period}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {activity.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {activity.members}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
