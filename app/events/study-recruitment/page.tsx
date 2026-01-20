// app/events/study-recruitment/page.tsx

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function StudyRecruitmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    major: "",
    grade: "",
    studyTime: "",
    motivation: "",
    agreement: false,
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: 실제로는 API 호출
    console.log("제출 데이터:", formData)
    
    // 임시: 로컬에 저장
    const submissions = JSON.parse(localStorage.getItem('study-submissions') || '[]')
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString()
    })
    localStorage.setItem('study-submissions', JSON.stringify(submissions))
    
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 px-4">
          <div className="mx-auto max-w-2xl py-20 text-center">
            <div className="mb-6 text-6xl">🎉</div>
            <h2 className="text-3xl font-bold mb-4">신청이 완료되었습니다!</h2>
            <p className="text-slate-600 mb-8">
              빠른 시일 내에 이메일로 연락드리겠습니다.
            </p>
            <Button asChild>
              <a href="/events">다른 이벤트 보기</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* 배너 */}
        <section className="px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6">
              <Image
                src="/images/003.png"
                alt="스터디 모집"
                fill
                className="object-cover"
              />
            </div>
            
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-4">
              진행중
            </span>
            
            <h1 className="text-4xl font-bold mb-2">공부하고 돈 받아가자 💰</h1>
            <p className="text-xl text-slate-600 mb-6">멘토스 스터디 모집</p>
            
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">모집 기간</p>
                  <p className="font-semibold">2026.01.15 ~ 2026.02.28</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">리워드</p>
                  <p className="font-semibold">최대 50만원</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">스터디 기간</p>
                  <p className="font-semibold">3개월 (주 3회)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 혜택 */}
        <section className="px-4 py-12 bg-slate-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">스터디 혜택</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">📚 체계적인 커리큘럼</h3>
                <p className="text-slate-600">전문가가 설계한 학습 로드맵 제공</p>
              </div>
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">💵 출석 리워드</h3>
                <p className="text-slate-600">주 3회 출석 시 매월 15만원 지급 (총 45만원)</p>
              </div>
              <div className="bg-white p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">🎁 완주 보너스</h3>
                <p className="text-slate-600">3개월 완주 시 추가 5만원 지급</p>
              </div>
            </div>
          </div>
        </section>

        {/* 신청 폼 */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold mb-8 text-center">신청하기</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">이름 *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">이메일 *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">연락처 *</label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">대학교 *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">전공 *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">학년 *</label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  >
                    <option value="">선택</option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                    <option value="4">4학년</option>
                    <option value="etc">기타</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  주당 스터디 가능 시간 *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.studyTime}
                  onChange={(e) => setFormData({...formData, studyTime: e.target.value})}
                >
                  <option value="">선택</option>
                  <option value="3-5">3~5시간</option>
                  <option value="5-10">5~10시간</option>
                  <option value="10+">10시간 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  지원 동기 (100자 이상) *
                </label>
                <textarea
                  required
                  rows={5}
                  minLength={100}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.motivation}
                  onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                />
                <p className="text-sm text-slate-500 mt-1">
                  {formData.motivation.length} / 100자
                </p>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                  checked={formData.agreement}
                  onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
                />
                <label className="text-sm text-slate-600">
                  개인정보 수집 및 이용에 동의합니다 *
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                신청하기
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}