"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    category: "서비스 이용",
    questions: [
      {
        q: "멘토스는 어떤 서비스인가요?",
        a: "멘토스는 대학생을 위한 실전 정보 플랫폼입니다. 공모전, 대외활동, 인턴십, 취업 정보 등 다양한 기회를 한 곳에서 확인하고 지원할 수 있습니다.",
      },
      {
        q: "서비스 이용 요금은 어떻게 되나요?",
        a: "기본 서비스는 무료로 이용 가능합니다. 프리미엄 멘토링, 이력서 첨삭 등 일부 유료 서비스가 있으며, 해당 서비스 이용 시 별도 안내드립니다.",
      },
      {
        q: "모바일 앱도 있나요?",
        a: "네, iOS와 Android 앱을 모두 제공하고 있습니다. 앱스토어 또는 구글 플레이스토어에서 '멘토스'를 검색해 다운로드하세요.",
      },
    ],
  },
  {
    category: "계정 관리",
    questions: [
      {
        q: "회원가입은 어떻게 하나요?",
        a: "우측 상단의 '회원가입' 버튼을 클릭하여 이메일 또는 소셜 계정으로 간편하게 가입할 수 있습니다.",
      },
      {
        q: "비밀번호를 잊어버렸어요.",
        a: "로그인 페이지에서 '비밀번호 찾기'를 클릭하고 가입 시 사용한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.",
      },
      {
        q: "회원 탈퇴는 어떻게 하나요?",
        a: "마이페이지 > 설정 > 계정 관리에서 회원 탈퇴를 진행할 수 있습니다. 탈퇴 시 모든 데이터가 삭제되며 복구가 불가능합니다.",
      },
    ],
  },
  {
    category: "공모전/대외활동",
    questions: [
      {
        q: "공모전 정보는 얼마나 자주 업데이트되나요?",
        a: "매일 새로운 공모전과 대외활동 정보를 업데이트하고 있습니다. 관심 분야를 설정하시면 맞춤 알림을 받으실 수 있습니다.",
      },
      {
        q: "지원 마감일 알림을 받을 수 있나요?",
        a: "네, 관심 있는 공모전이나 대외활동에 '찜하기'를 하시면 마감 3일 전, 1일 전에 알림을 보내드립니다.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="h-6 w-6" />
              <h1 className="text-2xl font-bold">자주 묻는 질문</h1>
            </div>
            <p className="text-slate-600">궁금한 점을 빠르게 찾아보세요</p>
          </div>

          <div className="space-y-8">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="mb-4 text-lg font-semibold">{section.category}</h2>
                <div className="divide-y rounded-2xl border">
                  {section.questions.map((item, idx) => {
                    const itemId = `${section.category}-${idx}`
                    const isOpen = openItems.includes(itemId)
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50"
                        >
                          <span className="font-medium">{item.q}</span>
                          <ChevronDown
                            className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && <div className="border-t bg-slate-50 p-4 text-slate-600">{item.a}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
