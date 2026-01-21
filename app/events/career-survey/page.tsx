"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function CareerSurveyPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    university: "",
    grade: "1학년",
    major: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    agreement: false,
  })
  
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'agreement') {
          payload.append(key, String(value))
        }
      })

      const res = await fetch(
        "YOUR_GOOGLE_APPS_SCRIPT_URL_3", // 구글 스크립트 URL 교체 필요
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
            <div className="mb-6 text-6xl">🎯</div>
            <h2 className="text-3xl font-bold mb-4">제출 완료!</h2>
            <p className="text-slate-600 mb-8">
              추첨을 통해 당첨자에게 개별 연락드립니다.<br/>
              소중한 의견 감사합니다!
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
            <h1 className="text-4xl font-bold mb-4">대학생 진로 설문조사 🎯</h1>
            <p className="text-xl text-slate-600 mb-8">
              대학생들의 진로 고민과 니즈를 파악하기 위한 설문입니다
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl mb-12">
              <h3 className="font-semibold mb-2">🎁 혜택</h3>
              <p className="text-slate-700">추첨을 통해 10명에게 1만원 상품권 지급</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 기본 정보 */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">기본 정보</h3>
                
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
                  <label className="block text-sm font-medium mb-2">이메일 *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">학교 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 서울대학교"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
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
                    <option value="1학년">1학년</option>
                    <option value="2학년">2학년</option>
                    <option value="3학년">3학년</option>
                    <option value="4학년">4학년</option>
                    <option value="5학년 이상">5학년 이상</option>
                    <option value="휴학">휴학</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">전공 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 경영학과"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                  />
                </div>
              </div>

              {/* 설문 질문 */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">설문 질문</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    1. 현재 가장 큰 진로 고민은 무엇인가요? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.q1}
                    onChange={(e) => setFormData({...formData, q1: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    2. 희망하는 진로 분야가 있나요? 있다면 무엇인가요? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.q2}
                    onChange={(e) => setFormData({...formData, q2: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2"></label>
                  <label className="block text-sm font-medium mb-2">
                    3. 진로를 결정하는 데 가장 중요하게 생각하는 요소는? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="예: 연봉, 워라밸, 적성, 사회적 인정 등"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.q3}
                    onChange={(e) => setFormData({...formData, q3: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    4. 멘토링이나 커리어 컨설팅을 받아본 적이 있나요? 있다면 어땠나요? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.q4}
                    onChange={(e) => setFormData({...formData, q4: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    5. 멘토스 플랫폼에서 가장 필요하다고 생각하는 기능은? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="예: 1:1 멘토링, 진로 상담, 공모전 정보, 취업 정보 등"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={formData.q5}
                    onChange={(e) => setFormData({...formData, q5: e.target.value})}
                  />
                </div>
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