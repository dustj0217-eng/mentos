"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Bell, ChevronRight } from "lucide-react"
import Link from "next/link"

const notices = [
  {
    id: 1,
    title: "[공지] 2026년 1월 서비스 업데이트 안내",
    date: "2026.01.15",
    isImportant: true,
  },
  {
    id: 2,
    title: "[이벤트] 신규 회원 가입 이벤트 진행 중",
    date: "2026.01.10",
    isImportant: true,
  },
  {
    id: 3,
    title: "[안내] 개인정보처리방침 개정 안내",
    date: "2026.01.05",
    isImportant: false,
  },
  {
    id: 4,
    title: "[공지] 2025년 연말 고객 감사 이벤트 당첨자 발표",
    date: "2025.12.28",
    isImportant: false,
  },
  {
    id: 5,
    title: "[안내] 고객센터 운영 시간 변경 안내",
    date: "2025.12.20",
    isImportant: false,
  },
  {
    id: 6,
    title: "[공지] 멘토스 앱 버전 2.0 출시 안내",
    date: "2025.12.15",
    isImportant: false,
  },
]

export default function NoticePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-6 w-6" />
              <h1 className="text-2xl font-bold">공지사항</h1>
            </div>
            <p className="text-slate-600">멘토스의 새로운 소식을 확인하세요</p>
          </div>

          <div className="divide-y rounded-2xl border">
            {notices.map((notice) => (
              <Link
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="flex items-center justify-between p-4 hover:bg-slate-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {notice.isImportant && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">중요</span>
                    )}
                    <h3 className="font-medium">{notice.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{notice.date}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
