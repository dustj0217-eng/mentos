"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Star, Briefcase, Clock, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories, companyTypes, sortOptions, filterMentors } from "@/lib/mentors"

export default function MentoringPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [selectedCompanyType, setSelectedCompanyType] = useState("전체")
  const [sortBy, setSortBy] = useState("평점순")

  const filteredMentors = filterMentors(searchTerm, selectedCategory, selectedCompanyType, sortBy)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-20 text-white">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">멘토링</h1>
            <p className="mb-2 text-lg text-slate-300">현직자 멘토와 함께 취업 성공 전략을 세워보세요</p>
            <p className="text-sm text-slate-400">이번 달 1,247명이 멘토링을 받았습니다</p>
          </div>
        </section>

        {/* 검색 & 필터 */}
        <section className="sticky top-16 z-40 border-b bg-white px-4 py-4 shadow-sm">
          <div className="mx-auto max-w-6xl space-y-4">
            {/* 검색창 */}
            <div className="flex items-center gap-2 rounded-xl border bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="멘토 이름, 기업명, 직무로 검색..."
                className="flex-1 bg-transparent text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 필터 버튼들 */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 카테고리 */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* 기업 유형 */}
              <select
                className="rounded-lg border px-3 py-2 text-sm"
                value={selectedCompanyType}
                onChange={(e) => setSelectedCompanyType(e.target.value)}
              >
                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {/* 정렬 */}
              <select
                className="rounded-lg border px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <span className="ml-auto text-sm text-slate-500">{filteredMentors.length}명</span>
            </div>
          </div>
        </section>

        {/* 멘토 리스트 */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            {filteredMentors.length === 0 ? (
              <div className="py-20 text-center text-slate-400">
                <p>검색 결과가 없습니다</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMentors.map((mentor) => (
                  <Link
                    key={mentor.id}
                    href={`/mentoring/${mentor.id}`}
                    className="group flex flex-col rounded-2xl border bg-white p-6 transition hover:border-slate-300 hover:shadow-lg"
                  >
                    {/* 상단: 프로필 */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
                        {mentor.name.slice(0, 1)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold group-hover:text-blue-600">{mentor.name}</h3>
                        <p className="text-sm text-slate-600">{mentor.company}</p>
                        <p className="text-xs text-slate-500">{mentor.role}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Briefcase className="h-3 w-3" />
                          {mentor.experience}
                        </div>
                      </div>
                    </div>

                    {/* 뱃지 */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {mentor.badges.includes("베스트멘토") && (
                        <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                          <Star className="h-3 w-3" />
                          베스트
                        </span>
                      )}
                      {mentor.badges.includes("빠른응답") && (
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                          <Zap className="h-3 w-3" />
                          빠른응답
                        </span>
                      )}
                      {mentor.badges.includes("이번주가능") && (
                        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          <CheckCircle className="h-3 w-3" />
                          이번주
                        </span>
                      )}
                    </div>

                    {/* 소개 */}
                    <p className="mb-4 flex-1 text-sm text-slate-600">{mentor.intro}</p>

                    {/* 카테고리 태그 */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {mentor.categories.map((cat) => (
                        <span key={cat} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                          {cat}
                        </span>
                      ))}
                    </div>

                    {/* 하단 정보 */}
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{mentor.rating}</span>
                          <span className="text-slate-400">({mentor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {mentor.availableTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">{mentor.price.toLocaleString()}원</span>
                        <span className="text-xs text-slate-500">50분 기준</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-center text-white">
            <h3 className="mb-4 text-2xl font-bold">아직 고민 중이신가요?</h3>
            <p className="mb-6 text-slate-100">무료 상담을 통해 나에게 맞는 멘토를 추천받아보세요</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
              무료 상담 신청
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
