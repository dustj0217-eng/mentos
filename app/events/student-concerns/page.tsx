"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function StudentConcernsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    concern: "",
    category: "진로",
    agreement: false,
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = new URLSearchParams()
      payload.append("name", formData.name)
      payload.append("phone", formData.phone)
      payload.append("email", formData.email)
      payload.append("category", formData.category)
      payload.append("concern", formData.concern)

      const res = await fetch(
        "YOUR_GOOGLE_APPS_SCRIPT_URL_1", // 구글 스크립트 URL 교체 필요
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
            <div className="mb-6 text-6xl">💙</div>
            <h2 className="text-3xl font-bold mb-4">제출 완료!</h2>
            <p className="text-slate-600 mb-8">
              곧 멘토가 연락드릴 예정입니다.<br/>
              소중한 고민 공유해주셔서 감사합니다.
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
            <h1 className="text-4xl font-bold mb-4">대학생 고민 상담 💬</h1>
            <p className="text-xl text-slate-600 mb-8">
              진로, 학업, 인간관계 등 어떤 고민이든 편하게 나눠주세요
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl mb-12">
              <h3 className="font-semibold mb-2">🎁 혜택</h3>
              <p className="text-slate-700">제출하신 모든 분께 1:1 무료 멘토링 기회 제공</p>
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
                <label className="block text-sm font-medium mb-2">이메일</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">고민 카테고리 *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="진로">진로</option>
                  <option value="학업">학업</option>
                  <option value="인간관계">인간관계</option>
                  <option value="취업/이직">취업/이직</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">고민 내용 *</label>
                <textarea
                  required
                  rows={8}
                  placeholder="자유롭게 작성해주세요"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={formData.concern}
                  onChange={(e) => setFormData({...formData, concern: e.target.value})}
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
                  개인정보 수집 및 이용에 동의합니다 *
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