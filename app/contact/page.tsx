"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageSquare, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    title: "",
    content: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="h-6 w-6" />
              <h1 className="text-2xl font-bold">1:1 문의</h1>
            </div>
            <p className="text-slate-600">궁금하신 점이 있으시면 문의해주세요. 영업일 기준 24시간 이내 답변드립니다.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">이름</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>
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
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">문의 유형</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border p-3"
                required
              >
                <option value="">문의 유형을 선택하세요</option>
                <option value="service">서비스 이용 문의</option>
                <option value="account">계정 관련 문의</option>
                <option value="payment">결제/환불 문의</option>
                <option value="bug">오류/버그 신고</option>
                <option value="suggestion">제안/건의</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">제목</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="문의 제목을 입력하세요"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">문의 내용</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="문의 내용을 자세히 입력해주세요"
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
      </main>

      <Footer />
    </div>
  )
}
