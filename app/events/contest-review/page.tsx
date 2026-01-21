"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContestReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    contestName: "",
    contestYear: "2024",
    award: "",
    review: "",
    tips: "",
    agreement: false,
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = new URLSearchParams()
      payload.append("name", formData.name)
      payload.append("phone", formData.phone)
      payload.append("contestName", formData.contestName)
      payload.append("contestYear", formData.contestYear)
      payload.append("award", formData.award)
      payload.append("review", formData.review)
      payload.append("tips", formData.tips)

      const res = await fetch(
        "YOUR_GOOGLE_APPS_SCRIPT_URL_2", // 구글 스크립트 URL 교체 필요
        {
          method: "POST",
          body: payload,
          redirect: 'follow'
        }
      )

      const text = await res.text()
      const result = JSON.parse(text)

      if (result.success) {
        setSubmitted(true)
      } else {
        alert(`제출에 실패했습니다: ${result.error || '알 수 없는 오류'}`)
      }
    } catch (error) {
      console.error("전체 에러:", error)
      alert(`오류가 발생했습니다: ${error}`)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 px-4">
          <div className="mx-auto max-w-2xl py-20 text-center">
            <div className="mb-6 text-6xl">🏆</div>
            <h2 className="text-3xl font-bold mb-4">제출 완료!</h2>
            <p className="text-slate-600 mb-8">
              3,000P가 지급되었습니다.<br/>
              소중한 경험 공유해주셔서 감사합니다!
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
        <section className="px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">공모전 후기 공유 🏆</h1>
            <p className="text-xl text-slate-600 mb-8">
              후배들에게 도움이 되는 생생한 경험을 공유해주세요
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl mb-12">
              <h3 className="font-semibold mb-2">🎁 혜택</h3>
              <p className="text-slate-700">후기 제출 시 3,000P 즉시 지급</p>
            </div>

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
                <label className="block text-sm font-medium mb-2">공모전명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 2024 대학생 창업 아이디어 공모전"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.contestName}
                  onChange={(e) => setFormData({...formData, contestName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">참가 연도 *</label>
                <input
                  type="text"
                  required
                  placeholder="2024"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.contestYear}
                  onChange={(e) => setFormData({...formData, contestYear: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">수상 내역</label>
                <input
                  type="text"
                  placeholder="예: 대상, 장려상 등 (수상하지 못한 경우 '미수상')"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.award}
                  onChange={(e) => setFormData({...formData, award: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">공모전 후기 *</label>
                <textarea
                  required
                  rows={8}
                  placeholder="준비 과정, 느낀 점, 아쉬웠던 점 등을 자유롭게 작성해주세요"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">후배들을 위한 TIP</label>
                <textarea
                  rows={4}
                  placeholder="준비하는 후배들에게 해주고 싶은 조언이 있다면?"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.tips}
                  onChange={(e) => setFormData({...formData, tips: e.target.value})}
                />
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
                  개인정보 수집 및 이용, 후기 콘텐츠 활용에 동의합니다 *
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                제출하기
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}