"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Handshake, Building2, Users, TrendingUp, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const benefits = [
  {
    icon: Users,
    title: "10만+ 활성 사용자",
    description: "대학생 타겟 마케팅에 최적화된 플랫폼",
  },
  {
    icon: TrendingUp,
    title: "높은 참여율",
    description: "평균 공모전 지원률 업계 최고 수준",
  },
  {
    icon: Building2,
    title: "500+ 파트너사",
    description: "다양한 기업과의 성공적인 협업 경험",
  },
]

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    type: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("제휴 문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Handshake className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold">제휴 문의</h1>
            <p className="mt-2 text-slate-600">멘토스와 함께 대학생들에게 더 좋은 기회를 제공해보세요</p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="mb-6 text-lg font-semibold">제휴 문의하기</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">회사명</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="회사명을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">담당자명</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="담당자명을 입력하세요"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">이메일</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">연락처</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="연락처를 입력하세요"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">제휴 유형</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-lg border p-3"
                  required
                >
                  <option value="">제휴 유형을 선택하세요</option>
                  <option value="contest">공모전 홍보</option>
                  <option value="activity">대외활동 모집</option>
                  <option value="internship">인턴십/채용 공고</option>
                  <option value="education">교육 콘텐츠 제휴</option>
                  <option value="advertising">광고/마케팅</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">문의 내용</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="제휴 관련 내용을 자세히 입력해주세요"
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                문의하기
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
