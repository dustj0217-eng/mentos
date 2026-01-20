// app/events/instagram-follow/page.tsx

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function InstagramFollowPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    instagramId: "",
    screenshot: null as File | null,
    agreement: false,
  })
  
  const [submitted, setSubmitted] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.screenshot) {
    alert("스크린샷을 업로드해주세요.")
    return
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  try {
    const screenshotBase64 = await fileToBase64(formData.screenshot)
    
    const payload = new URLSearchParams()
    payload.append("name", formData.name)
    payload.append("phone", formData.phone)
    payload.append("instagram", formData.instagramId)
    payload.append("screenshot", screenshotBase64)

    console.log("요청 전송 중...")

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyljGNRRMwzrMzBQpV7cUrDy2qunIS0SyT3YKF9bN9VrojljZYjKbQtP9R0CW3DZiNq/exec",
      {
        method: "POST",
        body: payload,
        redirect: 'follow'  // ← 중요! Apps Script 리다이렉트 처리
      }
    )

    console.log("응답 상태:", res.status)
    
    const text = await res.text()
    console.log("응답 텍스트:", text)
    
    const result = JSON.parse(text)
    console.log("파싱된 결과:", result)

    if (result.success) {
      setSubmitted(true)
    } else {
      alert(`제출에 실패했습니다: ${result.error || result.message || '알 수 없는 오류'}`)
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
            <div className="mb-6 text-6xl">☕</div>
            <h2 className="text-3xl font-bold mb-4">응모 완료!</h2>
            <p className="text-slate-600 mb-8">
              추첨을 통해 당첨자에게 개별 연락드립니다.
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
                src="/images/002.png"
                alt="인스타그램 팔로우 이벤트"
                fill
                className="object-cover"
              />
            </div>
            
            <h1 className="text-4xl font-bold mb-2">팔로우하고 기프티콘 받자 ☕</h1>
            <p className="text-xl text-slate-600 mb-6">멘토스 인스타그램 팔로우 이벤트</p>
          </div>
        </section>

        {/* 참여 방법 */}
        <section className="px-4 py-12 bg-slate-50">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">참여 방법</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">인스타그램 팔로우</h3>
                  <p className="text-slate-600">@mentos_official 계정 팔로우</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">게시물 좋아요 + 댓글</h3>
                  <p className="text-slate-600">이벤트 게시물에 좋아요 + 친구 태그 댓글</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">아래 폼 제출</h3>
                  <p className="text-slate-600">인증 스크린샷과 함께 정보 입력</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 응모 폼 */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold mb-8 text-center">응모하기</h2>
            
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
                <label className="block text-sm font-medium mb-2">인스타그램 아이디 *</label>
                <input
                  type="text"
                  required
                  placeholder="@username"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.instagramId}
                  onChange={(e) => setFormData({...formData, instagramId: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">인증 스크린샷 *</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFormData({...formData, screenshot: e.target.files?.[0] || null})}
                />
                <p className="text-sm text-slate-500 mt-1">
                  팔로우 + 댓글이 보이는 화면 캡처
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
                응모하기
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}